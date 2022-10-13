import React, {useEffect, useRef, useState} from 'react'
import {localAPIUrl, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
//import {IProfileDetails, profileDetailsInitValues as initialValues} from '../SettingsModel'
import * as Yup from 'yup'
import {Formik, useFormik} from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '../../../../auth'
import {getUserByToken, updateProfile} from '../../../../auth/core/_requests'
import {PasswordMeterComponent} from '../../../../../../_metronic/assets/ts/components'
import axios from 'axios'

const updateAdminSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Minimum 4 Latter')
    .max(50, 'Maximum 50 Latter')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Minimum 3 Latter')
    .max(50, 'Maximum 50 Latter')
    .required('Last name is required'),
  phoneNumber: Yup.string()
    .min(3, 'Minimum 13 Number')
    .max(50, 'Maximum 50 Number')
    .required('Phone Number is required'),
  // image: Yup.mixed()
  //   .required('Please Select image')
  //   .nullable()
  //   .test('FILE SIZE', 'Please select small size', (value) => value && value.size < 1024 * 1024)
  //   .test(
  //     'File Type',
  //     'invalid!',
  //     (value: {type: string}) =>
  //       value && ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type)
  //   ),
  // changepassword: Yup.string()
  //   .required('Password confirmation is required')
  //   .when('password', {
  //     is: (val: string) => (val && val.length > 0 ? true : false),
  //     then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  //   }),
  // acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

const ProfileDetails: React.FC = () => {
  const [imagePriview, setimagePriview] = useState<File | null>()
  const [preview, setPreview] = useState<String | null>()

  const imageRef = useRef<HTMLInputElement | any>(null)

  useEffect(() => {
    if (imagePriview) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setPreview(reader.result as string)
      }

      reader.readAsDataURL(imagePriview)
    } else {
      setPreview(null)
    }
  }, [imagePriview])

  let Navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const {currentUser} = useAuth()

  const initialValues = {
    _id: currentUser?.data?._id || '',
    password: currentUser?.data?.password || '',
    email: currentUser?.data?.email || '',
    firstName: currentUser?.data?.firstName || '',
    lastName: currentUser?.data?.lastName || '',
    phoneNumber: currentUser?.data?.phoneNumber || '',
    image: currentUser?.data?.image || '',
    role: currentUser?.data?.role || '',
    isLive: currentUser?.data?.isLive || '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: updateAdminSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      console.log('this image value', values.image)

      const API_URL = process.env.REACT_APP_API_URL
      const UPDATE_PROFILE_URL = `${API_URL}admin/updateProfile`

      const formData = new FormData()

      formData.append('firstName', values.firstName)
      formData.append('lastName', values.lastName)
      formData.append('phoneNumber', values.phoneNumber)
      formData.append('image', values.image)

      await axios.post(UPDATE_PROFILE_URL, formData).then(console.log).catch(console.error)

      formik.resetForm()

      setTimeout(() => {
        Navigate('/crafted/account/overview')
      }, 500)
      setLoading(true)
      try {
        const {data: auth} = await updateProfile(
          values.firstName,
          values.lastName,
          values.phoneNumber,
          values.image
        )

        if (auth.status === 'success') {
          saveAuth(auth)
          const {data: user} = await getUserByToken(auth.token)
          setCurrentUser(user)
        } else {
          saveAuth(undefined)
          setStatus(auth.message)
          setSubmitting(false)
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
        <Link to='/crafted/account/overview' className='btn btn-primary align-self-center'>
          Cancel
        </Link>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form onSubmit={formik.handleSubmit} noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              {formik.status ? (
                <div className='mb-lg-15 alert alert-success'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              ) : null}
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
              <div className='col-lg-8'>
                <div className='image-input image-input-outline' data-kt-image-input='true'>
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{
                      backgroundImage: `url(${localAPIUrl(`${preview}`)})`,
                      zIndex: 2,
                    }}
                  >
                    {preview ? (
                      <img
                        style={{height: '125px', width: '125px'}}
                        src={preview as any}
                        alt='preview'
                      />
                    ) : null}
                  </div>

                  <label
                    htmlFor='file-upload'
                    className='file-upload'
                    style={{zIndex: 1, position: 'absolute', top: 0}}
                  >
                    <div className='fileUploadButton'>
                      <FontAwesomeIcon
                        className='awesomeAboutPhoto'
                        icon={faEdit}
                        color='darkblue'
                        style={{height: '20px'}}
                        onClick={(event) => {
                          event.preventDefault()
                          imageRef.current?.click()
                        }}
                      />
                      <input
                        ref={imageRef}
                        id='file-upload'
                        type='file'
                        accept='image/png, image/jpeg'
                        //{...formik.getFieldProps('image')}
                        onChange={(event: any) => {
                          console.log('.....', event.target.files[0])
                          formik.setFieldValue('image', event.target.files[0])
                          const file = event.target.files[0]
                          formik.setFieldTouched('image', true)
                          if (file && file.type.substr(0, 5) === 'image') {
                            setimagePriview(file)
                          } else {
                            setimagePriview(null)
                          }
                        }}
                        style={{display: 'none'}}
                      />
                    </div>
                  </label>
                </div>
                {formik.touched.image && formik.errors.image && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.image}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='First name'
                      {...formik.getFieldProps('firstName')}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      // value={profilefirstName}
                      // onChange={(e) => setfirstName(e.target.value)}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                      </div>
                    )}
                  </div>

                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Last name'
                      {...formik.getFieldProps('lastName')}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      // value={profilelastName}
                      // onChange={(e) => setlastName(e.target.value)}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Phone Number</label>

              <div className='col-lg-8'>
                <div className='row'>
                  <div className='col-lg-6 fv-row'>
                    <input
                      type='text'
                      className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      placeholder='Phone Number'
                      {...formik.getFieldProps('phoneNumber')}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      // value={profilephoneNumber}
                      // onChange={(e) => setphoneNumber(e.target.value)}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.phoneNumber}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end py-6 px-9'>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              {!loading && 'Save Changes'}
              {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export {ProfileDetails}
