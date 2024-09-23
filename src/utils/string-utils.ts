/**
 * toKebabCase - Converts a given string into kebab-case (lowercase with words separated by hyphens).
 * It removes any non-alphanumeric characters and replaces spaces or special characters with hyphens.
 * Leading and trailing hyphens are also removed.
 *
 * Example:
 * "Configure Notifications" -> "configure-notifications"
 *
 * @param {string} str - The input string to be converted.
 * @returns {string} - The converted kebab-case string.
 */
export const toKebabCase = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
		.replace(/^-|-$/g, ''); // Remove leading or trailing hyphens
};

/**
 * validateDescriptionLength - Validates whether the provided description length is less than or equal to a specified maximum length.
 * This is used to ensure that branch descriptions don't exceed the length limits defined in the configuration.
 *
 * Example:
 * validateDescriptionLength("short description", 20) -> true
 * validateDescriptionLength("this description is way too long", 20) -> false
 *
 * @param {string} description - The branch description to be validated.
 * @param {number} maxLength - The maximum allowable length for the description.
 * @returns {boolean} - Returns true if the description is valid (within length), otherwise false.
 */
export const validateDescriptionLength = (description: string, maxLength: number): boolean => {
	return description.length <= maxLength;
};
