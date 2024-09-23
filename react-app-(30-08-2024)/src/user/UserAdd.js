import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from "../constants/Env";
import { useNavigate } from 'react-router-dom';

function UserAdd() {
    let navigate = useNavigate();
    let [formValue, setFormValue] = useState({
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "age": 0,
        "profile_pic": {}
    });

    let changeEvent = (event) => {
        console.log(event, event.target.name, event.target.value, event.target.files)
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.files ? event.target.files[0] : event.target.value
        })
    }

    let formSubmit = async () => {
        console.log(formValue)
        if (formValue.name == "") {
            toast("Name is required")
        }

        let formData = new FormData();

        formData.append('name', formValue.name);
        formData.append('email', formValue.email);
        formData.append('phone', formValue.phone);
        formData.append('password', formValue.password);
        formData.append('age', formValue.age);
        formData.append('profile_pic', formValue.profile_pic);

        let userToken = localStorage.getItem('token');

        let config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": userToken
            }
        };

        console.log(API_BASE_URL + `user/add`, formData, config)

        let saveData = await axios.post(API_BASE_URL + `user/add`, formData, config);

        console.log(saveData)

        toast(saveData.data.message);

        if (saveData.data.status == 200) {
            navigate('/user/list')
        }
    }

    return (
        <div className="">
            <form action="/action_page.php">
                <label for="fname">Name:</label><br />
                <input type="text" id="name" name="name" value={formValue.name}
                    onChange={(e) => changeEvent(e)} /><br />
                <label for="lname">Email:</label><br />
                <input type="text" id="email" name="email" value={formValue.email}
                    onChange={(e) => changeEvent(e)} /><br />
                <label for="lname">Password:</label><br />
                <input type="password" id="password" name="password" value={formValue.password}
                    onChange={(e) => changeEvent(e)} /><br />
                <label for="lname">Phone:</label><br />
                <input type="text" id="phone" name="phone" value={formValue.phone}
                    onChange={(e) => changeEvent(e)} /><br />
                <label for="lname">Age:</label><br />
                <input type="number" id="age" name="age" value={formValue.age}
                    onChange={(e) => changeEvent(e)} /><br />
                <label for="lname">image:</label><br />
                <input type="file" id="profile_pic" name="profile_pic"
                    onChange={(e) => changeEvent(e)} /><br /><br />
                <button type="button" onClick={(e) => formSubmit()}>Submit</button>
            </form>
        </div>
    );
}

export default UserAdd;