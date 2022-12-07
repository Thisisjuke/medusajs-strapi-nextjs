import * as React from 'react';
import { useForm } from "react-hook-form";
import { Box, Loader, Layout, HeaderLayout, Button, ActionLayout, Typography, TextInput, ContentLayout, EmptyStateLayout, GridLayout, FieldInput } from '@strapi/design-system';
import medusaProductsRequests from "../../api/medusa-product";
import {ProductCard} from "../ProductCard";
import {Illo} from "../Illo";

const ReloadIcon = () => (
  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z"></path></svg>
)

const ProductSelector = (props) => {
  const {
    attribute,
    name: inputName,
    value,
    onChange,
  } = props;

  const val = value ? JSON.parse(value) : []

  const { register, watch, reset } = useForm();

  const [productsData, setProductsData] = React.useState<null | Record<string, any>>(null)
  const [isLoading, setIsLoading] = React.useState(true)

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
      setSelectedProducts(value[name])
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <Box background={"neutral100"}>
        <Layout>
          <>
            <HeaderLayout
              primaryAction={
                <Button
                  variant={'secondary'}
                  onClick={() => fetchData()}
                  startIcon={<ReloadIcon />}
                >
                  Refetch Products
                </Button>
              }
              title={"Select products"}
              subtitle={`${productsData?.products.length} Products found`} as="h2"
            />
            <ActionLayout
              startActions={
                <TextInput
                  name={"product-searchbar"}
                  aria-label={"product-searchbar"}
                  onChange={e => {
                    setSearchValue(e.target.value)
                  }}
                  placeholder="e.g: my super product"
                />
              }
              endActions={
                <Button variant={"danger-light"} onClick={() => {
                  reset();
                  setSearchValue('')
                }}>
                  Clear Selection
                </Button>
              }
            />
            <ContentLayout>
              <Box paddingTop={0} paddingBottom={4}>
                <Typography>{(Array.isArray(selectedProducts) && selectedProducts.length) || 0} product(s) selected.</Typography>
              </Box>
            </ContentLayout>
            <ContentLayout>
              {isLoading ? (
                <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "1rem", paddingBottom: "1rem" }}>
                  <Loader>Loading products</Loader>
                </div>
              ) : ( productsData?.products.length === 0 ? (
                <EmptyStateLayout icon={<Illo />} content={"There is no published products coming for your Medusa Ecommerce."} />
              ) : (
                  <GridLayout>
                  {productsData?.products.map(product => {
                    return(product.title.includes(searchValue) || product.description.includes(searchValue) ?
                      (<Box style={{gridTemplateColumns: 'repeat(3, minmax(0, 1fr)'}} padding={4} hasRadius background="neutral0" key={product.id} shadow="tableShadow">
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
        </Layout>
      </Box>
    </div>
  );
}

export default ProductSelector
