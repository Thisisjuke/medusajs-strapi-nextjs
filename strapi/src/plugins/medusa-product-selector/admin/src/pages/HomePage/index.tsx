import * as React from 'react';
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Layout
} from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'

import {Illo} from "../../components/Illo";
import {ProductList} from "../../components/ProductList";
import {ProductCard} from "../../components/ProductCard";
import medusaProductsRequests from "../../api/medusa-product";
import settingsRequests from "../../api/settings";

const HomePage = () => {
  const [productsData, setProductsData] = React.useState<null | Record<string, any>>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [pluginSettings, setPluginSettings] = React.useState(null)

  const getPluginSettings = async () => {
    setPluginSettings(await settingsRequests.getSettings())
  }

  const fetchData = async () => {
    if(isLoading === false) setIsLoading(true)
    const medusaProducts = await medusaProductsRequests.getAllMedusaProducts()
    setProductsData(medusaProducts)
    setIsLoading(false)
  }

  React.useEffect(() => {
    const get = async () => {
      await getPluginSettings()
    };

    const fetch = async () => {
      await fetchData()
    };

    get().then(
      () => {
        pluginSettings?.medusaServerBaseUrl !== null && pluginSettings?.medusaServerBaseUrl !== '' ? fetch().then() : setIsLoading(false)
      }
    )

  }, []);

  if(isLoading) return <LoadingIndicatorPage />

  return (
    <Layout>
      <BaseHeaderLayout
        title={'Medusa Products'}
        subtitle={'See all your published products.'}
        as={'h2'}
      />
      <ContentLayout>
        {!pluginSettings?.medusaServerBaseUrl && (
          <EmptyStateLayout
            icon={<Illo />}
            content={"There is no medusa API URL. Please set it inside the Plugin Settings Page."}
          />
        )}
        {
          pluginSettings?.medusaServerBaseUrl && (!productsData || productsData?.products?.length === 0)
            ? (
              <EmptyStateLayout
              icon={<Illo />}
              content={'There is no published products coming for your Medusa Ecommerce.'}
            />
            ) : (
              <ProductList>
                {productsData?.products.map((product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      title={product.title}
                      subtitle={`${product.description.replace( /(<([^>]+)>)/ig, '').slice(0, 80)}...`}
                      imageSrc={product.thumbnail}
                    />
                  );
                })}
              </ProductList>
            )
        }
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
