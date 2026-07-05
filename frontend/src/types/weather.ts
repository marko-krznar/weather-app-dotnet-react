export interface ForecastSectionProps {
	apiList: ApiForecastItem[];
	cityName: string;
}
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

export interface HumidityPieProps {
	humidity: number;
}

export interface ForecastChartRow {
	date: string;
	temperature: number;
	wind: number;
	humidity: number;
}

export interface ForecastChartProps {
	rows: ChartRow[];
}

export interface ForecastFiltersProps {
	tempBounds: [number, number];
	setTempBounds: React.Dispatch<React.SetStateAction<[number, number]>>;
	startDateInput: string;
	setStartDateInput: (value: string) => void;
	endDateInput: string;
	setEndDateInput: (value: string) => void;
	onApply: () => void;
	hasChanges: boolean;
}

export interface GridRow {
	id: number;
	date: string;
	temperature: number;
	humidity: number;
	pressure: number;
	wind: number;
	description: string;
}

export interface ForecastGridProps {
	rows: GridRow[];
}

export interface WeatherWidgetProps {
	name: string;
	weather: Array<{ description: string; icon: string; main: string }>;
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
		pressure: number;
	};
	wind: {
		speed: number;
	};
}

export interface WeatherArgs {
	lat: number;
	lon: number;
}
