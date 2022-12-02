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

const HomePage = () => {
  const [productsData, setProductsData] = React.useState<null | Record<string, any>>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchData = async () => {
    if(isLoading === false) setIsLoading(true)
    const medusaProducts = await medusaProductsRequests.getAllMedusaProducts()
    setProductsData(medusaProducts)
    setIsLoading(false)
  }

  React.useEffect(() => {
    const fetch = async () => {
      await fetchData()
    };

   fetch().then();
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
        {
          !productsData || productsData?.products?.length === 0
            ? (
              <EmptyStateLayout
              icon={<Illo />}
              content={'There is no published products coming for your Medusa Ecommerce.'}
            />
            ) : (
              <ProductList>
                {productsData?.products.map((_, idx) => (
                  <ProductCard
                    title={'Product'}
                    subtitle={'100% cool'}
                  />
                ))}
              </ProductList>
            )
        }
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
