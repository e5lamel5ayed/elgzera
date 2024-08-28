/* eslint-disable no-unused-vars */
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


export default function CruisesList() {
  
  return (
    <div>

      <TableContainer
        className="table-style table table-hover"
        sx={{ direction: "rtl" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head-style">
            <TableRow>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الاسم
              </TableCell>
              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="right"
              >
                الحالة
              </TableCell>

              <TableCell
                style={{ color: "#fff" }}
                sx={{ fontSize: "18px" }}
                align="center"
              >
                الاجراءات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontSize: "18px" }}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    مركب سياحي
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    نشط

                  </TableCell>

                  <TableCell sx={{ fontSize: "18px" }} align="center">
                    <button
                      className="btn btn-primary ml-2"
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                    >
                      حذف
                    </button>
                  </TableCell>
                </TableRow>
           
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontSize: "18px" }}
                    align="right"
                    component="th"
                    scope="row"
                  >
                    مركب سياحي
                  </TableCell>
                  <TableCell sx={{ fontSize: "18px" }} align="right">
                    نشط

                  </TableCell>

                  <TableCell sx={{ fontSize: "18px" }} align="center">
                    <button
                      className="btn btn-primary ml-2"
                    >
                      تعديل
                    </button>
                    <button
                      className="btn btn-danger"
                    >
                      حذف
                    </button>
                  </TableCell>
                </TableRow>
              
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}
