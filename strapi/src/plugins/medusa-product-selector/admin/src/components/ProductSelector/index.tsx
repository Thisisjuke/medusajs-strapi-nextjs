import * as React from 'react';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';

import { Box, Loader, Button, ContentLayout, EmptyStateLayout, GridLayout } from '@strapi/design-system';
import medusaProductsRequests from "../../api/medusa-product";
import {ProductCard} from "../Popup-Product/ProductCard";
import {Illo} from "../Illo";
import {MultiSelect} from "../MultiSelect";
import {PopupHeader} from "../Popup-Product/PopupHeader";
import {ClosePopup} from "../Popup-Product/ClosePopup";
import { useIntl } from 'react-intl'
import getTrad from "../../utils/getTrad";

const ProductSelector = (props) => {
  const {
    attribute,
    name: inputName,
    value,
    onChange,
  } = props;

  const val = value ? JSON.parse(value) : []

  const { formatMessage } = useIntl();
  const { register, watch, reset } = useForm({defaultValues: {'product-selected': []}});

  const [productsData, setProductsData] = React.useState<null | Record<string, any>>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isDetailsVisible, setIsDetailsVisible] = React.useState(false);

  const [selectedProducts, setSelectedProducts] = React.useState(val)
  const [searchValue, setSearchValue] = React.useState('');

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

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      onChange({ target: { name: inputName, value: JSON.stringify(value[name]), type: attribute.type } })
      setSelectedProducts(value?.[name] || [])
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <section style={{display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '12px'}}>
        <div style={{flex: 1}}>
          <MultiSelect
            {...register('product-selected')}
            setSearchValue={setSearchValue}
            label={formatMessage({
              id: getTrad('products-input.label')
            })}
            description={''}
            placeholder={formatMessage({
              id: getTrad('products-input.placeholder')
            })}
            options={productsData?.products}
            value={selectedProducts}
          />
        </div>
        <Button size={'L'} onClick={() => setIsDetailsVisible(prev => !prev)}>
          {formatMessage({
            id: getTrad('products-input.cta')
          })}
        </Button>
      </section>
      <Modal
        isOpen={isDetailsVisible}
        onAfterOpen={(e) => {
          document.body.style.overflowY = 'hidden'
        }}
        onRequestClose={(e) => {
          document.body.style.overflowY = 'auto'
          setIsDetailsVisible(false)
        }}
        style={{
          overlay: {zIndex: 100},
          content: {padding: 0, height: '90vh', width: '90vw', maxWidth: '1600px', top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',
          }}
        }>
        <Box background={"neutral100"}>
            <>
              <ClosePopup closeModal={() => setIsDetailsVisible(false)} />
              <PopupHeader
                productsData={productsData}
                refetch={fetchData}
                setSearch={setSearchValue}
                resetForm={reset}
                selectedProducts={selectedProducts}
                closeModal={() => setIsDetailsVisible(false)}
              />
              <ContentLayout>
                {isLoading ? (
                  <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "1rem", paddingBottom: "1rem"
                  }}>
                    <Loader>Loading products</Loader>
                  </div>
                ) : (productsData?.products.length === 0 ? (
                  <EmptyStateLayout
                    icon={<Illo/>}
                    content={"There is no published products coming for your Medusa Ecommerce."}
                  />
                ) : (
                  <GridLayout>
                    {productsData?.products.map(product => {
                      return (product.title.includes(searchValue) || product.description.includes(searchValue) ?
                          (<Box
                            style={{gridTemplateColumns: 'repeat(3, minmax(0, 1fr)'}}
                            padding={4}
                            hasRadius
                            background="neutral0"
                            key={product.id}
                            shadow="tableShadow"
                          >
                            <ProductCard
                              title={product.title}
                              subtitle={product.description}
                              defaultChecked={selectedProducts.includes(product.id)}
                              value={product.id}
                              register={register}
                              imageSrc={product.thumbnail}
                              displayCheck
                            />
                          </Box>) : null
                      )
                    })}
                  </GridLayout>
                ))}
              </ContentLayout>
            </>
        </Box>
      </Modal>
    </div>
  );
}

export default ProductSelector