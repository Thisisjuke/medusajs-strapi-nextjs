import * as React from "react";
import { Box, Button, Typography, Flex } from '@strapi/design-system';
import { useIntl } from 'react-intl'
import getTrad from "../../../utils/getTrad";

export const PopupHeader = ({ totalProducts, selectedProducts, closeModal }) => {
  const { formatMessage } = useIntl();

  return(
    <>
      <Flex justifyContent="space-between">
        <Flex gap={2}>
            <Typography variant="beta" as="h1" style={{fontSize: '1.8rem'}}>
              {formatMessage({
                id: getTrad('products-input-modal.title')
              })}
            </Typography>
        </Flex>
        <Flex><Box paddingLeft={2}>
          <Button
            onClick={() => {
              closeModal()
            }}
          >
            {formatMessage({
              id: getTrad('products-input-modal.validate-cta')
            })}
          </Button>
        </Box></Flex>
      </Flex>
      <Flex gap={2}>
        <Typography>
          {`${totalProducts} ${formatMessage({id: getTrad('products-input-modal.subtitle')})}`}
        </Typography>
        <Typography>
          <svg style={{marginTop: '6px'}} width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8Z"></path></svg>
        </Typography>
        <Typography>
          {(Array.isArray(selectedProducts) && selectedProducts.length) || 0} {formatMessage({id: getTrad('products-input-modal.products-selected')})}
        </Typography>
      </Flex>
    </>
  )
}
