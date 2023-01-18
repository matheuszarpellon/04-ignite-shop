import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";

export const CartContent = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  width: '30rem',
  padding: '4.5rem 3rem 3rem 3rem',
  background: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  h2: {
    fontWeight: 'bold',
    fontSize: '$lg',
    color: '$gray100',
    marginBottom: '2rem',
  },

  "> section": {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    flex: 1,
    overflowY: "auto",
  },
})

export const CartCloseButton = styled(Dialog.Close, {
  background: 'none',
  border: 'none',
  color: '$gray500',
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem',
})

export const CartProduct = styled("div", {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '5.8125rem',
  gap: '1.25rem',
})

export const CartProductImage = styled("div", {
  width: "6.3125rem",
  height: "5.8125rem",
  background: "linear-gradient(180deg, #1EA483 0%, #7465D4 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,

  img: {
    objectFit: "cover",
  },
});

export const CartProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",

  p: {
    color: "$gray300",
    fontSize: "$md",
  },

  strong: {
    marginTop: 4,
    fontSize: "$md",
    fontWeight: 700,
  },

  button: {
    marginTop: "auto",
    width: "max-content",
    background: "none",
    border: "none",
    color: "$green500",
    fontSize: "1rem",
    fontWeight: 700,
  },
});

export const CartFinalization = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "auto",

  button: {
    width: "100%",
    background: "$green500",
    color: "$white",
    fontSize: "$md",
    height: "4.3125rem",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },
  },
});

export const FinalizationDetails = styled("section", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  marginBottom: 55,

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    p: {
      fontSize: "$md",
      color: "$gray300",
    },

    "&:last-child": {
      fontWeight: "bold",

      span: {
        fontSize: "$md",
      },

      p: {
        color: "$gray100",
        fontSize: "$xl",
      },
    },
  },
});