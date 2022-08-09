import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/layouts/Dashboard';
import Primary from './components/layouts/Primary';
import AuthPage from './pages/AuthPage';
import CollectionPage from './pages/CollectionPage';
import HomePage from './pages/HomePage';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Primary />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>
      <Route element={<Dashboard />}>
        <Route path="/collections" element={<CollectionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
