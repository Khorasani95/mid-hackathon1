// import logo from './logo.svg';
import './App.css';
import AuthenticationRoutes from './Authentication/AuthenticationRoutes'
import FrontendRoutes from './frontend/FrontendRoutes';

function App() {
  return (
    <>
    <div className='center-container'>
      <AuthenticationRoutes/>
      <FrontendRoutes/>
    </div>
    </>
  );
}

export default App;
