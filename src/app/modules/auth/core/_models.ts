export interface AuthModel {
  status: string
  message: string
  token:string,
  data?: UserModel
}


export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

// export interface UserModel {
//   id: number
//   username: string
//   password: string | undefined
//   email: string
//   firsName: string
//   lastName: string
//   fullname?: string
//   occupation?: string
//   companyName?: string
//   phone?: string
//   roles?: Array<number>
//   pic?: string
//   language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
//   timeZone?: string
//   website?: 'https://keenthemes.com'
//   emailSettings?: UserEmailSettingsModel
//   auth?: AuthModel
//   communication?: UserCommunicationModel
//   address?: UserAddressModel
//   socialNetworks?: UserSocialNetworksModel
// }


export interface UserModel {
  _id: string
  password: string | undefined
  email: string
  firstName: string
  lastName: string
  phoneNumber:string,
  image:string ,
  role:string,
  isLive:string
  //fullname?: string
  // occupation?: string
  // companyName?: string
  // phone?: string
  // roles?: Array<number>
  // pic?: string
  // language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  // timeZone?: string
  // website?: 'https://keenthemes.com'
  // emailSettings?: UserEmailSettingsModel
  // auth?: AuthModel
  // communication?: UserCommunicationModel
  // address?: UserAddressModel
  // socialNetworks?: UserSocialNetworksModel
}
