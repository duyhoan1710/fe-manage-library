import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import UserImage from '../../assets/images/hacker.png'
import { useAccounts, useRoles } from 'src/hooks/useAdmin'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { ACCOUNT } from 'src/constants/queriesKey'
import { updateAccountSchema, createAccountSchema } from './validate'
import { createAccount, removeAccount, updateAccount } from 'src/services/admin.service'
import AutocompleteComponent from 'src/components/Autocomplete'
import Skeleton from 'react-loading-skeleton'

const Admin = () => {
  const queryClient = useQueryClient()

  const { data: accounts, isLoading } = useAccounts()
  const { data: roles } = useRoles()

  const [openModal, setOpenModal] = useState(false)
  const [updateAccountId, setUpdateAccountId] = useState()
  const [removeAccountId, setRemoveAccountId] = useState()
  const [searchRoleKey, setSearchRoleKey] = useState()

  const onClose = () => {
    setOpenModal(false)
    setUpdateAccountId(null)
    formik.setValues({}, false)
  }

  const { mutate: handleChangeCategory, isLoading: isLoadingSubmitCategory } = useMutation(
    ({ userName, password, roleId }) => {
      return updateAccountId
        ? updateAccount({ userId: updateAccountId, roleId })
        : createAccount({ userName, password, roleId })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        await queryClient.invalidateQueries(ACCOUNT)
        onClose()
      },
      onError: () => {
        toast.success('Tài khoản đã tồn tại')
      },
    },
  )

  const { mutate: handleRemoveAccount, isLoading: isLoadingRemoveAccount } = useMutation(
    () => {
      return removeAccount({ userId: removeAccountId })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        await queryClient.invalidateQueries(ACCOUNT)
        setRemoveAccountId(null)
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      roleId: '',
    },
    validationSchema: updateAccountId ? updateAccountSchema : createAccountSchema,
    onSubmit: handleChangeCategory,
  })

  useEffect(() => {
    if (updateAccountId) {
      formik.setValues({
        roleId: accounts?.data?.find((account) => account.id === updateAccountId).id,
      })
      setSearchRoleKey(accounts?.data?.find((account) => account.id === updateAccountId).roleName)
    }
  }, [updateAccountId])

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <CButton color="success" className="text-white" onClick={() => setOpenModal(true)}>
          Thêm Mới
        </CButton>
      </div>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Họ và Tên</CTableHeaderCell>
            <CTableHeaderCell>Vai Trò</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {accounts?.data?.map((record, index) => (
            <CTableRow key={record.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{record.userName}</CTableDataCell>
              <CTableDataCell>{record.roleName}</CTableDataCell>
              <CTableDataCell className="mt-3">
                <CButton onClick={() => setUpdateAccountId(record.id)} className="mx-2">
                  Cập Nhật
                </CButton>
                <CButton
                  color="danger"
                  className="text-white"
                  onClick={() => setRemoveAccountId(record.id)}
                >
                  Xóa
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {isLoading && <Skeleton count={5} />}

      <CModal visible={openModal || updateAccountId} onClose={onClose} alignment="center">
        <CModalHeader>
          <CModalTitle>{updateAccountId ? 'Cập nhật User' : 'Tạo mới User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            {!updateAccountId && (
              <>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                    Tên Tài Khoản
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="text"
                      name="userName"
                      value={formik.values?.userName}
                      feedbackInvalid={formik.errors?.userName}
                      invalid={!!formik.errors?.userName}
                      onChange={formik.handleChange}
                    />
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                    Mật Khẩu
                  </CFormLabel>
                  <CCol sm={8}>
                    <CFormInput
                      type="password"
                      name="password"
                      value={formik.values?.password}
                      feedbackInvalid={formik.errors?.password}
                      invalid={!!formik.errors?.password}
                      onChange={formik.handleChange}
                    />
                  </CCol>
                </CRow>
              </>
            )}

            <CRow className="mb-3">
              <CFormLabel htmlFor="subtitle" className="col-sm-4 col-form-label">
                Vai Trò
              </CFormLabel>
              <CCol sm={8}>
                {roles && (
                  <AutocompleteComponent
                    items={roles}
                    searchKey={searchRoleKey}
                    setSearchKey={setSearchRoleKey}
                    onSelect={(value) => formik.setFieldValue('roleId', value.id)}
                    label="name"
                  />
                )}
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={formik.handleSubmit} disabled={isLoadingSubmitCategory}>
            {isLoadingSubmitCategory ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={removeAccountId} onClose={() => setRemoveAccountId(null)} alignment="center">
        <CModalHeader>
          <CModalTitle>Xoá Người Dùng Hệ Thống</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xoá ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRemoveAccountId(null)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleRemoveAccount} disabled={isLoadingRemoveAccount}>
            {isLoadingRemoveAccount ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Admin
