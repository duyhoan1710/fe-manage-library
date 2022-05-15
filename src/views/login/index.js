import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { authSchema } from './validate'
import { useMutation } from 'react-query'

import { login } from '../../services/auth.service'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()

  const { mutate: handleLogin, isLoading } = useMutation(
    ({ username, password }) => {
      return login({ username, password })
    },
    {
      onSuccess: (res) => {
        localStorage.setItem('accessToken', res.accessToken)
        setTimeout(() => navigate('/'), 100)
      },
      onError: (err) => {
        toast.error('Tài khoản hoặc mật khẩu không đúng')
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: handleLogin,
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Xin Chào,...</h1>
                    <p className="text-medium-emphasis">
                      Thư viện sách trường học viện kĩ thuật Mật Mã
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        name="username"
                        feedbackInvalid={formik.errors.username}
                        invalid={formik.errors.username}
                        onChange={formik.handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        feedbackInvalid={formik.errors.password}
                        invalid={formik.errors.password}
                        onChange={formik.handleChange}
                      />
                    </CInputGroup>
                    <CRow className="d-flex justify-content-center">
                      <CCol md={6}>
                        <CButton
                          color="primary"
                          className="px-4 w-100"
                          onClick={formik.handleSubmit}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Loading...' : 'Đăng Nhập'}
                        </CButton>
                      </CCol>

                      <CButton color="link" className="px-0">
                        Quên Mật Khẩu?
                      </CButton>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
