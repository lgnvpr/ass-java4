import { ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import { Pagination } from "@material-ui/lab";
import React, { useCallback, useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import RuleItem from "src/componet/home/RuleItem";
import ProductItem from "src/componet/product/ProductItem";
import { categoryController, productController } from "src/controller";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import { Product } from "src/submodules/model-shopping/model/Product";
import { useHistory } from "react-router";
import {
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import _ from "lodash";
import PageAdmin from "./PageAdmin";
import ProductAdmin from "src/componet/product/ProductAdmin";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridGap: 10,
		gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
		gridAutoRows: "repeat(auto, 210px)",
		padding: 10,
	},
	filterContainer : {
		padding : 50
	},
	buttonFilterCategory : {
		marginRight : 10
	}
}));
export default function ProductPageAdmin() {
	const classes = useStyles();
	const history = useHistory();
	const [listProduct, setListProduct] = useState<Paging<Product>>({
		pageSize: 20,
	});

	const [categorySelected, setCategorySelected] = useState<
		CategoryProduct[]
	>();

	const [category, setCategory] = useState<CategoryProduct[]>();

	const [query, setQuery] = useState<ListFilter<Product>>({
		pageSize: 20,
	});

	function updateCategorySelected(item: CategoryProduct) {
		let getCategorySelected = [...(categorySelected || [])];
		const checkExit = getCategorySelected.findIndex(
			(cate) => cate.id == item.id
		);
		if (checkExit >= 0) {
			getCategorySelected = getCategorySelected.filter(
				(cate) => cate.id !== item.id
			);
		} else {
			getCategorySelected.push(item);
		}
		setCategorySelected(getCategorySelected);
		setQuery({
			...query,
			filter: [
				{
					filed: "categoryProductId",
					value: getCategorySelected?.map(
						(cate) => cate.id || ""
					) || [""],
				},
			],
		});
	}

	const onQueryChanged = useCallback(
		_.debounce((value: string) => {
			setQuery({ ...query, search: value, searchFields: ["name"] });
		}, 400),
		[]
	);

	useEffect(() => {
		productController.list(query).then((res) => {
			setListProduct(res);
		});
		categoryController.find().then((item) => {
			setCategory(item);
		});
	}, [query]);
	return (
		<PageAdmin>
			<Grid container>
				<Typography variant={"h5"}>Product</Typography>
				<Grid container justify="space-evenly" className = {clsx(classes.filterContainer)}>
					<Grid>
						{category?.map((item) => {
							const isExist = categorySelected?.find(cate => cate.id===item.id);
							return (
								<Button
									className = {clsx(classes.buttonFilterCategory)}
									variant = {!!isExist ? "contained" : "outlined"}
									color = {"primary"}
									onClick={(e) => {
										updateCategorySelected(item);
									}}
									
								>
									{item.name}
								</Button>
							)
						})}
					</Grid>
					<Grid>
						<TextField
							onChange={(e) => {
								onQueryChanged(e.target.value);
							}}
						></TextField>
					</Grid>
					<Grid>
						<Pagination
							count={listProduct.totalPages}
							onChange={(e, page) => {
								setQuery({
									...query,
									page,
								});
							}}
							color="primary"
						/>
					</Grid>
				</Grid>
				<Grid className={clsx(classes.root)} container>
					{listProduct.rows?.map((item) => {
						return <ProductAdmin item={item} />;
					})}
				</Grid>
			</Grid>
		</PageAdmin>
	);
}
