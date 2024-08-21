import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { baseURL, LOGIN } from '../Components/Api';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [linkEnabled, setLinkEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const { value } = e.target;
        setUsername(value);
        checkInputValues(value, password);
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        checkInputValues(username, value);
    };

    const checkInputValues = (username, password) => {
        if (username.trim() !== '' && password.trim() !== '') {
            setLinkEnabled(true);
        } else {
            setLinkEnabled(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (linkEnabled) {
            setIsLoading(true);
            setError('');
            try {
                const response = await axios.post(`${baseURL}/${LOGIN}`, {
                    userName: username,
                    password: password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const token = response.data.accessToken;
                localStorage.setItem('token', token);

                // فك تشفير التوكن
                const decodedToken = jwtDecode(token);
                const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

                // Check the role to determine navigation
                if (role === 'Admin') {
                    navigate('/Home');
                } else if (role === 'Employee') {
                    navigate('/PayingOff');
                } else {
                    setError('Invalid role');
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setError('اسم المستخدم أو كلمة المرور غير صحيحة');
                } else {
                    setError('اسم المستخدم أو كلمة المرور غير صحيحة');
                }
                console.error('Login failed:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='all-login'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img src='\imgs\Login.jpg' style={{ width: "100%", height: "90%" }} alt='login'></img>
                    </div>
                    <div className='col-md-6' style={{ height: "100vh", backgroundColor: "#fff", display: "flex", alignItems: "center" }}>
                        <div className='col-md-8  ml-auto mr-auto login-edit'>
                            <h3 className='text-center mb-4' style={{ fontWeight: "600" }}>تسجيل الدخول</h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label className='d-flex' style={{ justifyContent: "end" }} htmlFor="username">اسم المستخدم</label>
                                    <input type="text" className="form-control " id="username" value={username} onChange={handleUsernameChange} autoComplete='username' />
                                </div>
                                <div className="form-group">
                                    <label className='d-flex' style={{ justifyContent: "end" }} htmlFor="password">كلمة المرور</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} autoComplete='password' />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div>
                                    <button type="submit" className="btn btn-primary btn-block text-center mb-2" disabled={!linkEnabled || isLoading}>
                                        {isLoading ? 'جارٍ تسجيل الدخول...' : 'دخول'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
