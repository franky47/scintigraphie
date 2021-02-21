import React from 'react'
import { BoxProps, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'
import { Exam } from 'src/defs'
import { TimeInput } from 'src/components/form/TimeInput'
import { Isotope } from 'src/components/Isotope'
import { NumericInput } from 'src/components/form/NumericInput'
import { ValueDisplay } from 'src/components/ValueDisplay'
import { Graph } from 'src/components/Graph'
import { useDoseCalculation } from 'src/hooks/useDoseCalculation'
import { DistanceInput } from './form/DistanceInput'

// --

export const Calculator: React.FC<BoxProps> = ({ ...props }) => {
  const [exam, setExam] = React.useState<Exam | null>(null)
  const [injectionTime, setInjectionTime] = React.useState(NaN)
  const [startTime, setStartTime] = React.useState(NaN)
  const [duration, setDuration] = React.useState(NaN)
  const [activity, setActivity] = React.useState(NaN)
  const [distance, setDistance] = React.useState(NaN)
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
      <Graph
        exam={exam}
        activity={activity}
        injectionTime={injectionTime}
        startTime={startTime}
        duration={duration}
      />
    </Stack>
  )
}
