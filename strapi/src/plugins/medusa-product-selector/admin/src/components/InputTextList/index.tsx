import * as React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Status, Typography, Flex, TextInput } from '@strapi/design-system'
import getTrad from "../../utils/getTrad";

const CloseIcon = () => (
  <svg width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"></path></svg>
)

const StyledStatus = styled(Status)`
  width: 100%;
  padding: 5px 10px;
`

const StyledEmptyStatus = styled(Status)`
  width: 100%;
  background-color: ${({theme}) => theme.colors.neutral100};
  color: ${({theme}) => theme.colors.neutral600};
  border-color: ${({theme}) => theme.colors.neutral300}
`

export const InputTextList = ({value = [], onChange,...props}) => {
  const { formatMessage } = useIntl();
  const [content, setContent] = React.useState('')
  const [error, setError] = React.useState(null)

  const addValue = (val) => {
    onChange([...value, val])
  }

  const removeValue = (val) => {
    console.log(val)
    const obj = JSON.parse(JSON.stringify(value))
    obj.splice(obj.indexOf(val), 1)
    onChange(obj)
  }

  const handleKeyDown = (event) => {
    setError(null)
    if (event.key === 'Enter') {
      const inputValue = event?.target?.value?.trim()
      try {
        if(value.includes(inputValue)){
          setError(formatMessage({
            id: getTrad('settings-page.webhooks.error-message-used')
          }))
        } else {
          new URL(inputValue);
          addValue(inputValue)
          setContent("")
        }
      } catch (_) {
        setError(formatMessage({
          id: getTrad('settings-page.webhooks.error-message-no-url')
        }))
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
        {value.map((v) => (
          <StyledStatus size={'S'}>
            <Flex justifyContent={'space-between'} style={{width: '100%'}}>
              <Typography>
                {v}
              </Typography>
              <div
                style={{cursor: 'pointer'}}
                onClick={() => removeValue(v)}
              >
                <CloseIcon />
              </div>
            </Flex>
          </StyledStatus>
        ))}
        {value.length === 0 && (
          <StyledEmptyStatus showBullet={false}>
            {formatMessage({
              id: getTrad('settings-page.webhooks.empty')
            })}
          </StyledEmptyStatus>
        )}
      </Flex>
    </>
  )
}
