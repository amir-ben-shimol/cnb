import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * promptForTicketId - This function prompts the user to input a ticket ID.
 * It uses inquirer to display a prompt, and chalk to style the prompt message.
 * The ticket ID is validated to ensure it's not empty.
 *
 * @returns {Promise<string>} A promise that resolves with the entered ticket ID.
 */
export const promptForTicketId = async (): Promise<string> => {
	const { ticketId } = await inquirer.prompt([
		{
			type: 'input',
			name: 'ticketId',
			message: chalk.cyan('📄 Insert ticket id:'),
			transformer: (input) => chalk.yellow(input),
			validate: (input) => (input.trim() ? true : chalk.red('❌ Ticket ID cannot be empty')),
		},
	]);

	return ticketId;
};

/**
 * promptForBranchType - This function prompts the user to select a branch type from the provided list.
 * The available branch types are passed as an argument, and chalk is used to style the options.
 *
 * @param {string[]} branchTypes - An array of branch types for the user to select from.
 * @returns {Promise<string>} A promise that resolves with the selected branch type.
 */
export const promptForBranchType = async (branchTypes: string[]): Promise<string> => {
	const { branchType } = await inquirer.prompt([
		{
			type: 'list',
			name: 'branchType',
			message: chalk.cyan('🔧 Select branch type:'),
			choices: branchTypes.map((type) => ({
				name: chalk.yellow(type),
				value: type,
			})),
		},
	]);

	return branchType;
};

/**
 * promptForDescription - This function prompts the user to input a branch description.
 * It validates that the input does not exceed the maximum length defined by the config.
 * Chalk is used to style the prompt message and validation error.
 *
 * @param {number} maxLength - The maximum allowed length for the branch description.
 * @returns {Promise<string>} A promise that resolves with the entered description in kebab-case.
 */
export const promptForDescription = async (maxLength: number): Promise<string> => {
	const { description } = await inquirer.prompt([
		{
			type: 'input',
			name: 'description',
			message: chalk.cyan(`📝 Enter branch description (max ${maxLength} characters):`),
			transformer: (input) => (input.length > maxLength ? chalk.red(input) : chalk.yellow(input)),
			validate: (input) => (input.length <= maxLength ? true : chalk.red(`❌ Description can't exceed ${maxLength} characters`)),
		},
	]);

	return description;
};
