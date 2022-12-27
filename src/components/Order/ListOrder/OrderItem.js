import React from 'react';
import className from 'classnames/bind';
import styles from './ListOrder.module.scss';
import { formatPrice } from '~/utils/format';
import { ORDER_STATUS } from '~/utils/enum';

const cx = className.bind(styles);

const OrderItem = ({ order }) => {
  return (
    <div key={order.id} className={cx('order-item')}>
      <div className={cx('header')}>
        <span>Mã đơn hàng: {order.id}</span>
        <span>
          Ngày đặt:{' '}
          {order.createdDate.slice(0, 10).split('-').reverse().join('/')}
        </span>
      </div>
      <div className={cx('content')}>
        <div className={cx('product')}>
          {order.details.map((item) => (
            <div className={cx('product-item')}>
              <img alt={item.productName} src={item.imgURL}></img>
              <div className={cx('product-item-info')}>
                <span>{item.productName}</span>
                <br />
                <span>Size: {item.size}</span>
                <br />
                <span>
                  {item.quantity ?? 1} x{' '}
                  <span className={cx('price')}>{formatPrice(item.price)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={cx('total')}>
          <p className={cx('price')}>{formatPrice(order.total)}</p>
          <p>{Object.values(ORDER_STATUS)[order.status].name}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;