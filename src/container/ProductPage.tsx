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
import { Button, FormControl, Grid, InputLabel, makeStyles, OutlinedInput, TextField } from "@material-ui/core";
import _ from "lodash";
import clsx from "clsx";
import SearchIcon from "@material-ui/icons/Search";


const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridGap: 40,
		gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
		gridAutoRows: "repeat(auto, 510px)",
	},
	filterContainer: {
		paddingBottom: 50,
	},
	buttonFilterCategory: {
		marginLeft: 10,
		marginBottom: 10,
	},
	pagination: {
		paddingTop: 50,
		paddingBottom: 50,
	},
}));

export default function ProductPage() {
	const history = useHistory();
	const classes = useStyles();
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
		<ContainerGeneral>
			<div className="fr-container">
				<div className="container">
					<div className="banner">
						<img src="https://evashopping.vn/products/danhmuc/1610774315banner-do-boi-nu.jpg" />
					</div>
					<div className="header-name-product">Đồ bơi nữ</div>
					<Grid
						container
						justify="space-between"
						className={clsx(classes.filterContainer)}
					>
						<Grid>
							{category?.map((item) => {
								const isExist = categorySelected?.find(
									(cate) => cate.id === item.id
								);
								return (
									<Button
										className={clsx(
											classes.buttonFilterCategory
										)}
										variant={
											!!isExist ? "contained" : "outlined"
										}
										color={"primary"}
										onClick={(e) => {
											updateCategorySelected(item);
										}}
									>
										{item.name}
									</Button>
								);
							})}
						</Grid>
						<Grid>
							<FormControl variant="outlined">
								<InputLabel>{"Tìm kiếm"}</InputLabel>
								<OutlinedInput
									// className={props.className}
									style={{ minWidth: "300px" }}
									onChange={(e) => {
										onQueryChanged(e.target.value);
									}}
									label={"Tìm kiếm"}
									endAdornment={<SearchIcon />}
									type={"text"}
								/>
							</FormControl>
						</Grid>
					</Grid>
					<Grid className={clsx(classes.root)}>
						{listProduct?.rows?.map((item) => {
							return (
								<ProductItem
									item={item}
									onSeeDetail={(item) => {
										history.push(
											`product/${item.id}` || ""
										);
									}}
								/>
							);
						})}
					</Grid>
					<Grid
						className={clsx(classes.pagination)}
						container
						justify="center"
					>
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
				</div>
			</div>
		</ContainerGeneral>
	);
}
