import React from 'react'
import Drawer from '../../Components/Drawer';
import { Box} from '@mui/material';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import { Grid } from '@mui/material';


export default function home() {
  return (
    <div>
      <Drawer />
      <Box sx={{ width: "75%", ml:"50px",mr:"auto" }}>


        <Grid container spacing={1} mt={5} display={"flex"} justifyContent={"space-between"}>
          <Grid item md={6} xs={12} sx={{ backgroundColor: "#fff" }}>
            <Chart1 />
          </Grid>
          <Grid item md={5} xs={12} sx={{ backgroundColor: "#fff" }}>
            <Chart2 />
          </Grid>
        </Grid>

        <Grid container spacing={1} mt={5} display={"flex"} justifyContent={"space-between"}>
          <Grid item md={6} xs={12} sx={{ backgroundColor: "#fff" , display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Chart4 />
          </Grid>
          <Grid item md={5} xs={12} sx={{ backgroundColor: "#fff" }}>
            <Chart3 />
          </Grid>
        </Grid>


      </Box>

    </div>
  )
}
