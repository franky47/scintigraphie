import React from 'react'
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  StackProps
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

export interface ModesProps extends StackProps {}

export const Modes: React.FC<ModesProps> = ({ ...props }) => {
  const [mode, setMode] = React.useState('')
  const [osseuse, setOsseuse] = React.useState('')
  const [thyroide, setThyroide] = React.useState('')
  const [cardiaque, setCardiaque] = React.useState('')
  const [tep, setTep] = React.useState('')
  const [aJeun, setAJeun] = React.useState('')
  return (
    <Stack spacing={4} {...props}>
      <FormControl>
        <FormLabel>Quelle scintigraphie a fait mon patient ?</FormLabel>
        <Select value={mode} onChange={e => setMode(e.target.value)}>
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
            <b>il y a plus de 4 heures</b> avant le début de la prise en charge
            ?
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
      {mode === 'thyroide' && (
        <FormControl>
          <RadioGroup value={thyroide} onChange={setThyroide as any}>
            <Stack>
              <Radio value="iode123">A l'iode 123</Radio>
              <Radio value="technetium">Au Technétium libre</Radio>
              <Radio value="unknown">Je ne sais pas</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )}
      {mode === 'cardiaque' && (
        <FormControl>
          <RadioGroup value={cardiaque} onChange={setCardiaque as any}>
            <Stack>
              <Radio value="mibi">MIBI</Radio>
              <Radio value="tl201">
                Tl<sup>201</sup>
              </Radio>
              <Radio value="unknown">Je ne sais pas</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )}
      {mode === 'tep' && (
        <>
          <FormControl>
            <RadioGroup value={tep} onChange={setTep as any}>
              <Stack>
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
              <FormLabel>
                Le patient devait-il être à jeun avant son examen ?
              </FormLabel>
              <RadioGroup value={aJeun} onChange={setAJeun as any}>
                <Stack>
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
