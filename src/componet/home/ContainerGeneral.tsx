import classes from "*.module.css";
import { Paper, Tabs, Tab, makeStyles, Grid } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import * as links from  "../../constanst/links"
import {useHistory, useRouteMatch, useParams, useLocation} from "react-router"
type Props = {
	children: React.ReactElement[] | React.ReactElement;
};

const useStyles = makeStyles((theme) => ({
	itemMenu: {
		height: 70,
	},
	frMenu: {
		position : "fixed",
		top : 0,
		left : 0,
		width : "100%",
		background : "white",
		zIndex : 100
	},
}));
export default function ContainerGeneral(props: Props) {
	const matchRoute = useRouteMatch(); 
	const history = useHistory();
	const [route, setRoute] = React.useState<any>(matchRoute.path);
	const classes = useStyles();

	const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
		setRoute(newValue)
		history.push(newValue)
	};
	return (
		<div>
			<Paper className = {clsx(classes.frMenu)}>
				<Grid container xs={10}>
					<Grid item xs={10}>
						<Tabs
							value={route}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							centered
							className={clsx(classes.itemMenu)}
						>
							<Tab
								label={
									<img src="https://evashopping.vn/images/logo.png" />
								}
								value={"/home"}
							/>
							<Tab
								className={clsx(classes.itemMenu)}
								label="Trang chủ"
								value={"/home"}
							/>
							<Tab
								className={clsx(classes.itemMenu)}
								label="Sản phẩm"
								value={links.ListProduct}
							/>
							<Tab
								className={clsx(classes.itemMenu)}
								label="admin"
								value={links.productAdmin}
							/>
							<Tab
								className={clsx(classes.itemMenu)}
								label="Giỏ hàng"
								value={links.checkout}
							/>
							<Tab
								className={clsx(classes.itemMenu)}
								label="Đăng nhập"
								value={links.LOGIN}
							/>
						</Tabs>
					</Grid>
				</Grid>
			</Paper>

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
					<div>DIỆN BIKNI ĐẸP CÙNG EVASHOPPING</div>
					<img src="https://evashopping.vn/images/hoa-van.png" />
				</div>

				<div className="policy-home">
					<div className="info-footer-home">
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
				<div className="footer-copyright">
					Copyright © 2021 by LUONGPK01506
				</div>
			</footer>
		</div>
	);
}
