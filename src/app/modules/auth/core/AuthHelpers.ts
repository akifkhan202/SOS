import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  //console.log("is value Auth get.....", lsValue);
  
  
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel

    //console.log("get Auth.....", auth);
    
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }

  try {
    //console.log("set value API .................", auth);
    
    const lsValue = JSON.stringify(auth);
    //console.log("set Auth.....",lsValue);
    
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
    //console.log("local Storage.......",localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue));
    
  } catch (error) {
    //console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    //console.log("remove Auth......",localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY));

  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth();
      
      if (auth && auth.token) {
        config.headers.Authorization = `${auth.token}`
      }

    //console.log("set Axios config..........",axios);
      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
