import {
	Badge,
	Button,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	makeStyles,
	TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useGlobalStyles } from "src/style/GlobalStyle";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import BaseDialog from "../genaral-component/BaseDialog";
import * as Yup from "yup";
import { Product } from "src/submodules/model-shopping/model/Product";
import { Autocomplete } from "@material-ui/lab";
import ImageUploading, { ImageListType } from "react-images-uploading";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ImageProduct } from "src/submodules/model-shopping/model/ImageProduct";
var base64 = require("base-64");
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

const useStyles = makeStyles((theme) => ({
	frImg: {
		width: 100,
		height: 100,
		overflow: "hidden",
		position : "relative",
		margin : 5,
		padding : 10

	},
	img: {
		height: "100%",
	},
	deleteImg: {
		position : "absolute",
		top : 0,
		left : 0,
		background : "white",
		height : 10,
		width : 10,
		zIndex : 5,
		"&:hover": {
			background : "white",
		}
	},
}));
export default function PopupProductAdmin(props: Props) {
	const classes = useStyles();
	const globalStyles = useGlobalStyles();
	const { isDisplay, onCancel, onSave, titlePopup } = props;
	const [data, setData] = useState<any>();

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

	const onChange = (imageList: ImageListType) => {
		let imgs = formik.values.productImage || [];
		imgs.push({
			link: imageList[0].dataURL || "",
		});
		formik.setValues({
			...formik.values,
			productImage: imgs,
		});
	};

	const onRemoveImage = (img : ImageProduct)=>{
		let imgs = formik.values.productImage || [];
		imgs=imgs.filter(item=> item.id != img.id);

		formik.setValues({
			...formik.values,
			productImage: imgs,
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
					onChange={(e, value) => {
						formik.setValues({
							...formik.values,
							categoryProductId: value?.id || "",
						});
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
			<Grid container wrap={"wrap"} direction="row">
				{formik.values?.productImage?.map((item) => {
					return (
						<Grid className={classes.frImg}>
							<IconButton className={classes.deleteImg} onClick = {(e)=> {onRemoveImage(item)}}>
								<HighlightOffIcon color = {"primary"} />
							</IconButton>
							<img className={classes.img} src={item.link}></img>
						</Grid>
					);
				})}

				<ImageUploading
					multiple
					value={[]}
					onChange={onChange}
					maxNumber={10}
				>
					{({ onImageUpload, isDragging, dragProps }) => (
						// write your building UI
						<Grid className={classes.frImg}>
							<Button
								className={classes.img}
								variant={"outlined"}
								style={
									isDragging ? { color: "red" } : undefined
								}
								onClick={onImageUpload}
								{...dragProps}
							>
								+
							</Button>
						</Grid>
					)}
				</ImageUploading>
			</Grid>
		</BaseDialog>
	);
}
