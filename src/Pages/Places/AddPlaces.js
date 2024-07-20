/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Drawer from "../../Components/Drawer";
import { Box, TextField } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  baseURL,
  SALES_CENTERS,
  SALES_CENTERS_CREATE,
} from "../../Components/Api";

export default function AddPlaces() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
  });
  useEffect(() => {
    const { id } = location.state || {};
    if (id) {
      fetchPlace(id);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchPlace = async (id) => {
    const res = await axios.get(
      `http://org-bay.runasp.net/api/sales-centers/${id}`
    );
    console.log(res.data);
    setFormData(res.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "من فضلك ادخل الاسم";
    if (!formData.location) newErrors.location = "من فضلك ادخل الموقع";
    if (!formData.image) newErrors.image = "من فضلك ادخل الصورة";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Location", formData.location);
      formDataToSend.append("Image", formData.image);

      if (location.state && location.state.id) {
        // Editing existing place
        const response = await axios.put(
          ` http://org-bay.runasp.net/api/sales-centers/${location.state.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        localStorage.setItem("alertMessage", "تم تعديل مركز البيع بنجاح");
      } else {
        const response = await axios.post(
          `http://org-bay.runasp.net/api/sales-centers/create`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data) {
          localStorage.setItem("alertMessage", "تم إضافة مركز البيع بنجاح");
        }
      }

      navigate("/AllPlaces");
    } catch (error) {
      console.error("Error adding or editing place:", error);
    }
  };

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">مراكز البيع</h2>
          <Link to="/AllPlaces">
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
                  <div className="col-md-6">
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

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="location" className="d-flex">
                        الموقع
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        aria-describedby="locationHelp"
                      />
                      {errors.location && (
                        <h6 className="error-log">{errors.location}</h6>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="image" className="d-flex">
                        اضافة صورة
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image: e.target.files[0],
                          })
                        }
                        aria-describedby="imageHelp"
                      />
                      {errors.image && (
                        <h6 className="error-log">{errors.image}</h6>
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
