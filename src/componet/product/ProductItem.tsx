import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { AiFillEye } from "react-icons/ai";
import { Product } from "src/submodules/model-shopping/model/Product";
import clsx from "clsx";
type Props = {
	item: Product;
	onSeeDetail: (item: Product) => void;
};

const useStyle = makeStyles((theme) => ({
	root: {
		border: `1px solid ${theme.palette.grey[300]}`,
		width: 300,
		cursor : "pointer"
	},
	frImg: {
		overflow: "hidden",
		height: 300,
		// width: "",
	},
	content: {
		height: 100,
		padding: 10,
	},
	name : {
		fontWeight : "bold"
	}
}));
export default function ProductItem(props: Props) {
	const classes = useStyle();
	return (
		<Grid container justify="center" onClick={(e) => {
			props.onSeeDetail(props.item);
		}}>
			<Grid className={clsx(classes.root)}>
				<Grid className={clsx(classes.frImg)}>
					<img src={props.item.image || ""}></img>
				</Grid>
				<Grid
					className={clsx(classes.content)}
					container
					direction="column"
					justify="space-around"
				>
					<Grid>
						<Typography color="secondary" variant="subtitle1">
							{props.item.name}
						</Typography>
					</Grid>

					<Grid>
						<Typography variant={"h5"} color={"primary"}>
							${props.item.price}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
