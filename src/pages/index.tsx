import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Container, FormControl, FormLabel, Stack } from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'
import { Header } from 'src/components/Header'
import { Exam } from 'src/defs'
import { TimeInput } from 'src/components/form/TimeInput'
import { Isotope } from 'src/components/Isotope'
import { NumericInput } from 'src/components/form/NumericInput'
import { ValueDisplay } from 'src/components/ValueDisplay'
import { Footer } from 'src/components/Footer'

// --

function useDoseCalculator(
  exam: Exam | null,
  startTime: number,
  endTime: number,
  duration: number,
  activity: number
) {
  if (
    !exam ||
    Number.isNaN(startTime) ||
    Number.isNaN(endTime) ||
    Number.isNaN(duration) ||
    Number.isNaN(activity)
  ) {
    return undefined
  }
  const hl = exam.isotope.halfLife
  const deltaT1 = (endTime - startTime) / 3600_000 // ms -> hours
  const ddr = exam.x * activity
  const ddp = ddr * Math.exp((Math.LN2 * deltaT1) / hl)
  const deltaT2 = duration / 60 // minutes -> hours
  const dose =
    (-1 / Math.LN2) * ddp * hl * (Math.exp((-Math.LN2 * deltaT2) / hl) - 1)
  // console.dir({
  //   exam,
  //   hl,
  //   deltaT1,
  //   ddr,
  //   ddp,
  //   deltaT2,
  //   dose
  // })
  return dose
}

// --

const IndexPage: NextPage = () => {
  const [exam, setExam] = React.useState<Exam | null>(null)
  const [startTime, setStartTime] = React.useState(NaN)
  const [endTime, setEndTime] = React.useState(NaN)
  const [duration, setDuration] = React.useState(NaN)
  const [activity, setActivity] = React.useState(NaN)
  const dose = useDoseCalculator(exam, startTime, endTime, duration, activity)

  return (
    <>
      <Head>
        <title>
          Scintigraphie
          {process.env.NODE_ENV === 'development' ? ' [local]' : ''}
        </title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☢️</text></svg>"
        ></link>
      </Head>
      <Container my={4}>
        <Header mb={8} />
        <Stack spacing={8}>
          <Modes onExamChange={setExam} />
          <FormControl>
            <FormLabel>
              Heure d'administration du médicament radiopharmaceutique
              {exam && (
                <Isotope
                  {...exam.isotope}
                  ml={1}
                  fontSize="sm"
                  color="gray.500"
                />
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
          <Footer />
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
