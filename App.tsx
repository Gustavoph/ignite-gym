import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { THEME } from './src/theme/index'
// import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'

export default function App() {
  const [fontsLoaded] = useFonts([Roboto_400Regular, Roboto_700Bold])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {!fontsLoaded && <Loading />}
      {fontsLoaded && <SignUp />}
    </NativeBaseProvider>
  )
}
