import React from 'react'

import { CChart } from '@coreui/react-chartjs'
import { CCol, CRow } from '@coreui/react'

const Statistics = () => {
  return (
    <div className="pb-5">
      <CRow>
        <CCol md={1} />
        <CCol md={3} className="d-flex flex-column align-items-center">
          <CChart
            type="doughnut"
            data={{
              labels: ['Đang mượn', 'Đã trả', 'Quá hạn'],
              datasets: [
                {
                  backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                  data: [40, 40, 30],
                },
              ],
            }}
          />

          <div className="mt-3">Biểu Đồ Sử Dụng Sách</div>
        </CCol>

        <CCol md={1} />

        <CCol md={6} className="d-flex flex-column align-items-center">
          <CChart
            type="bar"
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'Số lần mượn',
                  backgroundColor: '#f87979',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                },
              ],
            }}
            labels="months"
          />
          <div className="mt-3">Biểu Đồ Loại Sách Được Mượn</div>
        </CCol>
        <CCol md={1} />
      </CRow>

      <div className="mt-5">
        <CRow>
          <CCol md={1} />
          <CCol md={10} className="d-flex flex-column align-items-center">
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
            <div className="mt-3">Biểu Đồ Mượn Sách</div>
          </CCol>
          <CCol md={1} />
        </CRow>
      </div>
    </div>
  )
}

export default Statistics
