import { Handbag, TrashSimple } from "phosphor-react";
import { ComponentProps } from "react";
import { CartButtonContainer } from "./styles";

interface CartButtonProps extends ComponentProps<typeof CartButtonContainer> {
  quantity?: number;
  variant?: "add" | "remove";
}

export function CartButton({ quantity = 0, variant, ...rest }: CartButtonProps) {
  return (
    <CartButtonContainer {...rest}>
      {quantity > 0 && <span>{quantity}</span>}
      {variant === "remove" ?
        <TrashSimple size={24} weight="bold" /> :
        <Handbag size={24} weight="bold" />}
    </CartButtonContainer>
  )
}