import { FormLabel as ChakraFormLabel,FormLabelProps } from '@chakra-ui/react'

export const FormLabel = (props:FormLabelProps) => {
  return (
    <ChakraFormLabel {...props}>
        {props.children}
    </ChakraFormLabel>
  )
}
