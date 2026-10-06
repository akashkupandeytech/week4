import { useState } from "react";

function Login({ onLoginSuccess, onSignupClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch(
        "https://week3-backend-yg2x.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      setMessage("Login successful!");

      // Send token to App.jsx
      onLoginSuccess(data.token);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Backend se connection nahi ho raha");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p>{message}</p>

        <p>
          Don't have an account?{" "}
          <button onClick={onSignupClick} style={styles.link}>
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "350px",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },

  button: {
    width: "100%",
    padding: "12px",
    cursor: "pointer",
    border: "none",
    borderRadius: "6px",
  },

  link: {
    border: "none",
    background: "none",
    color: "blue",
    cursor: "pointer",
  },
};

export default Login;