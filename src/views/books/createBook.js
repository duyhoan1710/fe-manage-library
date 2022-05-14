import { useFormik } from 'formik'
import * as React from 'react'
import { bookSchema } from './validate'
import PropTypes from 'prop-types'

const {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CModalFooter,
  CButton,
} = require('@coreui/react')

const CreateBookComponent = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      quantity: '',
      categoryId: '',
      thumbnail: '',
      pdfFile: '',
    },
    validationSchema: bookSchema,
    onSubmit: () => {},
  })

  return (
    <CModal visible={isOpen} onClose={onClose} alignment="center" size="lg">
      <CModalHeader>
        <CModalTitle>Thêm mới sách</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CForm>
          <CRow className="mb-3">
            <CFormLabel htmlFor="name" className="col-sm-4 col-form-label">
              Tên Sách
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                id="name"
                type="text"
                name="name"
                feedbackInvalid={formik.errors?.name}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.name}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="quantity" className="col-sm-4 col-form-label">
              Số Lượng
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                id="quantity"
                type="text"
                name="quantity"
                feedbackInvalid={formik.errors?.quantity}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.quantity}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="description" className="col-sm-4 col-form-label">
              Mô tả
            </CFormLabel>
            <CCol sm={8}>
              <CFormTextarea
                id="description"
                name="description"
                rows="5"
                text="Must be 8-20 words long."
                feedbackInvalid={formik.errors?.description}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.description}
              ></CFormTextarea>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="categoryId" className="col-sm-4 col-form-label">
              Loại Sách
            </CFormLabel>
            <CCol sm={8}>
              <CFormSelect
                id="categoryId"
                options={[
                  { label: 'VanHoc', value: '1' },
                  { label: 'TrinhTham', value: '2' },
                  { label: 'TieuThuyet', value: '3' },
                ]}
                feedbackInvalid={formik.errors?.categoryId}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.categoryId}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="thumbnail" className="col-sm-4 col-form-label">
              Ảnh Sách
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput type="file" id="thumbnail" name="thumbnail" />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="pdfFile" className="col-sm-4 col-form-label">
              PDF File
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput type="file" id="formFile" name="pdfFile" />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Đóng
        </CButton>
        <CButton color="primary" onClick={formik.handleSubmit}>
          Lưu Thay Đổi
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CreateBookComponent.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default CreateBookComponent
