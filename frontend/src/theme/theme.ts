import { createSystem, defaultConfig } from "@chakra-ui/react";

export const theme = createSystem(defaultConfig, {
    globalCss: {
        "html, body": {
            backgroundColor: "yellow.50",
            color: "gray.800"
        }
    },
    theme: {
        keyframes: {
            pawBounce: {
                "0%, 20%": { transform: "translateY(0)", opacity: 1 },
                "10%": { transform: "translateY(-8px)", opacity: 0.8 },
                "100%": { transform: "translateY(0px)", opacity:1}
            },
        },
        tokens: {
            animations: {
                pawBounce: {value: "pawBounce 1.7s ease-in-out infinite"}
            }
        }
    }
});