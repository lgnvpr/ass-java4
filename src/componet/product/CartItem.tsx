import { makeStyles } from "@material-ui/core";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CartProduct } from "src/submodules/model-shopping/model/CartProduct";
import { isPropertyAccessExpression } from "typescript";

type Props = {
	item : CartProduct,
	onChange : (item : CartProduct)=> void;
	onDelete : (item : CartProduct)=> void;
}
export default function CartItem(props : Props ) {
	return (
		<div className="cart-product">
			<div className="img-delete">
				<div className="img-cart">
					<img
						src={props.item.product?.image}
						alt=""
					/>
				</div>
				<button className="delete-cart"
					onClick={(e)=>{
						props.onDelete(props.item)
					}}
				>
					<AiOutlineCloseCircle /> Xóa
				</button>
			</div>
			<div className="info-product-cart">
				<div className="name-product-cart">
					{props.item?.product?.name || "" }
				</div>
				<div className="color-product-cart">Size: M</div>
				<div className="size-product-cart">Màu: Trắng</div>
			</div>
			<div className="action-price">
				<div className="price-cart">{props.item.product?.priceSale|| 0}đ</div>
				<div className="action">
					<button className="btn-change-amount"
						onClick = {(e)=>{
							props.onChange({
								...props.item,
								amount : ((props.item?.amount!=undefined &&props.item?.amount >0 )? props.item?.amount:1 ) -1
							})
						}}
					> - </button>
					<input
						value={props.item.amount}
						type="text"
						className="input-change-amount"
					/>
					<button className="btn-change-amount" 
						onClick = {(e)=>{
							props.onChange({
								...props.item,
								amount :  ((props.item?.amount!=undefined &&props.item?.amount >=0 )? props.item?.amount:1 ) +1
							})
						}}
					> + </button>
				</div>
			</div>
		</div>
	);
}
