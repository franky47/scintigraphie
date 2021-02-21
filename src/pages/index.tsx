import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import { Header } from 'src/components/Header'
import { Footer } from 'src/components/Footer'
import { Calculator } from 'src/components/Calculator'
import { Intro } from 'src/components/Intro'
import { Outro } from 'src/components/Outro'

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          Scintigraphie
          {process.env.NODE_ENV === 'development' ? ' [local]' : ''}
        </title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☢️</text></svg>"
        ></link>
      </Head>
      <Container my={4}>
        <Header mb={8} />
        <Intro mb={12} />
        <Calculator mb={12} />
        <Outro mb={12} />
        <Footer my={8} />
      </Container>
    </>
  )
}

export default IndexPage
