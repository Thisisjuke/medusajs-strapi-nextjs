import * as React from 'react'
import { Select } from '@strapi/design-system'

export const MultiSelect = React.forwardRef((props:any, ref) => {
  const {children, label, description, placeholder, defaultValue = [], value, onChange, name, setSearchValue} = props

  return (
    <Select
      ref={ref}
      name={name}
      label={label}
      disabled={false}
      hint={description}
      placeholder={placeholder}
      onChange={(data) => onChange({ target: { name, value: data} })}
      defaultValue={defaultValue}
      value={value}
      withTags
      multi
    >
      {children}
    </Select>
  )
})
