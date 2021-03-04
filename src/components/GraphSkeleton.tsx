import { BoxProps, Center, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export function useGraphSkeletonProps() {
  return {
    h: '300px',
    bg: useColorModeValue('white', 'black'),
    rounded: 'md',
    overflow: 'hidden',
    borderWidth: useColorModeValue('1px', 0)
  }
}

export const GraphSkeleton: React.FC<BoxProps> = ({ children, ...props }) => {
  const boxProps = useGraphSkeletonProps()
  return (
    <Center {...boxProps} {...props}>
      <Text textAlign="center" color="gray.500" fontSize="sm">
        Informations insuffisantes
        <br />
        pour afficher le graphe d'activité
        {children}
      </Text>
    </Center>
  )
}
