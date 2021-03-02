import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import { countryController, customerController } from "src/controller";
import { City, District, Ward } from "src/controller/APICountryController";
import { Autocomplete } from "@material-ui/lab";
import { Customer } from "src/submodules/model-shopping/model/Customer";
import { useFormik } from "formik";
import { AddressHelper } from "src/helper/AddressHelper";

type Props = {
	onNext?: () => void;
};
export default function InfoCustomer(props: Props) {
	const [city, setCity] = useState<City[]>([]);
	const [district, setDistrict] = useState<District[]>([]);
	const [ward, setWard] = useState<Ward[]>([]);

	const formik = useFormik<Customer>({
		initialValues: {},
		onSubmit: () => {
			console.log(formik.values);
			customerController.save(formik.values);
			if (props.onNext) {
				props.onNext();
			}
		},
	});

	function onSetDistrict(idCity: string) {
		countryController.district(idCity).then((res) => {
			setDistrict(res || []);
		});
	}

	function onSetWard(idDistrict: string) {
		countryController.ward(idDistrict).then((res) => {
			setWard(res || []);
		});
	}

	function customSubmit() {
		formik.handleSubmit();
		formik.setTouched({
			address: true,
			CMND: true,
			birthAt: true,
			email: true,
			gender: true,
			phone: true,
			image: true,
		});
	}

	useEffect(() => {
		formik.resetForm();
		formik.setTouched({});
		formik.setErrors({});

		customerController
			.get({
				id: "109981813389303333821",
			})
			.then((customer: any) => {
				formik.setValues({
					...formik.values,
					...customer,
				});

				countryController.city().then((res) => {
					setCity(res || []);
					if (AddressHelper.getAddress(customer.address).district) {
						onSetDistrict(
							AddressHelper.getAddress(customer.address).district
								?.ProvinceID || ""
						);
					}

					if (AddressHelper.getAddress(customer.address).ward) {
						onSetWard(
							AddressHelper.getAddress(customer.address).ward
								?.DistrictID || ""
						);
					}
				});
			});
	}, []);
	return (
		<Grid container justify="center" alignItems="center">
			<Grid xs={6}>
				<Typography variant="h6" gutterBottom>
					Shipping address
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							required
							id="firstName"
							name="fullName"
							label="First name"
							fullWidth
							value={formik.values.name}
							autoComplete="given-name"
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Autocomplete
							id="combo-box-demo"
							options={city}
							value={
								city.find(
									(item) =>
										item.ProvinceID ==
										AddressHelper.getAddress(
											formik.values.address
										).city?.ProvinceID
								) || ({} as City)
							}
							getOptionLabel={(option) => option.ProvinceName}
							onChange={(e, value) => {
								if (value) {
									formik.values.address = AddressHelper.setCity(
										formik.values.address,
										value
									);
									onSetDistrict(value.ProvinceID);
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Tỉnh"
									variant="outlined"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Autocomplete
							id="combo-box-demo"
							options={district}
							getOptionLabel={(option) => option.DistrictName}
							value={
								district.find(
									(item) =>
										item.DistrictID ==
										AddressHelper.getAddress(
											formik.values.address
										).district?.DistrictID
								) || ({} as any)
							}
							onChange={(e, value) => {
								if (value) {
									formik.values.address = AddressHelper.setDistrict(
										formik.values.address,
										value
									);
									onSetWard(value?.DistrictID);
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Quận/Huyện"
									variant="outlined"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Autocomplete
							id="combo-box-demo"
							options={ward}
							value={
								ward.find(
									(item) =>
										item.WardCode ==
										AddressHelper.getAddress(
											formik.values.address
										).ward?.WardCode
								) || ({} as any)
							}
							getOptionLabel={(option) => option.WardName}
							onChange={(e, value) => {
								if (value) {
									formik.values.address = AddressHelper.setWard(
										formik.values.address,
										value
									);
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Phường xã"
									variant="outlined"
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="state"
							name="state"
							label="Địa chỉ"
							fullWidth
							value={
								AddressHelper.getAddress(
									formik.values.address || ""
								).detail
							}
							onChange={(e) => {
								formik.values.address = AddressHelper.setDetailAddress(
									formik.values.address,
									e.target.value
								);
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							name="phone"
							label="Số điện thoại"
							fullWidth
							autoComplete="shipping postal-code"
							value={formik.values.phone}
							onChange={formik.handleChange}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					{/* <Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color="secondary"
									name="saveAddress"
									value="yes"
								/>
							}
							label="Use this address for payment details"
						/>
					</Grid> */}
					<Button
						fullWidth
						variant="contained"
						color={"primary"}
						onClick={() => {
							customSubmit();
						}}
					>
						Hoàn thành
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}
