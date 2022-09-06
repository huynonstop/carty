import { Route, Routes } from 'react-router-dom';
import RequireAuthGuard from './utils/hoc/RequireAuthGuard';
import RequireUnauthGuard from './utils/hoc/RequireUnauthGuard';
import Dashboard from './components/layouts/Dashboard';
import Primary from './components/layouts/Primary';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import CollectionPage from './pages/CollectionPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import UserPage from './pages/UserPage';
import { contentContainer } from './utils/tailwind';
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Primary />}>
        <Route element={<RequireUnauthGuard to="/collections" />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<RequireAuthGuard to="/" />}>
        <Route
          element={
            <Dashboard
              logoTo="/collections"
              widthClassName={contentContainer}
            />
          }
        >
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/user">
            <Route index element={<UserPage />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
        </Route>
        <Route
          element={
            <Dashboard useSidebar={false} logoTo="/collections" />
          }
        >
          <Route path="/collections">
            <Route
              path=":collectionId"
              element={<CollectionDetailPage />}
            />
          </Route>
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
