import React from "react";
import { useHistory } from "react-router";
import FrameLogin from "src/componet/login/FrameLogin";
import { LOGIN } from "src/constanst/links";
import { accountController } from "src/controller";
import Button from "src/my-component/Button";
import TextFiled from "src/my-component/TextFiled";
import { Account } from "src/submodules/model-shopping/model/Account";
import { link } from "fs";
import { REGISTER } from "src/constanst/links";
import * as yup from "yup";
import {FaEye} from "react-icons/fa"
import { useFormik } from "formik";


const validate = yup.object({
	username : yup.string().trim().email("Không đúng định dạng email").required("Không được để trống"),
	password : yup.string().trim().required("Không được để trống").min(6, "Phải trên  6 kí tự"),
	passwordAgain : yup.string().trim().required("Không được để trống").min(6, "Phải trên  6 kí tự"),
})
export default function Register() {

	const history = useHistory();

	const formik = useFormik<Account&{passwordAgain ?: string }>({
		initialValues : {}as Account,
		validationSchema : validate,
		onSubmit : ()=>{
			login(formik.values.username || "",formik.values.password || "" )
		}
	})

	function customerSubmit(){
		if(formik.values.password!=formik.values.passwordAgain){
			formik.setErrors({
				...formik.errors,
				passwordAgain : "Mật khẩu không khớp"
			})
		}
		formik.setSubmitting(true);
		formik.handleSubmit();
		
		formik.setTouched({
			username : true,
			password : true,
			passwordAgain : true
		})
	}
	const login = (username: string , password: string)=>{
		accountController.register({username, password}).then(res=>{
			console.log(res)
			if(res){
				history.push("/products")
			}
		})
	}

	return (
		<div>
			<FrameLogin 
                title = "Đăng kí"
            >
				<div className="fr-input-login">
					<div className="fr-input-login">
						<TextFiled
							name = "username"
							onChange = {formik.handleChange}
							value = {formik.values.username}
							label = "user"
							textHelper = {formik.touched.username?formik.errors.username:""}
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							onChange = {formik.handleChange}
							value = {formik.values.password}
							label = "password"
							name = "password"
							type = "password"
							textHelper = {formik.touched.password?formik.errors.password:""}
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							onChange = {formik.handleChange}
							value = {formik.values.passwordAgain}
							label = "password again"
							name = "passwordAgain"
							type = "password"
							textHelper = {formik.touched.passwordAgain?formik.errors.passwordAgain:""}
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<Button
							onClick = {()=> customerSubmit()}
						>Đăng kí</Button>
					</div>
					<div className = "text-resister">Bạn đã có tai khoản ?<div className = "link-login" onClick = {(e)=>{
						history.push(LOGIN)
					}}>Login</div></div>
				</div>
			</FrameLogin>
		</div>
	);
}
