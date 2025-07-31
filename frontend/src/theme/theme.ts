import { createSystem, defaultConfig } from "@chakra-ui/react";
import { buttonRecipe } from "./recipes/button";

export const theme = createSystem(defaultConfig, {
    globalCss: {
        "html, body": {
            backgroundColor: "yellow.50",
            color: "gray.800"
        }
    }
});