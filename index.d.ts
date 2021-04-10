declare module "addresser" {

	export function parseAddress(addressString: string): IParsedAddress;
	export function getRandomCity(): { city: string, state: string};
	export function cities(): IStateCities;

	export interface IParsedAddress {
		zipCode: string;
		zipCodePlusFour?: string;
		formattedAddress?: string;
		stateAbbreviation: string;
		stateName: string;
		placeName: string;
		addressLine1: string;
		addressLine2?: string;
		streetDirection?: string;
		streetNumber: string;
		streetSuffix: string;
		streetName: string;
		id: string;
	}

	export interface IStateCities {
		[stateName: string]: string[];
	}
}
