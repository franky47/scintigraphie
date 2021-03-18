import { BoxProps, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { useQueryState } from 'next-usequerystate'
import dynamic from 'next/dynamic'
import React from 'react'
import { Modes } from 'src/components/form/Modes'
import { NumericInput } from 'src/components/form/NumericInput'
import { TimeInput } from 'src/components/form/TimeInput'
import { Isotope } from 'src/components/Isotope'
import { ValueDisplay } from 'src/components/ValueDisplay'
import { Exam } from 'src/defs'
import { useDoseCalculation } from 'src/hooks/useDoseCalculation'
import { DistanceInput } from './form/DistanceInput'
import type { GraphProps } from './Graph'
import { GraphSkeleton } from './GraphSkeleton'

const Graph = dynamic<GraphProps>(
  () =>
    import('src/components/Graph' /* webpackChunkName: "graph" */).then(
      mod => mod.Graph
    ),
  {
    loading: () => <GraphSkeleton />,
    ssr: false
  }
)

// --

export const Calculator: React.FC<BoxProps> = ({ ...props }) => {
  const [exam, setExam] = React.useState<Exam | null>(null)
  const [injectionTime, setInjectionTime] = React.useState(NaN)
  const [startTime, setStartTime] = React.useState(NaN)
  const [duration, setDuration] = React.useState(NaN)
  const [activity, setActivity] = React.useState(NaN)
  const [distance, setDistance] = React.useState(NaN)
  const [showGraph] = useQueryState('showGraph')
  const dose = useDoseCalculation(
    exam,
    injectionTime,
    startTime,
    duration,
    activity,
    distance
  )

  return (
    <Stack spacing={8} {...props}>
      <Modes onExamChange={setExam} />
      <FormControl>
        <FormLabel>
          Heure d'administration du médicament radiopharmaceutique
          {exam && (
            <Isotope {...exam.isotope} ml={1} fontSize="sm" color="gray.500" />
          )}
        </FormLabel>
        <TimeInput onChange={setInjectionTime} />
      </FormControl>
      <FormControl>
        <FormLabel>Activité au moment de l'administration</FormLabel>
        <NumericInput onChange={setActivity} unit="MBq" />
      </FormControl>
      <FormControl>
        <FormLabel>Heure de prise en charge du patient</FormLabel>
        <TimeInput onChange={setStartTime} />
      </FormControl>
      <FormControl>
        <FormLabel>
          Durée de la prise en charge au plus près du patient
        </FormLabel>
        <NumericInput onChange={setDuration} unit="minutes" />
      </FormControl>
      <DistanceInput onChange={setDistance} />
      <ValueDisplay value={dose} distance={distance} />
      {!!showGraph && (
        <Graph
          exam={exam}
          activity={activity}
          injectionTime={injectionTime}
          startTime={startTime}
          duration={duration}
        />
      )}
    </Stack>
  )
}
