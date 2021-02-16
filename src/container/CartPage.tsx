import React from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import {AiOutlineCloseCircle} from "react-icons/ai"
import CartItem from "src/componet/product/CartItem";
import Button from "src/my-component/Button";

export default function CartPage() {
	return (
		<ContainerGeneral>
			<div
				style={{
					background: "#317ab914",
				}}
				className={"fr-container"}
			>
				<div className="container">
					<div className="list-cart">
						<CartItem/>
						<CartItem/>
						<CartItem/>
						<CartItem/>
						<div className = "fr-sum-price-cart">
							<div>Tạm tính</div>
							<div>230.000d</div>
						</div>
						<div>
							<Button>
								Tiến hành đặt hàng
							</Button>
						</div>
					</div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
