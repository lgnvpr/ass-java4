import React from "react";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import Button from "src/my-component/Button";
import TextFiled from "src/my-component/TextFiled";

export default function InfoCustomer() {
	return (
		<ContainerGeneral>
			<div className = "container-info-customer">
				<div className="fr-info">
					<h2>Nhập thông tin khách hàng</h2>
					<div className="fr-input-info-customer">
						<TextFiled
                            label = {"Họ và tên"}
                        ></TextFiled>
						<TextFiled
                            label = {"Số điện thoại"}
                        ></TextFiled>
						<TextFiled
                            label = "Địa chỉ nhà"
                        ></TextFiled>
						<TextFiled
                            label = "Tên cha"
                        ></TextFiled>
						<TextFiled
                            label = "Tên mẹ"
                        ></TextFiled>
					</div>
					<div className="fr-button-confirm-info">
						<Button>Xác nhận</Button>
					</div>
				</div>
			</div>
		</ContainerGeneral>
	);
}
