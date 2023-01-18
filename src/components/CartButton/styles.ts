import { styled } from "@stitches/react";

export const CartButtonContainer = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 6,
  position: "relative",

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.6
  },
  
  span: {
    background: "$green500",
    color: "$white",
    borderRadius: "50%",
    width: "1.5rem",
    height: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    fontWeight: "bold",
    position: "absolute",
    top: "calc(-1.5rem / 2)",
    right: "calc(-1.5rem / 2)",
    outline: "3px solid $gray900",
  },

  variants: {
    color: {
      gray: {
        background: "$gray800",
        color: "$gray500",
      },
      green: {
        background: "$green500",
        color: "$white",

        "&:not(:disabled):hover": {
          backgroundColor: "$green300",
        },
      },
      red: {
        background: "$red500",
        color: "$white",

        "&:not(:disabled):hover": {
          backgroundColor: "$red300",
        },
      },
    },
    size: {
      medium: {
        width: "3rem",
        height: "3rem",

        svg: {
          fontSize: 24,
        },
      },
      large: {
        width: "3.5rem",
        height: "3.5rem",

        svg: {
          fontSize: 32,
        },
      },
    },
  },

  defaultVariants: {
    color: "gray",
    size: "medium",
  },
});