import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Register.module.scss';
import Clickable from '~/components/Clickable';
import FormValidation from '~/components/Form/FormValidation';
import FormInput from '~/components/Form/FormInput';
import { useToastError } from '~/hooks';
import { httpRegister } from '~/apiServices/authServices';
import { toast } from 'react-toastify';
import ValidationRegex from '~/utils/validationRegex';

const cx = className.bind(styles);
const initValue = { username: '', email: '', password: '' };

function Register() {
  const navigate = useNavigate();
  const { showToastError } = useToastError();
  const [user, setUser] = useState(initValue);
  const formInputs = [
    {
      id: 1,
      type: 'phone',
      name: 'username',
      placeholder: 'Số điện thoại',
      required: true,
      pattern: ValidationRegex.phone.pattern,
      message: ValidationRegex.phone.message,
    },
    {
      id: 2,
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      required: true,
      pattern: ValidationRegex.email.pattern,
      message: ValidationRegex.email.message,
    },
    {
      id: 3,
      type: 'password',
      name: 'password',
      placeholder: 'Mật khẩu',
      required: true,
      pattern: ValidationRegex.password.pattern,
      message: ValidationRegex.password.message,
    },
    {
      id: 4,
      type: 'password',
      name: 'confirmPassword',
      placeholder: 'Nhập lại mật khẩu',
      required: true,
      pattern: (value) => value === user.password,
      message: 'Mật khẩu không trùng khớp',
    },
  ];
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, formValidated, setSubmitting) => {
    e.preventDefault();
    if (!formValidated) {
      return;
    }
    setSubmitting(true);
    try {
      const newUser = {
        username: user.username,
        email: user.email,
        password: user.password,
      };
      await httpRegister(newUser);
      setUser(initValue);
      toast.success('Tạo tài khoản thành công', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/auth');
      }, 1000);
    } catch (error) {
      console.log(error);
      showToastError(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className={cx('container', 'wrapper')}>
      <h1>Đăng ký</h1>
      <p>
        Đã có tài khoản?<span onClick={() => navigate('/auth')}>Đăng nhập</span>
      </p>
      <FormValidation>
        {({ formValidated, setValidated, setSubmitting }) => (
          <form
            onSubmit={(e) => handleSubmit(e, formValidated, setSubmitting)}
            className={cx('form')}
          >
            {formInputs.map((formInput) => (
              <FormInput
                key={formInput.id}
                value={user[formInput.name]}
                onChange={handleChange}
                setValidated={setValidated}
                {...formInput}
              />
            ))}
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              href='/'
            >
              Quay lại trang chủ
            </a>
            <Clickable text='Đăng ký' primary />
          </form>
        )}
      </FormValidation>
    </div>
  );
}

export default Register;
