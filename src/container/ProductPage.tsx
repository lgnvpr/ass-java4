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
import {useHistory} from "react-router"
import { TextField } from "@material-ui/core";
import _ from "lodash";

export default function ProductPage() {
	const history = useHistory()
	const [listProduct, setListProduct] = useState<Paging<Product>>({
		pageSize: 20,
	});

	const [categorySelected, setCategorySelected] = useState<CategoryProduct[]>();
	
	const [category, setCategory] = useState<CategoryProduct[]>();
	

	const [query, setQuery] = useState<ListFilter<Product>>({
		pageSize: 20,
	});

	function updateCategorySelected(item: CategoryProduct){
		let getCategorySelected = [...categorySelected || []];
		const checkExit = getCategorySelected.findIndex(cate => cate.id == item.id);
		if(checkExit>=0){
			getCategorySelected =  getCategorySelected.filter(cate => cate.id !== item.id)
		}
		else{
			getCategorySelected.push(item);
		}
		setCategorySelected(getCategorySelected);
		setQuery({
			...query,
			filter : [
				{
					filed : "categoryProductId",
					value : getCategorySelected?.map(cate => cate.id || "") ||[""]
				}
			]
		})
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
		categoryController.find().then(item=>{
			setCategory(item)
		})
	}, [query]);
	return (
		<ContainerGeneral>
			<div className="fr-container">
				<div className="container">
					<div className="banner">
						<img src="https://evashopping.vn/products/danhmuc/1610774315banner-do-boi-nu.jpg" />
					</div>
					<div className="header-name-product">Đồ bơi nữ</div>
					<div className="filer-product">
						{category?.map(item=>{
							const isExist = categorySelected?.find(cate => cate.id===item.id);
							return (<div className="name-filer" style ={{
								background : !!isExist ? "#f53f7d" : "",
								color : !!isExist ? "white" : ""
							}}
								onClick = {(e)=>{
									updateCategorySelected(item);
								}}
							>{item.name} </div>)
						})}
						<div>
							<TextField
								onChange={(e)=>{
									onQueryChanged(e.target.value)
								}}
							/>
						</div>
					</div>
					<div className="list-product">
						{listProduct?.rows?.map((item) => {
							return (
								<div className="fr-product" onClick = {(e)=>{
									history.push(`product/${item.id}`)
								}}>
									<div className="product">
										<div className="img-product">
											<img src={item.productImage?.length ? item.image :item.image} alt="" />
										</div>
										<div className="content-product">
											<div className="name-price-product">
												<div className="name-product">
													{item.name}
												</div>
												<div className="price-product">
													{item.priceSale}$
												</div>
											</div>
											<div className="vote-product">
												<div className="number-vote">
													<div>*****</div>
													<div>Đánh giá</div>
												</div>
												<div className="title"></div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="pagination">
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
					</div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
