import { ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import RuleItem from "src/componet/home/RuleItem";
import ProductItem from "src/componet/product/ProductItem";
import { productController } from "src/controller";
import { Product } from "src/submodules/model-shopping/model/Product";

export default function ProductPage() {
	const [listProduct, setListProduct] = useState<Paging<Product>>({
		pageSize: 20,
	});

	const [query, setQuery] = useState<ListFilter<Product>>({
		pageSize: 20,
	});

	useEffect(() => {
		productController.list(query).then((res) => {
			console.log(res);
			setListProduct(res);
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
					<div className="filer-product">
						<div className="name-filer">Bikini 1 </div>
						<div className="name-filer">Bikini 2</div>
						<div className="name-filer">Bikini 3</div>
						<div className="name-filer">Bikini 4</div>
					</div>
					<div className="list-product">
						{listProduct?.rows?.map((item) => {
							return (
								<div className="fr-product">
									<div className="product">
										<div className="img-product">
											<img src={item.image} alt="" />
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
					<div className="pagination"></div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
