import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Producto from './pages/Producto';
import Ventas from './pages/Ventas';
import AdminDashboard from './pages/AdminDashboard';
import GestionUsuarios from './pages/GestionUsuarios';
import './App.css';

function AppContent() {
  const location = useLocation();

  // Detecta la ruta actual
  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute = location.pathname.startsWith('/user');

  // Navbar NO se muestra en login, home, y tampoco en dashboards porque tienen Sidebar
  const showNavbar = !isLoginPage && !isHomePage && !isAdminRoute && !isUserRoute;

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* RUTAS PÚBLICAS */}

        {/* RUTA LOGIN - Sin Layout, sin Navbar */}
        <Route path="/login" element={<Login />} />

        {/* RUTA HOME - Con Layout y sin Navbar */}
        <Route path="/" element={<Layout><Home /></Layout>} />

        {/* RUTAS PROTEGIDAS - USUARIO REGULAR */}

        {/* Productos - Usuarios autenticados */}
        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <Layout>
                <Producto />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Ventas - Usuarios autenticados */}
        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <Layout>
                <Ventas />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* RUTAS PROTEGIDAS - ADMIN */}

        {/* PASO 1: Admin Dashboard - Solo Administrador */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* PASO 2: Gestión Usuarios - Solo Administrador */}
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />

        {/* Admin Productos - Solo Administrador */}
        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <Layout>
                <Producto />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Ventas - Solo Administrador */}
        <Route
          path="/admin/ventas"
          element={
            <ProtectedRoute requiredRoles={['Administrador']}>
              <Layout>
                <Ventas />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* RUTAS PROTEGIDAS - USER DASHBOARD */}

        {/* PASO 3: Esto se agregará en el Paso 3 - Por ahora comentado para evitar errores */}
        {/* <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRoles={['Usuario']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/productos"
          element={
            <ProtectedRoute requiredRoles={['Usuario']}>
              <Layout>
                <Producto />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/ventas"
          element={
            <ProtectedRoute requiredRoles={['Usuario']}>
              <Layout>
                <Ventas />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
