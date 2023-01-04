import * as React from "react";
import { useIntl } from 'react-intl'
import {
  Alert,
  Typography,
  Status,
  Flex,
  Loader,
} from '@strapi/design-system'
import useSWR from "swr";
import {fetcher} from "../../utils/fetcher";
import getTrad from "../../utils/getTrad";
import config from "../../config";

const {PRODUCT_PAGE_URL, COLLECTION_PAGE_URL, EDITORIAL_PAGE_URL, TEMPLATE_URL} = config

export const BlocksRelation = ({product}) => {
  const { formatMessage } = useIntl();
  const { data, error, isLoading } = useSWR(['/medusa-product-selector/product/blocks', {id: product?.id}], fetcher)

  if(error) return (
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

  if(isLoading) return (
    <>
      <Typography as={'p'} style={{margin: '12px 0px 4px 0px'}} >
        {formatMessage({
          id: getTrad('products-input-modal.related.subtitle')
        })}
      </Typography>
      <Flex justifyContent="center">
        <Loader small>Loading</Loader>
      </Flex>
    </>
  )
  return(
    <>
      <Typography as={'p'} style={{margin: '12px 0px 4px 0px'}} >
        {formatMessage({
          id: getTrad('products-input-modal.related.has-block-relation')
        })}
      </Typography>
      {data && (
        <>
          {data?.productPage?.map(block => (
            <a href={`${PRODUCT_PAGE_URL}/${block.id}`}>
              <Status style={{marginTop: '8px'}} size={'S'} variant={block?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                <Typography>
                  {block.name}
                </Typography>
              </Status>
            </a>
          ))}
          {data?.collectionPage?.map(block => (
            <a href={`${COLLECTION_PAGE_URL}/${block.id}`}>
              <Status style={{marginTop: '8px'}} size={'S'} variant={block?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                <Typography>
                  {block.name}
                </Typography>
              </Status>
            </a>
          ))}
          {data?.editorialPage?.map(block => {
            return (
              <a href={`${EDITORIAL_PAGE_URL}/${block.id}`}>
                <Status style={{marginTop: '8px'}} size={'S'} variant={block?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                  <Typography>
                    {block.name}
                  </Typography>
                </Status>
              </a>
            );
          })}
          {data?.templates?.map(block => {
            return (
              <a href={`${TEMPLATE_URL}/${block.id}`}>
                <Status style={{marginTop: '8px'}} size={'S'} variant={block?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                  <Typography>
                    {block.name}
                  </Typography>
                </Status>
              </a>
            );
          })}
        </>
      )}
      {Object.values(data).every(val => Array.isArray(val) && val.length === 0) && (
        <Status style={{marginTop: '8px'}} variant={'neutral'} showBullet={false}>
          <Typography>
            {formatMessage({
              id: getTrad('products-input-modal.related.empty-block-relation')
            })}
          </Typography>
        </Status>
      )}
    </>
  )
}
