import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Stack,
  Text
} from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'
import { Header } from 'src/components/Header'
import { Exam } from 'src/defs'
import { TimeInput } from 'src/components/form/TimeInput'
import { Stat } from '@chakra-ui/react'
import { StatLabel } from '@chakra-ui/react'
import { StatNumber } from '@chakra-ui/react'
import { StatHelpText } from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'

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
    return '--'
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
  return dose.toFixed(2)
}

const IndexPage: NextPage = () => {
  const [exam, setExam] = React.useState<Exam | null>(null)
  const [startTime, setStartTime] = React.useState(NaN)
  const [endTime, setEndTime] = React.useState(NaN)
  const [duration, setDuration] = React.useState(NaN)
  const [activity, setActivity] = React.useState(NaN)
  const dose = useDoseCalculator(exam, startTime, endTime, duration, activity)

  const unitProps = {
    userSelect: 'none',
    pr: 2,
    justifyContent: 'flex-end',
    fontSize: 'sm',
    fontStyle: 'italic',
    color: 'gray.500'
  } as const

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
                <Text as="span" ml={1} fontSize="sm" color="gray.500">
                  (<sup>{exam.isotope.exponent}</sup>){exam.isotope.symbol}
                </Text>
              )}
            </FormLabel>
            <TimeInput onChange={setStartTime} />
          </FormControl>
          <FormControl>
            <FormLabel>Activité au moment de l'administration</FormLabel>
            <NumberInput>
              <NumberInputField
                placeholder="0"
                inputmode="decimal"
                onChange={e => setActivity(parseInt(e.target.value))}
              />
              <InputRightElement children="MBq" {...unitProps} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Heure de prise en charge du patient</FormLabel>
            <TimeInput onChange={setEndTime} />
          </FormControl>
          <FormControl>
            <FormLabel>
              Durée de la prise en charge au plus près du patient
            </FormLabel>
            <NumberInput>
              <NumberInputField
                placeholder="0"
                inputmode="decimal"
                onChange={e => setDuration(parseInt(e.target.value))}
              />
              <InputRightElement children="minutes" {...unitProps} />
            </NumberInput>
          </FormControl>
          <Stat>
            <StatLabel fontSize="md">
              Dose cumulée pendant ma prise en charge:
            </StatLabel>
            <StatNumber fontSize="4xl">
              {dose}{' '}
              <Text as="span" fontSize="sm" color="gray.500">
                μSv
              </Text>
            </StatNumber>
            <StatHelpText>à 50cm du patient</StatHelpText>
          </Stat>
          <Box as="footer">
            <Text textAlign="center" fontSize="xs" color="gray.500">
              Projet mené par{' '}
              <OutgoingLink
                href="https://linkedin.com/in/julie-dubar-197466203"
                textDecor="underline"
              >
                Julie Dubar
              </OutgoingLink>
              {' et '}
              <OutgoingLink href="#" textDecor="underline">
                Sarah Vuillez
              </OutgoingLink>
              , réalisé par{' '}
              <OutgoingLink
                href="https://francoisbest.com"
                textDecor="underline"
              >
                François Best
              </OutgoingLink>
              <br />
              Aucune donnée n'est enregistrée •{' '}
              <OutgoingLink
                href="https://github.com/franky47/scintigraphie"
                textDecor="underline"
              >
                Code source
              </OutgoingLink>
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
