import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goHomePage = () => navigate('/');

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className='flexGrow'>
        <button onClick={goHomePage}>Go home page</button>
      </div>
    </section>
  );
};

export default Unauthorized;
