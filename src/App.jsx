import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  };

  if (token) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>Welcome! 🎉</h1>
          <p>You are successfully logged in.</p>

          <p>
            JWT authentication is working successfully.
          </p>

          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </div>
      </div>
    );
  }

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

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
  },
  card: {
    width: "400px",
    padding: "40px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "15px",
  },
  button: {
    padding: "12px 30px",
    cursor: "pointer",
  },
};

export default App;