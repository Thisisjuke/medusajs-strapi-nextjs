import * as React from "react";
import { Box, Loader, Button, ContentLayout, EmptyStateLayout, GridLayout } from '@strapi/design-system';
import Modal from 'react-modal';
import { useIntl } from 'react-intl'

import {ClosePopup} from "./ClosePopup";
import {PopupHeader} from "./PopupHeader";
import {FilterProductForm} from "../forms/FilterProductForm";
import {Illo} from "../Illo";
import getTrad from "../../utils/getTrad";
import {ProductCard} from "./ProductCard";
import useSWR from "swr";
import {fetcher} from "../../utils/fetcher";

export const Popup = ({isDetailsVisible, setIsDetailsVisible, selectedProducts, control, setSearch, getValues, register, resourceId, search, totalProducts }) => {
  const { formatMessage } = useIntl();

  const { data:productsData, error:productsError, isLoading:productsIsLoading } = useSWR(['/medusa-product-selector/products/status', search], fetcher)

  return(
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
        content: {padding: 0, height: '95vh', width: '95vw', maxWidth: '1680px', top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',
        }}
      }>
      <Box padding={8} background={"neutral100"} style={{minHeight:'100%'}}>
        <ClosePopup
          closeModal={(e) => {
            document.body.style.overflowY = 'auto'
            setIsDetailsVisible(false)
          }}
        />
        <PopupHeader
          totalProducts={totalProducts}
          selectedProducts={selectedProducts}
          closeModal={(e) => {
            document.body.style.overflowY = 'auto'
            setIsDetailsVisible(false)
          }}
        />
        <Box paddingTop={6} paddingBottom={6}>
          {!productsIsLoading && (
            <FilterProductForm
              totalProducts={productsData?.count}
              control={control}
              onSubmit={() => setSearch(getValues())}
            >
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
                      padding={4}
                      hasRadius
                      background="neutral0"
                      key={product.id}
                      shadow="tableShadow"
                    >
                      <ProductCard
                        title={product.title}
                        subtitle={product.description}
                        value={product.id}
                        register={register}
                        imageSrc={product.thumbnail}
                        disabled={product?.isAlreadyUsed && product?.isAlreadyUsed != resourceId }
                        displayCheck
                      />
                    </Box>
                  ))}
                </GridLayout>
              )}
            </FilterProductForm>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
