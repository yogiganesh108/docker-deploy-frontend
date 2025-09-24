import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import "./Auth.css";

export default function Login({ goToSignup }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-inner">
            <div className="slide-switch">
              <div className="slide-panel slide-in-left">
                <h1 className="auth-title">hello world</h1>
                <p className="auth-subtitle">Sign in to your Beatflow account</p>

                {message && (
                  <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${errors.email ? 'error' : ''}`}
                      placeholder="Enter your email"
                      disabled={isLoading}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <button
                    type="submit"
                    className="auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-text">Signing In...</span>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="auth-footer">
                  <p>
                    Don't have an account?{" "}
                    <span
                      onClick={goToSignup}
                      className="link-text"
                    >
                      Create one here
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
