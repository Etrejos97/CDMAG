
import './Footer.css';

/**
 * @component Footer
 * @description Componente de pie de página con efecto glassmorphism.
 * Muestra información de copyright y detalles de la aplicación.
 * 
 * @version 1.0.0
 * @author CDMAG Team
 * 
 * @example
 * import Footer from './components/Footer';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Footer />
 *     </div>
 *   );
 * }
 */
const Footer = () => {
  return (
    <footer className="footer-glass mt-auto">
      <div className="container">
        <div className="row py-3">
          <div className="col-12 text-center">
            <p className="mb-0">
              © 2025 Casa de Modas A.G - Sistema Integral de Gestión de Inventario
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
