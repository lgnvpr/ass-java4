import React from "react";
type Props = {
	children: React.ReactElement;
};
export default function ContainerGeneral(props: Props) {
	return (
		<div>
			<nav className="fr-menu">
				<div className="menu">
					<div className="menu-item">
						<img src="https://evashopping.vn/images/logo.png"></img>
					</div>
					<div className="menu-item">
						<p>Đồ bơi nam</p>
					</div>
					<div className="menu-item">
						<p>Đồ bơi nữ</p>
					</div>
					<div className="menu-item">
						<p>Đồ bơi trẻ em</p>
					</div>
					<div className="menu-item">
						<p>Đồ bơi đi biển</p>
					</div>
					<div className="menu-item">
						<p>Phụ kiện</p>
					</div>
					<div className="menu-item">
						<p>Big size</p>
					</div>
					<div className="menu-item">
						<p>Login</p>
					</div>
				</div>
			</nav>
			<div style ={{padding : 50}}/>
			<footer>
				<div className="policy-home">
					<div className="policy-item">
						<div className="img-policy-item">
							<img
								src="https://evashopping.vn/images/giao-hang.png"
								alt=""
							/>
						</div>
						<div className="content-main">
							<div className="title-policy">
								Miễn phí giao hàng
							</div>
							<div className="content-policy">
								Đơn hàng 1.000k (HCM đơn 700k)
							</div>
						</div>
					</div>
					<div className="policy-item">
						<div className="img-policy-item">
							<img
								src="https://evashopping.vn/images/ho-tro.png"
								alt=""
							/>
						</div>
						<div className="content-main">
							<div className="title-policy">Hỗ trợ trực tiếp</div>
							<div className="content-policy">
								Phục vụ khách hàng tận tình
							</div>
						</div>
					</div>
					<div className="policy-item">
						<div className="img-policy-item">
							<img
								src="https://evashopping.vn/images/doi-tra.png"
								alt=""
							/>
						</div>
						<div className="content-main">
							<div className="title-policy">Hỗ trợ đổi hàng</div>
							<div className="content-policy">
								Trong 7 ngày (nếu sản phẩm có lỗi)
							</div>
						</div>
					</div>
					<div className="policy-item">
						<div className="img-policy-item">
							<img
								src="https://evashopping.vn/images/thanh-toan.png"
								alt=""
							/>
						</div>
						<div className="content-main">
							<div className="title-policy">Thanh toán COD</div>
							<div className="content-policy">
								Thanh toán khi nhận hàng
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
