
import React from "react";
import Drawer from "../../Components/Drawer";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";


export default function AddPlaces() {

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
                    <div className="form-group">
                      <label htmlFor="location" className="d-flex">
                        الموقع
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        aria-describedby="locationHelp"
                      />
                      
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
                        aria-describedby="imageHelp"
                      />
                      
                     
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
