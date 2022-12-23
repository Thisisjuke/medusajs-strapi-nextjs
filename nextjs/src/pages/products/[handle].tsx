import { medusaClient } from "@lib/config"
import { getProductHandles } from "@lib/util/get-product-handles"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import ProductTemplate from "@modules/products/templates"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"
import { ReactElement } from "react"
import {BlocksBuilder} from "../../blocks/BlockBuilder";

interface Params extends ParsedUrlQuery {
  handle: string
}

const ProductPage = ({ notFound, data, blocks }) => {
    return (
      <>
        <Head
          description={data.description}
          title={data.title}
          image={data.thumbnail}
        />
        <ProductTemplate product={data} />
        <BlocksBuilder blocks={blocks}/>
      </>
    )
}

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const handles = await getProductHandles()
  return {
    paths: handles.map((handle) => ({ params: { handle } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const handle = context.params?.handle as string

  const data = await medusaClient.products
        .list({ handle })
        .then(({ products }) => products[0])

  if (!data) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  const content = await fetch(`${process.env.STRAPI_BACKEND_URL}/medusa-product-selector/product-pages?id=${data.id}`)
      .then((res) => res.json())
      .then((data) => data)
      .catch((e) => {
          throw new Error('500', e)
      });

  return {
    props: {
        data,
        blocks: content ? content : []
    },
  }
}

export default ProductPage
