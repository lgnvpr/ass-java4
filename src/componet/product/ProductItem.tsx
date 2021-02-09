import React from 'react'
import {AiFillEye} from "react-icons/ai"
import { Product } from 'src/submodules/model-shopping/model/Product'
type Props = {
    item : Product
}
export default function ProductItem(props : Props) {
    return (
        <div className = "fr-product">
            <div className = "icon-add-cart">
                <AiFillEye
								fontSize = {22}
                />
            </div>
            <div className = "img-product">
                <img src = {props.item.image}></img>
            </div>
            <div className = "info-product">
                <div className = "name-product">
                    {props.item.name}
                </div>
                <div className = "price-product">
                    <div className= "main-price-product">{props.item.price}</div>
                    <div className= "sale-price-product">{props.item.price}</div>
                </div>
            </div>
        </div>
    )
}
