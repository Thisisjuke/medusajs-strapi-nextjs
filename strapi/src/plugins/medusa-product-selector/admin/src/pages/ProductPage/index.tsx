import * as React from 'react';
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Layout,
  GridLayout,
  Box,
  TextInput,
  TwoColsLayout,
  Typography,
  Divider,
  Status
} from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import { useIntl } from 'react-intl'
import Modal from 'react-modal';

import {Illo} from "../../components/Illo";
import {ProductCard} from "../../components/Popup/ProductCard";
import medusaProductsRequests from "../../api/medusa-product";
import settingsRequests from "../../api/settings";
import getTrad from "../../utils/getTrad";
import {ClosePopup} from "../../components/Popup/ClosePopup";
import ProductDisplay from "../../components/ProductDisplay";

const ProductPage = () => {
  const { formatMessage } = useIntl();

  const [productsData, setProductsData] = React.useState<null | Record<string, any>>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [pluginSettings, setPluginSettings] = React.useState(null)

  const [viewProductDetails, setViewProductDetails] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')

  const mutateSearch = (val) => setSearchValue(val.toLowerCase())

  const getPluginSettings = async () => {
    setPluginSettings(await settingsRequests.getSettings())
  }

  const fetchData = async () => {
    if(isLoading === false) setIsLoading(true)
    const medusaProducts = await medusaProductsRequests.getAllMedusaProductsWithRelationDetails()
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
    <>

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
          <div style={{display: 'flex', gap: '8px', paddingBottom: '12px'}} >
            <TextInput
              name={"product-searchbar"}
              aria-label={"product-searchbar"}
              onChange={e => {
                mutateSearch(e.target.value)
              }}
              placeholder={formatMessage({
                id: getTrad('products-input-modal.search-placeholder')
              })}
            />
          </div>
        </ContentLayout>
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
                <GridLayout style={{gridTemplateColumns: 'repeat(4, minmax(0, 1fr)'}}>
                  {productsData?.products.map(product => {
                    return (product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue) ?
                        (<Box
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
                        </Box>) : null
                    )
                  })}
                </GridLayout>
              )
          }
        </ContentLayout>
      </Layout>
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
