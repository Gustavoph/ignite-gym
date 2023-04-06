import { Input as NativeInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string
}

export function Input({ errorMessage, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={1}
        borderColor="transparent"
        fontSize="md"
        color="white"
        fontFamily="body"
        isInvalid={invalid}
        placeholderTextColor="gray.300"
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
