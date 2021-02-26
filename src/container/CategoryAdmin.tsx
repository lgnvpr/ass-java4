import { ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import { Box, Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PopUpConfirm from "src/componet/genaral-component/DialogConfirm";
import BaseTable, {
	IBaseTable,
} from "src/componet/genaral-component/table/BaseTable";
import PopupCategory from "src/componet/product/PopupCategory";
import { categoryController } from "src/controller";
import { ActionHelper } from "src/helper/ActionHelper";
import { CategoryProduct } from "src/submodules/model-shopping/model/CategoryProduct";
import PageAdmin from "./PageAdmin";

export default function CategoryAdmin() {
	const [object, setObject] = useState<Paging<CategoryProduct>>({
		page: 1,
		pageSize: 5,
		rows: [],
		total: 0,
		totalPages: 0,
	});
	const [query, setQuery] = useState<ListFilter<any>>({
		page: 1,
		pageSize: 5,
		search: "",
		sort : ["-name"]
	});
	const [selected, setSelected] = useState<CategoryProduct>(
		{} as CategoryProduct
	);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	function onCreateOrUpdate(position: CategoryProduct) {
		setSelected(position);
		setShowForm(true);
	}

	function onCloseForm() {
		setShowForm(false);
	}

	function onSave(customer: CategoryProduct) {
		categoryController.save(customer).then(() => {
			setQuery({ ...query });
			setShowForm(false);
		});
	}

	function onDelete() {
		categoryController.delete(selected.id || "").then(() => {
			setQuery({ ...query });
		});
		setShowConfirm(false);
	}

	function onQuery(query: ListFilter<any>) {
		setQuery(query);
	}

	function onSearch(search: string) {
		setQuery({ ...query, search: search });
	}

	function onConfirm(item: CategoryProduct) {
		setSelected(item);
		setShowConfirm(true);
	}

	function onCancelConfirm() {
		setShowConfirm(false);
	}

	useEffect(() => {
		categoryController.list(query).then((res: Paging<CategoryProduct>) => {
			setObject(res);
		});
	}, [query]);

	function convertDataToTable(
		data: CategoryProduct[]
	): IBaseTable<CategoryProduct> {
		const createValue = data.map((item: CategoryProduct) => {
			var value: any[] = [];
			value.push(item.name || "");
			value.push(
				ActionHelper.getActionUpdateAndDelete(
					item,
					onCreateOrUpdate,
					onConfirm
				)
			);
			return value;
		});

		const getTable: IBaseTable<CategoryProduct> = {
			header: [
				{ id: "name", label: "Tên loại", sort: true },
				{ id: "name", label: "Action", sort: false },
			],
			paging: { ...object, rows: [] },
			value: createValue,
		};
		return getTable;
	}
	return (
		<PageAdmin> 
            <Grid container style = {{padding : 10}}>
                <Button variant = "contained" color= {"primary"}
                    onClick = {(e)=>{onCreateOrUpdate({})}}
                > Thêm</Button>    
            </Grid>      
			<PopUpConfirm
				isDisplay={showConfirm}
				onCancel={onCancelConfirm}
				onDelete={onDelete}
			/>
            <PopupCategory
                isDisplay = {showForm}
                obj = {selected}
                onCancel= {onCloseForm}
                onSave = {onSave}
            />

			<Grid container>
				<BaseTable
					data={object}
					query={query}
					onQuery={onQuery}
					iTable={convertDataToTable}
				/>
			</Grid>
		</PageAdmin>
	);
}
