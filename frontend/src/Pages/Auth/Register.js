// Import required hooks and components
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css"; // Import custom CSS for auth styling
import Particles from "react-tsparticles"; // Particle background effect
import { loadFull } from "tsparticles"; // Full tsparticles engine
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Wallet icon
import { Link, useNavigate } from "react-router-dom"; // Navigation and links
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS
import { registerAPI } from "../../utils/ApiRequest"; // API endpoint
import axios from "axios"; // Axios for HTTP requests

// Register component
const Register = () => {
  // State for loading spinner
  const [loading, setLoading] = useState(false);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // If user already logged in, redirect to home page
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  // Initialize tsparticles engine
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Callback after particles are loaded
  const particlesLoaded = useCallback(async (container) => {
    // Optional logging
  }, []);

  // Form values state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Toast message config
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  // Update form values on input change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form refresh

    const { name, email, password } = values;

    // Simple validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields", toastOptions);
      return;
    }

    // Set loading true before API call
    setLoading(true);

    try {
      // Send registration data to backend
      const { data } = await axios.post(registerAPI, {
        name,
        email,
        password
      });

      // If registration successful
      if (data.success === true) {
        delete data.user.password; // Remove password before saving
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user to localStorage
        toast.success(data.message, toastOptions); // Show success toast
        navigate("/"); // Redirect to homepage
      } else {
        // Show error toast if registration failed
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      // Generic error handler
      toast.error("Something went wrong! Please try again.", toastOptions);
    } finally {
      // Stop loading in all cases
      setLoading(false);
    }
  };

  // Render the UI
  return (
    <>
      {/* Wrapper div with particles background */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Particle animation */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: { value: '#000' }, // Background color
            },
            fpsLimit: 60, // Frame limit
            particles: {
              number: {
                value: 200,
                density: { enable: true, value_area: 800 },
              },
              color: { value: '#ffcc00' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              links: { enable: false },
              move: { enable: true, speed: 2 },
              life: {
                duration: { sync: false, value: 3 },
                count: 0,
                delay: { random: { enable: true, minimumValue: 0.5 }, value: 1 },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {/* Main registration container */}
        <Container className="mt-5" style={{ position: 'relative', zIndex: 2, color: "white" }}>
          <Row>
            {/* Title and icon */}
            <h1 className="text-center">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} className="text-center" />
            </h1>
            <h1 className="text-center text-white">Welcome to Expense Management System</h1>

            {/* Registration form column */}
            <Col md={{ span: 6, offset: 3 }}>
              <h2 className="text-white text-center mt-5">Registration</h2>

              {/* Form start */}
              <Form onSubmit={handleSubmit}>
                {/* Name input */}
                <Form.Group controlId="formBasicName" className="mt-3">
                  <Form.Label className="text-white">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Email input */}
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label className="text-white">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Password input */}
                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Form footer: forgot link, button, login link */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}
                  className="mt-4"
                >
                  {/* Forgot password link */}
                  <Link to="/forgotPassword" className="text-white lnk">Forgot Password?</Link>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    className="text-center mt-3 btnStyle"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Signup"}
                  </Button>

                  {/* Already registered link */}
                  <p className="mt-3" style={{ color: "#9d9494" }}>
                    Already have an account? <Link to="/login" className="text-white lnk">Login</Link>
                  </p>
                </div>
              </Form>
              {/* End Form */}
            </Col>
          </Row>

          {/* Toast container for notifications */}
          <ToastContainer />
        </Container>
      </div>
    </>
  );
}

// Export Register component
export default Register;
