import { City, District, Ward } from "src/controller/APICountryController";

export class AddressHelper {
	static getAddress(address : string): Address {
		try {
			return JSON.parse(address)
		} catch (error) {
			return new Address()
		}
	}

	static getAddressString(address : string): string {
		let addressString = ""; 
		try {
		 	let addressValue  :Address  =  JSON.parse(address)
			addressString = `${addressValue.ward?.WardName}, ${addressValue.district?.DistrictName}, ${addressValue.city?.ProvinceName}`
		} catch (error) {
			addressString = ""
		}
		return addressString;
	}

	static setCity(address : string, city: City) {
		let getAddress = this.getAddress(address);
		getAddress.city = city;
		return JSON.stringify(getAddress);
	}

	static setDistrict(address : string,name: District) {
		let getAddress = this.getAddress(address);
		getAddress.district = name;
		return JSON.stringify(getAddress);
	}
	static setWard(address : string,name: Ward) {
		let getAddress = this.getAddress(address);
		getAddress.ward = name;
		return JSON.stringify(getAddress);
	}
	static setDetailAddress(address : string,name: string) {
		let getAddress = this.getAddress(address);
		getAddress.detail = name;
		return JSON.stringify(getAddress);
	}
}

export class Address {
	city?: City;
	district?: District;
	ward?: Ward;
	detail?: string;
}
