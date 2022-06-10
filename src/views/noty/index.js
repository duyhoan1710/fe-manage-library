import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCol,
  CImage,
  CFormTextarea,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { createNotifySchema, updateNotifySchema } from './validate'
import { useMutation, useQueryClient } from 'react-query'
import { NOTIFY } from 'src/constants/queriesKey'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'
import { useProfile } from 'src/hooks/useAdmin'
import { useNotify } from 'src/hooks/useNotify'
import { checkAdmin } from 'src/helpers'
import { createNotify, removeNotify, updateNotify } from 'src/services/notify.service'

const Notify = () => {
  const queryClient = useQueryClient()

  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [updateNotifyId, setUpdateNotifyId] = useState()
  const [removeNotifyId, setRemoveNotifyId] = useState()

  const onClose = () => {
    setOpenModalAdd(false)
    setUpdateNotifyId(null)
    formik.setValues({}, false)
  }

  const { data: notifies, isLoading, error } = useNotify()
  const { data: user } = useProfile()

  const { mutate: handleChangeNotify, isLoading: isLoadingSubmitNotify } = useMutation(
    ({ title, content }) => {
      return updateNotifyId
        ? updateNotify({ id: updateNotifyId, title, content })
        : createNotify({ title, content })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        await queryClient.invalidateQueries(NOTIFY)
        onClose()
      },
      onError: () => {
        toast.error('Có Lỗi Xảy ra')
      },
    },
  )

  const { mutate: handleRemoveNotify, isLoading: isLoadingRemoveNotify } = useMutation(
    () => {
      return removeNotify({ id: removeNotifyId })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        await queryClient.invalidateQueries(NOTIFY)
        setRemoveNotifyId(null)
      },
      onError: () => {
        toast.error('Có Lỗi Xảy ra')
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: updateNotifyId ? updateNotifySchema : createNotifySchema,
    onSubmit: handleChangeNotify,
  })

  useEffect(() => {
    if (updateNotifyId) {
      formik.setValues(
        {
          ...notifies?.data?.find((category) => category.id === updateNotifyId),
        },
        false,
      )
    }
  }, [updateNotifyId])

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        {checkAdmin(user?.role) && (
          <CButton color="success" className="text-white" onClick={() => setOpenModalAdd(true)}>
            Thêm Mới
          </CButton>
        )}
      </div>
      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ tự</CTableHeaderCell>
            <CTableHeaderCell>Tiêu Đề</CTableHeaderCell>
            <CTableHeaderCell>Nội Dung</CTableHeaderCell>
            {checkAdmin(user?.role) && <CTableHeaderCell className="action-column" />}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {notifies?.data?.map((notify, index) => (
            <CTableRow key={notify.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{notify.title}</CTableDataCell>
              <CTableDataCell>{notify.content}</CTableDataCell>
              {checkAdmin(user?.role) && (
                <CTableDataCell className="mt-3">
                  <CButton
                    onClick={() => {
                      setUpdateNotifyId(notify.id)
                      formik.setFieldValue('title', notify.title, false)
                      formik.setFieldValue('content', notify.content, false)
                    }}
                    className="mx-2"
                  >
                    Cập Nhật
                  </CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => setRemoveNotifyId(notify.id)}
                  >
                    Xóa
                  </CButton>
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {isLoading && <Skeleton count={5} />}

      <CModal visible={openModalAdd || updateNotifyId} onClose={onClose} alignment="center">
        <CModalHeader>
          <CModalTitle>{updateNotifyId ? 'Cập nhật thông báo' : 'Tạo mới thông báo'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="title" className="col-sm-4 col-form-label">
                Tiêu Đề
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  name="title"
                  value={formik.values?.title}
                  feedbackInvalid={formik.errors?.title}
                  invalid={!!formik.errors?.title}
                  onChange={formik.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="content" className="col-sm-4 col-form-label">
                Nội Dung
              </CFormLabel>
              <CCol sm={8}>
                <CFormTextarea
                  type="text"
                  name="content"
                  value={formik.values?.content}
                  feedbackInvalid={formik.errors?.content}
                  invalid={!!formik.errors?.content}
                  onChange={formik.handleChange}
                  rows="5"
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={formik.handleSubmit} disabled={isLoadingSubmitNotify}>
            {isLoadingSubmitNotify ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={removeNotifyId} onClose={() => setRemoveNotifyId(null)} alignment="center">
        <CModalHeader>
          <CModalTitle>Xoá Thông Báo</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xoá ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRemoveNotifyId(null)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleRemoveNotify} disabled={isLoadingRemoveNotify}>
            {isLoadingRemoveNotify ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Notify
