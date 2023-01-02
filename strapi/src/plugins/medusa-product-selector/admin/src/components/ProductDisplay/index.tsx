import * as React from 'react';
import {
  Box,
  CarouselInput,
  CarouselSlide,
  CarouselImage,
  Typography,
  Status,
  Divider,
  Grid,
  GridItem
} from '@strapi/design-system'
import styled from 'styled-components';

const ProductImageWrapper = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  height: 9rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Tag = styled.div`
  display: inline-block;
  border: 1px solid ${({theme}) => theme.colors.primary200 };
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 0.8em;
  margin-right: 5px;

  background-color: ${({theme}) => theme.colors.primary100 };
`;

const PAGE_BASE_URL = '/admin/content-manager/collectionType/plugin::medusa-product-selector.page'

const ProductDisplay = ({product}) => {
  const {title, description, thumbnail, images = [], tags = []} = product
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleNext = () => {
    setSelectedIndex(current => current < images.length - 1 ? current + 1 : 0);
  };

  const handlePrevious = () => {
    setSelectedIndex(current => current > 0 ? current - 1 : images.length - 1 );
  };

  console.log(product)

  return (
    <Box padding={8}>
      <Grid gap={4}>
        <GridItem col={9} s={12}>
          <Grid gap={4}>
            <GridItem col={6} s={12}>
            <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
              <Typography as={'p'} style={{marginBottom: '8px', fontSize: '0.8rem'}} fontWeight="semiBold" variant="sigma">Thumbnail:</Typography>
              <ProductImageWrapper>
                <ProductImage src={thumbnail} alt={title} />
              </ProductImageWrapper>
            </Box>
            </GridItem>
            <GridItem col={6} s={12}>
              <Box padding={4} hasRadius background="neutral0" shadow="tableShadow">
                <Typography as={'p'} style={{marginBottom: '8px', fontSize: '0.8rem'}} fontWeight="semiBold" variant="sigma">Pictures:</Typography>
                <CarouselInput
                  selectedSlide={selectedIndex}
                  previousLabel="Previous slide"
                  nextLabel="Next slide"
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  style={{
                    width: 'full',
                  }}>
                  {images.map(picture => (
                    <CarouselSlide>
                      <CarouselImage src={picture.url} />
                    </CarouselSlide>
                  ))}
                </CarouselInput>
              </Box>
            </GridItem>
            <GridItem col={12} s={12}>
              <Box style={{width: '100%'}} padding={6} hasRadius background="neutral0" shadow="tableShadow">
                <Typography as={'p'} style={{marginBottom: '8px', fontSize: '1.4rem'}} fontWeight="semiBold">
                  {title}
                </Typography>
                <Typography as={'p'} style={{marginBottom: '8px', fontSize: '0.8rem'}}>
                  {description}
                </Typography>
                {tags.length > 0 && (
                  <>
                    <Typography as={'p'} style={{marginBottom: '8px', fontSize: '1rem'}}>Tags:</Typography>
                    <div style={{display: 'flex', gap: '8px'}}>
                      {tags.map(tag => <Tag aria-hidden>{tag.value || "❓"}</Tag>)}
                    </div>
                  </>
                )}
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem col={3} s={12}>
          <Box hasRadius background="neutral0" shadow="tableShadow">
            <>
              <Box padding={4}>
                <Typography as={'p'} style={{marginBottom: '2px', fontSize: '0.8rem'}} fontWeight="semiBold" variant="sigma">Related Page</Typography>
                <Typography as={'p'} style={{marginBottom: '6px', fontSize: '0.8rem'}}>
                  Here you can find where this product is used.
                </Typography>
                <Divider/>
                {product && product?.relatedPages?.length > 0 && (
                  <>
                    <Typography as={'p'} style={{margin: '12px 0px 4px 0px'}} >Linked on Page(s):</Typography>
                    {product?.relatedPages.map(page => (
                      <a href={`/admin/content-manager/collectionType/plugin::medusa-product-selector.page/${page.id}`}>
                        <Status variant={page?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                          <Typography>
                            {page.name}
                          </Typography>
                        </Status>
                      </a>
                    ))}
                  </>
                )}
                {product && product?.relatedCollections?.length > 0 && (
                  <>
                    <Typography as={'p'} style={{margin: '12px 0px 4px 0px'}} >Included in Collection(s):</Typography>
                    {product?.relatedCollections.map(collection => (
                      <a href={`/${collection.id}`}>
                        <Status variant={collection?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                          <Typography>
                            {collection.name}
                          </Typography>
                        </Status>
                      </a>
                    ))}
                  </>
                )}
                {(!product?.relatedPages || product?.relatedPages.length === 0) && (!product?.relatedCollections || product?.relatedCollections.length === 0) && (
                  <Status style={{marginTop: '8px'}} variant={'neutral'} showBullet={false}>
                    <Typography>
                      Not related to any pages.
                    </Typography>
                  </Status>
                )}
                {product && product?.relatedBlocks && (
                  <>
                    <Typography as={'p'} style={{margin: '12px 0px 4px 0px'}} >Used in Block(s) inside pages:</Typography>
                    {product?.relatedBlocks?.productPage?.map(block => (
                      <a href={`/admin/content-manager/collectionType/plugin::medusa-product-selector.page/${block.id}`}>
                        <Status variant={block?.publishedAt ? 'success' : 'secondary'} showBullet={false}>
                          <Typography>
                            {block.name}
                          </Typography>
                        </Status>
                      </a>
                    ))}
                  </>
                )}
                {!product?.relatedBlocks && (
                  <Status style={{marginTop: '8px'}} variant={'neutral'} showBullet={false}>
                    <Typography>
                      Not related to any blocks.
                    </Typography>
                  </Status>
                )}
              </Box>
            </>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ProductDisplay;
