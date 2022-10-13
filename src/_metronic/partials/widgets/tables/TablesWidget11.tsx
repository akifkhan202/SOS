/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {KTSVG, localAPIUrl} from '../../../helpers'

type Props = {
  className: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface patientData {
  status: string
  message: string
  data: Array<patientDetails>
}

interface patientDetails {
  _id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  image: string
  isBlock: boolean
  isAccountDelete: boolean
  created_At: Date
}

const TablesWidget11: React.FC<Props> = ({className}) => {
  const [patient, setPatient] = useState<patientDetails[]>([])

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL
    const GET_PATIENT_URL = `${API_URL}admin/patientList`

    axios
      .get(GET_PATIENT_URL)
      .then((response) => {
        console.log('API........', response)

        setPatient(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  console.log('patient user........', patient)

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Patient List</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>SOS</span>
        </h3>
        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            New Patient
          </a>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-50px rounded-start'>SR.NO</th>
                <th className='ps-4 min-w-325px rounded-start'>Name</th>
                <th className='min-w-125px'>Phone</th>
                <th className='min-w-125px'>Block</th>
                <th className='min-w-200px'>Join</th>
                <th className='min-w-150px'>Account Deleted</th>
                <th className='min-w-200px text-end rounded-end'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {patient.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <div className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {index + 1}
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-50px me-5'>
                        <img src={localAPIUrl(`${item.image}`)} className='' alt='' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                          {item.firstName} {item.lastName}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {item.mobile}
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>India</span>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {item.isBlock.toString()}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {dayjs(item.created_At).format('MM DD, YYYY')}
                    </a>
                  </td>
                  <td>
                    <span className='badge badge-light-primary fs-7 fw-semibold'>
                      {item.isAccountDelete.toString()}
                    </span>
                  </td>
                  <td className='text-end'>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen019.svg'
                        className='svg-icon-3'
                      />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                    >
                      <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                    </a>
                    <a
                      href='#'
                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen027.svg'
                        className='svg-icon-3'
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget11}
