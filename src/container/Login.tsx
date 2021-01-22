import React from "react";
import FrameLogin from "src/componet/login/FrameLogin";
import Button from "src/my-component/Button";
import TextFiled from "src/my-component/TextFiled";
import {useFormik} from "formik"; 
import { accountController } from "src/controller";
import { Account } from "src/submodules/model-shopping/model/Account";


export default function Login() {
	

	const formik = useFormik<Account>({
		initialValues : {}as Account,
		initialErrors : {},
		onSubmit : ()=>{
			login(formik.values.username || "",formik.values.password || "" )
		}
	})

	function customerSubmit(){
		formik.setSubmitting(true);
		formik.handleSubmit();
		formik.setTouched({
			username : true,
			password : true
		})
	}
	const login = (username: string , password: string)=>{
		accountController.login(username, password).then(res=>{
			console.log(res);
		})
	}
	return (
		<div>
			<FrameLogin 
                title = "Login"
            >
				<div className="fr-input-login">
					<div className="fr-input-login">
						<TextFiled
							name = "username"
							onChange = {formik.handleChange}
							value = {formik.values.username}
							label = "user"
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							onChange = {formik.handleChange}
							value = {formik.values.password}
							label = "password"
							name = "password"
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<Button
							onClick = {()=> customerSubmit()}
						>Đăng nhập</Button>
					</div>
					<div className = "text-resister">Bạn chưa có tài khoản ?<div className = "link-login">Đăng kí</div></div>
				</div>
			</FrameLogin>
		</div>
	);
}
