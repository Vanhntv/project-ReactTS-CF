import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartPopup = ({ onClose }: { onClose: () => void }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/cart");
  };

  return (
    <div
      className="position-fixed top-0 end-0 p-3 d-flex justify-content-end"
      style={{ zIndex: 2000, width: "100%", pointerEvents: "none" }}
    >
      <div
        className="card shadow-lg"
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: "400px",
          height: "auto",
        }}
      >
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span>Giỏ hàng</span>
          <button className="btn btn-sm btn-light" onClick={onClose}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>

        <div
          className="card-body"
          style={{ maxHeight: "350px", overflowY: "auto" }}
        >
          {cart.length === 0 ? (
            <p className="text-center">Chưa có sản phẩm nào!</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>SL</th>
                    <th>Giá</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              updateQuantity({ type: "DECREASE" }, item.id)
                            }
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              updateQuantity({ type: "INCREASE" }, item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-danger fw-bold">
                        {item.quantity * item.price}$
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card-footer bg-light d-flex justify-content-between align-items-center flex-wrap">
          <div className="fw-bold">
            Tổng: <span className="text-danger">{total.toFixed(2)}$</span>
          </div>

          <button
            className="btn btn-success btn-sm mt-2 mt-md-0"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
