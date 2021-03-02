import React, { useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import OptionColor from "src/componet/product/OptionColor";
import OptionSize from "src/componet/product/OptionSize";
import { cartProductController, productController } from "src/controller";
import { useParams } from "react-router";
import { Product } from "src/submodules/model-shopping/model/Product";
import SliderImage from "src/componet/genaral-component/SliderImage";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useGlobalStyles } from "src/style/GlobalStyle";
// import { FacebookProvider, Comments } from 'react-facebook';
const { FacebookProvider, Comments, Share } = require("react-facebook");

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 50,
	},
	frImg: {
		width: 300,
	},
	content: {
		paddingLeft: 30,
	},
	name: {
		fontWeight: 550,
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		fontSize: "1.5rem",
	},
	price: {
		color: theme.palette.primary.main,
		fontSize: "2rem",
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	titleOption: {
		fontWeight: 550,
		paddingRight: 10,
	},
}));
export default function ProductDetail() {
	const classes = useStyles();
	const globalStyles = useGlobalStyles();
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product>();

	const addToCart = (item: Product) => {
		cartProductController.addToCart({
			productId: item.id
		});
	};
	useEffect(() => {
		productController
			.get({
				id: id,
			})
			.then((res) => {
				if (res) {
					setProduct(res as Product);
				}
			});
	}, []);
	return (
		<ContainerGeneral>
			<Grid
				container
				justify="center"
				direction="row"
				className={clsx(classes.root)}
			>
				<Grid className={clsx(classes.frImg)}>
					<SliderImage
						img={
							product?.productImage?.map(
								(item) => item.link || ""
							) || []
						}
					/>
				</Grid>
				<Grid className={clsx(classes.content)}>
					<Grid>
						<Typography className={clsx(classes.name)}>
							{product?.name}
						</Typography>
					</Grid>
					<Grid>
						<Typography className={clsx(classes.price)}>
							$ {product?.price}{" "}
						</Typography>
					</Grid>
					<Grid
						container
						alignItems="center"
						className={clsx(globalStyles.pb2)}
					>
						<Grid className={clsx(classes.titleOption)}>
							Chọn màu
						</Grid>
						<Grid>
							<OptionColor
								color={["black", "red", "yellow"]}
								colorSelected={"black"}
							/>
						</Grid>
					</Grid>

					<Grid
						container
						alignItems="center"
						className={clsx(globalStyles.pb2)}
					>
						<Grid className={clsx(classes.titleOption)}>
							Chọn Size
						</Grid>
						<Grid>
							<OptionSize
								sizeSelected={"L"}
								sizes={["L", "M", "XL"]}
							/>
						</Grid>
					</Grid>

					<Grid>
						Thiết kế áo bơi dài tay kín đáo kết hợp quần short che
						nắng hiệu quả, thoải mái hoạt động, rất thích hợp trong
						học bơi và tắm biển.
						<br></br>
						Thun bơi cao cấp, co dãn 4 chiều, nhập khẩu Hàn Quốc.
						<br></br>
						Xuất xứ : Made in Việt Nam. Size : M,L, XL. Màu sắc :
						Trắng phối tay đen.
					</Grid>
					<Grid container className={clsx(globalStyles.pt2)}>
						<Button
							variant="contained"
							color="primary"
							className={clsx(globalStyles.mr2)}
							onClick={(e) => {
								if (product) {
									addToCart(product);
								}
							}}
						>
							Thêm vào giỏ
						</Button>
						<Button variant="outlined" color="primary">
							Gọi điện đặt hàng
						</Button>
					</Grid>
				</Grid>
				<Grid>
					<Comments href={`http://localhost:3000/${product?.id}`} />
				</Grid>
			</Grid>
		</ContainerGeneral>
	);
}
