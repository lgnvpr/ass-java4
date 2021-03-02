import { ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import { Pagination } from "@material-ui/lab";
import React, { useCallback, useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import RuleItem from "src/componet/home/RuleItem";
import ProductItem from "src/componet/product/ProductItem";
import {
	accountController,
	categoryController,
	productController,
} from "src/controller";
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
import PopUpConfirm from "src/componet/genaral-component/DialogConfirm";
import PopupProductAdmin from "src/componet/product/PopupProductAdmin";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "grid",
		gridGap: 40,
		gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
		gridAutoRows: "repeat(auto, 210px)",
		padding: 10,
	},
	filterContainer: {
		padding: 50,
	},
	buttonFilterCategory: {
		marginRight: 10,
	},
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
		sort: ["-created_at"],
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

	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [selected, setSelected] = useState<Product>({} as Product);

	function onConfirm(item: Product) {
		setSelected(item);
		setShowConfirm(true);
	}

	function onCancelConfirm() {
		setShowConfirm(false);
	}
	function onDelete() {
		productController.delete(selected.id || "").then(() => {
			setQuery({ ...query });
		});
		setShowConfirm(false);
	}
	function onCloseForm() {
		setShowForm(false);
	}
	function onSave(customer: Product) {
		productController.save(customer).then(() => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}
	function onCreateOrUpdate(position: Product) {
		setSelected(position);
		setShowForm(true);
	}

	useEffect(() => {
		accountController.checkAdmin().then(res=>{
			productController.list(query).then((res) => {
				setListProduct(res);
			});
			categoryController.find().then((item) => {
				setCategory(item);
			});
		})
		
	}, [query]);
	return (
		<PageAdmin>
			<PopUpConfirm
				isDisplay={showConfirm}
				onCancel={onCancelConfirm}
				onDelete={onDelete}
			/>
			<PopupProductAdmin
				category={category || []}
				isDisplay={showForm}
				obj={selected}
				onCancel={onCloseForm}
				onSave={onSave}
			/>
			<Grid container>
				<Typography variant={"h5"}>Product</Typography>
				<Grid
					container
					alignItems="flex-end"
					justify="space-evenly"
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
					<Grid>
						<Button
							onClick={() => {
								onCreateOrUpdate({});
							}}
							variant="contained"
							color="primary"
						>
							Thêm
						</Button>
					</Grid>
				</Grid>
				<Grid className={clsx(classes.root)} container>
					{listProduct.rows?.map((item) => {
						return (
							<ProductAdmin
								item={item}
								onDelete={onConfirm}
								onEdit={onCreateOrUpdate}
							/>
						);
					})}
				</Grid>
			</Grid>
		</PageAdmin>
	);
}
