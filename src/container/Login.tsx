import React from "react";
import FrameLogin from "src/componet/login/FrameLogin";
import Button from "src/my-component/Button";
import TextFiled from "src/my-component/TextFiled";
import { useFormik } from "formik";
import { accountController } from "src/controller";
import { Account } from "src/submodules/model-shopping/model/Account";
import { useHistory } from "react-router";
import { link } from "fs";
import { REGISTER } from "src/constanst/links";
import * as yup from "yup";
import { FaEye } from "react-icons/fa";
import {
	authFirebase,
	provideGoogle,
	provideFacebook,
	provideGitHub,
} from "src/config/FirebaseConfig";
import firebase from "firebase";
// import { history } from "src/App";

const validate = yup.object({
	username: yup
		.string()
		.trim()
		.email("Không đúng định dạng email")
		.required("Không được để trống"),
	password: yup.string().trim().required("Không được để trống"),
});
export default function Login() {
	const history = useHistory();
	provideGitHub.setCustomParameters({
		allow_signup: "false",
	});
	const formik = useFormik<Account>({
		initialValues: {} as Account,
		validationSchema: validate,
		onSubmit: () => {
			login(formik.values.username || "", formik.values.password || "");
		},
	});

	function customerSubmit() {
		formik.setSubmitting(true);
		formik.handleSubmit();
		formik.setTouched({
			username: true,
			password: true,
		});
	}
	const login = (username: string, password: string) => {
		accountController.login(username, password).then((res) => {
			if (res) {
				history.push("/");
			}
		});
	};

	const loginWithFirebase = (myProvider: any) => {
		authFirebase
			.signInWithPopup(myProvider)
			.then((result) => {
				console.log(result);
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				//   var token = result.accessToken;
				// The signed-in user info.
				var user = result.user;
				history.push("/");
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	};
	return (
		<div>
			<FrameLogin title="Login">
				<div className="fr-input-login">
					{/* <div className="fr-input-login">
						<Button
							onClick={() => {
								loginWithFirebase(
									provideFacebook.addScope("repo")
								);
							}}
						>
							Login with Facebook
						</Button>
					</div> */}

					<div className="fr-input-login">
						<Button
							onClick={() => {
								loginWithFirebase(
									provideGoogle.addScope(
										"https://www.googleapis.com/auth/contacts.readonly"
									)
								);
							}}
						>
							Login with google
						</Button>
					</div>

					<div className="fr-input-login">
						<TextFiled
							name="username"
							onChange={formik.handleChange}
							value={formik.values.username}
							label="user"
							textHelper={
								formik.touched.username
									? formik.errors.username
									: ""
							}
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<TextFiled
							onChange={formik.handleChange}
							value={formik.values.password}
							label="password"
							name="password"
							type="password"
							textHelper={
								formik.touched.password
									? formik.errors.password
									: ""
							}
						></TextFiled>
					</div>

					<div className="fr-input-login">
						<Button onClick={() => customerSubmit()}>
							Đăng nhập
						</Button>
					</div>

					<div className="text-resister">
						Bạn chưa có tài khoản ?
						<div
							className="link-login"
							onClick={(e) => {
								history.push(REGISTER);
							}}
						>
							Đăng kí
						</div>
					</div>
				</div>
			</FrameLogin>
		</div>
	);
}
