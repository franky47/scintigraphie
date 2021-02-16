import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Container, Stack } from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'
import { Header } from 'src/components/Header'

// --

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scintigraphie</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☢️</text></svg>"
        ></link>
      </Head>
      <Container>
        <Header mt={4} mb={8} />
        <Stack spacing={4}>
          <Modes />
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
