import { FaFire, FaCog } from 'react-icons/fa';
import '../Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-tab active">
        <FaFire />
        <span>Trending</span>
      </div>
      <div className="footer-tab">
        <FaCog />
        <span>Settings</span>
      </div>
    </footer>
  );
}
