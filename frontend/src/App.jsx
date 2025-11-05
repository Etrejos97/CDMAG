import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Producto from './pages/Producto';
import Ventas from './pages/Ventas';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/';
  const showNavbar = isLoginPage || isHomePage;

  return (
    <>
      {showNavbar && <Navbar />}
      
      <Routes>
        {/* RUTA LOGIN - Sin Layout pero con Navbar */}
        <Route path="/login" element={<Login />} />

        {/* RUTA HOME - Con Layout y Navbar */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* RUTAS PROTEGIDAS - Con Layout SIN Navbar */}
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
      </Routes>

      {/* Footer SIEMPRE aparece */}
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
