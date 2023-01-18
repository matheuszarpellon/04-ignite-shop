import { useCart } from "@/hooks/useCart";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import Image from "next/image";
import { X } from 'phosphor-react';
import { useState } from "react";
import { CartButton } from "../CartButton";
import { CartCloseButton, CartContent, CartFinalization, CartProduct, CartProductDetails, CartProductImage, FinalizationDetails } from "./styles";

export function Cart() {
  const { cartItems, removeCartItem, cartTotal, cartQuantity } = useCart();

  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton quantity={cartQuantity} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartCloseButton>
            <X size={24} weight="bold" />
          </CartCloseButton>
          <h2>Sacola de compras</h2>
          <section>
            {cartQuantity <= 0 && (
              <p>Parece que seu carrinho está vazio : (</p>
            )}

            {cartItems.map((item) => {
              return (
                <CartProduct key={item.id}>
                  <CartProductImage>
                    <Image src={item.imageUrl} width={100} height={93} alt="" />
                  </CartProductImage>
                  <CartProductDetails>
                    <p>{item.name}</p>
                    <strong>{item.price}</strong>
                    <button onClick={() => removeCartItem(item.id)}>Remover</button>
                  </CartProductDetails>
                </CartProduct>
              )
            })}

          </section>

          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span>Quantidade</span>
                <p>{cartQuantity} {cartQuantity > 1 ? "itens" : cartQuantity <= 0 ? "" : "item"}</p>
              </div>
              <div>
                <span>Valor total</span>
                <p>{formattedCartTotal}</p>
              </div>
            </FinalizationDetails>
            <button onClick={handleCheckout} disabled={isCreatingCheckoutSession || cartQuantity <= 0}>
              Finalizar compra
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}