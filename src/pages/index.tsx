import { CartButton } from "@/components/CartButton"
import { IProduct } from "@/contexts/CartContext"
import { useCart } from "@/hooks/useCart"
import { stripe } from "@/lib/stripe"
import { HomeContainer, Product } from "@/styles/pages/home"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { MouseEvent } from "react"
import Stripe from 'stripe'

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  const { addToCart, removeCartItem, checkIfItemAlreadyExists } = useCart();

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    addToCart(product);
  }

  function handleRemoveFromCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    removeCartItem(product.id);
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  {checkIfItemAlreadyExists(product.id) === true ? (
                    <CartButton
                    size="large"
                    color="red"
                    variant="remove"
                    onClick={(e) => handleRemoveFromCart(e, product)}
                  />
                  ) : (
                    <CartButton
                    size="large"
                    color="green"
                    onClick={(e) => handleAddToCart(e, product)}
                  />
                  )}
                  
                </footer>
              </Product>
            </Link>
          )
        })}

      </HomeContainer>
    </>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(Number(price.unit_amount) / 100),
      numberPrice: Number(price.unit_amount) / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2
  }
}
