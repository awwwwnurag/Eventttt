import React, { useState } from 'react';
import './LoginSignup.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [registerError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) {
        onLogin(form.username);
      } else {
        navigate('/cover');
      }
    }, 900);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('All fields are required.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }
    setRegisterError('');
    alert(`Registered as ${registerForm.username} (${registerForm.email})`);
    setShowRegister(false);
    setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className='wrapper'>
      <div className="form-box Login">
        {!showRegister ? (
          <form onSubmit={handleSubmit} autoComplete="off">
            <h1>Login</h1>
            <div className="input-box">
              <FaUser className='icon' />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                autoFocus
                disabled={loading}
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <span className="password-toggle" onClick={togglePassword} tabIndex={0} role="button" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="remember-forgot">
              <label><input type="checkbox" disabled={loading} /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            <div className="register-link">
              <p>Don't have an account?{' '}
                <a href="#" onClick={e => { e.preventDefault(); setShowRegister(true); }} tabIndex={0} role="button">Register Now</a>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} autoComplete="off">
            <h1>Register</h1>
            <div className="input-box">
              <FaUser className='icon' />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={registerForm.username}
                onChange={handleRegisterChange}
                required
                autoFocus
              />
            </div>
            <div className="input-box">
              <span className='icon' style={{fontSize: '1.1em'}}>@</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
              />
              <span className="password-toggle" onClick={togglePassword} tabIndex={0} role="button" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>
            {registerError && <div style={{color: '#c0392b', marginTop: 8, textAlign: 'center', fontSize: '0.98em'}}>{registerError}</div>}
            <button type="submit">Register</button>
            <div className="register-link">
              <p>Already have an account?{' '}
                <a href="#" onClick={e => { e.preventDefault(); setShowRegister(false); }} tabIndex={0} role="button">Login</a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;