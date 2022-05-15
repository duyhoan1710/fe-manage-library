import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

const Users = () => {
  const data = [
    {
      id: 1,
      full_name: 'Nguyen Duy Hoan',
      code: 'CT000000',
      email: 'CT00000@actvn.edu.vn',
      phone: '0123456789',
    },
    {
      id: 2,
      full_name: 'Nguyen Duy Hoan',
      code: 'CT000000',
      email: 'CT00000@actvn.edu.vn',
      phone: '0123456789',
    },
    {
      id: 3,
      full_name: 'Nguyen Duy Hoan',
      code: 'CT000000',
      email: 'CT00000@actvn.edu.vn',
      phone: '0123456789',
    },
    {
      id: 4,
      full_name: 'Nguyen Duy Hoan',
      code: 'CT000000',
      email: 'CT00000@actvn.edu.vn',
      phone: '0123456789',
    },
    {
      id: 5,
      full_name: 'Nguyen Duy Hoan',
      code: 'CT000000',
      email: 'CT00000@actvn.edu.vn',
      phone: '0123456789',
    },
  ]

  return (
    <div>
      <div className="d-flex">
        <CRow xs={{ gutterX: 5 }} className="flex-grow-1 mb-3">
          <CCol md={2} xs="auto">
            <CFormLabel>Tên Người Dùng</CFormLabel>
            <CFormInput type="text" placeholder="Nguyễn Văn A..." />
          </CCol>

          <CCol md={2} xs="auto">
            <CFormLabel>Mã Sinh Viên</CFormLabel>
            <CFormInput type="text" placeholder="CT0000000" />
          </CCol>

          <CCol md={2} xs="auto">
            <CFormLabel>Email</CFormLabel>
            <CFormInput type="text" placeholder="CT00000@actvn.edu.vn" />
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
            <CTableHeaderCell>Mã Sinh Viên</CTableHeaderCell>
            <CTableHeaderCell>Họ và Tên</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Số Điện Thoại</CTableHeaderCell>
            <CTableHeaderCell className="action-column" />
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((record, index) => (
            <CTableRow key={record.id}>
              <CTableHeaderCell>{index + 1}</CTableHeaderCell>
              <CTableDataCell>{record.code}</CTableDataCell>
              <CTableDataCell>{record.full_name}</CTableDataCell>
              <CTableDataCell>{record.email}</CTableDataCell>
              <CTableDataCell>{record.phone}</CTableDataCell>
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

export default Users
