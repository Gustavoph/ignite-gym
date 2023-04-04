import { Text, Button as NativeButton, IButtonProps } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NativeButton
      w="full"
      h={14}
      bg={variant === 'outline' ? 'transparent' : 'green.700'}
      rounded="sm"
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      _pressed={{
        bg: variant === 'outline' ? 'green.700' : 'green.500',
        color: variant === 'outline' ? 'white' : 'green.500',
      }}
      {...rest}
    >
      <Text
        fontWeight="bold"
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NativeButton>
  )
}
