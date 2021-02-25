import { Card, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import clsx from "clsx"
import { Product } from 'src/submodules/model-shopping/model/Product';

type Props = {
	item: Product;
};
const useStyles = makeStyles((theme) => ({
    root : { 
        display : "flex",
        height : 150,
        width : 300,
        cursor : "pointer"
    },
    frImg : {
        width : 150,
        height : 150,
    },
    img : {
        overflow : "hidden"
    }
}));
export default function ProductAdmin(props : Props) {
    const classes = useStyles();
    return (
        <Grid>
            <Card className = {clsx(classes.root)}>
            <Grid className = {clsx(classes.frImg)}>
                <img className = {clsx(classes.frImg, classes.img)} src={props.item.image} alt=""/>
            </Grid>
            <Grid container direction={"column"} justify = "space-around" alignItems = "center">
                <Grid>
                    <Typography>
                        {props.item.name}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography>
                        {props.item.price}
                    </Typography>
                </Grid>
                <Grid>
                    <Typography>
                        {props.item.categoryProduct?.name}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
        </Grid>
    )
}
