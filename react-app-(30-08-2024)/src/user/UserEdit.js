import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL, FILE_BASE_URL } from "../constants/Env";
import { useNavigate, useLocation } from 'react-router-dom';
import NoImage from '../assets/images/no-image.jpg'

function UserEdit() {
    let navigate = useNavigate();
    let location = useLocation();
    let [formValue, setFormValue] = useState({
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "age": 0,
        "id": "",
        "profile_pic": ""
    });
    let [profilePic, setProfilePic] = useState("");

    let changeEvent = (event) => {
        console.log(event, event.target.name, event.target.value, event.target.files)
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.files ? event.target.files[0] : event.target.value
        });

        if (event.target.files && event.target.files.length > 0) {
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                console.log(event.target.result)
                setProfilePic(event.target.result)
            };
            reader.readAsDataURL(file);
        }
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
        formData.append('old_profile_pic', profilePic);
        formData.append('id', formValue.id);

        let userToken = localStorage.getItem('token');

        let config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": userToken
            }
        };

        console.log(API_BASE_URL + `user/update`, formData, config)

        let saveData = await axios.post(API_BASE_URL + `user/update`, formData, config);

        console.log(saveData)

        toast(saveData.data.message);

        if (saveData.data.status == 200) {
            navigate('/user/list')
        }
    }

    let getUserData = async (ID) => {
        let userToken = localStorage.getItem('token');

        let config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": userToken
            }
        };

        let dataList = await axios.get(API_BASE_URL + `user/info/${ID}`, config);
        let userData = dataList.data.data;
        console.log(userData)

        formValue.name = userData.name;
        formValue.email = userData.email;
        formValue.phone = userData.phone;
        formValue.age = userData.age;
        formValue.id = userData._id;
        formValue.profile_pic = userData.profile_pic;

        setFormValue({ ...formValue });
        setProfilePic(FILE_BASE_URL + 'user/' + userData.profile_pic);
    }

    useEffect(() => {
        console.log(location, 'location', location.pathname.split('/')[3])
        let paramID = location.pathname.split('/')[3];
        setFormValue({
            ...formValue,
            id: paramID
        });

        getUserData(paramID);
    }, [])

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
                    onChange={(e) => changeEvent(e)} />
                <img width={50} src={profilePic ? profilePic : NoImage} /><br /><br />
                <button type="button" onClick={(e) => formSubmit()}>Update</button>
            </form>
        </div>
    );
}

export default UserEdit;