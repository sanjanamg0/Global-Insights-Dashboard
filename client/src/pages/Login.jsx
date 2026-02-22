import { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import animationData from "../assets/login-animation.json";
import * as Components from "../auth/Components";

// Make sure this points to your login.css file!
import "./login.css"; 

export default function Login({ setIsAuth }) {
  const [isSignIn, setIsSignIn] = useState(true);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );
      localStorage.setItem("token", res.data.token);
      
      // Much smoother than window.location.reload()!
      if (setIsAuth) {
        setIsAuth(true); 
      } else {
        window.location.reload(); // Fallback just in case
      }
    } catch {
      alert("Invalid credentials. Please try again.");
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        registerData
      );
      alert("Account created! Please sign in.");
      // Slide back to the login screen after successful registration
      setIsSignIn(true); 
    } catch {
      alert("Registration failed. Please try a different email.");
    }
  };

  return (
    // Replaced inline styles with your CSS classes for the split layout
    <div className="login-wrapper">
      
      {/* LEFT SIDE – GRADIENT & ANIMATION */}
      <div className="login-left">
        <Lottie
          animationData={animationData}
          loop
          style={{ maxWidth: "420px", width: "100%" }}
        />
      </div>

      {/* RIGHT SIDE – SLIDING FORM UI */}
      <div className="login-right">
        <Components.Container>
          
          {/* SIGN UP PANEL */}
          <Components.SignUpContainer active={!isSignIn}>
            <Components.Form onSubmit={handleRegister}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                placeholder="Name"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />
              <Components.Input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              <Components.Input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              <Components.Button type="submit">
                Sign Up
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          {/* SIGN IN PANEL */}
          <Components.SignInContainer active={!isSignIn}>
            <Components.Form onSubmit={handleLogin}>
              <Components.Title>Sign In</Components.Title>
              <Components.Input
                type="email"
                placeholder="Email"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <Components.Input
                type="password"
                placeholder="Password"
                required
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <Components.Button type="submit">
                Sign In
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          {/* OVERLAY PANEL (The part that slides) */}
          <Components.OverlayContainer active={!isSignIn}>
            <Components.Overlay active={!isSignIn}>
              <Components.LeftOverlayPanel>
                <Components.Title>Welcome Back!</Components.Title>
                <p style={{ color: 'white', marginBottom: '20px' }}>To keep connected with us please login with your personal info</p>
                <Components.GhostButton onClick={() => setIsSignIn(true)}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel>
                <Components.Title>Hello, Friend!</Components.Title>
                <p style={{ color: 'white', marginBottom: '20px' }}>Enter your personal details and start your journey with us</p>
                <Components.GhostButton onClick={() => setIsSignIn(false)}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>

        </Components.Container>
      </div>
    </div>
  );
}