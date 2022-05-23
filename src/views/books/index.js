import {
  CButton,
  CCol,
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
import React, { useState } from 'react'
import { formatDate } from 'src/helpers/dayjs'

import CreateBookComponent from './createBook'
import { useBooks } from '../../hooks/useBook'
import { useCategory } from 'src/hooks/useCategory'
import { useMutation, useQueryClient } from 'react-query'
import { removeBook } from 'src/services/book.service'
import Skeleton from 'react-loading-skeleton'
import { BOOK } from 'src/constants/queriesKey'
import debounce from 'lodash.debounce'
import { checkAdmin } from 'src/helpers'
import { useProfile } from 'src/hooks/useAdmin'
import { toast } from 'react-toastify'

const Books = () => {
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)
  const [updateBookId, setUpdateBookId] = useState()
  const [removeBookId, setRemoveBookId] = useState()
  const [preview, setPreview] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [page, setPage] = useState(1)

  const { data: categories } = useCategory()
  const { data: books, isLoading } = useBooks({ searchKey, pageNumber: page })
  const { data: user } = useProfile()

  const onClose = () => {
    setIsOpen(false)
    setUpdateBookId(null)
  }

  const { mutate: handleRemoveBook, isLoading: isLoadingRemoveBook } = useMutation(
    async () => {
      const res = await removeBook({ bookId: removeBookId })

      return res.data
    },
    {
      onSuccess: async () => {
        setRemoveBookId(null)
        await queryClient.invalidateQueries(BOOK)
        toast.success('Thay Đổi Thành Công')
      },
      onError: () => {
        toast.error('Có Lỗi Xảy ra')
      },
    },
  )

  const searchBook = debounce((e) => {
    setSearchKey(e.target.value)
  }, 500)

  return (
    <div>
      <div className="mb-3 d-flex">
        <CRow xs={{ gutterX: 5 }} className="flex-grow-1">
          <CCol md={3} xs="auto">
            <CFormLabel htmlFor="name">Tên Sách</CFormLabel>
            <CFormInput id="name" type="text" placeholder="Chí Phèo..." onChange={searchBook} />
          </CCol>

          <CCol md={3} xs="auto">
            <CFormLabel htmlFor="name">Kì Học</CFormLabel>
            <CFormSelect
              options={[
                { label: 'Lựa Chọn', value: null },
                ...Array.from({ length: 10 }, (_, i) => ({ label: `Kì ${i + 1}`, value: i + 1 })),
              ]}
            />
          </CCol>

          <CCol md={3} xs="auto">
            <CFormLabel htmlFor="name">Loại Sách</CFormLabel>
            {categories?.data?.map((category) => (
              <CFormCheck key={category.id} label={category.categoryName} />
            ))}
          </CCol>
        </CRow>

        {checkAdmin(user?.role) && (
          <div className="d-flex align-items-center">
            <CButton color="success" className="text-white" onClick={() => setIsOpen(true)}>
              Thêm Mới
            </CButton>
          </div>
        )}
      </div>

      <CTable bordered hover align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Thứ Tự</CTableHeaderCell>
            <CTableHeaderCell>Ảnh</CTableHeaderCell>
            <CTableHeaderCell>Tên Sách</CTableHeaderCell>
            <CTableHeaderCell>Loại Sách</CTableHeaderCell>
            <CTableHeaderCell>Số Lượng</CTableHeaderCell>
            <CTableHeaderCell>Kì Học</CTableHeaderCell>
            <CTableHeaderCell>Cập nhật Lần Cuối</CTableHeaderCell>
            {checkAdmin(user?.role) && <CTableHeaderCell className="action-column" />}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {books?.data?.map((book, index) => (
            <CTableRow key={book.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>
                <CImage rounded width={70} height={50} src={book.thumbnail} />
              </CTableDataCell>
              <CTableDataCell
                className="text-primary text-underline cursor-pointer"
                onClick={() => setPreview(book.pdfFile)}
              >
                {book.title}
              </CTableDataCell>
              <CTableDataCell>{book.categoryCode}</CTableDataCell>
              <CTableDataCell>{book.quantity}</CTableDataCell>
              <CTableDataCell>Kì {book.term}</CTableDataCell>
              <CTableDataCell>{formatDate(book.updatedAt || book.createdAt)}</CTableDataCell>
              {checkAdmin(user?.role) && (
                <CTableDataCell className="d-flex justify-content-evenly mt-3">
                  <CButton onClick={() => setUpdateBookId(book.id)}>Cập Nhật</CButton>
                  <CButton
                    color="danger"
                    className="text-white"
                    onClick={() => setRemoveBookId(book.id)}
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

      <CPagination align="end">
        <CPaginationItem aria-label="Trang Trước" disabled={page === 1}>
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {Array.from({ length: Math.round(books?.totalRecords / books?.pageSize) + 1 }, (_, i) => (
          <CPaginationItem active={i + 1 === page} onClick={() => setPage(i + 1)}>
            {i + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          aria-label="Next"
          disabled={page >= Math.round(books?.totalRecords / books?.pageSize) + 1}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>

      <CreateBookComponent
        isOpen={isOpen}
        onClose={onClose}
        updateBookId={updateBookId}
        book={books?.data?.find((book) => book.id === updateBookId)}
      />

      <CModal visible={removeBookId} onClose={() => setRemoveBookId(null)} alignment="center">
        <CModalHeader>
          <CModalTitle>Xoá sách</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xoá ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setRemoveBookId(null)}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleRemoveBook} disabled={isLoadingRemoveBook}>
            {isLoadingRemoveBook ? 'Loading...' : 'Lưu Thay Đổi'}
          </CButton>
        </CModalFooter>
      </CModal>

      {preview && (
        <CModal visible={!!preview} onClose={() => setPreview(false)} alignment="center" size="xl">
          <CModalBody>
            <iframe
              src={`https://drive.google.com/viewerng/viewer?url=${preview}&embedded=true`}
              style={{ width: '100%', height: '75vh' }}
            ></iframe>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setPreview(false)}>
              Đóng
            </CButton>
            <CButton color="primary" disabled={isLoadingRemoveBook}>
              <a href={preview} target="_blank" rel="noreferrer" className="text-white">
                {'Download'}
              </a>
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </div>
  )
}

export default Books
