import React from 'react'
import { BoxProps, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'
import { Exam } from 'src/defs'
import { TimeInput } from 'src/components/form/TimeInput'
import { Isotope } from 'src/components/Isotope'
import { NumericInput } from 'src/components/form/NumericInput'
import { ValueDisplay } from 'src/components/ValueDisplay'
import { useDoseCalculation } from 'src/hooks/useDoseCalculation'

// --

export const Calculator: React.FC<BoxProps> = ({ ...props }) => {
  const [exam, setExam] = React.useState<Exam | null>(null)
  const [startTime, setStartTime] = React.useState(NaN)
  const [endTime, setEndTime] = React.useState(NaN)
  const [duration, setDuration] = React.useState(NaN)
  const [activity, setActivity] = React.useState(NaN)
  const dose = useDoseCalculation(exam, startTime, endTime, duration, activity)

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
        <TimeInput onChange={setStartTime} />
      </FormControl>
      <FormControl>
        <FormLabel>Activité au moment de l'administration</FormLabel>
        <NumericInput onChange={setActivity} unit="MBq" />
      </FormControl>
      <FormControl>
        <FormLabel>Heure de prise en charge du patient</FormLabel>
        <TimeInput onChange={setEndTime} />
      </FormControl>
      <FormControl>
        <FormLabel>
          Durée de la prise en charge au plus près du patient
        </FormLabel>
        <NumericInput onChange={setDuration} unit="minutes" />
      </FormControl>
      <ValueDisplay value={dose} />
    </Stack>
  )
}
