import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';

const UpgradeCard = ({ storage, onSelect }) => {
  return (
    <>
      <Card sx={{m:1.5}}>
        <CardContent>
            <Typography variant="h5" component="div">
                {storage} GB Storage
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Upgrade your storage to {storage} GB
            </Typography>
        </CardContent>
        <CardActions sx={{
                display:'flex',
                justifyContent:'center',
                justifyItems:'center'
            }}>
            <Button variant="contained" color="primary" onClick={() => onSelect(storage)}>
                Select
            </Button>
        </CardActions>
        </Card>
    </>
    
  );
};

export default UpgradeCard;
