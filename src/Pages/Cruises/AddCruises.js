/* eslint-disable no-unused-vars */
import React from "react";
import Drawer from "../../Components/Drawer";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

export default function AddCruises() {


  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">المراكب</h2>
          <Link to="/AllCruises">
            <button className="btn btn-primary add-button">رجوع</button>
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
                      <label htmlFor="name" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        aria-describedby="nameHelp"
                      />
                     
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="status" className="d-flex">
                      الحالة
                    </label>
                    <TextField
                      id="status"
                      name="status"
                      select
                      size="small"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">اختر الحالة</option>
                      <option value="Active">نشط</option>
                      <option value="InActive">غير نشط</option>
                    </TextField>
                  
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
