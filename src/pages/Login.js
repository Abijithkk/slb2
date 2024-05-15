import React, { useState } from "react";
import "./Login.css";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { adminlogin } from "../services/allApi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (!email || !password) {
        setError('Please enter both email and password');
        toast.error('Please enter both email and password');
        return;
      }
      const response = await adminlogin(formData);
      console.log('Response:', response); // Log the response to see it in the console
      if (response.status === 200) {
        setError('');
        toast.success('Login successful');
        navigate('/');
      } else {
        setError('Login failed');
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error); // Log any errors
      setError('Login failed');
      toast.error('Login failed');
    }
  };

  return (
    <div style={{ width: "100%" }} className="containers">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#025AF9",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            width: "400px",
            maxWidth: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "50px",
              width: "100%",
            }}
          >
            <>
              <center>
                <h4 style={{ color: "#1E1E38" }}>
                  <img style={{ width: "30%" }} src="https://i.postimg.cc/L89tRNPk/Frame-2.png" alt="" />
                </h4>
              </center>
              <center>
                <h2 style={{ color: "white" }} className="mt-5">
                  <b className="mt-5">Admin Login</b>
                </h2>
              </center>
              <TextField
                className="mt-2"
                style={{
                  marginBottom: "20px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "calc(100% - 22px)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                }}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                id="filled-multiline-flexible"
                label="Email"
                multiline
                maxRows={4}
                variant="filled"
              />
              <TextField
                style={{
                  backgroundColor: "white",
                  marginBottom: "30px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  width: "calc(100% - 22px)",
                }}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                id="filled-password-input"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <button
                type="submit"
                className="mt-3"
                style={{
                  backgroundColor: "white",
                  color: "#025AF9",
                  border: "none",
                  borderRadius: "4px",
                  padding: "12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  width: "calc(100% - 22px)",
                }}
              >
                Login
              </button>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
