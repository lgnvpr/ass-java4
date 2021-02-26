import { Dialog, DialogContent, Grid, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "src/style/GlobalStyle";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import BaseDialog from "../genaral-component/BaseDialog";
import * as Yup from "yup";
import { Product } from "src/submodules/model-shopping/model/Product";
import { Autocomplete } from "@material-ui/lab";

interface Props {
	titlePopup?: string;
	obj: Product;
	category: CategoryProduct[];
	onSave(item: Product): void;
	isDisplay: boolean;
	onCancel(): void;
}
const validate = Yup.object().shape({
	name: Yup.string().required("Không được để trống tên"),
});
export default function PopupProductAdmin(props: Props) {
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup } = props;
	const [data, setData] = useState<Product>({} as Product);

	const formik = useFormik<Product>({
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
			image: true,
			description: true,
		});
	}
	useEffect(() => {
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});
		formik.setValues({
			...props.obj,
			image: props.obj.image || "",
			description: props.obj.description || "",
		});
	}, [props]);
	return (
		<BaseDialog
			isDisplay={props.isDisplay}
			onCancel={() => {
				props.onCancel();
			}}
			onClickConfirm={() => {
				customSubmit();
			}}
			title={props.obj.id ? "Sửa" : "Thêm"}
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

			<Grid className={globalStyles.mb3} item xs={12}>
				<TextField
					fullWidth
					variant="outlined"
					label={"Mô tả"}
					name="description"
					value={formik.values.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					helperText={
						formik.touched.description && formik.errors.description
					}
					error={
						formik.touched.description &&
						Boolean(formik.errors.description)
					}
				/>
			</Grid>

			<Grid className={globalStyles.mb3} item xs={12}>
				<TextField
					fullWidth
					variant="outlined"
					label={"Giá"}
					name="price"
					value={formik.values.price}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					helperText={formik.touched.price && formik.errors.price}
					error={formik.touched.price && Boolean(formik.errors.price)}
				/>
			</Grid>

			<Grid className={globalStyles.mb3} item xs={12}>
				<TextField
					fullWidth
					variant="outlined"
					label={"Link hình ảnh"}
					name="image"
					value={formik.values.image}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					helperText={formik.touched.image && formik.errors.image}
					error={formik.touched.image && Boolean(formik.errors.image)}
				/>
			</Grid>

			<Grid className={globalStyles.mb3} item xs={12}>
				<Autocomplete
					className={globalStyles.mb3}
					options={props.category}
					getOptionLabel={(option) => option?.name || ""}
					fullWidth
					value={props.category.find(
						(item) => item.id === formik.values.categoryProductId
					)}
					onChange = {(e, value )=>{
						formik.setValues({
							...formik.values,
							categoryProductId : value?.id || ""
						})
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Loại "
							variant="outlined"
						/>
					)}
				/>
			</Grid>
		</BaseDialog>
	);
}
