/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {motion} from 'framer-motion'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
        backgroundPosition: 'bottom',
      }}
    >
      {/* begin::Content */}
      <motion.div
        initial={{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y: -1}}
        transition={{duration: 1}}
        className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'
      >
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/loginLogo.png')} className='h-70px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div
          className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'
          style={{
            background: 'linear-gradient(0deg, rgba(246,246,255,1) 0%, rgba(33,133,244,1) 100%)',
          }}
        >
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </motion.div>
      {/* end::Content */}
      {/* begin::Footer */}
      {/* <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='#' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact
          </a>

          <a href='#' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div> */}
      {/* end::Footer */}
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
