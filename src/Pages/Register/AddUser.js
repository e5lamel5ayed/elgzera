/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Drawer from "../../Components/Drawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseURL, CRUISES, CRUISES_CREATE } from "../../Components/Api";
import { Loading } from "../../Components/Loading";

export default function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirm_password: "",
    });

    useEffect(() => {
        const { id } = location.state || {};
        if (id) {
            fetchCruiseDetails(id);
        } else {
            setLoading(false);
        }
    }, [location.state]);

    // for update 
    const fetchCruiseDetails = async (id) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/cruises`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
            );
            const cruise = response.data.find((cruise) => cruise.id === id);
            if (cruise) {
                const { name, password, confirm_password } = cruise;
                setFormData({ name, password, confirm_password });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching cruise details:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
        if (!formData.password) {
            newErrors.password = "من فضلك ادخل الرقم السري";
        } else if (formData.confirm_password !== formData.password) {
            newErrors.confirm_password = "من فضلك الرقم السري غير متطابق";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            const payload = {
                name: formData.name,
                password: formData.password,
            };

            if (location.state && location.state.id) {
                // Edit Cruise
                const token = localStorage.getItem('token');
                await axios.put(
                    `${baseURL}/${CRUISES}/${location.state.id}`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                localStorage.setItem("alertMessage", "تم تعديل المركب بنجاح");
            } else {
                // add Cruise
                const token = localStorage.getItem('token');
                await axios.post(
                    `${baseURL}/${CRUISES_CREATE}`,
                    payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${token}`,

                        },
                    }
                );
                localStorage.setItem("alertMessage", "تم إضافة المركب بنجاح");
            }
            navigate("/all-users");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("Error adding cruise:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            {loading && <Loading />}
            <Drawer />
            <Box className='box-container'>
                <div className="table-head">
                    <h2>اضافة مستخدم</h2>
                    <Link to="/all-users">
                        <button className="btn btn-primary add-button">رجوع</button>
                    </Link>
                </div>
                <div className="card table-style" style={{ direction: "rtl" }}>
                    <div className="card-header d-flex table-head-style">
                        <h3>اضف البيانات</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="name" className="d-flex">
                                                الاسم
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                aria-describedby="nameHelp"
                                            />
                                            {errors.name && (
                                                <h6 className="error-log">{errors.name}</h6>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="password" className="d-flex">
                                                الرقم السري
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                aria-describedby="password"
                                            />
                                            {errors.name && (
                                                <h6 className="error-log">{errors.password}</h6>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="confirm_password" className="d-flex">
                                                تاكيد الرقم السري
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirm_password"
                                                name="confirm_password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                                aria-describedby="confirm_password"
                                            />
                                            {errors.name && (
                                                <h6 className="error-log">{errors.confirm_password}</h6>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-4">
                                حفظ
                            </button>
                        </form>
                    </div>
                </div>
            </Box>
        </div>
    );
}
