import {
	CountFilter,
	FindFilter,
	GetFilter,
	ListFilter,
} from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import axios, { AxiosInstance } from "axios";
import { dispatch } from "../rematch/store";
import { IBaseController } from "../submodules/base-model/controller/IBaseController";

export class APICountryController {
	protected serviceURL: string;
	protected basePath: string;
	protected client: AxiosInstance;

	public constructor(
		serviceURL: string,
		basePath: string,
		client: AxiosInstance
	) {
		this.serviceURL = serviceURL;
		this.basePath = basePath;
		this.client = axios;
		this.client.defaults.headers.common["sec-fetch-mode"] = "*";
	}

	public city(): Promise<City[]> {
		return this.client
			.get(
				`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`
			)
			.then((res) => {
				return res.data.data;
			});
	}

	public district(idCity: string): Promise<District[]> {
		return this.client
			.get(
				`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
				{
					params: {
						province_id: idCity,
					},
				}
			)
			.then((res) => {
				return res.data.data;
			});
	}
	public ward(idDistrict: string): Promise<Ward[]> {
		return this.client
			.get(
				`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
				{
					params: {
						district_id: idDistrict,
					},
				}
			)
			.then((res) => {
				return res.data.data;
			});
	}
}


export interface City {
    ProvinceID : string;
    ProvinceName : string;
    Code : string
}

export interface District {
    DistrictID : string;
    DistrictName : string;
    ProvinceID : string;
    SupportType : string;
    Type : string
}

export interface Ward {
    DistrictID : string;
    WardCode : string;
    WardName : string
}