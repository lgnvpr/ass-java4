import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {AiOutlineShoppingCart} from "react-icons/ai"
import {FaUserAlt} from "react-icons/fa"
type Props = {
	children: React.ReactElement;
};
export default function ContainerGeneral(props: Props) {
	return (
		<div>
			<div className="flex-col">
				<div className="header-info ">
					<div className="list-item-header-info">
						<div className="bd-right item-header-info">
							PHONE: +01 256 25 235
						</div>
						<div className="item-header-info">
							EMAIL: INFO@EISER.COM
						</div>
					</div>

					<div className="list-item-header-info">
						<div className="bd-right item-header-info">
							GIFT CARD
						</div>
						<div className="bd-right item-header-info">
							TRACK ORDER
						</div>
						<div className="item-header-info">CONTACT US</div>
					</div>
				</div>

				<div className="header-menu">
					<div>
						<img src="https://vanluongg.github.io/vanluong/img/home/logo.png"></img>
					</div>
					<div className="list-menu">
						<ul>
							<li>Home</li>
							<li>Shop</li>
							<li>Blog</li>
							<li>Page</li>
							<li>Contact</li>
						</ul>
					</div>
					<div>
						<ul>
							<li>
							<AiOutlineShoppingCart
								fontSize = {22}
							/>
							</li>
							<li>
								<FaUserAlt fontSize={20} />
							</li>
							<li>
								<FontAwesomeIcon icon={["fas", "coffee"]} />
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div>{props.children}</div>

			<div className="footer">
				<div className="footer-top">
					<div className="logo-footer">
						<img
							src = "https://vanluongg.github.io/vanluong/img/home/logo-light-footer.png"
						/>
					</div>
				</div>
				<div className="info-footer">
					<div className = "fr-info-item-footer">
						<div className="header-info-footer">Giới thiệu</div>
						<div className="content">
							Chúng tôi luôn mang đến cho bạn những sản phẩm với
							giá và chất lượng tốt nhất, miễn là bạn thích chúng
							tôi sẵn sàng phục vụ bạn, với tiêu chí về uy tín và
							chất lượng sản phẩm được đưa lên hàng đầu !!
						</div>
					</div>
				</div>

				<div className="info-footer">
					<div className = "fr-info-item-footer">
						<div className="header-info-footer">Giới thiệu</div>
						<div className="content">
							<div>
								<ul>
									<li>Về chúng tôi</li>
									<li>Theo dõi đơn hàng</li>
									<li>Đơn hàng trả</li>
									<li>Công việc</li>
									<li>Đang chuyển hàng</li>
									<li>Bài viết</li>
									<li>Đối tác</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="info-footer">
					<div className = "fr-info-item-footer">
						<div className="header-info-footer">Giới thiệu</div>
						<div className="content">
							Chúng tôi luôn mang đến cho bạn những sản phẩm với
							giá và chất lượng tốt nhất, miễn là bạn thích chúng
							tôi sẵn sàng phục vụ bạn, với tiêu chí về uy tín và
							chất lượng sản phẩm được đưa lên hàng đầu !!
						</div>
					</div>
				</div>




			</div>
		</div>
	);
}
