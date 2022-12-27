import * as React from "react";
import { useIntl } from 'react-intl'
import {
  TextInput,
  Combobox,
  ComboboxOption,
  Button
} from '@strapi/design-system'
import { Controller } from "react-hook-form";
import getTrad from "../../utils/getTrad";
import Pagination from "../Pagination";

const SearchIcon = () => (
  <svg style={{width: '16px', height: '16px', marginTop: '4px'}} viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"></path></svg>
)

export const FilterProductForm = ({children, onSubmit, collections = [], control, totalProducts = 0}) => {
  const { formatMessage } = useIntl();

  return(
    <form>
    <div style={{display: 'flex', gap: '8px', paddingBottom: '12px'}} >
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
        onClick={onSubmit}
      >
        <SearchIcon />
      </Button>
    </div>
      <Controller
        name="page"
        control={control}
        render={({ field }) => (
          <Pagination {...field} total={totalProducts} limit={12} />
        )}
      />
      <div style={{marginTop: '12px', marginBottom: '12px'}}>
        {children}
      </div>
      <Controller
        name="page"
        control={control}
        render={({ field }) => (
          <Pagination {...field} total={totalProducts} limit={12} />
        )}
      />
    </form>
  )
}
