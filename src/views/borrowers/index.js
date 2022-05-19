import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
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
import { useFormik } from 'formik'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useMutation, useQueryClient } from 'react-query'
import { diff, formatDate } from 'src/helpers/dayjs'
import { useBooks } from 'src/hooks/useBook'
import { useCategory } from 'src/hooks/useCategory'
import { useUsers } from 'src/hooks/useUser'
import { createBorrower } from 'src/services/borrower.service'
import { createBorrowerSchema, updateBorrowerSchema } from './validate'
import AutoCompleteComponent from 'src/components/Autocomplete'

const Borrowers = () => {
  const queryCache = useQueryClient()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [updateBorrowerId, setUpdateBorrowerId] = useState()
  const [searchUserKey, setSearchUserKey] = useState()
  const [searchBookKey, setSearchBookKey] = useState()

  const { data: categories } = useCategory()
  const { data: books } = useBooks({})
  const { data: users } = useUsers()

  const data = [
    {
      id: 1,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 2,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
      return_date: '',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 3,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
      return_date: '2021/5/1',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 4,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'test test',
    },
    {
      id: 5,
      image: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      user_name: 'user test',
      book_name: 'Ch Dau',
      quantity: 2,
      register_date: '2021/1/1',
      borrower_date: '2021/1/4',
      return_date: '2021/3/1',
      promise_return_date: '2021/4/1',
      note: 'Below are examples which also can be edited directly via the editor on the left side and will be rendered on the right.',
    },
  ]

  const { mutate: onSubmit, isLoading: isLoadingSubmit } = useMutation(
    async () => {
      const res = await createBorrower({ ...formik.values })

      return res.data
    },
    {
      onSuccess: async () => {
        onClose()
        await queryCache.invalidateQueries()
      },
      onError: () => {},
    },
  )

  const formik = useFormik({
    initialValues: {
      studentIdentify: '',
      bookId: '',
      expiredDate: '',
    },
    validationSchema: updateBorrowerId ? updateBorrowerSchema : createBorrowerSchema,
    onSubmit: onSubmit,
  })

  const onClose = () => {
    setIsOpenModal(false)
    setUpdateBorrowerId(null)
  }

  console.log(formik.values)

  return (
    <div>
      <div className="mb-3 d-flex">
        <CRow xs={{ gutterX: 5 }} className="flex-grow-1 mb-3">
          <CCol md={2} xs="auto">
            <CFormLabel>Tên Người Đọc</CFormLabel>
            <CFormInput type="text" placeholder="Nguyễn Văn A..." />
          </CCol>

          <CCol md={2} xs="auto">
            <CFormLabel>Tên Sách</CFormLabel>
            <CFormInput type="text" placeholder="Chí Phèo..." />
          </CCol>

          <CCol md={2} xs="auto">
            <CFormLabel htmlFor="name">Kì Học</CFormLabel>
            <CFormSelect
              options={[
                { label: 'Lựa Chọn', value: null },
                ...Array.from({ length: 10 }, (_, i) => ({ label: `Kì ${i + 1}`, value: i + 1 })),
              ]}
            />
          </CCol>

          <CCol md={1.5} xs="auto">
            <CFormLabel htmlFor="name">Loại Sách</CFormLabel>
            {categories?.data?.map((category) => (
              <CFormCheck
                key={category.id}
                label={category.categoryName}
                value={category.categoryName}
              />
            ))}
          </CCol>

          <CCol md={1.5} xs="auto">
            <CFormLabel htmlFor="name">Trạng Thái</CFormLabel>
            <CFormCheck type="radio" label="Đúng Hạn" name="hiringStatus" value="1" />
            <CFormCheck type="radio" label="Quá Hạn" name="hiringStatus" value="2" />
          </CCol>
        </CRow>

        <div className="d-flex align-items-center">
          <CButton color="success" className="text-white" onClick={() => setIsOpenModal(true)}>
            Thêm Mới
          </CButton>
        </div>
      </div>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Ảnh</CTableHeaderCell>
            <CTableHeaderCell>Tên Sách</CTableHeaderCell>
            <CTableHeaderCell>Người Đọc</CTableHeaderCell>
            <CTableHeaderCell>Ngày Mượn (Thực Tế)</CTableHeaderCell>
            <CTableHeaderCell>Ngày Trả (Dự Kiến)</CTableHeaderCell>
            <CTableHeaderCell>Ngày Trả (Thực Tế)</CTableHeaderCell>
            <CTableHeaderCell className="max-w-250">Ghi Chú</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((record, index) => (
            <CTableRow key={record.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>
                <CImage rounded fluid width={70} height={70} src={record.image} />
              </CTableDataCell>
              <CTableDataCell>{record.book_name}</CTableDataCell>
              <CTableDataCell>{record.user_name}</CTableDataCell>
              <CTableDataCell>{formatDate(record.borrower_date)}</CTableDataCell>
              <CTableDataCell>{formatDate(record.promise_return_date)}</CTableDataCell>
              <CTableDataCell>
                <span
                  className={`${
                    (!record.return_date && diff(new Date(), record.promise_return_date) > 0) ||
                    (record.return_date && diff(record.return_date, record.promise_return_date) > 0)
                      ? 'text-danger'
                      : 'text-success'
                  }`}
                >
                  {formatDate(record.return_date) || 'Chưa Trả'}
                </span>
              </CTableDataCell>
              <CTableDataCell className="max-w-250">
                <div className="note-column">{record.note}</div>
              </CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => setUpdateBorrowerId(record.id)}>Cập Nhật</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal visible={isOpenModal || updateBorrowerId} onClose={onClose} alignment="center">
        <CModalHeader>
          <CModalTitle>{updateBorrowerId ? 'Cập nhật mượn sách' : 'Mượn sách'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                Tên Sách
              </CFormLabel>
              <CCol sm={8}>
                {books && (
                  <AutoCompleteComponent
                    items={books}
                    searchKey={searchBookKey}
                    setSearchKey={setSearchBookKey}
                    onSelect={(value) => formik.setFieldValue('bookId', value.id)}
                    label="title"
                  />
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="studentIdentify" className="col-sm-4 col-form-label">
                Người Mượn
              </CFormLabel>
              <CCol sm={8}>
                {users && (
                  <AutoCompleteComponent
                    items={users}
                    searchKey={searchUserKey}
                    setSearchKey={setSearchUserKey}
                    onSelect={(value) =>
                      formik.setFieldValue('studentIdentify', value.studentIdentify)
                    }
                    label="studentIdentify"
                  />
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel htmlFor="expiredDate" className="col-sm-4 col-form-label">
                Hạn Trả
              </CFormLabel>
              <CCol sm={8}>
                <DatePicker
                  id="expiredDate"
                  name="expiredDate"
                  className="datePicker"
                  selected={formik.values?.expiredDate}
                  onChange={(value) => formik.setFieldValue('expiredDate', value || '')}
                />

                {formik.errors.expiredDate && (
                  <div className="error">{formik.errors.expiredDate}</div>
                )}
              </CCol>
            </CRow>

            {updateBorrowerId && (
              <>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="expiredDate" className="col-sm-4 col-form-label">
                    Ngày Mượn
                  </CFormLabel>
                  <CCol sm={8}>
                    <DatePicker
                      id="expiredDate"
                      name="expiredDate"
                      className="datePicker"
                      disabled
                      selected={formik.values?.expiredDate}
                      onChange={(value) => formik.setFieldValue('expiredDate', value || '')}
                    />

                    {formik.errors.expiredDate && (
                      <div className="error">{formik.errors.expiredDate}</div>
                    )}
                  </CCol>
                </CRow>

                <CRow className="mb-3">
                  <CFormLabel htmlFor="expiredDate" className="col-sm-4 col-form-label">
                    Ngày Trả
                  </CFormLabel>
                  <CCol sm={8}>
                    <DatePicker
                      id="expiredDate"
                      name="expiredDate"
                      className="datePicker"
                      disabled
                      selected={formik.values?.expiredDate}
                      onChange={(value) => formik.setFieldValue('expiredDate', value || '')}
                    />

                    {formik.errors.expiredDate && (
                      <div className="error">{formik.errors.expiredDate}</div>
                    )}
                  </CCol>
                </CRow>
              </>
            )}
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={formik.handleSubmit} disabled={isLoadingSubmit}>
            {isLoadingSubmit ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Borrowers
