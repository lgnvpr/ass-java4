import React from 'react'
import {AiOutlineShoppingCart} from "react-icons/ai"
export default function Product() {
    return (
        <div className = "fr-product">
            <div className = "icon-add-cart">
                <AiOutlineShoppingCart
								fontSize = {22}
                />
            </div>
            <div className = "img-product">
                <img src = "https://vanluongg.github.io/vanluong/img/home/img-product/1.jpg"></img>
            </div>
            <div className = "info-product">
                <div className = "name-product">
                    Áo dài tay
                </div>
                <div className = "price-product">
                    <div className= "main-price-product">510,0000</div>
                    <div className= "sale-price-product">510,0000</div>
                </div>
            </div>
        </div>
    )
}
