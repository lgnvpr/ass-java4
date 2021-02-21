import React, { useEffect, useState } from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import {AiOutlineCloseCircle} from "react-icons/ai"
import CartItem from "src/componet/product/CartItem";
import Button from "src/my-component/Button";
import { cartProductController } from "src/controller";
import { CartProduct } from "src/submodules/model-shopping/model/CartProduct";
import { ListFilter } from "@BaseTypes/model/Filter";

export default function CartPage() {
	const [cartProduct, setCartProduct] = useState<CartProduct[]>()
	const [query, setQuery] = useState<ListFilter<CartProduct>>({
		pageSize : 1000
	})

	const updateItem = (item : CartProduct)=>{
		cartProductController.save(item).then(res=> {
			setQuery({...query})
		})
	}
	const deleteItem = (item : CartProduct)=>{
		cartProductController.delete(item.id || '').then(res=> {
			setQuery({...query})
		})
	}

	const totalMoney=():number=>{
		const total =  cartProduct?.reduce((next, pre)=>{
			return next+= ((pre.product?.priceSale || 0)*(pre.amount||0) ||0)
		}, 0) ||0
		return total
	}

	useEffect(() => {
		cartProductController.list(query).then(res=>{
			setCartProduct(res.rows)
		})
	}, [query])
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
						{
							cartProduct?.map(item=>{
								return (<CartItem
									item = {item}
									onChange = {(item)=>{
										updateItem(item);
									}}
									onDelete = {(item)=>{
										deleteItem(item)
									}}
								/>)
							})
						}
						
						<div className = "fr-sum-price-cart">
							<div>Tạm tính</div>
							<div>{totalMoney()} đ</div>
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
