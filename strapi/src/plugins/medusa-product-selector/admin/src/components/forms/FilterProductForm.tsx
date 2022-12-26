import * as React from "react";
import { useIntl } from 'react-intl'
import {
  TextInput,
  Combobox,
  ComboboxOption,
  Button
} from '@strapi/design-system'
import { useForm, Controller } from "react-hook-form";
import getTrad from "../../utils/getTrad";

export const FilterProductForm = ({collections = [], defaultValues, onSubmit}) => {
  const { formatMessage } = useIntl();
  const { handleSubmit, control } = useForm({ defaultValues });

  return(
    <form style={{display: 'flex', gap: '8px', paddingBottom: '12px'}} >
      <Controller
        name="collectionId"
        control={control}
        render={({ field }) => (
          <Combobox
            {...field}
            aria-label={'collections'}
          >
            {collections?.map(collection => (
              <ComboboxOption key={collection.id} value={collection.id}>{collection.title}</ComboboxOption>
            ))}
          </Combobox>
        )}
      />
      <Controller
        name="searchText"
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            aria-label={"product-searchbar"}
            placeholder={formatMessage({
              id: getTrad('products-input-modal.search-placeholder')
            })}
          />
        )}
      />
      <Button
        size={'L'}
        onClick={() => {
          handleSubmit(onSubmit)();
        }}>
        click
      </Button>
    </form>
  )
}
