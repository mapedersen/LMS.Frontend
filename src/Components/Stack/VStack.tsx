import { VStack as ChakraVStack, } from '@chakra-ui/react'

export const VStack = (props:any) => {
  return (
    <ChakraVStack {...props}>
        {props.children}
    </ChakraVStack>
  )
}
