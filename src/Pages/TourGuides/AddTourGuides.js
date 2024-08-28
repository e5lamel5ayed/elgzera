/* eslint-disable no-unused-vars */
import React from "react";
import Drawer from "../../Components/Drawer";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link } from "react-router-dom";


export default function AddTourGuides() {


  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">المرشدين</h2>
          <Link to="/AllTourGuides">
            <button className="btn btn-primary add-button">رجوع </button>
          </Link>
        </div>
        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h3>اضف البيانات</h3>
          </div>
          <div className="card-body">
            <form >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">الاسم</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="d-flex">البريد الالكتروني</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="status" className="d-flex">الحاله</label>
                    <select
                      className="form-control"
                      id="status"
                      name="status"
                    >
                      <option value="">اختر الحالة</option>
                      <option value="Active">نشط</option>
                      <option value="Inactive">غير نشط</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="d-flex">رقم الهاتف</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="phoneNumber"
                        name="phoneNumber"
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="profitRate" className="d-flex">نسبة الربح</label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="profitRate"
                        name="profitRate"
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <button style={{ fontSize: "20px" }} type="submit" className="btn btn-primary mt-4">حفظ</button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
