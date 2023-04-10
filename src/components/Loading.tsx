import { Center, Spinner } from 'native-base'

type Props = {
  withBackground?: boolean
}

export function Loading({ withBackground = false }: Props) {
  return (
    <Center flex="1" bgColor={withBackground ? 'gray.500' : 'transparent'}>
      <Spinner />
    </Center>
  )
}
