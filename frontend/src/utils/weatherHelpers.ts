/**
 * Rounds a temperature to the nearest whole number.
 * @param temp - The raw temperature from the weather API (e.g., 21.64).
 * @returns The rounded integer value.
 */
export const roundTemperature = (temp: number): number => {
	return Math.round(temp);
};
