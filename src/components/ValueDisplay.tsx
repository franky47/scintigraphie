import React from 'react'
import {
  Text,
  BoxProps,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react'

export interface ValueDisplayProps extends BoxProps {
  value?: number
}

const formatter = Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 2
})

export const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  ...props
}) => {
  const text = value !== undefined ? formatter.format(value) : '--'
  return (
    <Stat {...props}>
      <StatLabel fontSize="md">
        Dose cumulée pendant ma prise en charge:
      </StatLabel>
      <StatNumber
        fontSize="4xl"
        sx={{
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {text}{' '}
        <Text as="span" fontSize="sm" color="gray.500">
          μSv
        </Text>
      </StatNumber>
      <StatHelpText>à 50cm du patient</StatHelpText>
    </Stat>
  )
}
