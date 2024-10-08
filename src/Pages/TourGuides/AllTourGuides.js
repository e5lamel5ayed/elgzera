import React, { useEffect } from "react";
import Drawer from "../../Components/Drawer";

import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import TourGidesList from "./TourGuidesList";

export default function AllTourGuides() {

  return (
    <div>
      <Drawer />
      <Box sx={{ width: "80%" }}>
        <div>
          <h2 className="table-head">المرشدين</h2>
          <Link to="/AddTOurGuides">
            <button className="btn btn-primary add-button">اضافه مرشد</button>
          </Link>
        </div>

        <TourGidesList />
      </Box>
    </div>
  );
}
