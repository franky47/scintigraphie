import {
  Box,
  BoxProps,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import React from 'react'
import { DoseLevelIndicator } from './DoseLevelIndicator'

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
  if (i > units.length) {
  }
  return {
    unit: i > units.length ? `1e${(i - units.length) * 3}Sv` : units[i],
    value: v
  }
}

function useColor(value: number | undefined) {
  return value === undefined
    ? 'gray'
    : value > 50_000
    ? 'red'
    : value > 100
    ? 'yellow'
    : 'green'
}

function useEquivalentThreshold(value: number | undefined) {
  if (value === undefined) {
    return undefined
  }
  if (value <= 6.57) {
    return '1 jour d’exposition naturelle = 6,57µSv en moyenne en France métropolitaine'
  }
  if (value <= 50) {
    return 'Vol Paris – New York ou radiographie des poumons = 50 µSv'
  }
  if (value <= 100) {
    return 'Vol aller-retour Paris New York = 100 µSv'
  }
  if (value <= 10_000) {
    return 'Scanner abdominal = 10 mSv'
  }
  if (value <= 50_000) {
    return 'Seuil de sur-risque de cancer incertain pour une exposition aïgue = 50 mSv'
  }
  return 'Seuil de sur-risque de cancer certain pour une exposition aïgue = 100 mSv'
}

// --

export const ValueDisplay: React.FC<ValueDisplayProps> = ({
  value: valueMicroSv,
  distance,
  ...props
}) => {
  const accent = useColor(valueMicroSv)
  const { value, unit } = useUnit(valueMicroSv)
  const eqThreshold = useEquivalentThreshold(valueMicroSv)
  const joursExp =
    valueMicroSv === undefined ? valueMicroSv : valueMicroSv / 6.57
  const cigarettes =
    valueMicroSv === undefined ? valueMicroSv : valueMicroSv / 7.3

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
            color={useColorModeValue(`${accent}.600`, `${accent}.300`)}
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
      {!!eqThreshold && (
        <Box>
          <DoseLevelIndicator valueMicroSv={valueMicroSv} />
          <Text mt={2} mb={8} fontSize="sm" opacity={0.8}>
            {eqThreshold}
          </Text>
        </Box>
      )}
      <StatGroup>
        <Stat>
          <StatLabel fontSize="sm">Equivalent à</StatLabel>
          <StatNumber
            sx={{
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            <AnimatedValue value={joursExp} />{' '}
          </StatNumber>
          <StatHelpText>
            Jour{(joursExp ?? 2) > 1 ? 's' : ''} d’exposition naturelle{' '}
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
              value={cigarettes}
              formatter={value =>
                value === undefined
                  ? '--'
                  : value > 5
                  ? Math.round(value).toFixed()
                  : value.toFixed(2)
              }
            />{' '}
          </StatNumber>
          <StatHelpText>
            Cigarette{(cigarettes ?? 2) >= 2 ? 's' : ''} fumée
            {(cigarettes ?? 2) >= 2 ? 's' : ''}
          </StatHelpText>
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
