import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import MiniCard from '@/app/components/miniCardGenerl'


export default function mainCardGeneral({data}) {
    return (
        <Card className={styles.topCard}>
            <CardActionArea>
                {/* <CardMedia
                    component="img"
                    height="140"
                    image=""
                    alt="Top Saller cards"
                /> */}
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                        {/* Name: {data.name} */}
                        Top Three 
                    </Typography>
                    <MiniCard></MiniCard>
                    <MiniCard></MiniCard>
                    <MiniCard></MiniCard>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

