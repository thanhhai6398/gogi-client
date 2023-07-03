import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './ManageOrders.module.scss';
import { ORDER_STATUS } from '~/utils/enum';
import Clickable from '~/components/Clickable';
import TableOrder from '~/components/TableOrder';
import { httpGetOrderByStoreId } from '~/apiServices/orderServices';
import { Icon } from '@iconify/react';
import { useAuth } from '~/hooks';

const cx = className.bind(styles);

const ManageOrders = () => {
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [dataRow, setDataRow] = useState(data);
  const [userPhone, setUserPhone] = useState('');
  const [status, setStatus] = useState(-1);
  const getOrderByStoreId = async () => {
    const res = await httpGetOrderByStoreId(auth?.employeeInfo?.storeId);
    if (res.data) {
      setData(res.data);
      setDataRow(res.data);
    }
  };
  const handleFilterByUserphone = async (e) => {
    setUserPhone(e.target.value.trim());
    if (e.target.value.trim().length >= 10) {
      const result = data?.filter(
        (item) => item?.customer?.phone === e.target.value.trim()
      );
      setDataRow(result);
    }
  };
  const handleFilterByStatus = async (e) => {
    setStatus(e.target.value);
    const status = Number.parseInt(e.target.value);
    const result = data?.filter(
      (item) => status === -1 || item.status === status
    );
    setDataRow(result);
  };
  useEffect(() => {
    getOrderByStoreId();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <h1>Quản lý đơn hàng</h1>
      <div className={cx('filter')}>
        <div className={cx('filter-item', 'icon')}>
          <Icon
            onClick={() => {
              getOrderByStoreId();
              setStatus(-1);
              setUserPhone('');
            }}
            icon='mdi:reload'
          />
        </div>
        <div className={cx('filter-item')}>
          <input
            type='phone'
            value={userPhone}
            onChange={(e) => handleFilterByUserphone(e)}
            placeholder='Tìm bằng số điện thoại'
          />
        </div>
        <div className={cx('filter-item')}>
          <select
            name='order-status'
            value={status}
            onChange={(e) => handleFilterByStatus(e)}
          >
            <option key={'all'} value={-1}>
              Tất cả
            </option>
            {Object.values(ORDER_STATUS).map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('filter-item')}>
          <Clickable primary text='Tải xuống' />
        </div>
      </div>
      <TableOrder data={dataRow} detailButton />
    </div>
  );
};

export default ManageOrders;
