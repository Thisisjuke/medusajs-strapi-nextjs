import * as React from 'react';
import {
  Card,
  CardHeader,
  CardAsset,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardBadge
} from '@strapi/design-system'

interface ProductCardProps {
  title?: string
  subtitle?: string
  badge?: string
  imageSrc?: string
}

export const ProductCard = ({title, subtitle, badge, imageSrc}:ProductCardProps) => {

  return(
    <Card id="third">
      <CardHeader>
        {imageSrc && <CardAsset>{imageSrc}</CardAsset>}
      </CardHeader>
      <CardBody>
        <CardContent>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardContent>
        {badge && <CardBadge>{badge}</CardBadge>}
      </CardBody>
    </Card>
  )
}
