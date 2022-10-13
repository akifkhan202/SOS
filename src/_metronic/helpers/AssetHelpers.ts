export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname
export const localAPIUrl =(pathname: string)=> process.env.REACT_APP_API_URL + pathname