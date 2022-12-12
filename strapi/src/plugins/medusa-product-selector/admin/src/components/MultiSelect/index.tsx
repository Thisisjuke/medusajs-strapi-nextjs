import * as React from 'react'
import { Select } from '@strapi/design-system'
import { Option } from './Option'
import { useIntl } from 'react-intl'

export const MultiSelect = React.forwardRef((props:any, ref) => {
  const {intlLabel, description, options, placeholder, defaultValue = [], value, onChange, name, setSearchValue} = props
  const { formatMessage } = useIntl()

  return (
    <Select
      //label={formatMessage(intlLabel)}
      ref={ref}
      name={name}
      label={'yooo'}
      error={''}
      disabled={false}
      hint={description && formatMessage(description)}
      placeholder={placeholder}
      onChange={(data) => onChange({ target: { name, value: data} })}
      defaultValue={defaultValue}
      value={value}
      withTags
      multi
    >
      {options?.map(({ title, id }) => (
        <Option disabled value={id} key={`option_${id}`}>
            {title}
        </Option>
      ))}
    </Select>
  )
})
