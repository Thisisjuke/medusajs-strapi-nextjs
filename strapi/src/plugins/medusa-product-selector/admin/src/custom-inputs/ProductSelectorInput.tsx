import * as React from 'react';
import {Controller, useForm} from "react-hook-form";

import { Button, Alert, Flex, Loader } from '@strapi/design-system';
import {MultiSelect} from "../components/MultiSelect";
import { useIntl } from 'react-intl'
import getTrad from "../utils/getTrad";
import {Option} from "../components/MultiSelect/Option";
import useSWR from "swr";
import {fetcher} from "../utils/fetcher";
import {Popup} from "../components/Popup";

const ProductSelectorInput = (props) => {
  const {
    attribute,
    name: inputName,
    value,
    onChange,
  } = props;

  const val = value ? JSON.parse(value) : []

  const defaultValues = {
    'product-selected': val,
    searchText: '',
    collectionId: null,
    page: 1
  }

  const { formatMessage } = useIntl();
  const { register, watch, control, getValues } = useForm({defaultValues});

  const [resourceId, setResourceId] = React.useState(null)
  const [isDetailsVisible, setIsDetailsVisible] = React.useState(false);

  const [selectedProducts, setSelectedProducts] = React.useState(val)
  const [search, setSearch] = React.useState<null | Record<string, any>>(defaultValues);

  const { data:productsData, error:productsError, isLoading:productsIsLoading } = useSWR(['/medusa-product-selector/products/status', {}], fetcher)

  React.useEffect(() => {
    setResourceId(window.location.href.split("/").pop())
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if(name === "page"){setSearch(getValues())}
      if(name === "product-selected"){
        onChange({ target: { name: inputName, value: JSON.stringify(value[name]), type: attribute.type } })
        setSelectedProducts(value?.[name] || [])
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  if(productsError) return (
    <Alert
      title={formatMessage({
        id: getTrad('common.error.title')
      })}
      variant="danger"
    >
      {formatMessage({
        id: getTrad('common.error.message')
      })}
    </Alert>
  )

  if(productsIsLoading) return (
    <Flex>
      <Loader small>Loading</Loader>
    </Flex>
  )

  return (
    <>
      <section style={{display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '12px'}}>
        <div style={{flex: 1}}>
          <Controller
            name="product-selected"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                description={''}
                label={formatMessage({
                  id: getTrad('products-input.label')
                })}
                placeholder={formatMessage({
                  id: getTrad('products-input.placeholder')
                })}
              >
                {productsData?.products?.map(({ title, id, isAlreadyUsed }) => (
                  <Option disabled={isAlreadyUsed && isAlreadyUsed != resourceId } value={id} key={`option_${id}`}>
                    {title}
                  </Option>
                ))}
              </MultiSelect>
            )}
          />
        </div>
        <Button size={'L'} onClick={() => setIsDetailsVisible(prev => !prev)}>
          {formatMessage({
            id: getTrad('products-input.cta')
          })}
        </Button>
      </section>
      <Popup
        isDetailsVisible={isDetailsVisible}
        setIsDetailsVisible={setIsDetailsVisible}
        selectedProducts={selectedProducts}
        control={control}
        setSearch={setSearch}
        getValues={getValues}
        register={register}
        resourceId={resourceId}
        search={search}
        totalProducts={productsData.count}
      />
    </>
  );
}

export default ProductSelectorInput
