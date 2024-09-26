import { FormControl as ChakraFormControl, FormControlProps } from '@chakra-ui/react'

export const FormControl = (props:FormControlProps) => {
  return (
    <ChakraFormControl {...props}>
        {props.children}
    </ChakraFormControl>
  )
}
