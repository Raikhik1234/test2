import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from "../constants/Env";
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    let [formValue, setFormValue] = useState({
        "email": "",
        "password": ""
    });

    let changeEvent = (event) => {
        console.log(event, event.target.name, event.target.value, event.target.files)
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        })
    }

    let formSubmit = async () => {
        console.log(formValue)
        if (formValue.email == "") {
           return  toast("Email is required")
        }

        if (formValue.password == "") {
            return toast("Password is required")
        }

        let formData = new FormData();

        formData.append('email', formValue.email);
        formData.append('password', formValue.password);

        let config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        console.log(API_BASE_URL + `login`, formData, config)

        let saveData = await axios.post(API_BASE_URL + `login`, formValue);

        console.log(saveData)

        toast(saveData.data.message);

        if (saveData.data.status == 200) {
            localStorage.setItem('user', JSON.stringify(saveData.data.data));
            localStorage.setItem('token', saveData.data.token);
            navigate('/user/list')
        }
    }

    return (
        <div className="">
            <form action="/action_page.php">
                <label for="lname">Email:</label><br />
                <input type="text" id="email" name="email" value={formValue.email}
                    onChange={(e) => changeEvent(e)} /><br />
                <label for="lname">Password:</label><br />
                <input type="password" id="password" name="password" value={formValue.password}
                    onChange={(e) => changeEvent(e)} /><br />
                <br />

                <button type="button" onClick={(e) => formSubmit()}>Login</button>
            </form>
        </div>
    );
}

export default Login;