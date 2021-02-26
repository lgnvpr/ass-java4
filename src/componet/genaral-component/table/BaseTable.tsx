import { ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import {
	Box,

	FormControl,
	Grid,
	makeStyles,
	MenuItem,
	Select
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import clsx from "clsx";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import ButtonSort from "./ButtonSort";

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
        // width : 500,
        // maxWidth : "50%"
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
	rowTable: {
		padding: 10,
		borderBottom: "1px solid #ccc",
		// borderRadius: 7,
		display: "flex",
		flexWrap: "nowrap",
		cursor: "pointer",
		"&:hover": {
			transition: "0.3s",
			backgroundColor: theme.palette.primary.main,
			color: "white",
			fontWeight: 500,
		},
	},
	headerTable: {
		backgroundColor: theme.palette.primary.main,
		color: "white",
		fontWeight: 500,
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
	lastRow: {
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	rowFirst: {
		background: "white",
	},
	rowSeconds: {
		background: theme.palette.background.default,
	},
}));

export default function BaseTable<T>(props: Props<T>) {
	const classes = useStyles();
	const [selectedCustomerIds, setSelectedCustomerIds] = useState<any[]>([]);

	const handleLimitChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		props.onQuery({
			...props.query,
			pageSize: parseInt(event.target.value),
		});
	};

	const handlePageChange = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		page: number
	) => {
		props.onQuery({ ...props.query, page: page + 1 });
	};

	function checkActionSort(label: string): boolean {
		if (typeof props.query.sort == "string") {
			if (props.query.sort === `${label}` || props.query.sort === `-${label}`) {
				return true;
			}
			return false;
		}
		var check = props.query.sort?.find((sort) => sort === `${label}` || sort === `-${label}`);
		return check ? true : false;
	}

	function checkDirection(label: string): "desc" | "asc" | undefined {
		if (typeof props.query.sort == "string") {
			if (props.query.sort === `${label}` || props.query.sort === `-${label}`) {
				return "asc";
			}
			return "desc";
		}
		var check = props.query.sort?.find((sort) => sort === `${label}` || sort === `-${label}`);
		if (!check) return undefined;
		if (check === `${label}`) return "desc";
		return "asc";
	}

	function onSort(label: string) {
		var getSort: string[] = [];

		if (typeof props.query.sort == "string") {
			getSort.push(label);
		} else {
			getSort = props.query?.sort || [];
			var check = getSort?.findIndex((sort) => sort === `${label}` || sort === `-${label}`);
			if (check !== undefined && check < 0) {
				getSort[0] = label;
			}
			if (check !== undefined && check >= 0) {
				if (getSort[check] === `${label}`) {
					getSort[check] = `-${label}`;
				} else if (getSort[check] === `-${label}`) {
					getSort.splice(check, 1);
				}
			}
		}

		props.onQuery({ ...props.query, sort: getSort });
	}

	return (
		<Grid item xs={12} className={clsx(classes.root)}>
			<PerfectScrollbar>
				<Box >
					<Grid container direction="column">
						<Grid
							container
							// direction="row"
							// justify="space-evenly"
							className={clsx(classes.rowTable, classes.headerTable)}
						>
							<Grid
								container
								direction="row"
								alignItems="center"
								alignContent="center"
								style={{
									width: 200,
								}}
							>
								<Grid>STT</Grid>
							</Grid>
							{props
								.iTable(props.data.rows || [])
								.header.map((header: HeadCell<T>) => {
									return (
										<Grid
											style={{
												flexShrink: "initial",
												flex : 1,
												display: "flex",
												alignItems: "center"
											}}
										>
											{header.label}
											{(header.sort) ? <ButtonSort
												active={checkActionSort(header.id.toString())}
												direction={
													checkDirection(header.id.toString()) as any
												}
												onClick={() => {
													onSort(header.id.toString());
												}}
											/> : <></>}
										</Grid>
									);
								})}
						</Grid>

						<Grid container direction="column">
							<Grid container direction="column">
								{props
									.iTable(props.data.rows || [])
									.value.map((valueTable: React.ReactNode[], indexRow) => (
										<Grid
											container
											direction="row"
											className={clsx(
												classes.rowTable,
												indexRow % 2 === 0
													? classes.rowFirst
													: classes.rowSeconds,
												props
													.iTable(props.data.rows || [])
													.value.length ===
													indexRow + 1
													? classes.lastRow
													: ""
											)}
										>
											<Grid
												container
												direction="row"
												alignItems="center"
												alignContent="center"
												style={{
													width: 200,
												}}
											>
												<Grid>{indexRow + 1} </Grid>
											</Grid>
											{valueTable.map((label: React.ReactNode) => (
												<Grid
													container
													direction="row"
													alignItems="center"
													alignContent="center"
													style={{
														flex : 1,
													}}
												>
													<Grid>{label} </Grid>
												</Grid>
											))}
										</Grid>
									))}
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</PerfectScrollbar>

			<Grid container direction="row" justify="center">
				<Grid >
					<Grid container direction="row" justify="center">
						<Grid item style = {{
							padding: 50 
						}}>
							<Grid>
								<FormControl variant="outlined" size="small">
									<Select
										value={props.query.pageSize}
										onChange={(e) => {
											var getValue: string = e.target.value as any;
											var getValueNumber: number = parseInt(getValue);
											props.onQuery({
												...props.query,
												pageSize: getValueNumber,
											});
										}}
									>
										<MenuItem value={5}>5</MenuItem>
										<MenuItem value={10}>10</MenuItem>
										<MenuItem value={15}>15</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid item>
							<Grid
								container
								direction="column"
								justify="center"
								// alignContent="center"
								style={{
									height: "100%",
								}}
							>
								<Grid>
									<Pagination
										count={Math.ceil(
											(props.data.total || 1) / (props.query.pageSize || 1)
										)}
										shape="rounded"
										showFirstButton
										showLastButton
										onChange={(e, value) => {
											props.onQuery({
												...props.query,
												page: value,
											});
										}}
										color="standard"
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export interface HeadCell<T> {
	id: keyof T | "";
	label: string;
	sort : boolean
}

export interface IBaseTable<T> {
	header: HeadCell<T>[];
	value: Array<T[]>;
	paging: Paging<T>;
}

type Props<T> = {
	className?: string;
	data: Paging<T>;
	query: ListFilter<T>;
	onQuery(query: ListFilter<T>): void;
	iTable: (data: T[]) => IBaseTable<T>;
};
