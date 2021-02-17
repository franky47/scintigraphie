import React from 'react'
import { Text, Box, BoxProps } from '@chakra-ui/react'
import { OutgoingLink } from '@47ng/chakra-next'

export interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <Box as="footer" {...props}>
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
        <OutgoingLink href="https://francoisbest.com" textDecor="underline">
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
  )
}
