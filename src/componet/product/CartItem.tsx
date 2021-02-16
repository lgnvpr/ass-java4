import { makeStyles } from "@material-ui/core";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function CartItem() {
	return (
		<div className="cart-product">
			<div className="img-delete">
				<div className="img-cart">
					<img
						src="https://evashopping.vn/products/do-boi-dai-tay-don-sac-BKN312-h3.jpg"
						alt=""
					/>
				</div>
				<button className="delete-cart">
					<AiOutlineCloseCircle /> Xóa
				</button>
			</div>
			<div className="info-product-cart">
				<div className="name-product-cart">
					Đồ bơi tay dài đơn sắc BKN312
				</div>
				<div className="color-product-cart">Size: M</div>
				<div className="size-product-cart">Màu: Trắng</div>
			</div>
			<div className="action-price">
				<div className="price-cart">123.000đ</div>
				<div className="action">
					<button className="btn-change-amount"> - </button>
					<input
						value={0}
						type="text"
						className="input-change-amount"
					/>
					<button className="btn-change-amount"> + </button>
				</div>
			</div>
		</div>
	);
}
