import React from "react";
import FrameLogin from "src/componet/login/FrameLogin";
import Button from "src/my-component/Button";
import TextFiled from "src/my-component/TextFiled";

export default function Register() {
	return (
		<div>
			<FrameLogin 
                title = "Đăng kí"
            >
				<div className="fr-input-login">
					<div className="fr-input-login">
						<TextFiled
							label = "Tên đăng nhập"
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							label = "Mật khẩu"
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							label = "Số điện thoại"
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							label = "Địa chỉ"
						></TextFiled>
					</div>


					<div className="fr-input-login">
						<TextFiled
							label = "Họ và tên"
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<Button>Đăng kí</Button>
					</div>
				</div>
			</FrameLogin>
		</div>
	);
}
