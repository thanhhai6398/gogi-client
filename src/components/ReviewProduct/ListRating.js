import React from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewProduct.module.scss';
import { RatingJustShow } from './Rating';
import { getDiffFromNow } from '~/utils/dateFormat';
import { capitalizeFirstLetter } from '~/utils/format';

const cx = classNames.bind(styles);

const ListRating = ({ list }) => {
  return (
    <div className={cx('list-rating')}>
      <h2>Đánh giá ({list?.length})</h2>
      {list?.length > 0 ? (
        <ul>
          {list.map((item) => (
            <li key={item.id} className={cx('rating-item')}>
              <div>
                <RatingJustShow point={item?.point} />
                <div className={cx('rating-item__user')}>
                  <h5>{item?.username}</h5>
                  <span>{getDiffFromNow(item?.created_date)}</span>
                </div>
                <p>{capitalizeFirstLetter(item?.content || '')}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'Không có đánh giá nào'
      )}
    </div>
  );
};

export default ListRating;
