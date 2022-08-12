import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Backdrop from './components/base/Backdrop';
import Primary from './components/layouts/Primary';
import { usePersistAuth } from './features/auth/auth.context';
import AppRoutes from './Routes';

function App() {
  const isPersistingAuth = usePersistAuth();
  return (
    <div className="App">
      {isPersistingAuth ? (
        <Primary>
          <Backdrop isShow={true} />
        </Primary>
      ) : (
        <AppRoutes />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
