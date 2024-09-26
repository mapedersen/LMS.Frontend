import { ListItem as ChakraListItem, ListItemProps} from '@chakra-ui/react'

export const OrderedList = (props:ListItemProps) => {
  return (
    <ChakraListItem {...props}>
        {props.children}
    </ChakraListItem>
  )
}
