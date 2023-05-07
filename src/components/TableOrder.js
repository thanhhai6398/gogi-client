import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { DELIVERY_METHOD } from '~/utils/enum';
import { formatPrice } from '~/utils/format';
import CustomDataTable from './CustomDataTable';
import getStatusComponent from './Status';
import { formatDate } from '~/utils/dateFormat';

const TableOrder = ({ data, detailButton }) => {
  const columns = [
    {
      name: 'ID',
      width: '50px',
      selector: (row) => row.id,
    },
    {
      name: 'Ngày',
      selector: (row) => formatDate(row.createdDate),
    },
    {
      name: 'Địa chỉ',
      grow: 3,
      selector: (row) => row.customer.address,
    },
    {
      name: 'SĐT',
      selector: (row) => row.customer.phone,
    },
    {
      name: 'Tổng đơn',
      selector: (row) => formatPrice(row.total),
    },
    {
      name: 'Phương thức',
      selector: (row) => {
        return row.orderType === DELIVERY_METHOD[0].id ? (
          <div>Tại cửa hàng</div>
        ) : (
          <div>Giao hàng</div>
        );
      },
    },
    {
      name: 'Trạng thái',
      selector: (row) => getStatusComponent(row.status),
    },
    {
      name: 'Chi tiết',
      button: true,
      cell: (row) => (
        <Link to={detailButton ? `/employee/orders/${row.id}` : '#'}>
          {' '}
          <Icon icon='mdi:eye-plus-outline' />
        </Link>
      ),
      style: {
        color: 'var(--primary-color)',
        cursor: 'pointer',
        fontSize: '1.8rem',
      },
    },
    {
      name: 'Nhân viên',
      selector: (row) => row.employee_name,
    },
  ];
  return (
    <div className='table-wrapper'>
      <CustomDataTable data={data} columns={columns} />
    </div>
  );
};

export default TableOrder;
