import React from 'react'
import {
  Text,
  BoxProps,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
  Stack,
  StatGroup
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

function useUnit(value: number | undefined) {
  if (value === undefined) {
    return {
      value: undefined,
      unit: 'μSv'
    }
  }

  let v = value
  const units = [
    'μSv',
    'mSv',
    'Sv',
    'kSv',
    'MSv. Vous êtes mort.',
    'GSv. Rest in peace',
    'TSv. Sérieux ?',
    'YSv. Non, là ça suffit.'
  ]
  let i = 0
  while (v > 1000) {
    v *= 0.001
    i += 1
  }
  return {
    unit: units[i],
    value: v
  }
}

function useColor(value: number | undefined) {
  return value === undefined
    ? 'gray'
    : value > 500_000
    ? 'red'
    : value > 100
    ? 'yellow'
    : 'green'
}

export const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value: valueMicroSv,
  distance,
  ...props
}) => {
  const accent = useColor(valueMicroSv)
  const { value, unit } = useUnit(valueMicroSv)
  return (
    <Stack {...props}>
      <Stat>
        <StatLabel fontSize="md">
          Dose cumulée pendant ma prise en charge:
        </StatLabel>
        <StatNumber
          fontSize="4xl"
          sx={{
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          <Text
            as="span"
            color={useColorModeValue(`${accent}.800`, `${accent}.300`)}
          >
            <AnimatedValue value={value} />{' '}
          </Text>
          <Text as="span" fontSize="sm" color="gray.500">
            {unit}
          </Text>
        </StatNumber>
        {!!distance && !!value && (
          <StatHelpText>à {distance}cm du patient</StatHelpText>
        )}
      </Stat>
      <StatGroup>
        <Stat>
          <StatLabel fontSize="sm">Equivalent à</StatLabel>
          <StatNumber
            sx={{
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            <AnimatedValue
              value={
                valueMicroSv === undefined ? valueMicroSv : valueMicroSv / 6.57
              }
            />{' '}
          </StatNumber>
          <StatHelpText>
            Jour(s) d’exposition naturelle{' '}
            <small>
              <em>(rayonnement cosmique, tellurique ect)</em>
            </small>
          </StatHelpText>
        </Stat>
        <Stat>
          <StatLabel fontSize="sm">&nbsp;</StatLabel>
          <StatNumber
            sx={{
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            <AnimatedValue
              value={
                valueMicroSv === undefined ? valueMicroSv : valueMicroSv / 7.3
              }
              formatter={value =>
                value === undefined ? '--' : Math.ceil(value).toFixed()
              }
            />{' '}
          </StatNumber>
          <StatHelpText>Cigarettes fumées</StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  )
}

// --

const AnimatedValue: React.FC<{
  value: number | undefined
  formatter?: typeof formatValue
}> = ({ value, formatter = formatValue }) => {
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
    () => animatedValue.onChange(latest => setText(formatter(latest))),
    []
  )
  return (
    <>{value === undefined ? '--' : reduceMotion ? formatter(value) : text}</>
  )
}
