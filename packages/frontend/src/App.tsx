import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AppRoutes from './Routes';

function App() {
  return (
    <div className="App">
      <AppRoutes />
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
