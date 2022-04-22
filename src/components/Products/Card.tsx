import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
} from '@mui/material';
import React from 'react';

const ProductCard = () => {
  const handleClick = (e: any) => {
    console.log(e);
  };

  return (
    <Card sx={{maxWidth: 300}}>
      <CardMedia
        image='http://placeimg.com/468/320/tech'
        alt='tech image'
        component='img'
        height='320'
      />
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Title
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Description
          </Typography>
          <CardActions sx={{justifyContent: 'flex-end', padding: 0}}>
            <Typography variant='body2' color='text.secondary'>
              price
            </Typography>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
