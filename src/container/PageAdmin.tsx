import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

import { AiOutlineMail } from "react-icons/ai";
type Props = {
	children: React.ReactElement[] | React.ReactElement;
};

const useStyles = makeStyles((theme) => ({
	menu: {
		position: "fixed",
		background: "#232E98",
		height: "100vh",
		width: 250,
	},
	itemList : {
		color : "white"
	},
	logo : {
		padding : 30
	},
	main : {
		padding : 30,
		paddingLeft : 280,

	}
}));
type NavBar= {
	name : string,
	link : string,
	icon : React.ReactElement
}
const listItem: NavBar[] =[
	{
		icon : <AiOutlineMail/>,
		link : "/admin/product",
		name : "Product"
	},
	{
		icon : <AiOutlineMail/>,
		link : "/admin/product",
		name : "Category"
	}
] 
export default function PageAdmin(props: Props) {
	const classes = useStyles();
	return (
		<Grid>
			<Grid className={clsx(classes.menu)}>
				<Grid container justify = "center" className = {clsx(classes.logo)}>
					<img src = "https://evashopping.vn/images/logo.png"/>
				</Grid>
				<List>

					{listItem.map(
						(item, index) => (
							<ListItem  button key={item.name || ""} className = {clsx(classes.itemList)}>
								<ListItemIcon >
								{ <AiOutlineMail className = {clsx(classes.itemList)}/> }
							</ListItemIcon>
								<ListItemText primary={item.name || ""} />
							</ListItem>
						)
					)}
				</List>
				<Divider />
				<List>
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem button key={text} className = {clsx(classes.itemList)}>
							<ListItemIcon >
								{ <AiOutlineMail className = {clsx(classes.itemList)}/> }
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Grid>
			<Grid className = {clsx(classes.main)} container>
				{props.children}
			</Grid>
		</Grid>
	);
}
