import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/">Paradise Store</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/catalog">Catálogo</Link>
        <Link className="nav-link" to="/cart">Carrito</Link>
        <Link className="nav-link" to="/checkout">Pedido</Link>
      </div>
    </nav>
  );
}

export default Navbar;
