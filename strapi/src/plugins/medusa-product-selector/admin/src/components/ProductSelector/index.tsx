import * as React from 'react';
import { TextInput } from '@strapi/design-system';

const ProductSelector = (props) => {
  console.log('myfirstfield', props);

  const {
    name,
    value,
    attribute,
    onChange,
  } = props;

  const {
    placeholder,
    label,
    hint,
  } = attribute.customFieldConfig || {};

  return (
    <>
      <TextInput
        id={name}
        placeholder={placeholder}
        label={label || name}
        name={name}
        hint={hint}
        onChange={e => {
          const arg = {
            target: {
              name,
              value: e.target.value,
            },
          }
          onChange(arg);
        }}
        value={value}
      />
    </>
  );
}

export default ProductSelector
