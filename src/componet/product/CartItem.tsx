/* eslint-disable jsx-a11y/alt-text */
import {
	createStyles,
	Grid,
	IconButton,
	makeStyles,
	Paper,
	Typography,
} from "@material-ui/core";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CartProduct } from "src/submodules/model-shopping/model/CartProduct";
import { isPropertyAccessExpression } from "typescript";
import clsx from "clsx";
import RemoveIcon from "@material-ui/icons/Remove";
type Props = {
	item: CartProduct;
	onChange: (item: CartProduct) => void;
	onDelete: (item: CartProduct) => void;
};

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: "100%",
			maxWidth : 600,
			margin: 10,
			border: `1px solid ${theme.palette.grey[300]}`,
			padding: 15,
			position: "relative",
			flex : 1
		},
		frImg: {
			width: 100,
			height: 100,
			overflow: "hidden",
		},
		img: {
			height: "100% ",
		},
		buttonIcon: {
			height: 30,
			width: 30,
			margin: "0px 10px",
		},
		buttonIconDelete: {
			position: "absolute",
			top: 10,
			right: 10,
			color: theme.palette.error.main,
		},
		content: {
			flex: 1,
			paddingLeft: 10,
		},
	})
);
export default function CartItem(props: Props) {
	const classes = useStyles();
	return (
		<Grid
			// container
			className={clsx(classes.root)}
			// xs={6}
			// alignItems={"center"}
			// justify="center"
		>
			<Grid container direction="row" justify={"space-between"}>
				<IconButton
					className={clsx(
						classes.buttonIcon,
						classes.buttonIconDelete
					)}
					aria-label="delete"
					// color="sen"
					onClick={(e) => {
						props.onDelete(props.item);
					}}
				>
					<RemoveIcon></RemoveIcon>
				</IconButton>

				<Grid className={clsx(classes.frImg)}>
					<img
						className={clsx(classes.img)}
						src={props.item.product?.image || ""}
					/>
				</Grid>
				<Grid
					className={clsx(classes.content)}
					container
					direction="column"
					justify="space-between"
				>
					<Grid>
						<Typography>{props.item.product?.name}</Typography>
					</Grid>
					<Grid>
						<Typography>Size : M </Typography>
					</Grid>
					<Grid>
						<Typography>Color : Trắng</Typography>
					</Grid>
				</Grid>
				<Grid
					className={clsx(classes.content)}
					container
					direction="column"
					justify="space-between"
				>
					<Grid
						container
						direction="column"
						justify="space-around"
						alignItems="center"
						style={{
							flex: 1,
						}}
					>
						<Grid>$32</Grid>
						<Grid>
							<IconButton
								className={clsx(classes.buttonIcon)}
								aria-label="delete"
								color="secondary"
								onClick={(e) => {
									props.onChange({
										...props.item,
										amount:
											(props.item?.amount != undefined &&
											props.item?.amount > 0
												? props.item?.amount
												: 1) - 1,
									});
								}}
							>
								-
							</IconButton>
							{props.item.amount}
							<IconButton
								color="secondary"
								aria-label="add an alarm"
								className={clsx(classes.buttonIcon)}
								onClick={(e) => {
									props.onChange({
										...props.item,
										amount:
											(props.item?.amount != undefined &&
											props.item?.amount >= 0
												? props.item?.amount
												: 1) + 1,
									});
								}}
							>
								+
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
