/* eslint-disable no-useless-escape */
const validBranchCharsRegex = /^[a-zA-Z0-9-_\/\\]+$/;

export const isValidBranchChars = (separator?: string): boolean => {
	if (!separator) return false;

	return validBranchCharsRegex.test(separator);
};
