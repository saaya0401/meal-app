import { Box, Dialog, Flex, Portal, Slider, Text } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { NavButton } from "../atoms/button/NavButton";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    src: string;
    onCropped: (blob: Blob, previewUrl: string) => void;
}

export const ImageCropper: FC<Props> = memo((props) => {
    const { open, onOpenChange, src, onCropped } = props;
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    useEffect(() => {
        setZoom(1);
        setRotation(0);
        setCrop({ x: 0, y: 0 });
        setCroppedAreaPixels(null);
    }, [src, open]);
    const onCropComplete = useCallback((_a: Area, areaPx: Area) => {
        setCroppedAreaPixels(areaPx);
    }, []);

    const getCroppedBlob = useCallback(async () => {
        if (!croppedAreaPixels) return;
        const blob = await getCroppedImageWithRotation(src, croppedAreaPixels, rotation);
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        onCropped(blob, url);
        onOpenChange(false);
    }, [croppedAreaPixels, rotation, src, onCropped, onOpenChange]);
    return (
        <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size="lg">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content p={4}>
                        <Box position="relative" w="100%" h="60vh">
                            <Cropper image={src} crop={crop} zoom={zoom} rotation={rotation} aspect={1} cropShape="round" onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} onRotationChange={setRotation} zoomWithScroll minZoom={1} maxZoom={3} restrictPosition showGrid={false} />
                        </Box>
                        <Flex mt={4} direction="column" gap={4}>
                            <Flex align="center" gap={4}>
                                <Text w={10}>ズーム</Text>
                                <Slider.Root w="300px" min={1} max={3} step={0.01} value={[zoom]} onValueChange={(e)=> setZoom(e.value[0] ?? 0)}>
                                    <Slider.Control>
                                        <Slider.Track><Slider.Range /></Slider.Track>
                                    <Slider.Thumb index={0}>
                                        <Slider.DraggingIndicator />
                                        <Slider.HiddenInput />
                                    </Slider.Thumb>
                                    </Slider.Control>
                                </Slider.Root>
                            </Flex>
                            <Flex align="center" gap={4}>
                                <Text w={10}>回転</Text>
                                <Slider.Root w="300px" min={0} max={360} step={1} value={[rotation]} onValueChange={(e) => { setRotation(e.value[0] ?? 0) }} >
                                    <Slider.Control>
                                        <Slider.Track><Slider.Range /></Slider.Track>
                                        <Slider.Thumb index={0}>
                                            <Slider.DraggingIndicator />
                                            <Slider.HiddenInput />
                                        </Slider.Thumb>
                                    </Slider.Control>
                                </Slider.Root>
                                <Text>{Math.round(rotation)}°</Text>
                            </Flex>
                        </Flex>
                        <Flex mt={4} gap={3} justify="flex-end">
                            <NavButton bg="gray.400" onClick={() => onOpenChange(false)}>キャンセル</NavButton>
                            <NavButton bg="pink.500" onClick={getCroppedBlob}>切り抜く</NavButton>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
});


function getRadianAngle(degree: number) {
    return (degree * Math.PI) / 180;
}

function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation);
    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
    }
}
function createImage(url: string): Promise<HTMLImageElement>{
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

async function getCroppedImageWithRotation(
        imageSrc: string,
        crop: Area,
        rotation = 0
    ): Promise<Blob | null> {
    const image = await createImage(imageSrc);
    const rotRad = getRadianAngle(rotation);
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.rotate(-rotRad);
    ctx.translate(-bBoxWidth / 2, -bBoxHeight / 2);

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    if (!croppedCtx) return null;

    croppedCanvas.width = crop.width;
    croppedCanvas.height = crop.height;

    croppedCtx.beginPath();
    croppedCtx.arc(
        crop.width / 2,
        crop.height / 2,
        Math.min(crop.width, crop.height) / 2,
        0,
        2 * Math.PI
    );
    croppedCtx.closePath();
    croppedCtx.clip();
    croppedCtx.drawImage(
        canvas,
        crop.x, crop.y, crop.width, crop.height,
        0, 0, crop.width, crop.height
    );

    return new Promise((resolve) => {
        croppedCanvas.toBlob((blob) => resolve(blob), "image/png", 0.9);
    });
}