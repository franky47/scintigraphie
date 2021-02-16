import React from 'react'
import { NextPage } from 'next'
import { Container, Stack } from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'

// --

const IndexPage: NextPage = () => {
  return (
    <Container mt={12}>
      <Stack spacing={4}>
        <Modes />
      </Stack>
    </Container>
  )
}

export default IndexPage
