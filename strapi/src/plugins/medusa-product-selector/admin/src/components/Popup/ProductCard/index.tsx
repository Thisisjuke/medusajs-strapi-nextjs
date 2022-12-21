import * as React from 'react';
import styled from 'styled-components';
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
  disabled?: boolean
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

const StyledCard = styled(Card)`
  height: 100%;
  ${({ disabled, theme }) => disabled && `
    cursor: not-allowed;
    opacity: 80%;
    background-color: ${theme.colors.neutral100};
  `}
`;


export const ProductCard = ({title, subtitle, badge, imageSrc, displayCheck, value, register, defaultChecked, disabled = false }:ProductCardProps) => {
  const additionalProps = () => {
    if(disabled) {
      return {
        onClick: e => {
          e.preventDefault()
          e.stopPropagation()
        },
      }
    } else {
      return register("product-selected")
    }
  }

  return(
    <StyledCard disabled={disabled}>
      <CardHeader>
        {imageSrc && <CardAsset style={{pointerEvents: 'none', userSelect: 'none'}} src={imageSrc} />}
        {displayCheck && <input
          {...additionalProps()}
          style={{
            cursor: disabled ? 'not-allowed':'pointer',
            position: "absolute",
            top: '8px',
            left: '8px',
            width: '16px',
            height: '16px',
          }}
          disabled={disabled}
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
    </StyledCard>
  )
}
