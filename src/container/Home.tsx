import React from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import RuleItem from "src/componet/home/RuleItem";
import Product from "src/componet/product/Product";

export default function Home() {
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
							[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
							.map(item=> <Product></Product>)
						}
					</div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
