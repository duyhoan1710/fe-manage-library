import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import React, { useState, useMemo, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import { useMutation, useQueryClient } from 'react-query'
import { diff, formatDate } from 'src/helpers/dayjs'
import { useBooks } from 'src/hooks/useBook'
import { useCategory } from 'src/hooks/useCategory'
import { useUsers } from 'src/hooks/useUser'
import { useBorrowers, usePromiseBorrowers } from 'src/hooks/useBorrower'
import { createBorrower, updateBorrower } from 'src/services/borrower.service'
import { createBorrowerSchema, updateBorrowerSchema } from './validate'
import AutoCompleteComponent from 'src/components/Autocomplete'
import Select from 'react-select'
import Skeleton from 'react-loading-skeleton'
import debounce from 'lodash.debounce'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import * as dayjs from 'dayjs'
import { PROMISE_BORROWER } from 'src/constants/queriesKey'

const PromiseReturn = () => {
  const queryCache = useQueryClient()

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [updateBorrowerId, setUpdateBorrowerId] = useState()
  const [searchUserKey, setSearchUserKey] = useState()
  const [searchAddUser, setSearchAddUser] = useState()
  const [searchBookKey, setSearchBookKey] = useState(undefined)
  const [term, setTerm] = useState()
  const [categoryId, setCategoryId] = useState()
  const [status, setStatus] = useState()
  const [page, setPage] = useState(1)

  const search = new URLSearchParams(useLocation().search).get('bookName')

  const { data: categories } = useCategory()
  const { data: books } = useBooks({})
  const { data: users } = useUsers()
  const { data: borrower, isLoading } = usePromiseBorrowers({
    readerName: searchUserKey,
    bookName: searchBookKey !== undefined ? searchBookKey : search,
    term: term !== 'Lựa Chọn' ? term : '',
    categoryId,
    isReturned: status === '1' || '',
    isExpired: status === '2' || '',
    pageNumber: page,
    pageSize: 100,
  })

  const { mutate: onSubmit, isLoading: isLoadingSubmit } = useMutation(
    async () => {
      const res = updateBorrowerId
        ? await updateBorrower({ borrowerId: updateBorrowerId, ...formik.values })
        : await createBorrower({ ...formik.values })

      return res.data
    },
    {
      onSuccess: async () => {
        onClose()
        await queryCache.invalidateQueries(PROMISE_BORROWER)
        toast.success('Thay Đổi Thành Công')
      },
      onError: () => {
        toast.error('Có Lỗi Xảy ra')
      },
    },
  )

  const formik = useFormik({
    initialValues: {
      studentIdentify: '',
      bookIds: [],
      expiredDate: '',
      returnDate: '',
      hiredDate: '',
      note: '',
    },
    validationSchema: updateBorrowerId ? updateBorrowerSchema : createBorrowerSchema,
    onSubmit: onSubmit,
  })

  const recordUpdate = useMemo(() => {
    if (updateBorrowerId) {
      const data = borrower?.data?.find((el) => el.id === updateBorrowerId)
      return data
    }
    return {}
  }, [updateBorrowerId])

  useEffect(() => {
    if (updateBorrowerId) {
      const data = borrower?.data?.find((el) => el.id === updateBorrowerId)
      formik.setFieldValue('hiredDate', data.hiredFrom, false)
      formik.setFieldValue(
        'expiredDate',
        data.expiredDate || dayjs(new Date()).add(2, 'M').format('YYYY-MM-DD'),
        false,
      )
      formik.setFieldValue('returnDate', data.returnedDate, false)
      formik.setFieldValue('note', data.note || '', false)
    }
  }, [updateBorrowerId])

  const onClose = () => {
    setIsOpenModal(false)
    setUpdateBorrowerId(null)
  }

  const searchUser = debounce((e) => {
    setSearchUserKey(e.target.value)
  }, 500)

  const searchBook = debounce((e) => {
    setSearchBookKey(e.target.value)
  }, 500)

  return (
    <div>
      <div className="mb-3 d-flex">
        <CRow xs={{ gutterX: 5 }} className="flex-grow-1 mb-3">
          <CCol md={2} xs="auto">
            <CFormLabel>Tên Người Đọc</CFormLabel>
            <CFormInput type="text" placeholder="Nguyễn Văn A..." onChange={searchUser} />
          </CCol>

          <CCol md={2} xs="auto">
            <CFormLabel>Tên Sách</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Chí Phèo..."
              onChange={searchBook}
              defaultValue={search}
            />
          </CCol>

          <CCol md={2} xs="auto">
            <CFormLabel htmlFor="name">Kì Học</CFormLabel>
            <CFormSelect
              options={[
                { label: 'Lựa Chọn', value: '' },
                ...Array.from({ length: 10 }, (_, i) => ({ label: `Kì ${i + 1}`, value: i + 1 })),
              ]}
              onChange={(e) => {
                setTerm(e.target.value)
              }}
            />
          </CCol>

          <CCol md={1.5} xs="auto">
            <CFormLabel htmlFor="name">Loại Sách</CFormLabel>
            <CFormCheck
              type="radio"
              label="Tất Cả"
              name="categoryId"
              value=""
              onChange={(e) => {
                setCategoryId('')
              }}
              defaultChecked
            />
            {categories?.data?.map((category) => (
              <CFormCheck
                type="radio"
                name="categoryId"
                key={category.id}
                label={category.categoryName}
                value={category.id}
                onChange={(e) => {
                  setCategoryId(e.target.value)
                }}
              />
            ))}
          </CCol>
        </CRow>
      </div>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Ảnh</CTableHeaderCell>
            <CTableHeaderCell>Tên Sách</CTableHeaderCell>
            <CTableHeaderCell>Loại Sách</CTableHeaderCell>
            <CTableHeaderCell>Kì Học</CTableHeaderCell>
            <CTableHeaderCell>Người Đọc</CTableHeaderCell>
            <CTableHeaderCell>Mã Sinh Viên</CTableHeaderCell>
            <CTableHeaderCell>Ngày Mượn (Dự Kiến)</CTableHeaderCell>
            <CTableHeaderCell>Ngày Trả (Dự Kiến)</CTableHeaderCell>
            <CTableHeaderCell className="w-150" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {borrower?.data?.map((record, index) => (
            <>
              {record.expiredDate && !record.hiredFrom && (
                <CTableRow>
                  <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                  <CTableDataCell>
                    <CImage rounded width={70} height={50} src={record.thumbnail} />
                  </CTableDataCell>
                  <CTableDataCell>{record.title}</CTableDataCell>
                  <CTableDataCell>{record.categoryCode}</CTableDataCell>
                  <CTableDataCell>Kì {record.term}</CTableDataCell>
                  <CTableDataCell>{record.studentName}</CTableDataCell>
                  <CTableDataCell>{record.studentIdentify}</CTableDataCell>
                  <CTableDataCell>{formatDate(record.esimatingHiredDate)}</CTableDataCell>
                  <CTableDataCell>{formatDate(record.expiredDate)}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      onClick={() => {
                        setUpdateBorrowerId(record.id)
                      }}
                    >
                      Cập Nhật
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )}
            </>
          ))}
        </CTableBody>
      </CTable>

      {isLoading && <Skeleton count={5} />}

      <CPagination align="end">
        <CPaginationItem aria-label="Trang Trước" disabled={page === 1}>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from(
          { length: Math.round(borrower?.totalRecords / borrower?.pageSize) + 1 },
          (_, i) => (
            <CPaginationItem active={i + 1 === page} onClick={() => setPage(i + 1)}>
              {i + 1}
            </CPaginationItem>
          ),
        )}
        <CPaginationItem
          aria-label="Next"
          disabled={page >= Math.round(books?.totalRecords / books?.pageSize) + 1}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>

      {updateBorrowerId && (
        <CModal visible={!!updateBorrowerId} onClose={onClose} alignment="center" size="lg">
          <CModalHeader>
            <CModalTitle>Cập nhật mượn sách</CModalTitle>
          </CModalHeader>
          <CModalBody className="col-md-11 m-auto">
            <CForm>
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label">
                  Tên Sách
                </CFormLabel>
                <CCol sm={8}>
                  {books && (
                    <Select
                      options={[...books.data].map((book) => ({
                        label: book.title,
                        value: book.id,
                      }))}
                      isDisabled={true}
                      onChange={(value) => {
                        formik.setFieldValue(
                          'bookIds',
                          value.map((el) => el.value),
                        )
                      }}
                      value={{ label: recordUpdate.title, value: recordUpdate.bookId }}
                    />
                  )}
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="studentIdentify" className="col-sm-4 col-form-label">
                  Người Đọc
                </CFormLabel>
                <CCol sm={8}>
                  {users && (
                    <AutoCompleteComponent
                      items={users}
                      searchKey={searchAddUser}
                      setSearchKey={setSearchAddUser}
                      onSelect={(value) =>
                        formik.setFieldValue('studentIdentify', value.studentIdentify)
                      }
                      defaultValue={recordUpdate.studentIdentify}
                      disable={true}
                      label="studentIdentify"
                    />
                  )}
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="esimatingHiredDate" className="col-sm-4 col-form-label">
                  Ngày Mượn (Dự Kiến)
                </CFormLabel>
                <CCol sm={8}>
                  <DatePicker
                    id="esimatingHiredDate"
                    name="esimatingHiredDate"
                    className="datePicker"
                    selected={
                      recordUpdate.esimatingHiredDate && new Date(recordUpdate.esimatingHiredDate)
                    }
                    disabled={true}
                    dateFormat="dd/MM/yyyy"
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="expiredDate" className="col-sm-4 col-form-label">
                  Ngày Trả (Dự Kiến)
                </CFormLabel>
                <CCol sm={8}>
                  <DatePicker
                    id="expiredDate"
                    name="expiredDate"
                    className="datePicker"
                    dateFormat="dd/MM/yyyy"
                    selected={formik.values?.expiredDate && new Date(formik.values?.expiredDate)}
                    onChange={(value) => formik.setFieldValue('expiredDate', value || '')}
                  />

                  {formik.errors.expiredDate && (
                    <div className="error">{formik.errors.expiredDate}</div>
                  )}
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="hiredDate" className="col-sm-4 col-form-label">
                  Ngày Mượn (Thực Tế)
                </CFormLabel>
                <CCol sm={8}>
                  <DatePicker
                    id="hiredDate"
                    name="hiredDate"
                    className="datePicker"
                    selected={formik.values?.hiredDate && new Date(formik.values?.hiredDate)}
                    onChange={(value) => formik.setFieldValue('hiredDate', value || '')}
                    dateFormat="dd/MM/yyyy"
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="returnedDate" className="col-sm-4 col-form-label">
                  Ngày Trả (Thực Tế)
                </CFormLabel>
                <CCol sm={8}>
                  <DatePicker
                    id="returnDate"
                    name="returnDate"
                    className="datePicker"
                    dateFormat="dd/MM/yyyy"
                    selected={formik.values?.returnDate && new Date(formik.values?.returnDate)}
                    onChange={(value) => formik.setFieldValue('returnDate', value || '')}
                  />

                  {formik.errors.returnDate && (
                    <div className="error">{formik.errors.returnDate}</div>
                  )}
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CFormLabel htmlFor="note" className="col-sm-4 col-form-label">
                  Mô tả
                </CFormLabel>
                <CCol sm={8}>
                  <CFormTextarea
                    id="note"
                    name="note"
                    rows="5"
                    text="Must be 8-20 words long."
                    feedbackInvalid={formik.errors?.note}
                    onChange={formik.handleChange}
                    invalid={!!formik.errors?.note}
                    value={formik.values?.note}
                  ></CFormTextarea>
                </CCol>
              </CRow>
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
      )}
    </div>
  )
}

export default PromiseReturn
