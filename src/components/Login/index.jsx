import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import LoginFormSchemas from '../Schemas/LoginFormSchemas';
import Button from '@mui/material/Button';  
import './style.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormSchemas,
    onSubmit: (values) => {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        alert("Kullanıcı bulunamadı!");
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        if (
          parsedUser &&
          parsedUser.email === values.email &&
          parsedUser.password === values.password
        ) {
          // Başarılı giriş
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
          alert("Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...");
          navigate("/");  // Ana sayfaya yönlendir
        } else {
          // Hatalı giriş
          alert("Geçersiz e-posta veya şifre!");
        }
      } catch (error) {
        console.error("Hata oluştu:", error);
        alert("Kullanıcı verisi hatalı!");
      }
    },
  });

  return (
    <form className="loginform" onSubmit={formik.handleSubmit}>
      <div className='titlelogin'>Login</div>
      <div className="input-container">
        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="username" 
        />
        {formik.errors.email && formik.touched.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
      </div>

      <div className="input-container">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="current-password"  
        />
        {formik.errors.password && formik.touched.password && (
          <div className="error-message">{formik.errors.password}</div>
        )}
      </div>
      <Button 
        className="login-button" 
        variant="contained" 
        color="primary" 
        type="submit"
      >
       Login
      </Button>

      <div className="register-link">
        <p>
        Don't have an account?<Link to="/register">Sign up</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
