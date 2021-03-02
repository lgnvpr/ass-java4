import {
	Card,
	Grid,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { Product } from "src/submodules/model-shopping/model/Product";
import { useGlobalStyles } from "src/style/GlobalStyle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

type Props = {
	item: Product;
    onDelete : (item:Product)=> void;
    onEdit : (item : Product)=> void
};
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		height: 150,
		width: 300,
		cursor: "pointer",
        boxShadow : "none",
        border : `1px solid ${theme.palette.grey[300]}`,
        "&:hover" : {
            boxShadow :"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
        }
	},
	frImg: {
		width: 150,
		height: 150,
	},
	img: {
		overflow: "hidden",
	},
}));
export default function ProductAdmin(props: Props) {
	const globalStyles = useGlobalStyles();
	const classes = useStyles();
	return (
		<Grid>
			<Card className={clsx(classes.root)}>
				<Grid className={clsx(classes.frImg)}>
					<img
						className={clsx(classes.frImg, classes.img)}
						src={props.item.productImage ? props.item.productImage[0].link : "" }
						alt=""
					/>
				</Grid>
				<Grid
					container
					direction={"column"}
					justify="space-around"
					alignItems="center"
				>
					<Grid>
						<Typography color="secondary" variant="subtitle1">
							{props.item.name}
						</Typography>
					</Grid>
					<Grid>
						<Typography color="primary" variant="subtitle1">
							{props.item.price} $
						</Typography>
					</Grid>
					<Grid>
						<Typography>
							{props.item.categoryProduct?.name}
						</Typography>
					</Grid>
					<Grid>
						<Grid container>
							<Grid item>
								<IconButton
									size="small"
									color="primary"
									onClick={() => {props.onEdit(props.item)}}
								>
									<EditIcon fontSize="small" />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									aria-label="add"
									size="small"
									color="primary"
									className={`${globalStyles.mr2} ${globalStyles.ml2} ${globalStyles.iconButtonAlert}`}
									onClick={() => {props.onDelete(props.item)}}
								>
									<DeleteIcon
										color="inherit"
										fontSize="small"
									/>
								</IconButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
}
