import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { Modes } from 'src/components/form/Modes'
import { Header } from 'src/components/Header'
import { Exam } from 'src/defs'

// --

const IndexPage: NextPage = () => {
  const [exam, setExam] = React.useState<Exam | null>(null)
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
          <Modes onExamChange={setExam} />
          {exam && (
            <Box>
              <Text>
                Isotope:{' '}
                <b>
                  {exam.isotope.symbol}
                  <sup>{exam.isotope.exponent}</sup>
                </b>
              </Text>
              <Text>x: {exam.x || 'A définir'}</Text>
            </Box>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default IndexPage
