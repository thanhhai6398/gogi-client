import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import { Icon } from '@iconify/react';
import styles from './Header.module.scss';
import NavLink from '../NavLink';
import Search from '../Search';
import logo from '~/assets/images/logo.png';
import useCart from '../../../hooks/useCart';

const cx = className.bind(styles);
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [toggle, setTonggle] = useState(false);
  const { cart } = useCart();
  return (
    <div>
      <header className={cx('wrapper')}>
        <div>
          <ul className={cx('top-nav')}>
            <li>
              <Link to='stores'>
                <Icon icon='bx:map' className={cx('icon')} />
                <span>154 cửa hàng trên cả nước</span>
              </Link>
            </li>
            <li>
              <Link to='stores'>
                <Icon icon='bx:phone-call' className={cx('icon')} />
                <span>Đặt hàng: 180018545</span>
              </Link>
            </li>
            <li>
              <Link to='stores'>
                <Icon icon='bx:smile' className={cx('icon')} />
                <span>Freeship từ đơn 50K</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx('mobile-navbar')}>
          <div className={cx('icon')} onClick={() => setTonggle(!toggle)}>
            <Icon icon='ant-design:menu-outlined' />
          </div>
          <div className={cx('left')}>
            <div className={cx('icon')}>
              {!searchOpen && (
                <Icon
                  icon='bx:search-alt-2'
                  onClick={() => setSearchOpen(true)}
                />
              )}
              {searchOpen && (
                <Icon
                  icon='fa-solid:times'
                  onClick={() => setSearchOpen(false)}
                />
              )}
            </div>
            <Link to='/personal' className={cx('icon')}>
              <Icon icon='bx:user' />
            </Link>
            <Link to='/checkout' className={cx('icon', 'cart')}>
              <Icon icon='bx:cart-alt' />
              <span>
                {cart.length > 0
                  ? cart?.reduce((count, item) => {
                      return (count += item.quantity);
                    }, 0)
                  : 0}
              </span>
            </Link>
          </div>
          <div className={cx('logo')}>
            <Link to='/'>GOGI</Link>
          </div>
        </div>
        <nav className={cx('nav-bar', 'container', { open: toggle })}>
          <div className={cx('logo')}>
            <Link to='/'>
              <img src={logo} alt='Gigo' />
            </Link>
          </div>
          <ul className={cx('nav-links')}>
            <NavLink />
          </ul>
          <div className={cx('left')}>
            <div className={cx('icon')}>
              {!searchOpen && (
                <Icon
                  icon='bx:search-alt-2'
                  onClick={() => setSearchOpen(true)}
                />
              )}
              {searchOpen && (
                <Icon
                  icon='fa-solid:times'
                  onClick={() => setSearchOpen(false)}
                />
              )}
            </div>
            <Link to='/personal' className={cx('icon')}>
              <Icon icon='bx:user' />
            </Link>
            <Link to='/checkout' className={cx('icon', 'cart')}>
              <Icon icon='bx:cart-alt' />
              <span>
                {cart.length > 0
                  ? cart?.reduce((count, item) => {
                      return (count += item.quantity);
                    }, 0)
                  : 0}
              </span>
            </Link>
          </div>
        </nav>
        {searchOpen && <Search open={searchOpen} setOpen={setSearchOpen} />}
      </header>
    </div>
  );
};

export default Header;
