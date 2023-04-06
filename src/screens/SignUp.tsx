import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import {
  Center,
  Image,
  Text,
  VStack,
  Heading,
  ScrollView,
  useToast,
} from 'native-base'
import { yupResolver } from '@hookform/resolvers/yup'

import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImg from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirmation: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password')], 'As confirmação da senha não confere'),
})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  })
  const toast = useToast()
  const { singIn } = useAuth()
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ email, name, password }: FormDataProps) {
    try {
      setIsLoading(true)

      await api.post('/users', { name, email, password })
      await singIn(email, password)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          position="absolute"
          resizeMode="contain"
          alt="Pessoas treinando"
          source={BackgroundImg}
          defaultSource={BackgroundImg}
        />

        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirmation?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          mt={24}
          mb={4}
          title="Voltar para o login"
          variant="outline"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
