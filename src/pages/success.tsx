import { stripe } from "@/lib/stripe";
import { ImageContainer, ImagesContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
  products: string[];
}

export default function Success({ costumerName, product, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImagesContainer>
          {products.map((image, index) => (
          <ImageContainer key={index}>
            <Image src={image} width={120} height={110} alt="" />
          </ImageContainer>

          ))}
        </ImagesContainer>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{" "}{products.length}{" "}camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const costumerName = session.customer_details?.name
  const products = session.line_items?.data.map(item => {
    const product = item.price?.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      costumerName,
      products
    }
  }
}