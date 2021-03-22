import { OutgoingLink } from '@47ng/chakra-next'
import {
  Divider,
  Icon,
  List,
  ListItem,
  Stack,
  StackProps,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import React from 'react'
import { FiMail, FiPhone } from 'react-icons/fi'

export interface OutroProps extends StackProps {}

export const Outro: React.FC<OutroProps> = ({ ...props }) => {
  return (
    <Stack spacing={4} {...props}>
      <Divider mb={8} />
      <Text>
        <b>Rappel</b> : afin de diminuer au maximum la dose reçue, nous vous
        rappelons les trois moyens de radioprotection à votre disposition :
      </Text>
      <UnorderedList pl={4}>
        <ListItem>
          <b>La distance</b>: éloignez-vous du patient
        </ListItem>
        <ListItem>
          <b>Le temps</b> : minimisez la durée de prise en charge du patient
        </ListItem>
        <ListItem>
          <b>Les écrans</b> : utilisez des écrans de protection entre vous et le
          patient <em>(tablier plombé, paravent...)</em>
        </ListItem>
      </UnorderedList>
      <Text>
        Nous vous rappelons l’importance du tri des déchets car l’élimination
        des médicaments radioactifs se fait la plupart du temps par les urines
        et les excréments. (voir fiche{' '}
        <em>“gestion en décroissance des déchets radioactifs”</em>)
      </Text>
      <Text>
        Nous rappelons également que la limite de la dose reçue pour une femme
        enceinte est de <b>1mSv</b> entre la déclaration de la grossesse et
        l’accouchement.
      </Text>
      <Text>
        Pour plus d’informations, référez-vous à la fiche informative{' '}
        <em>“fiche patient”</em>.
      </Text>
      <Text as="div">
        En cas de questions, vous pouvez contacter :
        <List spacing={2}>
          <ListItem>
            <Icon as={FiMail} mr={2} color="gray.500" />
            <OutgoingLink
              href="mailto:celluleradioprotection@chu-grenoble.fr"
              textDecoration="underline"
            >
              celluleradioprotection@chu-grenoble.fr
            </OutgoingLink>
          </ListItem>
          <ListItem>
            <Icon as={FiPhone} mr={2} color="gray.500" />
            <OutgoingLink textDecoration="underline" href="tel:+33476767938">
              04 76 76 79 38
            </OutgoingLink>{' '}
            ou{' '}
            <OutgoingLink textDecoration="underline" href="tel:+33476766230">
              04 76 76 62 30
            </OutgoingLink>
          </ListItem>
        </List>
      </Text>
      <Text>
        Projet mené dans le cadre d'un mémoire de fin d'études par{' '}
        <OutgoingLink
          href="https://linkedin.com/in/julie-dubar-197466203"
          textDecor="underline"
        >
          Julie Dubar
        </OutgoingLink>{' '}
        et{' '}
        <OutgoingLink
          href="https://linkedin.com/in/sarah-vuillez-b532898b"
          textDecor="underline"
        >
          Sarah Vuillez
        </OutgoingLink>
        .
      </Text>
    </Stack>
  )
}
