import * as React from 'react';
import {Controller, useForm} from "react-hook-form";
import { Flex, Loader, Alert } from '@strapi/design-system';

import {MultiSelect} from "../components/MultiSelect";
import { useIntl } from 'react-intl'
import getTrad from "../utils/getTrad";
import {Option} from "../components/MultiSelect/Option";
import useSWR from "swr";
import {fetcher} from "../utils/fetcher";

const CollectionSelectorInput = (props) => {
  const {
    attribute,
    name: inputName,
    value,
    onChange,
  } = props;

  const val = value ? JSON.parse(value) : []

  const defaultValues = {
    'collection-selected': val,
    searchText: '',
    collectionId: null,
    page: 1
  }

  const { formatMessage } = useIntl();
  const { watch, control } = useForm({defaultValues});

  const [resourceId, setResourceId] = React.useState(null)

  const { data:collectionsData, error:collectionsError, isLoading:collectionsIsLoading } = useSWR(['/medusa-product-selector/collections/status', {}], fetcher)

  React.useEffect(() => {
    setResourceId(window.location.href.split("/").pop())
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if(name === "collection-selected"){
        onChange({ target: { name: inputName, value: JSON.stringify(value[name]), type: attribute.type } })
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  if(collectionsError) return (
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

  if(collectionsIsLoading) return (
    <Flex>
      <Loader small>Loading</Loader>
    </Flex>
  )

  return (
    <div>
      <section style={{display: 'flex', alignItems: 'end', justifyContent: 'center', gap: '12px'}}>
        <div style={{flex: 1}}>
          <Controller
            name="collection-selected"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                description={''}
                label={formatMessage({
                  id: getTrad('collection-input.label')
                })}
                placeholder={formatMessage({
                  id: getTrad('collection-input.placeholder')
                })}
              >
                {collectionsData?.collections?.map(({ title, id, isAlreadyUsed }) => (
                  <Option disabled={isAlreadyUsed && isAlreadyUsed != resourceId } value={id} key={`option_${id}`}>
                    {title}
                  </Option>
                ))}
              </MultiSelect>
            )}
          />
        </div>
      </section>
    </div>
  );
}

export default CollectionSelectorInput
