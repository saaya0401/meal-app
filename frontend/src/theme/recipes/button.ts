import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
    base: {
        fontWeight: "bold",
    },
    variants: {
        visual: {
            menuItem: {
                w: "100%",
                bg: "transparent",
                color: "gray.600",
                py: 8,
                fontSize: 20,
                _hover: {
                    bg: "gray.200",
                }
            }
        }
    },
})