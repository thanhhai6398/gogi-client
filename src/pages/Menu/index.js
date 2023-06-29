import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Menu.module.scss';
import { httpGetAvailableCategories } from '../../apiServices/categoryServices';
import ListProduct from '../../components/Product/ListProduct';
import Pagination from '../../components/Pagination';
import {
  httpGetProductByCateId,
  httpGetAllProduct,
} from '../../apiServices/productServices';
const cx = className.bind(styles);

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { id } = useParams();
  const [data, setData] = useState({
    products: [],
    totalPages: 0,
  });
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getAllAvailableCategories = async () => {
      const response = await httpGetAvailableCategories();
      setMenu(response.data);
    };
    getAllAvailableCategories();
    if (id === 'all') {
      getProductAll();
    } else {
      getProductByCateId();
    }
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const getProductByCateId = async () => {
    const response = await httpGetProductByCateId(id, 6, page);
    setData({
      products: response.data.content,
      totalPages: response.data.totalPages,
    });
  };

  const getProductAll = async () => {
    const response = await httpGetAllProduct(6, page);
    setData({
      products: response.data.content,
      totalPages: response.data.totalPages,
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id === 'all') {
      getProductAll();
    } else {
      getProductByCateId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <div className={cx('container', 'wrap')}>
      <div className={cx('col', 'menu')}>
        <Link to='/menu/all'>
          <h3>Danh mục</h3>
        </Link>
        <ul>
          {menu &&
            menu
              .filter((item) => item.status)
              .map((menuItem) => (
                <li
                  className={cx('category', {
                    active: Number.parseInt(id) === menuItem.id,
                  })}
                  key={menuItem.id}
                >
                  <Link to={`/menu/${menuItem.id}`}>
                    <b>{menuItem.name}</b>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
      <div className={cx('col', 'product')}>
        <ListProduct product={data.products} />
        <Pagination
          onPageChange={(page) => setPage(page)}
          totalPages={data.totalPages}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default Menu;
