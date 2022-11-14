import React from 'react'
import className from 'classnames/bind'
import styles from './Clickable.module.scss'

const cx = className.bind(styles)

const Clickable = (props) => {
  const { onClick, text, primary, second } = props
  return (
    <button
      onClick={onClick}
      className={cx('btn', { primary: primary }, { second: second })}
    >
      {text}
    </button>
  )
}

export default Clickable