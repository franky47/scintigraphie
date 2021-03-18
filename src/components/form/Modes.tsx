import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  Stack,
  StackProps,
  useBreakpointValue
} from '@chakra-ui/react'
import React from 'react'
import { Exam, exams } from 'src/defs'

export interface ModesProps extends StackProps {
  onExamChange: (exam: Exam | null) => void
}

export const Modes: React.FC<ModesProps> = ({ onExamChange, ...props }) => {
  const [mode, setMode] = React.useState('')
  const [osseuse, setOsseuse] = React.useState('')
  // const [thyroide, setThyroide] = React.useState('')
  // const [cardiaque, setCardiaque] = React.useState('')
  const [tep, setTep] = React.useState('')
  const [aJeun, setAJeun] = React.useState('')
  const radioSpacing = useBreakpointValue({ base: 4, sm: 2 })

  React.useEffect(() => {
    let exam: Exam | null = null
    if (mode === 'osseuse') {
      exam = osseuse === 'tardive' ? exams.osseuseTardive : exams.osseusePrecoce
    } else if (mode === 'parathyroides') {
      exam = exams.parathyroide
    } else if (mode === 'thyroide') {
      exam = exams.thyroideTechnetiumLibre
      // if (thyroide === 'iode123') {
      //   exam = exams.thyroideIode
      // } else if (thyroide === 'technetium') {
      //   exam = exams.thyroideTechnetiumLibre
      // }
    } else if (mode === 'fevg') {
      exam = exams.fractionEjectionVentriculaireGauche
    } else if (mode === 'cardiaque') {
      exam = exams.cardiologieThallium
      // if (cardiaque === 'mibi') {
      //   exam = exams.cardiologieMIBI
      // } else if (cardiaque === 'tl201') {
      //   exam = exams.cardiologieThallium
      // }
    } else if (mode === 'tep') {
      switch (tep) {
        case 'ffdg':
          exam = exams.fdg
          break
        case 'fcholine':
          exam = exams.choline
          break
        case 'dotatoc':
          exam = exams.dotatoc
          break
        case 'psma':
          exam = exams.psma
          break
        case 'unknown':
          if (aJeun === 'yes') {
            exam = exams.fdg
          }
          break
      }
    }
    onExamChange(exam)
  }, [mode, osseuse, tep, aJeun, onExamChange])

  return (
    <Stack spacing={4} {...props}>
      <FormControl>
        <FormLabel>Quelle scintigraphie a fait mon patient ?</FormLabel>
        <Select
          value={mode}
          onChange={e => setMode(e.target.value)}
          placeholder={mode ? undefined : 'Choisir un type de scintigraphie'}
        >
          <option value="osseuse">Osseuse</option>
          <option value="parathyroides">Parathyroïdes</option>
          <option value="thyroide">Thyroïde</option>
          <option value="fevg">Fraction d’éjection ventriculaire gauche</option>
          <option value="cardiaque">Cardiaque</option>
          <option value="tep">TEP scan</option>
        </Select>
      </FormControl>
      {mode === 'osseuse' && (
        <FormControl>
          <FormLabel>
            L’injection du radioisotope a t-elle été faite{' '}
            <b>plus de 4 heures avant</b> le début de la prise en charge ?
          </FormLabel>
          <RadioGroup value={osseuse} onChange={setOsseuse as any}>
            <Stack>
              <Radio value="tardive">Oui</Radio>
              <Radio value="precoce">Non</Radio>
              <Radio value="unknown">Je ne sais pas</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )}
      {/* {mode === 'thyroide' && (
        <FormControl>
          <RadioGroup value={thyroide} onChange={setThyroide as any}>
            <Stack spacing={radioSpacing}>
              <Radio value="iode123">A l'iode 123</Radio>
              <Radio value="technetium">Au Technétium libre</Radio>
              <Radio value="unknown">Je ne sais pas</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )} */}
      {/* {mode === 'cardiaque' && (
        <FormControl>
          <RadioGroup value={cardiaque} onChange={setCardiaque as any}>
            <Stack spacing={radioSpacing}>
              <Radio value="mibi">MIBI</Radio>
              <Radio value="tl201">
                Tl<sup>201</sup>
              </Radio>
              <Radio value="unknown">Je ne sais pas</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )} */}
      {mode === 'tep' && (
        <>
          <FormControl>
            <RadioGroup value={tep} onChange={setTep as any}>
              <Stack spacing={radioSpacing}>
                <Radio value="ffdg">
                  <sup>18</sup>FFDG
                </Radio>
                <Radio value="fcholine">
                  <sup>18</sup>FCholine
                </Radio>
                <Radio value="dotatoc">Dotatoc</Radio>
                <Radio value="psma">PSMA</Radio>
                <Radio value="unknown">Je ne sais pas</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          {tep === 'unknown' && (
            <FormControl id="modes-tep-jeun">
              <FormLabel mt={4}>
                Le patient devait-il être à jeun avant son examen ?
              </FormLabel>
              <RadioGroup value={aJeun} onChange={setAJeun as any}>
                <Stack spacing={radioSpacing}>
                  <Radio value="yes">Oui</Radio>
                  <Radio value="no">Non</Radio>
                  <Radio value="unknown">Je ne sais pas</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          )}
        </>
      )}
    </Stack>
  )
}
