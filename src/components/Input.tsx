import { Input as NativeInput, IInputProps } from 'native-base'

type Props = IInputProps & {}

export function Input({ ...rest }: Props) {
  return (
    <NativeInput
      bg="gray.700"
      h={14}
      px={4}
      mb={4}
      borderWidth={1}
      borderColor="transparent"
      fontSize="md"
      color="white"
      fontFamily="body"
      placeholderTextColor="gray.300"
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...rest}
    />
  )
}
