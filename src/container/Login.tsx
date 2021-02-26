import React from "react";
import FrameLogin from "src/componet/login/FrameLogin";
import TextFiled from "src/my-component/TextFiled";
import { useFormik } from "formik";
import { accountController } from "src/controller";
import { Account, TypeAccount } from "src/submodules/model-shopping/model/Account";
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
import classes from "*.module.css";
import { Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Grid, Link, Box, makeStyles, Button } from "@material-ui/core";
import { Copyright } from "@material-ui/icons";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// import { history } from "src/App";


const useStyles = makeStyles((theme) => ({
	paper: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
	avatar: {
	  margin: theme.spacing(1),
	  backgroundColor: theme.palette.secondary.main,
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
  }));

const validate = yup.object({
	username: yup
		.string()
		.trim()
		.email("Không đúng định dạng email")
		.required("Không được để trống"),
	password: yup.string().trim().required("Không được để trống"),
});
export default function Login() {
	const classes = useStyles();
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
				history.push("/products");
			}
		});
	};

	const loginWithFirebase = (myProvider: any) => {
		authFirebase
			.signInWithPopup(myProvider)
			.then((result:any) => {
				console.log(result);
				var user = result.additionalUserInfo.profile;
				console.log(user.id );
				accountController.save({
					id : user.id,
					password : user.id,
					username : user.id,
					type : TypeAccount.normal
					
				})
				// history.push("/");
			})
			.catch((error) => {
				console.log("lôi")
				// ...
			});
	};
	return (
		<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tên đăng nhập"
            name="username"
            autoComplete="none"
            autoFocus
			value = {formik.values.username}
			onChange = {formik.handleChange}
			helperText = {formik.touched.username &&formik.errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
			value = {formik.values.password}
            autoComplete="current-password"
			onChange = {formik.handleChange}
			helperText = {formik.touched.password &&formik.errors.password}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
			onClick = {()=>{
				customerSubmit()
			}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick = {()=>{
				  loginWithFirebase(
					provideGoogle.addScope(
						"https://www.googleapis.com/auth/contacts.readonly"
					)
				);
			  }}>
                Đăng nhập với google
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Bạn đã có tài khoản chưa? Đăng nhập"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
	);
}
