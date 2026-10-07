import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    emoji: "🎧",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    emoji: "⌚",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 1999,
    emoji: "⌨️",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 999,
    emoji: "🖱️",
  },
  {
    id: 5,
    name: "Laptop Stand",
    price: 1299,
    emoji: "💻",
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 799,
    emoji: "🔌",
  },
];

function App() {
  const [page, setPage] = useState("login");

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [cart, setCart] = useState([]);

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCart([]);
    setPage("login");
  };

  // ===============================
  // ADD TO CART
  // ===============================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ===============================
  // INCREASE QUANTITY
  // ===============================

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ===============================
  // DECREASE QUANTITY
  // ===============================

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ===============================
  // REMOVE FROM CART
  // ===============================

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // ===============================
  // CLEAR CART
  // ===============================

  const clearCart = () => {
    setCart([]);
  };

  // ===============================
  // TOTAL
  // ===============================

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ===============================
  // LOGIN / SIGNUP
  // ===============================

  if (!token) {
    if (page === "signup") {
      return (
        <Signup
          onLoginClick={() => setPage("login")}
        />
      );
    }

    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSignupClick={() => setPage("signup")}
      />
    );
  }

  // ===============================
  // MAIN E-COMMERCE APP
  // ===============================

  return (
    <div style={styles.app}>
      {/* HEADER */}

      <header style={styles.header}>
        <div>
          <h1 style={styles.logo}>🛍️ Week4 Store</h1>
          <p style={styles.subtitle}>
            Full Stack Mini E-Commerce App
          </p>
        </div>

        <div style={styles.headerButtons}>
          <div style={styles.cartBadge}>
            🛒 Cart: {totalItems}
          </div>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <main style={styles.main}>
        {/* PRODUCTS */}

        <section>
          <h2 style={styles.sectionTitle}>
            🛍️ Products
          </h2>

          <div style={styles.productGrid}>
            {products.map((product) => (
              <div
                key={product.id}
                style={styles.productCard}
              >
                <div style={styles.productEmoji}>
                  {product.emoji}
                </div>

                <h3>{product.name}</h3>

                <p style={styles.price}>
                  ₹{product.price.toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  style={styles.addButton}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CART */}

        <section style={styles.cartSection}>
          <div style={styles.cartHeader}>
            <h2 style={styles.sectionTitle}>
              🛒 Shopping Cart
            </h2>

            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={styles.clearButton}
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <div style={styles.emptyEmoji}>🛒</div>

              <h3>Your cart is empty</h3>

              <p>
                Add some products to your cart.
              </p>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={styles.cartItem}
                >
                  <div style={styles.cartProduct}>
                    <span style={styles.cartEmoji}>
                      {item.emoji}
                    </span>

                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}{" "}
                        × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div style={styles.cartActions}>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      style={styles.quantityButton}
                    >
                      −
                    </button>

                    <span style={styles.quantity}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      style={styles.quantityButton}
                    >
                      +
                    </button>

                    <strong style={styles.itemTotal}>
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      style={styles.removeButton}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}

              {/* TOTAL */}

              <div style={styles.totalBox}>
                <div>
                  <p>Total Items</p>
                  <h3>{totalItems}</h3>
                </div>

                <div style={styles.totalPrice}>
                  <p>Total Price</p>
                  <h2>
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </h2>
                </div>

                <button
                  onClick={() =>
                    alert(
                      "Order placed successfully! 🎉"
                    )
                  }
                  style={styles.checkoutButton}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}

      <footer style={styles.footer}>
        <p>
         develop by akash pandey!
        </p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f5f7fb",
    fontFamily: "Arial, sans-serif",
    color: "#222",
  },

  header: {
    backgroundColor: "#111827",
    color: "white",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  logo: {
    margin: 0,
    fontSize: "28px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#cbd5e1",
  },

  headerButtons: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  cartBadge: {
    backgroundColor: "#2563eb",
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
  },

  logoutButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },

  sectionTitle: {
    fontSize: "26px",
    marginBottom: "20px",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  productCard: {
    backgroundColor: "white",
    borderRadius: "14px",
    padding: "25px",
    textAlign: "center",
    boxShadow:
      "0 4px 15px rgba(0, 0, 0, 0.08)",
  },

  productEmoji: {
    fontSize: "65px",
    marginBottom: "10px",
  },

  price: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2563eb",
  },

  addButton: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  cartSection: {
    marginTop: "50px",
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "14px",
    boxShadow:
      "0 4px 15px rgba(0, 0, 0, 0.08)",
  },

  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  clearButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#dc2626",
    color: "white",
    cursor: "pointer",
  },

  emptyCart: {
    textAlign: "center",
    padding: "50px 20px",
    color: "#666",
  },

  emptyEmoji: {
    fontSize: "60px",
  },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 0",
    borderBottom: "1px solid #eee",
    gap: "20px",
  },

  cartProduct: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  cartEmoji: {
    fontSize: "45px",
  },

  cartActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  quantityButton: {
    width: "32px",
    height: "32px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "18px",
  },

  quantity: {
    minWidth: "25px",
    textAlign: "center",
    fontWeight: "bold",
  },

  itemTotal: {
    minWidth: "100px",
    textAlign: "right",
  },

  removeButton: {
    border: "none",
    backgroundColor: "#fee2e2",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  totalBox: {
    marginTop: "25px",
    padding: "20px",
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  totalPrice: {
    textAlign: "center",
  },

  checkoutButton: {
    padding: "13px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },

  footer: {
    textAlign: "center",
    padding: "25px",
    color: "#64748b",
  },
};

export default App;