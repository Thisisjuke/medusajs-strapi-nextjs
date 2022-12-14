import * as React from 'react'
import { Select } from '@strapi/design-system'
import { Option } from './Option'

export const MultiSelect = React.forwardRef((props:any, ref) => {
  const {label, description, options, placeholder, defaultValue = [], value, onChange, name, setSearchValue} = props

  return (
    <Select
      ref={ref}
      name={name}
      label={label}
      error={''}
      disabled={false}
      hint={description}
      placeholder={placeholder}
      onChange={(data) => onChange({ target: { name, value: data} })}
      defaultValue={defaultValue}
      value={value}
      withTags
      multi
    >
      {options?.map(({ title, id }) => (
        <Option value={id} key={`option_${id}`}>
            {title}
        </Option>
      ))}
    </Select>
  )
})
