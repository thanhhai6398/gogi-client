

function BlankLayout({ children }) {
  return (
    <div>
      <div className='container'>
        <div className='content'>{children}</div>
      </div>
    </div>
  )
}

export default BlankLayout;