import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ProductList() {

  return (

    <div className='container'>
      <div className='row product-edit'>

        <div className='col-md-4' style={{ marginLeft: "" }}>

          <Card sx={{ maxWidth: 305 }} >

            <div>

              <img style={{ width: "80%", marginLeft: "10%" }}
                src='	https://shewearsmanyhats.com/wp-content/uploads/2013/07/dipped-ice-cream-cones-7.jpg'></img>
            </div>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ice Cream
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $ 10
              </Typography>
            </CardContent>

          </Card>

        </div>
        <div className='col-md-4' style={{ marginLeft: "" }}>

          <Card sx={{ maxWidth: 305 }} >

            <div>

              <img style={{ width: "85%", marginLeft: "10%" }}
                src='https://3.bp.blogspot.com/-CUFRl-YnyGE/U-5XwuFuV7I/AAAAAAAAOU8/c3wsqDpD1mU/s1600/lays.jpg'></img>
            </div>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ice Cream
              </Typography>
              <Typography variant="body2" color="text.secondary">
                $ 10
              </Typography>
            </CardContent>

          </Card>

        </div>








      </div>

    </div>








  );
}
