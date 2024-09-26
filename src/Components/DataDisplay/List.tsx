import { List as ChakraList, ListProps} from '@chakra-ui/react'

export const OrderedList = (props:ListProps) => {
  return (
    <ChakraList {...props}>
        {props.children}
    </ChakraList>
  )
}
