import * as React from 'react';
import { useForm } from "react-hook-form";

import {MultiSelect} from "../components/MultiSelect";
import { useIntl } from 'react-intl'
import getTrad from "../utils/getTrad";
import {Option} from "../components/MultiSelect/Option";
import medusaCollectionsRequests from "../api/medusa-collections";

const CollectionSelectorInput = (props) => {
  const {
    attribute,
    name: inputName,
    value,
    onChange,
  } = props;

  const val = value ? JSON.parse(value) : []

  const { formatMessage } = useIntl();
  const { register, watch, reset } = useForm({defaultValues: {'collection-selected': []}});

  const [resourceId, setResourceId] = React.useState(null)
  const [collectionsData, setCollectionsData] = React.useState<null | Record<string, any>>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const [selectedProducts, setSelectedProducts] = React.useState(val)

  const fetchData = async () => {
    if(isLoading === false) setIsLoading(true)
    const medusaProducts = await medusaCollectionsRequests.getAllMedusaCollectionsWithStatus()
    setCollectionsData(medusaProducts)
    setIsLoading(false)
  }

  React.useEffect(() => {
    setResourceId(window.location.href.split("/").pop())
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
            {...register('collection-selected')}
            label={formatMessage({
              id: getTrad('collection-input.label')
            })}
            description={''}
            placeholder={formatMessage({
              id: getTrad('collection-input.placeholder')
            })}
            value={selectedProducts}
          >
            {collectionsData?.collections?.map(({ title, id, isAlreadyUsed }) => (
              <Option disabled={isAlreadyUsed && isAlreadyUsed != resourceId } value={id} key={`option_${id}`}>
                {title}
              </Option>
            ))}
          </MultiSelect>
        </div>
      </section>
    </div>
  );
}

export default CollectionSelectorInput
