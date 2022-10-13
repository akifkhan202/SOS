/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import dayjs from 'dayjs'
import React, {useEffect, useState} from 'react'
import {KTSVG, localAPIUrl} from '../../../helpers'

type Props = {
  className: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface doctorModel {
  status: string
  message: string
  data: Array<doctorDetails>
}

interface doctorDetails {
  _id: string
  image: string
  firstName: string
  lastName: string
  email: string
  speciality: string
  total_experience: number
  created_At: Date
}

const TablesWidget10: React.FC<Props> = ({className}) => {
  const [doctor, setDoctor] = useState<doctorDetails[]>([])

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL
    const GET_DOCTOR_URL = `${API_URL}admin/doctorList`

    axios
      .get(GET_DOCTOR_URL)
      .then((response) => {
        console.log('API........', response)

        setDoctor(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  console.log('doctor user........', doctor)

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Doctors List</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>organization</span>
        </h3>
        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary'>
            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
            New Doctor
          </a>
        </div>
        {/* <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          title='Click to add a user'
        >
          <a
            href='#'
            className='btn btn-sm btn-light-primary'
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
          </a>
        </div> */}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    SR.No
                  </div>
                </th>
                <th className='min-w-150px'>Doctor Name</th>
                <th className='min-w-140px'>Speciality</th>
                <th className='min-w-140px'>Join Date</th>
                {/* <th className='min-w-120px'>Work Experience </th> */}
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {doctor.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={localAPIUrl(`${item.image}`)} alt='doctorImage' />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {item.firstName} {item.lastName}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      {item.speciality}
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      {dayjs(item.created_At).format('MM,DD,YYYY')}
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                  </td>
                  {/* <td>
                    <div className='d-flex flex-column w-100 me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                      </div>
                      <div className='progress h-6px w-100'>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: '50%'}}
                        ></div>
                      </div>
                    </div>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                      {item.total_experience}
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                  </td> */}
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/eye.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/edit.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <KTSVG path='/media/delete.svg' className='svg-icon-3' />
                      </a>
                    </div>
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

export {TablesWidget10}
