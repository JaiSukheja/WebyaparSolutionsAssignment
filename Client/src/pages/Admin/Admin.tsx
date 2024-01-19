import axios from "axios";
import "./Admin.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Admin = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        axios.post('http://localhost:4444/user/signup', {
            userId: userId,
            password: password
        })
        .then(function () {
            setUserId('')
            setPassword('')
            alert("User Created")
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4444/user/all')
        .then(function (response) {
            setAllUsers(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

        // 
        
    }
    , [userId])

  return (
    <div className="AdminPage">
        <div className="AdminContainer">
            <div className="AdminLeft">
            <div className="CreateUserForm">
                <div className="CreateUserHeading">
                    Create User
                </div>
                <div className="CreateUserInput">
                    <div className="CreateUserInputField">
                        <label htmlFor="input" className="CreateUserInputLabel">User ID</label>
                        <input type="text" placeholder="" onChange={(e)=>{
                            setUserId(e.target.value)
                        }}
                        value={userId}
                        />
                    </div>
                    <div className="CreateUserInputField">
                        <label htmlFor="input" className="CreateUserInputLabel">Password</label>
                        <input type="password" placeholder="" onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                        value={password}
                        />
                    </div>
                    <div className="CreateUserInputField">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
            <div className="AdminRight">
                <div className="ViewUsers">
                    <div className="ViewUsersHeading">
                        View Users
                    </div>
                    <div className="ViewUsersList">
                        {allUsers.map((user:any, index)=>{
                        if(index<=2 && user.userId !== "Admin453"){
                                return (
                                    <div className="ViewUsersListItem">
                                        <div className="ViewUsersListItemIndex">
                                            {index}
                                        </div>
                                        <div className="ViewUsersListItemValue">
                                            {user.userId}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                        <Link to="/viewUsers" className="ViewUsersViewButton">
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin