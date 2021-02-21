import React from 'react'
import { FormControl, FormLabel, Select, SelectProps } from '@chakra-ui/react'

export interface DistanceInputProps extends Omit<SelectProps, 'onChange'> {
  onChange: (distanceCm: number) => void
}

export const DistanceInput: React.FC<DistanceInputProps> = ({
  onChange,
  ...props
}) => {
  return (
    <FormControl>
      <FormLabel>Distance moyenne entre le soignant et le patient</FormLabel>
      <Select
        placeholder="Choisir une distance"
        onChange={e => onChange(parseInt(e.target.value))}
        {...props}
      >
        <option value={20}>20cm</option>
        <option value={50}>50cm</option>
        <option value={100}>1m</option>
        <option value={200}>2m</option>
      </Select>
    </FormControl>
  )
}
