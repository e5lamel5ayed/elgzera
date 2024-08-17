import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [linkEnabled, setLinkEnabled] = useState(false);
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

    const handleLogin = (e) => {
        e.preventDefault();
        if (linkEnabled) {
            // Determine the role based on the username
            const role = username === 'admin' ? 'admin' : 'user';
            localStorage.setItem('role', role);

            // Redirect based on the role
            if (role === 'user') {
                navigate('/PayingOff');
            } else {
                navigate('/Home');
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
                                    <input type="text" className="form-control " id="username" value={username} onChange={handleUsernameChange} />
                                </div>
                                <div className="form-group">
                                    <label className='d-flex' style={{ justifyContent: "end" }} htmlFor="password">كلمة المرور</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary btn-block text-center mb-2" disabled={!linkEnabled}>دخول</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
