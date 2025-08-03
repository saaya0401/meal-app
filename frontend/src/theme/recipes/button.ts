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
            },
            navButton: {
                p: 3,
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                textDecoration: "none",
                _hover: { opacity: 0.8 },
                borderRadius: 10
            }
        }
    },
})