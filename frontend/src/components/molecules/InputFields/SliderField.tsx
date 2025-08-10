import { Box, Slider } from "@chakra-ui/react";
import { FC, memo } from "react";

type Props = {
    rate: number;
    setRate: (value: number) => void;
}

export const SliderField: FC<Props> = memo((props) => {
    const { rate, setRate } = props;
    return (
        <Slider.Root w={{base: "230px", md: "500px"}} min={0} max={10} step={1} value={[rate]} onValueChange={(e) => setRate(e.value[0] ?? 0)} size="sm">
            <Slider.Control >
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                    <Box w={{ base: "30px", md: "50px" }} position="absolute" top="-12px" textAlign="center" py={2} bg="pink.500" color="white" rounded="md" fontSize={{base: "xs", md: "md"}} fontWeight="bold">
                        {rate}割
                    </Box>
                </Slider.Thumb>
                {Array.from({ length: 11 }).map((_, i) => (
                    <Slider.Marker key={i} value={i} position="absolute" top={{base: "-25%", md: "-35%"}} mt="2" w={{base: 2, md: 3}} h={{base: 2, md: 3}} bg="gray.500" rounded="full" />
                ))}
            </Slider.Control>
        </Slider.Root>
    )
})