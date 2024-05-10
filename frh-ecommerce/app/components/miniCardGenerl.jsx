import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function miniCardGenerl({data}) {
  return (
    <Card className={styles.miniCard}>
            <CardActionArea>
            <CardMedia
                    component="img"
                    height="140"
                    image=""
                    alt="Top Saller cards"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Hello From Mini
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Mini
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
  )
}
