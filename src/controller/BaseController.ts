import { CountFilter, FindFilter, GetFilter, ListFilter } from "@BaseTypes/model/Filter";
import { Paging } from "@BaseTypes/model/Paging";
import { AxiosInstance } from "axios";
import { dispatch } from "../rematch/store";
import { IBaseController } from "../submodules/base-model/controller/IBaseController";




export class BaseController<T> implements IBaseController<T>{
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
    this.client = client;
  }
    
  public list(params: ListFilter<T>): Promise<Paging<T>> {
    params = { ...params, sort: this.convertSort(params.sort)};
    return this.client
      .get(`${this.serviceURL}/${this.basePath}`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

  public find(params?: FindFilter<T>): Promise<T[]> {
    params = { ...params, sort: this.convertSort(params?.sort) };
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/find`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

  public save(params: T): Promise<T> {
    return this.client
      .post(`${this.serviceURL}/${this.basePath}`, params)
      .then((res) => {
        dispatch.notification.success("Lưu thành công!!!");
        return res.data;
      });
  }

  /**
   * @Luong
   * @Description : get by id or ids. id -> T| null, ids -> T[] || [] 
  */
  public async  get(filter: GetFilter): Promise<T| T[] | null> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/${filter.id}`)
      .then((res) => {
        return res.data;
      });
  }

  public delete(id: string): Promise<T> {
    return this.client
      .delete(`${this.serviceURL}/${this.basePath}/${id}`)
      .then((res) => {
        dispatch.notification.success("Xóa thành công !!!");
        return res.data;
      });
  }

  public count(params: CountFilter<T>): Promise<number> {
    return this.client
      .get(`${this.serviceURL}/${this.basePath}/count`, {
        params: params,
      })
      .then((res) => {
        return res.data;
      });
  }

  private convertSort(sort: string[] | string | undefined): string {
    if (!sort) return "";
    if (typeof sort === "string") {
      return sort;
    }
    var sortString: string = "";
    // eslint-disable-next-line array-callback-return
    sort.map((sort) => {
      sortString += `${sort},`;
    });
    sortString = sortString.substring(0,sortString.length -1);
    return sortString;
  }
}
