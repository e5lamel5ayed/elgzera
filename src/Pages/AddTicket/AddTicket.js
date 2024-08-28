/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Drawer from "../../Components/Drawer";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Link } from "react-router-dom";

export default function AddTicket() {


  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%", direction: "rtl" }}>
        <div>
          <h2 className="add-head">اضف التذاكر</h2>
          <Link to="/AllTickets">
            <button className="btn btn-primary add-button">رجوع </button>
          </Link>
        </div>
        <div className="card table-style mb-5" style={{ direction: "rtl" }}>
          <div className="card-header d-flex table-head-style">
            <h4>اضف البيانات</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="d-flex">
                        الاسم
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        id="name"
                      />
                    
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="categoryId" className="d-flex">
                      نوع التذكرة
                    </label>
                    <select
                      name="categoryId"
                      className="form-control"
                    >
                      <option value="">اختر نوع التذكرة</option>
                      
                    </select>
                   
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="price" className="d-flex">
                      السعر
                    </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="price"
                        name="price"
                      />
                    </FormControl>
                    
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="tax" className="d-flex">
                      الضرائب
                    </label>
                    <FormControl fullWidth>
                      <OutlinedInput
                        size="small"
                        id="tax"
                        name="tax"
                      />
                    </FormControl>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="currency" className="d-flex">
                      العملة
                    </label>
                    <select
                      name="currency"
                      className="form-control"
                    >
                      <option value="">اختر العملة</option>
                    
                    </select>
                   
                  </div>

                  <div className="col-md-12">
                    <label className="d-flex mt-3">اختر اليوم</label>
                    <div className="col-md-12 d-flex">
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="1"
                            control={
                              <Checkbox
                              />
                            }
                            label="السبت"
                          />
                        </div>
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="2"
                            control={
                              <Checkbox
                              />
                            }
                            label="الاحد"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="3"
                            control={
                              <Checkbox
                              />
                            }
                            label="الاثنين"
                          />
                        </div>
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="4"
                            control={
                              <Checkbox
                              />
                            }
                            label="الثلاثاء"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="5"
                            control={
                              <Checkbox
                              />
                            }
                            label="الاربعاء"
                          />
                        </div>
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="6"
                            control={
                              <Checkbox
                              />
                            }
                            label="الخميس"
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="d-flex col-md-3">
                        <div className="col-md-2">
                          <FormControlLabel
                            className="d-flex"
                            name="days"
                            value="7"
                            control={
                              <Checkbox
                              />
                            }
                            label="الجمعه"
                          />
                        </div>
                      </FormGroup>
                    </div>

                  </div>
                </div>
              </div>
              <button
                type="submit"
                style={{ fontSize: "20px" }}
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
