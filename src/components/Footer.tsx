import React from 'react'
import { Text, Box, BoxProps } from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'

export interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <Box as="footer" {...props}>
      <Text textAlign="center" fontSize="xs" color="gray.500">
        Projet réalisé par{' '}
        <OutgoingLink href="https://francoisbest.com" textDecor="underline">
          François Best
        </OutgoingLink>
        {' • '}
        <OutgoingLink
          href="https://github.com/franky47/scintigraphie"
          textDecor="underline"
        >
          Code source
        </OutgoingLink>
      </Text>
    </Box>
  )
}
