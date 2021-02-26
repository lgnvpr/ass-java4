import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import ContainerGeneral from "src/componet/home/ContainerGeneral";
import CartPage from "./CartPage";
import clsx from "clsx"
import InfoCustomer from "./InfoCustomer";
import ReviewCheckout from "./ReviewCheckout";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		button: {
			marginRight: theme.spacing(1),
		},
		instructions: {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
        container : {
            padding : 50
        }
	})
);

function getSteps() {
	return ["Giỏ hàng", "Thông tin nhận hàng", "Hoàn thành", "Xong"];
}

export default function Checkout() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	return (
		<ContainerGeneral>
			<Grid container justify="center" alignItems="center">
				<Grid xs={6}>
					<Grid className = {clsx(classes.container)}>
						{activeStep == 0 && (
							<Grid>
								<CartPage 
									onNext ={()=>{
										setActiveStep(activeStep+1)
									}}
								/>
							</Grid>
						)}
						{activeStep == 1 && (
							<Grid>
								<InfoCustomer 
									onNext ={()=>{
										setActiveStep(activeStep+1)
									}}
								/>
							</Grid>
						)}
						{activeStep == 2 && (
							<Grid>
								<ReviewCheckout
									onNext ={()=>{
										setActiveStep(activeStep+1)
									}}
								/>
								{/* <Typography variant = "h2">Đơn hàng của bạn đang được xử lí</Typography> */}
							</Grid>
						)}
						{activeStep == 3 && (
							<Grid>
								<Typography variant = "h2">Đơn hàng của bạn đang được xử lí</Typography>
							</Grid>
						)}
					</Grid>
					<Grid className={classes.root}>
						<Stepper activeStep={activeStep}>
							{steps.map((label, index) => {
								return (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Grid>
				</Grid>
			</Grid>
		</ContainerGeneral>
	);
}
