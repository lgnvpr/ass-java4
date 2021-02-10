import React from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import OptionColor from "src/componet/product/OptionColor";
import OptionSize from "src/componet/product/OptionSize";

export default function ProductDetail() {
	return (
		<ContainerGeneral>
			<div className="fr-container">
				<div className="container">
					<div className="info-product-detail">
						<div className="img-product-detail">
							<img src="https://evashopping.vn/products/thumb/do-boi-dai-tay-don-sac-BKN312-h4.jpg" />
						</div>
						<div className="content-detail">
							<div className="name-product-detail">
								Đồ bơi tay dài đơn sắc
							</div>
							<div className="price-product-detail">
								320,000 đ
							</div>
							<div className="vote-product-detail">*****</div>
							<div className="option-color">
								Chọn màu :{" "}
								<OptionColor
									color={["red", "blue", "orange", "black"]}
                                    colorSelected = "red"
								/>
							</div>
							<div className="option-color">Chọn size :<OptionSize  sizeSelected = "X" sizes = {["XL", "X", "M"]}/> </div>
							<div className="order-product-detail">
								<button className="c-button">
									Đặt hang ngay
								</button>
								<button className="c-button">
									Gọi điện đặt hàng
								</button>
							</div>
							<div className="info-policy-page-detail">
								<div className="item-policy-product">
									<div className="title-policy-product">
										MIỄN PHÍ GIAO HÀNG TOÀN QUỐC
									</div>
									<div className="content-policy-product">
										(Đơn hàng trên 1,000,000đ)
									</div>
								</div>
								<div className="item-policy-product">
									<div className="title-policy-product">
										ĐỔI TRẢ DỄ DÀNG
									</div>
									<div className="content-policy-product">
										Miễn phí đổi trong 7 ngày (nếu lỗi sản
										xuất)
									</div>
								</div>
								<div className="item-policy-product">
									<div className="title-policy-product">
										THANH TOÁN ĐƠN GIẢN
									</div>
									<div className="content-policy-product">
										Nhiều hình thức tiện lợi và an toàn
									</div>
								</div>
							</div>
							<div className="desc-product-detail">
								Thiết kế áo bơi dài tay kín đáo kết hợp quần
								short che nắng hiệu quả, thoải mái hoạt động,
								rất thích hợp trong học bơi và tắm biển.
								<br></br>
								Thun bơi cao cấp, co dãn 4 chiều, nhập khẩu Hàn
								Quốc.
								<br></br>
								Xuất xứ : Made in Việt Nam. Size : M,L, XL. Màu
								sắc : Trắng phối tay đen.
							</div>
						</div>
					</div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
