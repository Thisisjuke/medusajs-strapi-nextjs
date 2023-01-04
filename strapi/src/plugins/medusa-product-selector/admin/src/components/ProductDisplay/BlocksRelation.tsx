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

const PRODUCT_PAGE_URL = '/admin/content-manager/collectionType/plugin::medusa-product-selector.product-page'
const COLLECTION_PAGE_URL = '/admin/content-manager/collectionType/plugin::medusa-product-selector.collection-page'
const EDITORIAL_PAGE_URL = '/admin/content-manager/collectionType/plugin::medusa-product-selector.editorial-page'

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
    <Flex>
      <Loader small>Loading</Loader>
    </Flex>
  )
  return(
    <>
      <Typography as={'p'} style={{margin: '12px 0px 4px 0px'}} >Used in Block(s) inside pages:</Typography>
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
            console.log('yoooooooooooooooooooooooooo',block)
            return (
              <a href={`${EDITORIAL_PAGE_URL}/${block.id}`}>
                <Status style={{marginTop: '8px'}} size={'S'} variant={block?.publishedAt ? 'success' : 'secondary'}
                        showBullet={false}>
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
            Not used in any blocks.
          </Typography>
        </Status>
      )}
    </>
  )
}
