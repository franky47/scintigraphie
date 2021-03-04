import { Box, BoxProps, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Exam } from 'src/defs'
import { GraphSkeleton, useGraphSkeletonProps } from './GraphSkeleton'

export interface GraphProps extends BoxProps {
  activity: number
  exam: Exam | null
  injectionTime: number
  startTime: number
  duration: number
}

export const Graph: React.FC<GraphProps> = ({
  exam,
  activity,
  injectionTime,
  startTime,
  duration,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { colorMode } = useColorMode()

  React.useEffect(() => {
    const Desmos = require('desmos')
    const calculator = Desmos.GraphingCalculator(ref.current, {
      expressions: false,
      zoomButtons: false,
      settingsMenu: false,
      border: false,
      lockViewport: true,
      xAxisLabel: 't (h)',
      yAxisLabel: 'Activité (MBq)',
      invertedColors: colorMode === 'dark'
    })

    const color =
      colorMode === 'dark' ? Desmos.Colors.BLUE : Desmos.Colors.ORANGE
    const highlight =
      colorMode === 'dark' ? Desmos.Colors.ORANGE : Desmos.Colors.BLUE

    // Variables --
    calculator.setExpression({ id: 'A', latex: 'A=100' }) // Initial activity
    calculator.setExpression({ id: 'B', latex: 'B=-0.1' }) // Exponential factor
    calculator.setExpression({ id: 'ts', latex: 't_s=4' })
    calculator.setExpression({ id: 'd', latex: 'd=1' })
    calculator.setExpression({ id: 'te', latex: 't_e=t_s+d' })

    // Points --
    const labelOptions = {
      showLabel: true,
      labelSize: Desmos.LabelSizes.SMALL,
      pointStyle: Desmos.Styles.OPEN,
      dragMode: Desmos.DragModes.NONE
    }
    calculator.setExpression({
      id: 'initialActivityPoint',
      latex: '(0, A)',
      label: "Activité à l'injection",
      labelOrientation: Desmos.LabelOrientations.RIGHT,
      ...labelOptions,
      color
    })
    calculator.setExpression({
      id: 'injectionPoint',
      latex: '(0, 0)',
      label: 'Injection',
      labelOrientation:
        Desmos.LabelOrientations.BOTTOM | Desmos.LabelOrientations.RIGHT,
      ...labelOptions,
      color: highlight
    })
    calculator.setExpression({
      id: 'startPEC',
      latex: '(t_s, 0)',
      label: 'Début de PEC',
      labelOrientation:
        Desmos.LabelOrientations.TOP | Desmos.LabelOrientations.LEFT,
      ...labelOptions,
      color: highlight
    })
    calculator.setExpression({
      id: 'endPEC',
      latex: '(t_e, 0)',
      label: 'Fin de PEC',
      labelOrientation:
        Desmos.LabelOrientations.TOP | Desmos.LabelOrientations.RIGHT,
      ...labelOptions,
      color: highlight
    })

    // Lines --
    calculator.setExpression({
      id: 'tsLine',
      latex: 'x=t_s \\{0<y<f(t_s)\\}',
      color: highlight,
      lineStyle: Desmos.Styles.DASHED
    })
    calculator.setExpression({
      id: 'teLine',
      latex: 'x=t_e \\{0<y<f(t_e)\\}',
      color: highlight,
      lineStyle: Desmos.Styles.DASHED
    })

    // Curves --
    calculator.setExpression({
      id: 'activityCurve',
      latex: 'f(x)=A*\\exp(x*B)\\{0<=x\\}',
      color
    })
    calculator.setExpression({
      id: 'integral',
      latex: '0<y<f\\left(x\\right)\\left\\{t_s<x<t_e\\right\\}',
      color: highlight,
      lineStyle: Desmos.Styles.SOLID,
      fillOpacity: 0.2,
      hidden: false
    })

    // Values & bounds --
    if (
      !!exam &&
      !Number.isNaN(activity) &&
      !Number.isNaN(injectionTime) &&
      !Number.isNaN(startTime) &&
      !Number.isNaN(duration)
    ) {
      const offset = startTime < injectionTime ? 24 * 60 * 60 * 1000 : 0
      const t0 = injectionTime / 3600_000
      const t1 = (startTime + offset) / 3600_000
      const t2 = t1 + duration / 60
      const ts = t1 - t0
      const te = t2 - t0

      calculator.setExpression({ id: 'A', latex: `A=${activity}` })
      calculator.setExpression({
        id: 'B',
        latex: `B=${-Math.LN2 / exam.isotope.halfLife}`
      })
      calculator.setExpression({
        id: 'ts',
        latex: `t_s=${ts}`
      })
      calculator.setExpression({ id: 'd', latex: `d=${duration / 60}` })
      calculator.setMathBounds({
        left: -te * 0.25,
        bottom: activity * -0.1,
        right: te * 2,
        top: activity * 1.1
      })
    }

    return () => {
      calculator.destroy()
    }
  }, [colorMode, exam, activity, injectionTime, startTime, duration])

  const show =
    !!exam &&
    !Number.isNaN(activity) &&
    !Number.isNaN(injectionTime) &&
    !Number.isNaN(startTime) &&
    !Number.isNaN(duration)

  const boxProps = useGraphSkeletonProps()

  return (
    <>
      <Box d={show ? 'block' : 'none'} {...boxProps} {...props} ref={ref} />
      <GraphSkeleton d={show ? 'none' : 'flex'} />
    </>
  )
}
