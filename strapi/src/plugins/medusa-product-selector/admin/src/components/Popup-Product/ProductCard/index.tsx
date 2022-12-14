import * as React from 'react';
import {
  Card,
  CardHeader,
  CardAsset,
  CardBody,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardBadge,
} from '@strapi/design-system'

interface ProductCardProps {
  title?: string
  subtitle?: string
  badge?: string
  imageSrc?: string
  checked?: boolean
  displayCheck?: boolean
  defaultChecked?: boolean
  value?: string
  register?: (...args) => Record<string, any>
}

const Ellipsis = ({children}) => (
  <div style={{
    display: 'table',
    tableLayout: 'fixed',
    width: '100%'
  }}>
  <div style={{
    display: 'table-cell',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }}>{children}</div>
  </div>
)

export const ProductCard = ({title, subtitle, badge, imageSrc, displayCheck, value, register, defaultChecked }:ProductCardProps) => {

  return(
    <Card style={{height: '100%'}}>
      <CardHeader>
        {imageSrc && <CardAsset style={{pointerEvents: 'none', userSelect: 'none'}} src={imageSrc} />}
        {displayCheck && <input
          {...register("product-selected")}
          style={{
            cursor: 'pointer',
            position: "absolute",
            top: '8px',
            left: '8px',
          }}
          key={value}
          type={"checkbox"}
          value={value}
          defaultChecked={defaultChecked}
        />}
      </CardHeader>
      <CardBody>
        <CardContent>
          {title && <CardTitle><Ellipsis>{title.replace( /(<([^>]+)>)/ig, '')}</Ellipsis></CardTitle>}
          {subtitle && <CardSubtitle><Ellipsis>{subtitle.replace( /(<([^>]+)>)/ig, '')}</Ellipsis></CardSubtitle>}
        </CardContent>
        {badge && <CardBadge>{badge}</CardBadge>}
      </CardBody>
    </Card>
  )
}
