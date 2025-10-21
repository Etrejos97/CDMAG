import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

/**
 * @component Layout
 * @description Componente contenedor principal que define la estructura base de la aplicación.
 * Implementa un diseño de tres secciones: navbar, contenido principal y footer.
 * 
 * @version 1.0.0
 * @author CDMAG Team
 * 
 * @example
 * import Layout from './components/Layout';
 * 
 * function App() {
 *   return (
 *     <Router>
 *       <Routes>
 *         <Route path="/" element={<Layout />}>
 *           <Route index element={<Home />} />
 *         </Route>
 *       </Routes>
 *     </Router>
 *   );
 * }
 */
const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Exportamos el componente para su uso en otras partes de la aplicación
export default Layout;
