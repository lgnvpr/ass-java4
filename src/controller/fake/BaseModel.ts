
import {v4 as uuidv4}  from "uuid"
import { AxiosInstance } from "axios";
import { BaseModel } from "@BaseTypes/model/BaseModel";
import { FindFilter, ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import { IBaseController } from "../../submodules/base-model/controller/IBaseController";

export class BaseController<T extends BaseModel> implements IBaseController<T> {
    public basePath: string;
    public client : AxiosInstance;
    public serviceURL : string; 
	constructor(URL: string, basePath: string, appClient: any) {
        this.basePath = basePath;
        this.serviceURL = URL ;
        this.client = appClient
	}
    get(filter: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
	private getItem(basePath: string): Promise<T[]> {
		var dataLocal = localStorage.getItem(basePath);
		var dataLocalParse = JSON.parse(dataLocal || "[]");
        if (!dataLocalParse) dataLocalParse = [];
        dataLocalParse =  dataLocalParse.filter((item:any)=> {
            if(item.isDeleted){
                return item;
            }
        });
		return Promise.resolve(dataLocalParse || []);   
	}
	private setItem(t: T[]): Promise<T[]> {
		localStorage.setItem(this.basePath, JSON.stringify(t));
		return Promise.resolve(t);
	}

    
    private sanitizeParamsList(params: ListFilter<T>): ListFilter<T> {
        params = { ...params };
        if (typeof params.page === "string")
            params.page = Number(params.page);

        if (!params.page) params.page = 1;

        if (typeof params.pageSize === "string")
            params.pageSize = Number(params.pageSize) || 10;

        if (!params.pageSize) params.pageSize = 10;

        if (typeof params.query === "string")
            params.query = JSON.parse(params.query);
        if (!params.query) params.query = {};

        params = this.sanitizeParamsBaseListProps(params);
        return params;
    }
    private sanitizeParamsFind(params: FindFilter<T>): FindFilter<T> {
        if (typeof params.limit === "string")
            params.limit = Number(params.limit) || 1000;
        if (!params.offset) params.offset = 0;

        if (typeof params.query === "string")
            params.query = JSON.parse(params.query);
        if (!params.query) params.query = {};
        params = this.sanitizeParamsBaseListProps(params);
        return params;
    }

    private sanitizeParamsBaseListProps(params: any): any {
        if(!params.sort){
            params.sort = "-createdAt"
        }   
        if (params.sort) {
            if (typeof params.sort === "string") {
                params.sort = params.sort.replace(/,/g, " ").split(" ");
            }
        }

        if (params.searchFields) {
            if (typeof params.searchFields === "string") {
                params.searchFields = params.searchFields.trim();
                params.searchFields = params.searchFields
                    .replace(/,/g, " ")
                    .split(" ");
            }
        } else params.searchFields = []
        return params;
    }

    public sort<T extends BaseModel>(data: T[], sort:string[]): T[]{
        console.log(data)
        data =  data.sort((a: any , b:any)=>{
            for (let i = 0; i < sort.length; i++) {
                const itemSort  = sort[i];
                var typeSort = itemSort.substring(0,1) === "-" ? -1 : 1;
                var fieldSort = itemSort.substring(0,1) === "-" ? itemSort.substring(1,itemSort.length) : itemSort;
                if(typeof a[fieldSort] == "number"){
                    if(a[fieldSort] === b[fieldSort]){
                        return 0;
                    }
                    if(a[fieldSort] > b[fieldSort]){
                        return typeSort
                    }
                    else {
                        return -typeSort;
                    }
                }
                if(typeof a[fieldSort]== "string"){
                    a[fieldSort] = a[fieldSort]?.toLowerCase() || " ";
                    b[fieldSort] = b[fieldSort]?.toLowerCase() || " "
                    if(a[fieldSort] === b[fieldSort]){
                        return 0;
                    }
                    if(a[fieldSort] > b[fieldSort]){
                        return typeSort
                    }
                    else {
                        return -typeSort;
                    }
                }
                var dateA:any = new Date(a[fieldSort]) 
                var dateB:any = new Date(b[fieldSort])
                if(dateA !== "Invalid Date" && dateB !== "Invalid Date"){
                    if(dateA.getTime() === dateB.getTime()){
                        return 0;
                    }
                    if(dateA.getTime() > dateB.getTime()){
                        return typeSort
                    }
                    else {
                        return -typeSort;
                    }
                }
                if(typeof a[fieldSort]=== "boolean"){
                    if(a[fieldSort] && b[fieldSort]){
                        return 0;
                    }
                    if(a[fieldSort] === true && b[fieldSort]=== false){
                        return typeSort
                    }
                    else {
                        return -typeSort;
                    }
                }

            }

            return 0
         })     
         
        return data;
    }

    search<T>(data : T[], search : string, searchField: string[] ): T[]{
        if(searchField.length ==0){
            return data;
        }
        const newData = data.map((item: any)=>{
            for (let i = 0; i < searchField.length; i++) {
                const filed = searchField[i];
                try {
                    var valueSearch: string = item[filed].toString();
                valueSearch = valueSearch.toLowerCase()
                if(valueSearch.search(search.toLocaleLowerCase())>=0){
                    return item;
                }
                } catch (error) {
                    console.log("Field wrong")
                }
                
            }
        }).filter(item=>{
            if(item) return item
        })
        return newData;
    }

	async find(params: FindFilter<T>): Promise<T[]> {
        params = this.sanitizeParamsFind(params)
        var dataAll = await this.getItem(this.basePath);
        dataAll = this.search(dataAll, params.search || "", params.searchFields || []);
        dataAll = this.sort(dataAll, params.sort as [])
		return Promise.resolve(dataAll);
	}

	async list(params: ListFilter<T>): Promise<Paging<T>> {
        params = this.sanitizeParamsList(params);
        var dataAll = await (await this.getItem(this.basePath))
        dataAll = this.search(dataAll, params.search || "", params.searchFields || []);
        dataAll = this.sort(dataAll, params.sort as [])
        var dataPaging = dataAll.slice(((params.page || 1)-1)* (params.pageSize||5), (((params.page || 1)-1)* (params.pageSize||5) + (params.pageSize || 5)));

		return Promise.resolve({
            total : dataAll.length,
            totalPages :  Math.ceil(dataAll.length/(params.pageSize || 0)),
            page : params.page,
            pageSize : params.pageSize,
            rows : dataPaging
        });
    }
    
    async save(t: T): Promise<T> {
		t.updatedAt = new Date();
		t.isDeleted = false;
		var data = await this.getItem(this.basePath);
		if (t.id) {
			const index = data.findIndex((item) => (item.id === t.id));
			if (index >= 0) {
				data[index] = t;
				this.setItem(data);
				return Promise.resolve(t);
			}
        }
        else {t.id = uuidv4()}
		t.createdAt = new Date();
		data.push(t);
		await this.setItem(data);
		return Promise.resolve(t);
	}

	async delete(id: string): Promise<T> {
		var data = await this.getItem(this.basePath);
		const index = data.findIndex((item) => (item.id === id));
		if (index >= 0) {
			data[index].isDeleted = true;
			this.setItem(data);
			return Promise.resolve(data[index]);
		}
		throw new Error("Produce not found");
    }
}

