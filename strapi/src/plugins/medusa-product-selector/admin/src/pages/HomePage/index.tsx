import * as React from 'react';
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Layout,
  GridLayout,
  Box
} from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import { useIntl } from 'react-intl'

import {Illo} from "../../components/Illo";
import {ProductCard} from "../../components/Popup-Product/ProductCard";
import medusaProductsRequests from "../../api/medusa-product";
import settingsRequests from "../../api/settings";
import getTrad from "../../utils/getTrad";

const HomePage = () => {
  const { formatMessage } = useIntl();

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
        title={formatMessage({
          id: getTrad('list-page.title')
        })}
        subtitle={formatMessage({
          id: getTrad('list-page.subtitle')
        })}
        as={'h2'}
      />
      <ContentLayout>
        {!pluginSettings?.medusaServerBaseUrl && (
          <EmptyStateLayout
            icon={<Illo />}
            content={formatMessage({
              id: getTrad('list-page.no-url')
            })}
          />
        )}
        {
          pluginSettings?.medusaServerBaseUrl && (!productsData || productsData?.products?.length === 0)
            ? (
              <EmptyStateLayout
              icon={<Illo />}
              content={formatMessage({
                id: getTrad('list-page.empty')
              })}
            />
            ) : (
              <GridLayout>
                {productsData?.products.map((product) => {
                  return (
                    <Box padding={4} hasRadius background="neutral0" key={product.id} shadow="tableShadow">
                      <ProductCard
                        title={product.title}
                        subtitle={`${product.description.replace( /(<([^>]+)>)/ig, '').slice(0, 80)}...`}
                        imageSrc={product.thumbnail}
                      />
                    </Box>
                  );
                })}
              </GridLayout>
            )
        }
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
