import React from 'react'
import {
  Flex,
  FlexProps,
  Heading,
  HStack,
  IconButton,
  useColorMode
} from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

export interface HeaderProps extends FlexProps {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      <Heading as="h1" fontSize="xl">
        ☢️&nbsp; Scintigraphie
      </Heading>
      <HStack as="nav">
        <IconButton
          variant="ghost"
          aria-label={colorMode === 'dark' ? 'Mode Nuit' : 'Mode Jour'}
          icon={colorMode === 'dark' ? <FiMoon /> : <FiSun />}
          isRound
          onMouseDown={toggleColorMode}
        />
      </HStack>
    </Flex>
  )
}
