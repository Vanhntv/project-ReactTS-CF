import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import CartPopup from "./CartPopup";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <Link className="navbar-brand" to={"/"}>
          VanhShop
        </Link>

        <div className="ms-auto">
          <button
            className="btn btn-light position-relative"
            onClick={() => setOpen(!open)}
          >
            <i className="fa-solid fa-cart-plus"></i>

            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {open && <CartPopup onClose={() => setOpen(false)} />}
    </>
  );
};

export default Navbar;
