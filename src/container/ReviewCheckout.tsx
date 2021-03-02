import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { CartProduct } from "src/submodules/model-shopping/model/CartProduct";
import { cartProductController, customerController } from "src/controller";
import { Customer } from "src/submodules/model-shopping/model/Customer";
import { AddressHelper } from "src/helper/AddressHelper";



const useStyles = makeStyles((theme) => ({
	listItem: {
		padding: theme.spacing(1, 0),
	},
	total: {
		fontWeight: 700,
	},
	title: {
		marginTop: theme.spacing(2),
	},
}));
type Props = {
	onNext?: () => void;
};
export default function ReviewCheckout(props: Props) {
	const classes = useStyles();
	const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);
	const [customer, setCustomer] = useState<Customer>({});
	const totalMoney = (): number => {
		const total =
			cartProduct?.reduce((next, pre) => {
				return (next +=
					(pre.product?.priceSale || 0) * (pre.amount || 0) || 0);
			}, 0) || 0;
		return total;
	};

	useEffect(() => {
		customerController
			.get({
				id: "109981813389303333821",
			})
			.then((res) => {
				setCustomer(res as Customer);
			});
		cartProductController
			.list({
				pageSize: 1000,
				filter: [
					{
						filed: "customerId",
						value: ["0cb2b898-063f-4f05-b7d8-8ebd44658fb6"],
					},
				],
			})
			.then((res) => {
				setCartProduct(res.rows || []);
			});
	}, []);

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{cartProduct.map((product) => (
					<ListItem className={classes.listItem} key={product.id}>
						<ListItemText
							primary={product?.product?.name || ""}
							secondary={`Số lượng : ${(product.amount || 0)}`  }
						/>
						<Typography variant="body2">{(product.amount || 0) * (product.product?.price || 0)}$</Typography>
					</ListItem>
				))}
				<ListItem className={classes.listItem}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" className={classes.total}>
						${totalMoney()}
					</Typography>
				</ListItem>
			</List>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography
						variant="h6"
						gutterBottom
						className={classes.title}
					>
						Họ và tên:  {customer.name || ""}
					</Typography>
					<Typography gutterBottom>John Smith</Typography>
					<Typography gutterBottom>Địa chỉ: {AddressHelper.getAddressString(customer.address)}</Typography>
					<Typography gutterBottom>Nơi nhận: {AddressHelper.getAddress(customer.address).detail}</Typography>
				</Grid>
			</Grid>
			<Button
				// className={clsx(globalStyles.mt2)}
				fullWidth
				variant="contained"
				color={"primary"}
				onClick={(e) => {
					if (props.onNext) {
						props.onNext();
					}
				}}
			>
				Xác nhận đơn hàng
			</Button>
		</React.Fragment>
	);
}
