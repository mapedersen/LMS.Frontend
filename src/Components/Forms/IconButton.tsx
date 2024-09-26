import { IconButton as ChakraIconButton, IconButtonProps} from '@chakra-ui/react'


/**
 * https://v1.chakra-ui.com/docs/components/form/icon-button
 * https://v2.chakra-ui.com/docs/components/icon
 */
export const IconButton = (props:IconButtonProps) => {
  return (
    <ChakraIconButton {...props}>
        {props.children}
    </ChakraIconButton>
  )
}
