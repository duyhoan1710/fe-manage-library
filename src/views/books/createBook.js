import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { bookSchema, createBookSchema, updateBookSchema } from './validate'
import PropTypes from 'prop-types'
import { useCategory } from 'src/hooks/useCategory'
import { useMutation } from 'react-query'
import { createBook, updateBook } from 'src/services/book.service'

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

const CreateBookComponent = ({ isOpen, onClose, updateBookId, book = {} }) => {
  const { data: categories } = useCategory()

  const { mutate: handleSubmit, isLoading } = useMutation(
    async ({ title, description, quantity, categoryId, term, thumbnail, pdfFile }) => {
      console.log({ title, description, quantity, categoryId, term, thumbnail, pdfFile })
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('quantity', quantity)
      formData.append('term', term)
      formData.append('categoryId', categoryId)
      formData.append('thumbnail', thumbnail)
      formData.append('pdfFile', pdfFile)

      const res = updateBookId
        ? await updateBook({ bookId: updateBookId, formData })
        : await createBook({ formData })

      return res.data
    },
    {
      onSuccess: () => {},
      onError: () => {},
    },
  )

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      quantity: '',
      categoryId: '',
      term: '',
      thumbnail: '',
      pdfFile: '',
    },
    validationSchema: updateBookId ? updateBookSchema : createBookSchema,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (Object.keys(book)?.length && updateBookId) {
      formik.setValues({
        ...book,
        thumbnail: undefined,
        pdfFile: undefined,
      })
    }
  }, [book])

  return (
    <CModal
      visible={isOpen || !!updateBookId}
      onClose={() => {
        onClose()
        formik.setValues({})
      }}
      alignment="center"
      size="lg"
    >
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
                name="title"
                feedbackInvalid={formik.errors?.title}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.title}
                value={formik.values?.title}
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
                value={formik.values?.quantity}
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
                value={formik.values?.description}
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
                name="categoryId"
                options={[
                  { label: 'Lựa Chọn', value: null },
                  ...(categories?.data?.map((category) => ({
                    label: category.categoryName,
                    value: category.id,
                  })) || []),
                ]}
                feedbackInvalid={formik.errors?.categoryId}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.categoryId}
                value={formik.values?.categoryId}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel className="col-sm-4 col-form-label">Kì Học</CFormLabel>
            <CCol sm={8}>
              <CFormSelect
                name="term"
                options={[
                  { label: 'Lựa Chọn', value: null },
                  ...Array.from({ length: 10 }, (_, i) => ({ label: `Kì ${i + 1}`, value: i + 1 })),
                ]}
                feedbackInvalid={formik.errors?.term}
                onChange={formik.handleChange}
                invalid={!!formik.errors?.term}
                value={formik.values?.term}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="thumbnail" className="col-sm-4 col-form-label">
              Ảnh Sách
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                type="file"
                id="thumbnail"
                name="thumbnail"
                feedbackInvalid={formik.errors?.thumbnail}
                onChange={(event) => formik.setFieldValue('thumbnail', event.target.files[0])}
                invalid={!!formik.errors?.thumbnail}
                // value={formik.values?.thumbnail}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CFormLabel htmlFor="pdfFile" className="col-sm-4 col-form-label">
              PDF File
            </CFormLabel>
            <CCol sm={8}>
              <CFormInput
                type="file"
                id="formFile"
                name="pdfFile"
                feedbackInvalid={formik.errors?.pdfFile}
                onChange={(event) => formik.setFieldValue('pdfFile', event.target.files[0])}
                invalid={!!formik.errors?.pdfFile}
                // value={formik.values?.pdfFile}
              />
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            onClose()
            formik.setValues({})
          }}
        >
          Đóng
        </CButton>
        <CButton color="primary" onClick={formik.handleSubmit} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Lưu Thay Đổi'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

CreateBookComponent.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  updateBookId: PropTypes.any,
  book: PropTypes.object,
}

export default CreateBookComponent
