import { useState } from "react";

function Signup({ onLoginClick }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const response = await fetch(
        "https://week3-backend-yg2x.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Signup successful! Please login.");

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Backend se connection nahi ho raha");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p>{message}</p>

        <p>
          Already have an account?{" "}
          <button onClick={onLoginClick} style={styles.link}>
            Login
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
  },

  card: {
    width: "350px",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    cursor: "pointer",
  },

  link: {
    border: "none",
    background: "none",
    color: "blue",
    cursor: "pointer",
  },
};

export default Signup;