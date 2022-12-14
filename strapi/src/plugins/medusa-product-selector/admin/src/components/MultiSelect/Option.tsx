import * as React from 'react';
import styled from 'styled-components';
import { Box, Typography, Flex } from '@strapi/design-system';
// @ts-ignore
import checkmarkIcon from './checkmarkIcon.svg';

const CheckMark = styled.div`
  border: 1px solid ${({ theme, selected, indeterminate, disabled }) => {
    if(disabled){
      return theme.colors.neutral300
    }
    return selected || indeterminate ? theme.colors.primary600 : theme.colors.neutral300
  }};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 18px;
  width: 18px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  ${({ theme, indeterminate }) =>
  indeterminate &&
  `&::after {
      content: '';
      display: block;
      position: relative;
      color: white;
      height: 2px;
      width: 10px;
      background-color: ${theme.colors.primary600};
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  `}
  ${({ theme, selected, disabled }) =>
  selected &&
  `&::after {
      content: '';
      background: url('${ checkmarkIcon }') no-repeat no-repeat center center;
      background-color: ${disabled ? theme.colors.neutral300 : theme.colors.primary600};
      width: 100%;
      height: 100%;
      position: absolute;
  }`}
`;

const OptionBox = styled(Box)`
  width: 100%;
  border: none;
  text-align: left;
  outline-offset: -3px;
  background-color: ${({theme, disabled}) => disabled && theme.colors.neutral100};
  cursor:  ${props => props.disabled ? 'not-allowed' : 'pointer'};
  &.is-focused {
    background: ${({ theme }) => theme.colors.primary100};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.primary100};
  }
`;

export const Option = ({ selected, indeterminate, children, value, multi, isChild, startIcon, disabled = false, ...props}:any) => {
  const optionRef = React.useRef(null);

  const additionalProps = () => {
    if(disabled) {
      return {
        onClick: e => {
          e.preventDefault()
          e.stopPropagation()
        },
      }
    } else {
      return props
    }
  }

  return (
    <OptionBox
      as="li"
      hasRadius
      paddingLeft={isChild ? 7 : 4}
      paddingRight={4}
      paddingTop={2}
      paddingBottom={2}
      ref={optionRef}
      role="option"
      aria-selected={selected}
      data-strapi-value={value}
      disabled={disabled}
      {...additionalProps()}
    >
      <Flex>
        {startIcon && (
          <Box paddingRight={2} aria-hidden>
            {startIcon}
          </Box>
        )}

        {multi && (
          <Box paddingRight={2} aria-hidden>
            <CheckMark disabled={disabled} selected={selected} indeterminate={indeterminate} />
          </Box>
        )}
        <Typography textColor={selected ? disabled ? 'neutral600' : 'primary600' : disabled ? 'neutral600' : 'neutral800' } fontWeight={selected ? 'bold' : null}>
          {children}
        </Typography>
      </Flex>
    </OptionBox>
  );
};
