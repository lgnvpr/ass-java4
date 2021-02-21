import React from "react";
type Props = {
	children: React.ReactElement[] | React.ReactElement ;
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
			<div style={{ padding: 35 }} />

			{props.children}

			{/* footer */}
			<footer>
				<div className="policy-home">
					<div className="container-policy-home">
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
								<div className="title-policy">
									Hỗ trợ trực tiếp
								</div>
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
								<div className="title-policy">
									Hỗ trợ đổi hàng
								</div>
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
								<div className="title-policy">
									Thanh toán COD
								</div>
								<div className="content-policy">
									Thanh toán khi nhận hàng
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* slider */}
				<div className="slider">
					<div>
						DIỆN BIKNI ĐẸP CÙNG EVASHOPPING
					</div>
					<img src= "https://evashopping.vn/images/hoa-van.png"/>
				</div>

				<div className="policy-home">
					<div className= "info-footer-home">
						<div className="info-footer">
							<p className="header-info">
								HOTLINE (8:00 - 21:00)
							</p>
							<p className="info-detail">0909.786.000</p>
							<p className="desc-detail">
								Các ngày trong tuần, kể cả ngày lễ
							</p>
						</div>
						<div className="info-footer">
							<p className="header-info">
								GÓP Ý, KHIẾU NẠI (8:00 - 17:00)
							</p>
							<p className="info-detail">0963.660.690</p>
							<p className="desc-detail">
								Các ngày trong tuần, kể cả ngày lễ
							</p>
						</div>
						<div className="info-footer">
							<p className="header-info">
								GÓP Ý, KHIẾU NẠI (8:00 - 17:00)
							</p>
							<p className="info-detail">0963.660.690</p>
							<p className="desc-detail">
								Các ngày trong tuần, kể cả ngày lễ
							</p>
						</div>
					</div>
				</div>
				<div className= "footer-copyright">
					Copyright © 2021 by LUONGPK01506
				</div>
			</footer>
		</div>
	);
}
