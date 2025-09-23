import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/contexts/AuthContext";
import "./Auth.css";

export default function Signup({ goToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { signup } = useAuth();
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

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const result = await signup(formData.name, formData.email, formData.password);

      if (result.success) {
        setMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(result.message || "Signup failed. Please try again.");
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
              <div className="slide-panel slide-in-right">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join Beatflow and start your music journey</p>

                {message && (
                  <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                      disabled={isLoading}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

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
                      placeholder="Create a password"
                      disabled={isLoading}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                  </div>

                  <button
                    type="submit"
                    className="auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading-text">Creating Account...</span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="auth-footer">
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={goToLogin}
                      className="link-text"
                    >
                      Sign in here
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
