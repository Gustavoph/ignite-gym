import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from '@storage/tokenStorage'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/userStorage'
import { PropsWithChildren, createContext, useEffect, useState } from 'react'

type AuthContextData = {
  user: UserDTO
  isLoadingUserStorageData: boolean
  signOut: () => Promise<void>
  singIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token)
      }
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true)
      await storageUserSave(userData)
      await storageAuthTokenSave(token)
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function singIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })
      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
      await storageAuthTokenRemove()
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoadingUserStorageData, user, singIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
