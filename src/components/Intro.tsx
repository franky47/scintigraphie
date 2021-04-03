import { Divider, Heading, Stack, StackProps, Text } from '@chakra-ui/react'
import React from 'react'

export interface IntroProps extends StackProps {}

export const Intro: React.FC<IntroProps> = ({ ...props }) => {
  return (
    <>
      <Heading as="h2" fontSize="2xl" fontWeight="semibold" mb={8}>
        Estimez votre exposition aux rayonnements ionisants lors de la prise en
        charge d'un patient sortant de médecine nucléaire
      </Heading>
      <Stack spacing={4} {...props}>
        <Text>
          Vous venez ou allez prendre en charge un patient sortant de médecine
          nucléaire ? Voici une plateforme dédiée à l’estimation de dose reçue
          selon la durée de la prise en charge.
        </Text>
        <Text>
          Un patient ayant bénéficié d’une scintigraphie ou d’une tomographie
          par émission de positrons (TEP) émet des rayonnements ionisants. En
          effet, un produit radiopharmaceutique lui a été injecté afin de
          pouvoir réaliser les images.
        </Text>
        <Text>
          Afin d'accéder à votre résultat, merci de remplir ci-dessous les
          renseignements nécessaires, auxquels vous avez accès sur la fiche
          navette <em>“fiche de suivi patient”</em> remis par le service de
          médecine nucléaire à votre patient.
        </Text>
        <Text>
          Attention, le résultat peut être uniquement considéré comme une{' '}
          <b>valeur indicative</b>. Il s’agit d’une estimation de dose durant la
          prise en charge à une certaine distance du patient.
        </Text>
        <Text>Aucune donnée n’est conservée.</Text>
        <Text fontSize="sm" color="gray.500">
          <b>Note:</b> cette application n'est pas compatible avec Internet
          Explorer.
        </Text>
      </Stack>
      <Divider mt={8} mb={12} />
    </>
  )
}
