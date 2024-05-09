import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";


export default function card() {
    return (
        <Card sx={{ maxWidth: 345 }} className={styles.topCard}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image=""
                    alt="Top Saller cards"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Test Body
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Test second Body
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

