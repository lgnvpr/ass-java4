import { ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import React, { useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import RuleItem from "src/componet/home/RuleItem";
import ProductItem from "src/componet/product/ProductItem";
import { productController } from "src/controller";
import { Product } from "src/submodules/model-shopping/model/Product";

export default function Home() {
	const [listProduct, setListProduct] = useState<Paging<Product>>({
		pageSize : 20
	})

	const [query, setQuery] = useState<ListFilter<Product>>({
		pageSize : 20
	})




	useEffect(() => {
		productController.list(query).then(res=>{
			setListProduct(res)
		})
	}, [])
	return (
		<ContainerGeneral>
			<div>
				<div className="slider-home">
					<img src="https://vanluongg.github.io/vanluong/img/home/slider1.jpg" />
				</div>
				<div>
					<div className="list-rules">
						<RuleItem />
						<RuleItem />
						<RuleItem />
						<RuleItem />
					</div>
				</div>
				<div className = "flex-center title-list-product">
						<h1>Sản phẩm</h1>
					</div>
				<div className  = "fr-list-product">
					
					<div className = "list-product-home">
						{
							listProduct?.rows?.map(item=> <ProductItem
								item = {item}
							></ProductItem>)
						}
					</div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
