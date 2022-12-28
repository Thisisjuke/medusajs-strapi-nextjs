import * as React from 'react'
import ReactSelect from 'react-select';
import styled from 'styled-components'

const StyledSelect = styled(ReactSelect)`
  width: 400px;
  cursor: pointer;
`

export const Select = ({options = [], isLoading, name, onChange, onBlur, value, placeholder}) => {

  return(
    <StyledSelect
      className="basic-single"
      classNamePrefix="select"
      isLoading={isLoading}
      isClearable={true}
      isSearchable={true}
      name={name}
      options={options}
      onChange={e => onChange(e?.value || null)}
      onBlur={e => onBlur(e?.value || null)}
      placeholder={placeholder}
      value={options?.find((option = {}) => option?.value === value) || null}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#4945ff',
        },
      })}
    />
  )
}
