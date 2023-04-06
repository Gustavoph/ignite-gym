import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/useAuth'
import { AppRoutes } from './app.routes'
import { Loading } from '@components/Loading'

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const nativeTheme = useTheme()
  const theme = DefaultTheme
  theme.colors.background = nativeTheme.colors.gray[700]

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
