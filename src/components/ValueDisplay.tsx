import React from 'react'
import {
  Text,
  BoxProps,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react'
import { useSpring, useReducedMotion, useMotionValue } from 'framer-motion'

export interface ValueDisplayProps extends BoxProps {
  value?: number
  distance?: number
}

const formatter = Intl.NumberFormat('fr-FR', {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2
})

function formatValue(value: number | undefined) {
  return value !== undefined ? formatter.format(value) : '--'
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value,
  distance,
  ...props
}) => {
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
        <AnimatedValue value={value} />{' '}
        <Text as="span" fontSize="sm" color="gray.500">
          μSv
        </Text>
      </StatNumber>
      {!!distance && !!value && (
        <StatHelpText>à {distance}cm du patient</StatHelpText>
      )}
    </Stat>
  )
}

// --

const AnimatedValue: React.FC<{ value: number | undefined }> = ({ value }) => {
  const motionized = useMotionValue(value)
  const animatedValue = useSpring(motionized)
  const reduceMotion = useReducedMotion()
  const [text, setText] = React.useState('--')
  React.useEffect(() => {
    if (value !== undefined) {
      return animatedValue.set(value)
    }
  }, [value])
  React.useEffect(
    () => animatedValue.onChange(latest => setText(formatValue(latest))),
    []
  )
  return (
    <>{value === undefined ? '--' : reduceMotion ? formatValue(value) : text}</>
  )
}
