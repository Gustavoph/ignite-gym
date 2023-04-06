import { Text } from 'native-base'

type Props = {
  name: string
}

export function Group({ name }: Props) {
  return (
    <Text color="gray.200" fontSize="xs" fontWeight="bold">
      {name.toUpperCase()}
    </Text>
  )
}
