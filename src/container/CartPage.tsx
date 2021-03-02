import React, { useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CartItem from "src/componet/product/CartItem";
import { cartProductController } from "src/controller";
import { CartProduct } from "src/submodules/model-shopping/model/CartProduct";
import { ListFilter } from "@BaseTypes/model/Filter";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useGlobalStyles } from "src/style/GlobalStyle";

const useStyles = makeStyles((theme) => ({
	totalMoney: {
		paddingLeft: 10,
	},
}));
type Props = {
	onNext ?: ()=> void
}
export default function CartPage(props : Props) {
	const classes = useStyles();
	const globalStyles = useGlobalStyles();

	const [cartProduct, setCartProduct] = useState<CartProduct[]>();
	const [query, setQuery] = useState<ListFilter<CartProduct>>({
		pageSize: 1000,
		filter :[{
			filed : "customerId",
			value : ["0cb2b898-063f-4f05-b7d8-8ebd44658fb6"]
		}]
	});

	const updateItem = (item: CartProduct) => {
		// 
		cartProductController.save({
			...item,
			customerId : "0cb2b898-063f-4f05-b7d8-8ebd44658fb6" 
		}).then((res) => {
			setQuery({ ...query });
		});
	};
	const deleteItem = (item: CartProduct) => {
		cartProductController.delete(item.id || "").then((res) => {
			setQuery({ ...query });
		});
	};

	const totalMoney = (): number => {
		const total =
			cartProduct?.reduce((next, pre) => {
				return (next +=
					(pre.product?.priceSale || 0) * (pre.amount || 0) || 0);
			}, 0) || 0;
		return total;
	};

	useEffect(() => {
		cartProductController.list(query).then((res) => {
			setCartProduct(res.rows);
		});
	}, [query]);
	return (
		<Grid>
			<Grid
				container
				justify="center"
				direction="column"
				alignItems="center"
			>
				{cartProduct?.map((item) => {
					return (
						<CartItem
							item={item}
							onChange={(item) => {
								updateItem(item);
							}}
							onDelete={(item) => {
								deleteItem(item);
							}}
						/>
					);
				})}
				<Grid>
					<Grid container className={clsx(globalStyles.mt2)}>
						<Typography variant="h4">Tổng tiền</Typography>
						<Typography
							className={clsx(classes.totalMoney)}
							color={"primary"}
							variant="h4"
						>
							{totalMoney()}
						</Typography>
					</Grid>
						<Button
							className={clsx(globalStyles.mt2)}
							fullWidth
							variant="contained"
							color={"primary"}
							onClick = {(e)=>{
								if(props.onNext){
									props.onNext()
								}
							}}
						>
							Tiếp tục
						</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
