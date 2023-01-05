import * as React from 'react'
import styled from 'styled-components'
import { Status, Typography, Flex, TextInput } from '@strapi/design-system'

const CloseIcon = () => (
  <svg width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path></svg>
)

const StyledStatus = styled(Status)`
  width: 100%;
  padding: 5px 10px;
`

export const InputTextList = ({value = [], onChange,  ...props}) => {
  const [content, setContent] = React.useState('')
  const [error, setError] = React.useState(null)
  const [values, setValues] = React.useState(value)

  const addValue = (val) => {
    console.log(val)
    setValues([
      ...values,
      val
    ])
    onChange(values)
  }

  const removeValue = (val) => {
    const obj = JSON.parse(JSON.stringify(values))
    obj.splice(values.indexOf(val))
    setValues(obj)
    onChange(values)
  }

  const handleKeyDown = (event) => {
    setError(null)
    if (event.key === 'Enter') {
      const inputValue = event?.target?.value
      try {
        if(values.includes(inputValue)){
          setError('This URL already exists.')
        } else {
          new URL(inputValue);
          addValue(inputValue)
          setContent("")
        }
      } catch (e) {
        console.log(e)
        setError('Not a valid URL')
      }
    }
  };

  return(
    <>
      <TextInput
        {...props}
        error={error}
        onChange={e => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        value={content}
      />
      <Flex direction={'column'} gap={2} paddingTop={4}>
        {values.map((value) => (
          <StyledStatus size={'S'}>
            <Flex justifyContent={'space-between'} style={{width: '100%'}}>
              <Typography>
                {value}
              </Typography>
              <div
                style={{cursor: 'pointer'}}
                onClick={() => removeValue(value)}
              >
                <CloseIcon />
              </div>
            </Flex>
          </StyledStatus>
        ))}
      </Flex>
    </>
  )
}
