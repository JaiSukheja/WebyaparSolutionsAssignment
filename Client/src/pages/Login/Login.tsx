import { useEffect, useState } from "react"
import "./Login.css"
import axios from "axios"

const Login = (props: any) => {
  const isAdmin = props.isAdmin
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = () => {
    if(userId == "Admin453"){
      axios.post("http://localhost:4444/user/admin", {
        userId: userId,
        password: password
      })
      .then(function (response) {
        setPassword("")
        setUserId("")
        console.log(response)
        if (response.data.isAdmin) {
          localStorage.setItem("isAdmin", "true")
          localStorage.setItem("userId", response.data._id)
          window.location.href = "/ad"
        } else {
          localStorage.setItem("isAdmin", "false")
          localStorage.setItem("userId", response.data._id)
          window.location.href = "/user"
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      axios.post("http://localhost:4444/user/login", {
        userId: userId,
        password: password
      })
      .then(function (response) {
        setPassword("")
        setUserId("")
        if (response.data.isAdmin) {
          localStorage.setItem("isAdmin", "true")
          localStorage.setItem("userId", response.data._id)
          window.location.href = "/ad"
        } else {
          localStorage.setItem("isAdmin", "false")
          localStorage.setItem("userId", response.data._id)
          window.location.href = "/user"
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      window.location.href = "/ad"
    } else if ((localStorage.getItem("isAdmin") === "false" ) && (userId !== null)) {
      window.location.href = "/user"
    }
  }, [])
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginLeft">
          <div className="logo">
            LOGO
          </div>
        </div>
        <div className="loginRight">
          <div className="loginForm">
            <div className="loginFormHeading">
              {isAdmin ? "Admin Login" : "User Login"}
            </div>
            <div className="loginFormInput">
              <div className="loginFormInputField">
                {!isAdmin && <label htmlFor="input" className="loginFormInputLabel">User ID</label>}
                <input type="text" placeholder={isAdmin ? "User ID" : ""} value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }}
                />
              </div>
              <div className="loginFormInputField">
                {!isAdmin && <label htmlFor="input" className="loginFormInputLabel">Password</label>}
                <input type="password" placeholder={isAdmin ? "Password" : ""} value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <div className="loginFormInputField">
                <button onClick={handleLogin}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login