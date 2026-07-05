export interface ApiForecastItem {
	dt: number;
	dt_txt: string;
	main: {
		temp: number;
		humidity: number;
		pressure: number;
	};
	weather: Array<{
		description: string;
		main: string;
	}>;
	wind: {
		speed: number;
	};
}

export interface ChartRow {
	id: number;
	date: string;
	temperature: number;
	humidity: number;
	pressure: number;
	wind: number;
	description: string;
}
