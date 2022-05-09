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
} from '@coreui/react'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { categorySchema } from './validate'

const Categories = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: categorySchema,
    onSubmit: () => {},
  })

  console.log(formik.errors)

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <CButton color="success" className="text-white" onClick={() => setOpenModalAdd(true)}>
          Thêm Mới
        </CButton>
      </div>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Tên</CTableHeaderCell>
            <CTableHeaderCell>Cập nhật Lần Cuối</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableHeaderCell>1</CTableHeaderCell>
            <CTableDataCell>Văn học</CTableDataCell>
            <CTableDataCell>1/1/1970</CTableDataCell>
            <CTableDataCell className="d-flex justify-content-evenly">
              <CButton>Cập Nhật</CButton>
              <CButton color="danger" className="text-white">
                Xóa
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell>2</CTableHeaderCell>
            <CTableDataCell>Hài hước</CTableDataCell>
            <CTableDataCell>1/1/1970</CTableDataCell>
            <CTableDataCell className="d-flex justify-content-evenly">
              <CButton>Cập Nhật</CButton>
              <CButton color="danger" className="text-white">
                Xóa
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableHeaderCell>3</CTableHeaderCell>
            <CTableDataCell>Đời sống</CTableDataCell>
            <CTableDataCell>1/1/1970</CTableDataCell>
            <CTableDataCell className="d-flex justify-content-evenly">
              <CButton>Cập Nhật</CButton>
              <CButton color="danger" className="text-white">
                Xóa
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>

      <CModal visible={openModalAdd} onClose={() => setOpenModalAdd(false)} alignment="center">
        <CModalHeader>
          <CModalTitle>Tạo mới loại sách</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Loại Sách
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  name="name"
                  feedbackInvalid={formik.errors?.name}
                  onChange={formik.handleChange}
                  invalid={!!formik.errors?.name}
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setOpenModalAdd(false)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={formik.handleSubmit}>
            Lưu Thay Đổi
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Categories
