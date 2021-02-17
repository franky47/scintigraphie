import React from 'react'
import {
  InputRightElement,
  NumberInput,
  NumberInputProps,
  NumberInputField
} from '@chakra-ui/react'

export interface NumericInputProps extends Omit<NumberInputProps, 'onChange'> {
  unit?: string
  onChange: (value: number) => void
}

export const NumericInput: React.FC<NumericInputProps> = ({
  unit,
  onChange,
  ...props
}) => {
  return (
    <NumberInput min={0} {...props}>
      <NumberInputField
        placeholder="0"
        inputMode="decimal"
        onChange={e => onChange(parseInt(e.target.value))}
      />
      {unit && (
        <InputRightElement
          children={unit}
          userSelect="none"
          pr={2}
          justifyContent="flex-end"
          fontSize="sm"
          fontStyle="italic"
          color="gray.500"
        />
      )}
    </NumberInput>
  )
}
