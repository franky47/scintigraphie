import React from 'react'
import { Text, TextProps } from '@chakra-ui/react'
import { Isotope as IsotopeData } from 'src/defs'

export interface IsotopeProps extends TextProps, IsotopeData {}

export const Isotope: React.FC<IsotopeProps> = ({
  exponent,
  symbol,
  ...props
}) => {
  return (
    <Text as="span" {...props}>
      <sup>{exponent}</sup>
      <Text as="span" fontFamily="mono">
        {symbol}
      </Text>
    </Text>
  )
}
