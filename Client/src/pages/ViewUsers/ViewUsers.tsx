import { Link } from "react-router-dom"
import "./ViewUsers.css"
import axios from "axios"
import { useEffect, useState } from "react"

const ViewUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [reset , setReset] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:4444/user/all')
        .then(function (response) {
            setAllUsers(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    , [reset])
  return (
    <div className="ViewUsersPage">
        <Link to="/ad" className="ViewUsersBackButton">
            &lt; Back
        </Link>
        <div className="ViewUsersTable">
            <table>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Photo</th>
                    <th>Action</th>
                </tr>
                {allUsers.map((user: any) => {
                    if(user.userId !== "Admin453" )
                    return (
                        <tr>
                            <td>{user.userId}</td>
                            <td>{user.Name}</td>
                            <td><img src={user.profilePicture} alt="" className="ViewUsersImage"/></td>
                            <td>
                                {
                                    !user.isAccepeted && user.Name !== "-" && (<button className="ViewUsersButton"
                                        onClick={() => {
                                            axios.get(`http://localhost:4444/user/accept/${user._id}`)
                                            .then(function (response) {
                                                setReset(!reset)
                                                console.log(response);
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                        }}
                                    >
                                    Done
                                    </button>)
                                }
                                <button className="ViewUsersButton"
                                    onClick={() => {
                                        axios.delete(`http://localhost:4444/user/${user._id}`)
                                        .then(function (response) {
                                            setReset(!reset)
                                            console.log(response);
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}

            </table>

        </div>
    </div>
  )
}

export default ViewUsers