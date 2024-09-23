// src/helpers/prompt-handler.ts

import inquirer from 'inquirer';
import { defaultConfig } from '../cnb';

export const promptForTicketId = async (): Promise<string> => {
	const { ticketId } = await inquirer.prompt([
		{
			type: 'input',
			name: 'ticketId',
			message: 'Insert ticket id:',
			validate: (input) => (input.trim() ? true : 'Ticket ID cannot be empty'),
		},
	]);

	return ticketId;
};

export const promptForBranchType = async (): Promise<string> => {
	const { branchType } = await inquirer.prompt([
		{
			type: 'list',
			name: 'branchType',
			message: 'Select branch type:',
			choices: defaultConfig.branchTypes,
		},
	]);

	return branchType;
};

export const promptForDescription = async (maxLength: number): Promise<string> => {
	const { description } = await inquirer.prompt([
		{
			type: 'input',
			name: 'description',
			message: `Enter branch description (max ${maxLength} characters):`,
			validate: (input) => (input.length <= maxLength ? true : `Description can't exceed ${maxLength} characters`),
		},
	]);

	return description;
};
