import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { THEME } from './src/theme/index'
import { Routes } from '@routes/index'
import { AuthProvider } from '@contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        {!fontsLoaded && <Loading withBackground />}
        {fontsLoaded && <Routes />}
      </AuthProvider>
    </NativeBaseProvider>
  )
}
