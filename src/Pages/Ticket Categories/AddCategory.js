/* eslint-disable no-unused-vars */
import React from "react";
import Drawer from "../../Components/Drawer";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";


export default function AddCategory() {

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">فئة التذكرة</h2>

          <Link to="/AllCategories">
            <button className="btn btn-primary add-button">رجوع </button>
          </Link>
        </div>

        <div className="card table-style" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h3>أضف فئة التذكرة</h3>
          </div>
          <div className="card-body">
            <form >
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="categoryName" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                      />
                     
                    </div>
                  </div>
                </div>
              </div>
              <button
                style={{ fontSize: "20px" }}
                type="submit"
                className="btn btn-primary mt-4"
              >
                حفظ
              </button>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
}
