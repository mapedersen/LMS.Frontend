// https://v1.chakra-ui.com/docs/components/form/textarea
//This is an example of how to use the types that come with each Chakra UI component.
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react'

export const Textarea = (props:TextareaProps) => {
  return (
    <ChakraTextarea {...props}>
        {props.children}
    </ChakraTextarea>
  )
}
