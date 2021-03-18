import { Svg } from '@47ng/chakra-next'
import { Box, BoxProps, useColorModeValue, useToken } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

export interface DoseLevelIndicatorProps extends BoxProps {
  valueMicroSv?: number
}

const f = (x: number, a: number) => Math.log(x * a + 1) / Math.log(a + 1)

function useValueMapping(value: number) {
  if (value <= 100) {
    return Math.max(0, value / 100)
  }
  if (value > 50_000) {
    return 2 + (Math.min(100_000, value) - 50_000) / 50_000
  }
  const x = (value - 100) / (50_000 - 100)
  return 1 + f(x, 10)
}

export const DoseLevelIndicator: React.FC<DoseLevelIndicatorProps> = ({
  valueMicroSv = 0,
  ...props
}) => {
  const x = useValueMapping(valueMicroSv)
  const [green, yellow, red] = useColorModeValue(
    useToken('colors', ['green.500', 'yellow.500', 'red.500']),
    useToken('colors', ['green.400', 'yellow.400', 'red.400'])
  )

  return (
    <Box {...props}>
      <Svg
        viewBox="0 0 3 2"
        preserveAspectRatio="none"
        h={6}
        w="100%"
        rounded="sm"
        overflow="visible"
      >
        <rect width="1" height="1" x="0" y="0.5" fill={green} opacity={0.5} />
        <rect width="1" height="1" x="1" y="0.5" fill={yellow} opacity={0.5} />
        <rect width="1" height="1" x="2" y="0.5" fill={red} opacity={0.5} />
        <motion.line
          animate={{
            x
          }}
          y1={0.25}
          y2={1.75}
          strokeWidth="0.01"
          stroke={useColorModeValue('black', 'white')}
        />
      </Svg>
    </Box>
  )
}
