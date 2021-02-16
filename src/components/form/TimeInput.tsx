import React from 'react'
import { Input, InputProps } from '@chakra-ui/react'

export interface TimeInputProps extends Omit<InputProps, 'onChange'> {
  onChange: (time: number) => void
}

export const TimeInput: React.FC<TimeInputProps> = ({ onChange, ...props }) => {
  const _onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.valueAsNumber
      if (Number.isNaN(value)) {
        if (e.target.value.includes(':')) {
          const [hour, minute] = e.target.value.split(':')
          value = (parseInt(hour) * 60 + parseInt(minute)) * 60_000
        } else {
          value = parseInt(e.target.value) * 3600_000
        }
      }
      if (!Number.isNaN(value)) {
        onChange(value)
      }
    },
    [onChange]
  )
  return (
    <Input
      onChange={_onChange}
      type="time"
      inputmode="numeric"
      placeholder="--:--"
      pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
      {...props}
    />
  )
}
