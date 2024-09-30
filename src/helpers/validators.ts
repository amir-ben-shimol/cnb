import chalk from 'chalk';
import type { Config } from '../types/config-types';

/* eslint-disable no-useless-escape */
const validBranchCharsRegex = /^[a-zA-Z0-9-_\/\\]+$/;

export const isValidBranchChars = (separator?: string): boolean => {
	if (!separator) return false;

	return validBranchCharsRegex.test(separator);
};

/**
 * validateBranchName - Checks if the current branch name follows the convention.
 *
 * @param branchName {string} The current branch name to validate.
 * @param config {Config} The configuration settings to validate against.
 */
export const validateBranchName = (branchName: string, config: Config) => {
	const regex = new RegExp(`^(${config.ticketIdPrefix}\\d+${config.separator})?(${config.branchTypes.join('|')})${config.separator}[a-z0-9]+(-[a-z0-9]+)*$`);

	if (!regex.test(branchName)) {
		console.error(chalk.redBright('❌ Branch name ') + chalk.yellow(branchName) + chalk.redBright(' does not follow the convention.\n'));

		return false;
	}

	console.log(chalk.green('✅ Branch name ') + chalk.yellow(branchName) + chalk.green(' follows the convention!\n'));

	return true;
};
