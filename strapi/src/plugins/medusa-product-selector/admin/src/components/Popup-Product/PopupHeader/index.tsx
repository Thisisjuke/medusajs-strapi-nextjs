import * as React from "react";
import { Box, HeaderLayout, Button, ActionLayout, Typography, TextInput, ContentLayout } from '@strapi/design-system';

const ReloadIcon = () => (
  <svg viewBox="0 0 24 24"><path fill="currentColor" d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z"></path></svg>
)

export const PopupHeader = ({productsData, refetch, setSearch, resetForm, selectedProducts, closeModal }) => {

  return(
    <>
    <HeaderLayout
      primaryAction={
        <Button
          variant={'secondary'}
          onClick={() => refetch()}
          startIcon={<ReloadIcon/>}
        >
          Refetch Products
        </Button>
      }
      title={"Select products"}
      subtitle={`${productsData?.products.length} Products found`} as="h2"
    />
  <ActionLayout
    startActions={
    <div style={{display: 'flex', gap: '8px'}} >
      <TextInput
        name={"product-searchbar"}
        aria-label={"product-searchbar"}
        onChange={e => {
          setSearch(e.target.value)
        }}
        placeholder="e.g: my super product"
      />
      <Button
        variant={"danger-light"}
        size={'L'}
        onClick={() => {
          resetForm();
          setSearch('')
        }}
      >
        Clear Selection
      </Button>
    </div>

    }
    endActions={
      <Button
        size={'L'}
        onClick={() => {
          closeModal()
        }}
      >
        Validate
      </Button>
    }
  />
  <ContentLayout>
    <Box paddingTop={0} paddingBottom={4}>
      <Typography>{(Array.isArray(selectedProducts) && selectedProducts.length) || 0} product(s) selected.</Typography>
    </Box>
  </ContentLayout>
    </>
  )
}
