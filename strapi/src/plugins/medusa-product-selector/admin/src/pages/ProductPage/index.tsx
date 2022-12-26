import * as React from 'react';
import useSWR from 'swr'
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Layout,
  GridLayout,
  Box,
} from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import { useIntl } from 'react-intl'
import Modal from 'react-modal';

import {Illo} from "../../components/Illo";
import {ProductCard} from "../../components/Popup/ProductCard";
import getTrad from "../../utils/getTrad";
import {ClosePopup} from "../../components/Popup/ClosePopup";
import ProductDisplay from "../../components/ProductDisplay";
import {fetcher} from "../../utils/fetcher";
import {FilterProductForm} from "../../components/forms/FilterProductForm";

const PageHeader = ({formatMessage}) => (
  <BaseHeaderLayout
    title={formatMessage({
      id: getTrad('list-page.title')
    })}
    subtitle={formatMessage({
      id: getTrad('list-page.subtitle')
    })}
    as={'h2'}
  />
)

const PageLayout = ({children, formatMessage}) => (
  <Layout>
    <ContentLayout>
      <PageHeader formatMessage={formatMessage} />
      {children}
    </ContentLayout>
  </Layout>
)

const defaultValues = {
  searchText: '',
  collectionId: null
}

const ProductPage = () => {
  const { formatMessage } = useIntl();

  const [viewProductDetails, setViewProductDetails] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState(defaultValues)

  const { data:collectionsData, error:collectionsError, isLoading:collectionsIsLoading } = useSWR(['/medusa-product-selector/collections/all', searchValue], fetcher)
  const { data:productsData, error:productsError, isLoading:productsIsLoading } = useSWR(['/medusa-product-selector/products/details', searchValue], fetcher)

  if(collectionsIsLoading || productsIsLoading) return (
    <PageLayout formatMessage={formatMessage}>
      <LoadingIndicatorPage />
    </PageLayout>
  )
  if(collectionsError || productsError) return (
    <PageLayout formatMessage={formatMessage}>
        <EmptyStateLayout
          as={'div'}
          icon={<Illo />}
          content={<>
            {collectionsError && <div>{JSON.stringify(collectionsError, null, 2)}</div>}
            {productsError && <div>{JSON.stringify(productsError, null, 2)}</div>}
          </>}
          action={<span>
            {formatMessage({
              id: getTrad('list-page.no-url')
            })}
          </span>}
        />
    </PageLayout>
  )

  return (
    <>
      <PageLayout formatMessage={formatMessage}>
        <ContentLayout>
          <FilterProductForm defaultValues={defaultValues} collections={collectionsData?.collections} onSubmit={setSearchValue} />
        </ContentLayout>
        <ContentLayout>
          {!productsData || productsData?.products?.length === 0 ? (
              <EmptyStateLayout
                icon={<Illo />}
                content={formatMessage({
                  id: getTrad('list-page.empty')
                })}
              />
            ) : (
            <GridLayout style={{gridTemplateColumns: 'repeat(4, minmax(0, 1fr)'}}>
              {productsData?.products?.map(product => (
                <Box
                  style={{cursor: 'pointer'}}
                  padding={4}
                  hasRadius
                  background="neutral0"
                  key={product.id}
                  shadow="tableShadow"
                  onClick={() => setViewProductDetails(product)}
                >
                  <ProductCard
                    title={product.title}
                    subtitle={product.description}
                    value={product.id}
                    imageSrc={product.thumbnail}
                  />
                </Box>
              ))}
            </GridLayout>
          )}
        </ContentLayout>
      </PageLayout>
      <Modal
        isOpen={viewProductDetails}
        onAfterOpen={(e) => {
          document.body.style.overflowY = 'hidden'
        }}
        onRequestClose={(e) => {
          document.body.style.overflowY = 'auto'
          setViewProductDetails(null)
        }}
        style={{
          overlay: {zIndex: 100},
          content: {padding: 0, height: '90vh', width: '90vw', maxWidth: '1600px', top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',
          }}
        }>
        <ClosePopup closeModal={(e) => {
          document.body.style.overflowY = 'auto'
          setViewProductDetails(false)
        }} />
        <Box background={"neutral100"} style={{height: '100%'}}>
          {viewProductDetails && (
            <ProductDisplay product={viewProductDetails} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ProductPage;
