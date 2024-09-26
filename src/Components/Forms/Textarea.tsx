import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react'

// https://v1.chakra-ui.com/docs/components/form/textarea
export const Textarea = (props:TextareaProps) => {
  return (
    <ChakraTextarea {...props}>
        {props.children}
    </ChakraTextarea>
  )
}
