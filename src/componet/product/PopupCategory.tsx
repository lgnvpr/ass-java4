import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "src/style/GlobalStyle";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import BaseDialog from "../genaral-component/BaseDialog";
import * as Yup from "yup";

interface Props {
	titlePopup?: string;
	obj: CategoryProduct;
	onSave(item: CategoryProduct): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape({
	name: Yup.string().required("Không được để trống tên"),
});
export default function PopupCategory(props : Props) {
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup } = props;
	const [data, setData] = useState<CategoryProduct>({} as CategoryProduct);

	const formik = useFormik<CategoryProduct>({
		initialValues: {},
		initialErrors: {},
		onSubmit: (value) => {
			console.log("on submit");
			props.onSave(value);
		},
		validationSchema: validate,
	});

	function customSubmit() {
		formik.handleSubmit();
		formik.setTouched({
			name: true,
            image : true,
            description : true
		});
	}
	useEffect(() => {
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});
		formik.setValues({
			...props.obj,
            image : props.obj.image || "",
            description : props.obj.description || ""
		});
	}, [props]);
	return (
		<BaseDialog
            isDisplay = {props.isDisplay}
            onCancel = {()=>{
                props.onCancel()
            }}
            onClickConfirm = {()=>{
                customSubmit()
            }}
            title = {props.obj.id ? "Sửa" : "Thêm"}
        >
			<Grid className={globalStyles.mb3} item xs={12}>
				<TextField
					fullWidth
					variant="outlined"
					label={"Tên loại "}
					name="name"
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					helperText={formik.touched.name && formik.errors.name}
					error={formik.touched.name && Boolean(formik.errors.name)}
				/>
			</Grid>
		</BaseDialog>
	);
}
