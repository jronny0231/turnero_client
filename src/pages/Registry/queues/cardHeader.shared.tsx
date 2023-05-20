import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import invisLogo from '../../../assets/logo.png';


export const CardHeader = ({title, subtitle}: any): JSX.Element => {
    return (
        <Card sx={{ maxWidth: 1 }}>
            <CardMedia
                component="img"
                image={invisLogo}
                alt="INVIS Logo"
                width={'30vw'}
            />
            <CardContent style={{textAlign:"center"}}>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    )
}