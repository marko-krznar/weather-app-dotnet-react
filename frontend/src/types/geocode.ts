export interface LocalNames {
	[key: string]: string;
}

export interface GeocodeLocation {
	name: string;
	local_names?: LocalNames;
	lat: number;
	lon: number;
	country: string;
}
