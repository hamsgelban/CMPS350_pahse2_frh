import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from "@/app/page.module.css";
import MiniCard from '@/app/components/miniCardCategory';

export default function mainCardGeneral({ data, imageUrl }) {
    return (
        <Card className={styles.topCard}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Top Three
                    </Typography>
                    {data.map((dataItem, index) => (
                        <MiniCard key={index} data={dataItem} imageUrl={imageUrl} />
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
