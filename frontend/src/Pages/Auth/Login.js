/*the intution is nothing but if user is already loggedin then direct to home page if new user want to register of forgot password shows 
navigation links when new user login then store it in local storage chane the state using usestate ans port it to the loginApi using axios
*/ 


import { useCallback,useEffect,useState } from "react";//usestate for local component state management,useffect for   fetching data list,usecallback to memoize i.e we dont need to render again and again
import {Container,Row,Col,Form,Button} from "react-bootstrap";//container is like wall,row is horizontal pillar,col is brick,form is switch board,button is when clicked
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";//for animated icons
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";//icon is imported from react library with accountbalance component
import {Link,useNavigate} from "react-router-dom";//for navigation from one page to another
import {ToastContainer,toast} from "react-toastify";//for displaying small popup messages
import "react-toastify/dist/ReactToastify.css"; 
import axios from "axios";//it is nothing but the js library used to handle http request line post,get,put,delete etc,it has simple syntax,automatic json file
import {loginAPI} from "../../utils/ApiRequest";
   
const Login=()=>{
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false); //this is hook which has state variable loading and setloading as hook function which updates the loading when any changes is made
  useEffect(()=>{
    if(localStorage.getItem("user"))
    {
      navigate("/");//if user already there then go to homepage
    }
  },[navigate]);
  const [values,setValues]=useState({ //set the email and the password of the user
    email:"",
    password:"",
  });
  const toastOptions={
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});//remember it takes the user input with target attribute name and updates the value
    //e.g->email:'suzain12@gmail.com' where email is the target name and 'suzain..'is target value 
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();//perevnts default page reload
    const {email,password}=values;
    setLoading(true);//shows that something is happening
    const {data}=await axios.post(loginAPI,{ //send post request to the backend i.e loginApi & wait till response comes
      email,
      password,
    });
  //now check 
  if(data.success===true)
  {
    localStorage.setItem("user",JSON.stringify(data.user));
    navigate('/'); //go to homepage
    toast.success(data.message,toastOptions);//sends popup that successfully passed
    setLoading(false);
  }
else{
  toast.error(data.message,toastOptions);//if no user exists
  setLoading(false);
}

  };
  const particlesInit=useCallback(async(engine)=>{
    await loadFull(engine); //use to load the entire engine before animations starts
  },[])
  const particlesLoaded=useCallback(async(container)=>{
    //we can interact with partcles i.e animations, events etc after the page is loaded completly
  },[]);
  

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Container
        className="mt-5"
        style={{ position: "relative", zIndex: "2 !important" }}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-5">
              <AccountBalanceWalletIcon
                sx={{ fontSize: 40, color: "white" }}
                className="text-center"
              />
            </h1>
            <h2 className="text-white text-center ">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Group>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="mt-4"
              >
                <Link to="/forgotPassword" className="text-white lnk">
                  Forgot Password?
                </Link>

                <Button
                  type="submit"
                  className=" text-center mt-3 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signin…" : "Login"}
                </Button>

                <p className="mt-3" style={{ color: "#9d9494" }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" className="text-white lnk">
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;