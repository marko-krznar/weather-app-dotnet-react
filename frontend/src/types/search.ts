export interface SearchHistoryItem {
	id: number;
	searchTerm: string;
	searchedAt: string;
	temperature: number;
	windSpeed: number;
	pressure: number;
	weatherCondition: string;
}

export interface SearchStatsResponse {
	topCities: Array<TopCity>;
	latestSearches: Array<LatestSearch>;
	conditionDistribution: Array<WeatherDistribution>;
}

export interface TopCity {
	city: string;
	count: number;
}

export interface LatestSearch {
	searchTerm: string;
	searchedAt: string;
}

export interface WeatherDistribution {
	condition: string;
	count: number;
}

export interface LatestSearch {
	id: number;
	searchTerm: string;
	searchedAt: string;
	pressure: number;
	temperature: number;
	weatherCondition: string;
	windSpeed: number;
}

export interface LatestSearchesProps {
	data: Array<LatestSearch>;
}
