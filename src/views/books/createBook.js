import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { createBookSchema, updateBookSchema } from './validate'
import PropTypes from 'prop-types'
import { useCategory } from 'src/hooks/useCategory'
import { useMutation, useQueryClient } from 'react-query'
import { createBook, updateBook } from 'src/services/book.service'
import { toast } from 'react-toastify'
import { BOOK } from 'src/constants/queriesKey'

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
  const queryClient = useQueryClient()
  const refBookAvatar = useRef()
  const refBookFile = useRef()

  const { mutate: handleSubmit, isLoading } = useMutation(
    async ({
      title,
      description,
      quantity,
      categoryId,
      term,
      thumbnail,
      pdfFile,
      totalWrongBooks,
    }) => {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('quantity', quantity)
      formData.append('totalWrongBooks', totalWrongBooks)
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
      onSuccess: async () => {
        onClose()
        await queryClient.invalidateQueries(BOOK)
        toast.success('Thay Đổi Thành Công')
      },
      onError: () => {
        toast.error('Có Lỗi Xảy ra')
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      quantity: '',
      totalWrongBooks: '',
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
        description: book.description || '',
        thumbnail: undefined,
        pdfFile: undefined,
      })
    }

    formik.setErrors({})
  }, [book])

  return (
    <CModal
      visible={isOpen || !!updateBookId}
      onClose={() => {
        onClose()
        formik.setValues({})
        formik.setErrors({})
      }}
      alignment="center"
      size="lg"
    >
      <CModalHeader>
        <CModalTitle>Thêm mới sách</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CRow>
          <CCol sm={12}>
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="name" className="col-sm-3 col-form-label">
                  Tên Sách
                </CFormLabel>
                <CCol sm={9}>
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
                <CFormLabel htmlFor="quantity" className="col-sm-3 col-form-label">
                  Số Lượng
                </CFormLabel>
                <CCol sm={9}>
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
                <CFormLabel htmlFor="totalWrongBooks" className="col-sm-3 col-form-label">
                  Số Sách Hỏng
                </CFormLabel>
                <CCol sm={9}>
                  <CFormInput
                    id="totalWrongBooks"
                    type="text"
                    name="totalWrongBooks"
                    feedbackInvalid={formik.errors?.totalWrongBooks}
                    onChange={formik.handleChange}
                    invalid={!!formik.errors?.totalWrongBooks}
                    value={formik.values?.totalWrongBooks}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="description" className="col-sm-3 col-form-label">
                  Mô tả
                </CFormLabel>
                <CCol sm={9}>
                  <CFormTextarea
                    id="description"
                    name="description"
                    rows="5"
                    text="Must be 9-20 words long."
                    feedbackInvalid={formik.errors?.description}
                    onChange={formik.handleChange}
                    invalid={!!formik.errors?.description}
                    value={formik.values?.description}
                  ></CFormTextarea>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="categoryId" className="col-sm-3 col-form-label">
                  Loại Sách
                </CFormLabel>
                <CCol sm={9}>
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
                <CFormLabel className="col-sm-3 col-form-label">Kì Học</CFormLabel>
                <CCol sm={9}>
                  <CFormSelect
                    name="term"
                    options={[
                      { label: 'Lựa Chọn', value: null },
                      ...Array.from({ length: 9 }, (_, i) => ({
                        label: `Kì ${i + 1}`,
                        value: i + 1,
                      })),
                    ]}
                    feedbackInvalid={formik.errors?.term}
                    onChange={formik.handleChange}
                    invalid={!!formik.errors?.term}
                    value={formik.values?.term}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="thumbnail" className="col-sm-3 col-form-label">
                  Ảnh Sách
                </CFormLabel>
                <CCol sm={9}>
                  <CFormInput
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    className="hidden"
                    feedbackInvalid={formik.errors?.thumbnail}
                    onChange={(event) => formik.setFieldValue('thumbnail', event.target.files[0])}
                    invalid={!!formik.errors?.thumbnail}
                    ref={refBookAvatar}
                  />

                  <div className="d-flex align-items-center">
                    <CButton
                      className="me-3 px-4 bg-secondary"
                      onClick={() => refBookAvatar.current.click()}
                    >
                      Chọn File
                    </CButton>
                    <div className="input-file">
                      {formik.values?.thumbnail?.name ||
                        book?.thumbnail?.substring(107) ||
                        'No File Choose'}
                    </div>
                  </div>
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="pdfFile" className="col-sm-3 col-form-label">
                  PDF File
                </CFormLabel>
                <CCol sm={9}>
                  <CFormInput
                    type="file"
                    id="formFile"
                    name="pdfFile"
                    className="hidden"
                    feedbackInvalid={formik.errors?.pdfFile}
                    onChange={(event) => formik.setFieldValue('pdfFile', event.target.files[0])}
                    invalid={!!formik.errors?.pdfFile}
                    ref={refBookFile}
                  />

                  <div className="d-flex align-items-center">
                    <CButton
                      className="me-3 px-4 bg-secondary"
                      onClick={() => refBookFile.current.click()}
                    >
                      Chọn File
                    </CButton>
                    <div className="input-file">
                      {formik.values?.pdfFile?.name ||
                        book?.pdfFile?.substring(101) ||
                        'No File Choose'}
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>

      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            onClose()
            formik.setValues({})
            formik.setErrors({})
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
