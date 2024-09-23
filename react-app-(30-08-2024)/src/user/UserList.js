import { useEffect, useState } from "react";
import { API_BASE_URL, FILE_BASE_URL } from "../constants/Env";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoImage from '../assets/images/no-image.jpg'

function UserList() {
    const [userData, setUserData] = useState([]);
    let navigate = useNavigate();

    let getUserList = async () => {
        let userToken = localStorage.getItem('token');

        let config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": userToken
            }
        };

        let dataList = await axios.get(API_BASE_URL + 'user/list', config);
        setUserData(dataList.data.data);
    }

    let deleteUser = async (data) => {
        let dataList = await axios.get(API_BASE_URL + `user/delete/${data._id}`);
        getUserList();
    }

    let editUser =(data)=>{
        navigate(`/user/edit/${data._id}`);
    }

    let changeRoute = (e, path) => {
        e.preventDefault();
        navigate(path);
    }

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div className="userlist">
            <p>
                <h1>User List</h1>
                <p>
                    <button type="button" onClick={(e) => changeRoute(e, '/user/add')}>Add User</button>
                </p>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Image</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <img width={50} src={item?.profile_pic ? FILE_BASE_URL + 'user/' + item?.profile_pic : NoImage} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.age}</td>
                                    <td className="header">
                                        <button type="button"  onClick={() => editUser(item)}>Edit</button>
                                        <button type="button" onClick={() => deleteUser(item)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </p>
        </div>
    );
}

export default UserList;