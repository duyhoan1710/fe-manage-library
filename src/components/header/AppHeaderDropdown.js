import React, { useState, useEffect } from 'react'
import {
  CAvatar,
  CButton,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { changeInfoSchema, resetPasswordSchema } from './validate'
import { useMutation } from 'react-query'
import { resetPassword, updateInfo } from 'src/services/admin.service'
import { toast } from 'react-toastify'
import { useMe } from 'src/hooks/useAdmin'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const { data: me } = useMe()

  const logout = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }

  const { mutate: handleChangeAccount, isLoading: isLoadingChangeAccount } = useMutation(
    () => {
      return resetPassword({ ...formik.values })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        setIsOpenModal(false)
        localStorage.setItem('accessToken', '')
        navigate('/login')
      },
    },
  )

  const { mutate: handleChangeAccountInfo, isLoading: isLoadingChangeAccountInfo } = useMutation(
    () => {
      return updateInfo({ ...formikInfo.values })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        setIsOpenModalInfo(false)
        localStorage.setItem('accessToken', '')
        navigate('/login')
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      recentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: handleChangeAccount,
  })

  const formikInfo = useFormik({
    initialValues: {
      userName: '',
      phoneNumber: '',
      roleName: '',
    },
    validationSchema: changeInfoSchema,
    onSubmit: handleChangeAccountInfo,
  })

  const [isOenModal, setIsOpenModal] = useState(false)
  const [isOenModalInfo, setIsOpenModalInfo] = useState(false)

  useEffect(() => {
    if (me) {
      formikInfo.setFieldValue('userName', me.userName, false)
      formikInfo.setFieldValue('phoneNumber', me.phoneNumber, false)
      formikInfo.setFieldValue('roleName', me.roleName, false)
    }
  }, [me])

  return (
    <>
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={true}>
          <div className="avatar bg-warning text-white avatar">{me?.userName[0]}</div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem onClick={() => setIsOpenModalInfo(true)}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem onClick={() => setIsOpenModal(true)}>
            <CIcon icon={cilSettings} className="me-2" />
            Đổi Mật Khẩu
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={logout}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>

      <CModal visible={isOenModal} onClose={() => setIsOpenModal(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Đổi Mật Khẩu</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Mật Khẩu Hiện Tại
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="password"
                  name="recentPassword"
                  value={formik.values?.recentPassword}
                  feedbackInvalid={formik.errors?.recentPassword}
                  invalid={!!formik.errors?.recentPassword}
                  onChange={formik.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Mật Khẩu Mới
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="password"
                  name="newPassword"
                  value={formik.values?.newPassword}
                  feedbackInvalid={formik.errors?.newPassword}
                  invalid={!!formik.errors?.newPassword}
                  onChange={formik.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Xác Nhận Mật Khẩu
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="password"
                  name="confirmPassword"
                  value={formik.values?.confirmPassword}
                  feedbackInvalid={formik.errors?.confirmPassword}
                  invalid={!!formik.errors?.confirmPassword}
                  onChange={formik.handleChange}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsOpenModal(false)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={formik.handleSubmit} disabled={isLoadingChangeAccount}>
            {isLoadingChangeAccount ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={isOenModalInfo} onClose={() => setIsOpenModalInfo(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Thông Tin tài Khoản</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Tài Khoản
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  name="userName"
                  value={formikInfo.values?.userName}
                  feedbackInvalid={formikInfo.errors?.userName}
                  invalid={!!formikInfo.errors?.userName}
                  onChange={formikInfo.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Số Điện Thoại
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  name="phoneNumber"
                  value={formikInfo.values?.phoneNumber}
                  feedbackInvalid={formikInfo.errors?.phoneNumber}
                  invalid={!!formikInfo.errors?.phoneNumber}
                  onChange={formikInfo.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Vai Trò
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  name="roleName"
                  value={formikInfo.values?.roleName}
                  feedbackInvalid={formikInfo.errors?.roleName}
                  invalid={!!formikInfo.errors?.roleName}
                  onChange={formikInfo.handleChange}
                  disabled
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setIsOpenModalInfo(false)}>
            Đóng
          </CButton>
          <CButton
            color="primary"
            onClick={formikInfo.handleSubmit}
            disabled={isLoadingChangeAccountInfo}
          >
            {isLoadingChangeAccountInfo ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AppHeaderDropdown
