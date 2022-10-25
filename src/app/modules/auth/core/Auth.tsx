import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: AuthModel | undefined
  setCurrentUser: Dispatch<SetStateAction<AuthModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
}

//console.log('Auth init Context.........', initAuthContextPropsState)

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

//console.log('Auth useAuth Context.........', useAuth)

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())

  //console.log('Auth varibale..........', auth)

  const [currentUser, setCurrentUser] = useState<AuthModel | undefined>()
  //console.log('Main Auth............', currentUser)

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    //console.log('Auth Validation.......', auth)

    if (auth) {
      //console.log('Main Auth.........', auth)

      authHelper.setAuth(auth)
    } else {
      //console.log('Remove Auth.........', auth)

      authHelper.removeAuth()
    }
  }

  //console.log('Auth SAVE AUTH Context.........', saveAuth)

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  //console.log('Auth LOGOUT Context.........', logout)

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout, setCurrentUser} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        //console.log('this one jjdjv svsdsv........', didRequest.current)

        if (!didRequest.current) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)

            //console.log('useeffect data......', data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    //console.log('Auth REQUEST USER USEEFFECT Context.........', requestUser)

    if (auth && auth.token) {
      //console.log('requestUser........', auth.token)

      requestUser(auth.token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
