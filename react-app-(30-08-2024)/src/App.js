import logo from './logo.svg';
import './App.css';
import './assets/css/style.css';
import Home from './cms/Home';
import Header from './partials/Header';
import Footer from './partials/Footer';
import About from './cms/About';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UserList from './user/UserList';
import UserAdd from './user/UserAdd';
import Login from './auth/Login';
import UserEdit from './user/UserEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          ></Route>
          <Route
            path='/home'
            element={<Home />}
          ></Route>
          <Route
            path='/about'
            element={<About />}
          ></Route>
          <Route
            path='/user/list'
            element={<UserList />}
          ></Route>
          <Route
            path='/user/add'
            element={<UserAdd />}
          ></Route>
          <Route
            path='/user/edit/:id'
            element={<UserEdit />}
          ></Route>
          <Route
            path='/login'
            element={<Login />}
          ></Route>
          <Route
            path='*'
            element={<Navigate to="/home" />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
