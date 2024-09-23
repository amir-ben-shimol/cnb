// src/utils/string-utils.ts

export const toKebabCase = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
};

export const validateDescriptionLength = (description: string, maxLength: number): boolean => {
	return description.length <= maxLength;
};
