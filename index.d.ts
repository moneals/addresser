declare module "@solinkcorp/addresser" {

	export function parseAddress(addressString: string): IParsedAddress;
	export function getRandomCity(): { city: string, state: string};
	export function cities(): IStateCities;

	export interface IParsedAddress {
		zipCode: string;
		stateAbbreviation: string;
		stateName: string;
		placeName: string;
		addressLine1: string;
		streetNumber: string;
		streetSuffix: string;
		streetName: string;
		id: string;
	}

	export interface IStateCities {
		[stateName: string]: string[];
	}
}
