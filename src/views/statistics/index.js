import React from 'react'

import { CChart } from '@coreui/react-chartjs'
import { CCol, CRow } from '@coreui/react'
import { useExpiredBook, useHiringBook, useReturnBook } from 'src/hooks/useBook'

const Statistics = () => {
  const { data: hiringBook } = useHiringBook({})
  const { data: returnedBook } = useReturnBook({})
  const { data: expiredBook } = useExpiredBook({})

  console.log(hiringBook, returnedBook, expiredBook)
  return (
    <div className="pb-5">
      <CRow>
        <CCol md={1} />
        <CCol md={3}>
          <CChart
            type="doughnut"
            data={{
              labels: ['Đang mượn', 'Đã trả', 'Quá hạn'],
              datasets: [
                {
                  backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                  data: [
                    hiringBook?.data?.length,
                    returnedBook?.data?.length,
                    expiredBook?.data?.length,
                  ],
                },
              ],
            }}
          />

          <div className="mt-3 text-center">Biểu Đồ Sử Dụng Sách</div>
        </CCol>

        <CCol md={1} />

        <CCol md={1} />
      </CRow>

      <div className="mt-5">
        <CRow>
          <CCol md={1} />
          <CCol md={10}>
            <CChart
              type="line"
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Lượt Đọc Online',
                    backgroundColor: 'rgba(220, 220, 220, 0.2)',
                    borderColor: 'rgba(220, 220, 220, 1)',
                    pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                    pointBorderColor: '#fff',
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                  },
                  {
                    label: 'Lượt Mượn Sách',
                    backgroundColor: 'rgba(151, 187, 205, 0.2)',
                    borderColor: 'rgba(151, 187, 205, 1)',
                    pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                    pointBorderColor: '#fff',
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
                  },
                ],
              }}
            />
            <div className="mt-3 text-center">Biểu Đồ Mượn Sách</div>
          </CCol>
          <CCol md={1} />
        </CRow>
      </div>
    </div>
  )
}

export default Statistics
