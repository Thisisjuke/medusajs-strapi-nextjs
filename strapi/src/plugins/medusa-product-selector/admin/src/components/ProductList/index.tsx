import * as React from 'react';
import {
  Box,
  GridLayout,
} from '@strapi/design-system'

export const ProductList = ({children}) => {

  return(
    <GridLayout>
      {React.Children.map(children, (child, idx) => (
        <Box padding={4} hasRadius background="neutral0" key={`box-${idx}`} shadow="tableShadow">
          {child}
        </Box>
      ))}
    </GridLayout>
  )
}
