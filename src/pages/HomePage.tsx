import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import type { Product } from "../types/Product";

const url = "https://dummyjson.com/products";

const HomePage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(url);
      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (loading) return <p className="text-center mt-5">Đang tải sản phẩm...</p>;

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Danh sách sản phẩm</h1>

      {products.length === 0 ? (
        <p className="text-center">Không có sản phẩm nào!</p>
      ) : (
        <div className="row g-4">
          {products.map((item) => (
            <div className="col-md-3 col-sm-6" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.thumbnail}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text fw-bold text-danger">{item.price}$</p>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => handleAddToCart(item)}
                  >
                    <i className="bi bi-cart-plus"></i> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
