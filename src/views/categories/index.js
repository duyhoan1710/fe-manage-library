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
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { createCategorySchema, updateCategorySchema } from './validate'
import { useCategory } from '../../hooks/useCategory'
import { useMutation, useQueryClient } from 'react-query'
import { createCategory, removeCategory, updateCategory } from 'src/services/category.service'
import { CATEGORY } from 'src/constants/queriesKey'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'

const Categories = () => {
  const queryClient = useQueryClient()

  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [updateCategoryId, setUpdateCategoryId] = useState()
  const [removeCategoryId, setRemoveCategoryId] = useState()

  const onClose = () => {
    setOpenModalAdd(false)
    setUpdateCategoryId(null)
    formik.setValues({}, false)
  }

  const { data: categories, isLoading, error } = useCategory()

  const { mutate: handleChangeCategory, isLoading: isLoadingSubmitCategory } = useMutation(
    ({ categoryName, subtitle, thumbnail }) => {
      const formData = new FormData()
      formData.append('categoryName', categoryName)
      formData.append('subtitle', subtitle)
      formData.append('thumbnail', thumbnail)

      return updateCategoryId
        ? updateCategory({ categoryId: updateCategoryId, formData })
        : createCategory({ formData })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        await queryClient.invalidateQueries(CATEGORY)
        onClose()
      },
      onError: () => {},
    },
  )

  const { mutate: handleRemoveCategory, isLoading: isLoadingRemoveCategory } = useMutation(
    () => {
      return removeCategory({ categoryId: removeCategoryId })
    },
    {
      onSuccess: async () => {
        toast.success('Thay đổi thành công')
        await queryClient.invalidateQueries(CATEGORY)
        setRemoveCategoryId(null)
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      subtitle: '',
      thumbnail: '',
    },
    validationSchema: updateCategoryId ? updateCategorySchema : createCategorySchema,
    onSubmit: handleChangeCategory,
  })

  useEffect(() => {
    if (updateCategoryId) {
      formik.setValues(
        {
          ...categories?.data?.find((category) => category.id === updateCategoryId),
          thumbnail: undefined,
        },
        false,
      )
    }
  }, [updateCategoryId])

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
            <CTableHeaderCell>Thứ tự</CTableHeaderCell>
            <CTableHeaderCell>Ảnh nền</CTableHeaderCell>
            <CTableHeaderCell>Tên</CTableHeaderCell>
            <CTableHeaderCell>Phụ đề</CTableHeaderCell>
            <CTableHeaderCell className="w-200">Cập nhật Lần Cuối</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {categories?.data?.map((category, index) => (
            <CTableRow key={category.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>
                <CImage rounded width={70} height={70} src={category.thumbnail} />
              </CTableDataCell>
              <CTableDataCell>{category.categoryName}</CTableDataCell>
              <CTableDataCell>{category.subtitle}</CTableDataCell>
              <CTableDataCell>10/5/2022</CTableDataCell>
              <CTableDataCell className="d-flex justify-content-evenly mt-3">
                <CButton
                  onClick={() => {
                    setUpdateCategoryId(category.id)
                    formik.setFieldValue('categoryName', category.categoryName, false)
                    formik.setFieldValue('subtitle', category.subtitle, false)
                  }}
                >
                  Cập Nhật
                </CButton>
                <CButton
                  color="danger"
                  className="text-white"
                  onClick={() => setRemoveCategoryId(category.id)}
                >
                  Xóa
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {isLoading && <Skeleton count={5} />}

      <CModal visible={openModalAdd || updateCategoryId} onClose={onClose} alignment="center">
        <CModalHeader>
          <CModalTitle>{updateCategoryId ? 'Cập nhật loại sách' : 'Tạo mới loại sách'}</CModalTitle>
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
                  name="categoryName"
                  value={formik.values?.categoryName}
                  feedbackInvalid={formik.errors?.categoryName}
                  invalid={!!formik.errors?.categoryName}
                  onChange={formik.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="subtitle" className="col-sm-4 col-form-label">
                Phụ Đề
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="text"
                  name="subtitle"
                  value={formik.values?.subtitle}
                  feedbackInvalid={formik.errors?.subtitle}
                  invalid={!!formik.errors?.subtitle}
                  onChange={formik.handleChange}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="thumbnail" className="col-sm-4 col-form-label">
                Ảnh Nền
              </CFormLabel>
              <CCol sm={8}>
                <CFormInput
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  feedbackInvalid={formik.errors?.thumbnail}
                  onChange={(event) => formik.setFieldValue('thumbnail', event.target.files[0])}
                  invalid={!!formik.errors?.thumbnail}
                />
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

      <CModal
        visible={removeCategoryId}
        onClose={() => setRemoveCategoryId(null)}
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Xoá loại sách</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xoá ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRemoveCategoryId(null)}>
            Đóng
          </CButton>
          <CButton
            color="primary"
            onClick={handleRemoveCategory}
            disabled={isLoadingRemoveCategory}
          >
            {isLoadingRemoveCategory ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Categories
