import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Header() {
    let navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);

    let changeRoute = (e, path) => {
        e.preventDefault();
        navigate(path);
    }

    let logoutFunc = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    useEffect(() => {
        console.log(location,'location')
        setIsLogin(false);
        let userToken = localStorage.getItem('token');
        if (userToken != null && userToken != "") {
            setIsLogin(true);
        }
    }, [location]);

    return (
        <div className="header">
            <a href="" onClick={(e) => changeRoute(e, '/home')}>Home</a>
            <a href="" onClick={(e) => changeRoute(e, '/about')}>About</a>
            {
                isLogin ? <a href="" onClick={(e) => changeRoute(e, '/user/list')}>Users</a> : <></>
            }

            {
                isLogin ? <a href="" onClick={(e) => logoutFunc(e)}>Logout</a> :
                    <a href="" onClick={(e) => changeRoute(e, '/login')}>Login</a>
            }
        </div>
    );
}

export default Header;