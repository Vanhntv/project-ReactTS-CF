import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="bg-light min-vh-100 pb-5">
      <div className="container py-4">
        <h1 className="text-center mb-4">Giỏ hàng của bạn</h1>

        {cart.length === 0 ? (
          <div className="text-center p-5 bg-white shadow-sm rounded">
            <p className="text-muted">Giỏ hàng của bạn còn trống</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="mb-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-center bg-white p-3 mb-3 shadow-sm rounded"
                >
                  {/* Product */}
                  <div
                    className="d-flex align-items-center flex-fill"
                    style={{ gap: "12px" }}
                  >
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="border"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div className="flex-fill">
                      <h6
                        className="mb-0 text-truncate"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </h6>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center" style={{ width: "80px" }}>
                    <span className="text-muted">${item.price}</span>
                  </div>

                  {/* Quantity */}
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: "100px" }}
                  >
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity({ type: "DECREASE" }, item.id)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="text-center mx-1 form-control form-control-sm p-0"
                      style={{ width: "40px", height: "32px" }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity({ type: "INCREASE" }, item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <div
                    className="text-center text-danger fw-bold"
                    style={{ width: "100px" }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Delete */}
                  <div className="text-center" style={{ width: "60px" }}>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Bottom */}
            <div className="fixed-bottom bg-white border-top shadow-sm">
              <div className="container d-flex flex-wrap justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="text-muted">
                    Tổng thanh toán ({cart.length} sản phẩm):
                  </span>
                  <span className="text-danger fw-bold fs-4">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <button className="btn btn-danger btn-lg mt-2 mt-md-0 px-4">
                  Mua Hàng
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
