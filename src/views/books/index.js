import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { formatDate } from 'src/helpers/dayjs'

const Books = () => {
  const books = [
    {
      id: 'b98e0228-27cb-4660-948b-bb8f8cb6eb32',
      quantity: 10,
      description: 'Chị Dậu',
      categoryCode: 'VanHoc',
      categoryId: '2d09f8db-4fc4-4385-9090-fa188946ca7c',
      thumbnail: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      pdfFile: 'pdf/vanhoc/vochongaphu',
      createdAt: '2022-05-09T09:31:08.334396+00:00',
      updatedAt: '2022-05-09T09:31:08.3343975+00:00',
      deletedAt: null,
      status: 0,
    },
    {
      id: '3d2f52c3-817b-451e-9ad4-a894417e981c',
      quantity: 10,
      description: 'Chung một dòng sông',
      categoryCode: 'TieuThuyet',
      categoryId: '42296bb8-c8a1-43a9-92f2-e8a5fa9e7b5a',
      thumbnail:
        'https://vcdn1-giaitri.vnecdn.net/2015/10/09/nhungnudienvienvietnamdinhdamt-3800-2234-1444375437.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=L4GXfRlPP3dPrdMbW79PHw',
      pdfFile: 'pdf/vanhoc/vochongaphu',
      createdAt: '2022-05-09T09:31:08.3343982+00:00',
      updatedAt: '2022-05-09T09:31:08.3343983+00:00',
      deletedAt: null,
      status: 0,
    },
    {
      id: 'b98e0228-27cb-4660-948b-bb8f8cb6eb32',
      quantity: 10,
      description: 'Chị Dậu',
      categoryCode: 'VanHoc',
      categoryId: '2d09f8db-4fc4-4385-9090-fa188946ca7c',
      thumbnail: 'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_nsozxd/2020_09_22/1.jpg',
      pdfFile: 'pdf/vanhoc/vochongaphu',
      createdAt: '2022-05-09T09:31:08.334396+00:00',
      updatedAt: '2022-05-09T09:31:08.3343975+00:00',
      deletedAt: null,
      status: 0,
    },
    {
      id: '3d2f52c3-817b-451e-9ad4-a894417e981c',
      quantity: 10,
      description: 'Chung một dòng sông',
      categoryCode: 'TieuThuyet',
      categoryId: '42296bb8-c8a1-43a9-92f2-e8a5fa9e7b5a',
      thumbnail:
        'https://vcdn1-giaitri.vnecdn.net/2015/10/09/nhungnudienvienvietnamdinhdamt-3800-2234-1444375437.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=L4GXfRlPP3dPrdMbW79PHw',
      pdfFile: 'pdf/vanhoc/vochongaphu',
      createdAt: '2022-05-09T09:31:08.3343982+00:00',
      updatedAt: '2022-05-09T09:31:08.3343983+00:00',
      deletedAt: null,
      status: 0,
    },
  ]

  const categories = ['TieuThuyet', 'VanHoc', 'TrinhTham']

  return (
    <div>
      <div className="mb-3 d-flex">
        <CRow xs={{ gutterX: 5 }} className="flex-grow-1">
          <CCol md={3} xs="auto">
            <CFormLabel htmlFor="name">Tên Sách</CFormLabel>
            <CFormInput id="name" type="text" placeholder="Chí Phèo..." />
          </CCol>

          <CCol md={3} xs="auto">
            <CFormLabel htmlFor="name">Loại Sách</CFormLabel>
            {categories.map((category) => (
              <CFormCheck key={category} label={category} />
            ))}
          </CCol>
        </CRow>

        <div className="d-flex align-items-center">
          <CButton color="success" className="text-white">
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
            <CTableHeaderCell>Loại Sách</CTableHeaderCell>
            <CTableHeaderCell>Số Lượng</CTableHeaderCell>
            <CTableHeaderCell>Cập nhật Lần Cuối</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {books.map((book, index) => (
            <CTableRow key={book.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>
                <CImage rounded fluid width={70} height={70} src={book.thumbnail} />
              </CTableDataCell>
              <CTableDataCell>{book.description}</CTableDataCell>
              <CTableDataCell>{book.categoryCode}</CTableDataCell>
              <CTableDataCell>{book.quantity}</CTableDataCell>
              <CTableDataCell>{formatDate(book.updatedAt)}</CTableDataCell>
              <CTableDataCell className="d-flex justify-content-evenly">
                <CButton>Cập Nhật</CButton>
                <CButton color="danger" className="text-white">
                  Xóa
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Books
