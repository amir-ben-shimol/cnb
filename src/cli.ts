#!/usr/bin/env node

import chalk from 'chalk';
import type { CnbConfig } from './types/config-types';
import { promptForBranchType, promptForDescription, promptForTicketId } from './helpers/prompt-handler';
import { createAndSwitchBranch } from './helpers/git-helper';
import { defaultConfig } from './data/default-config';
import { toKebabCase } from './utils/string-utils';
import { loadUserConfig, mergeConfigs } from './helpers/config';

/**
 * run - The main function that handles the flow of creating a new branch based on the user's input and config settings.
 * It prompts the user for a ticket ID (if not skipped), branch type, and branch description.
 * It then formats the branch name according to the conventions specified in the config and switches to the new branch.
 *
 * The user configuration, if provided, will override the default settings.
 * The branch name will be displayed in the console, and `createAndSwitchBranch` will be called to create it.
 *
 * If an error occurs during the process, it logs a friendly exit message to the console.
 *
 * @returns {Promise<void>} Resolves when the branch is successfully created or exits with an error message.
 */
const run = async (): Promise<void> => {
	console.log(chalk.blue.bold('🚀 Welcome to CNB!'));

	const userConfig = loadUserConfig();
	const config: CnbConfig = mergeConfigs(userConfig, defaultConfig);
	let ticketId = '';

	if (!config.skipTicketId) {
		ticketId = await promptForTicketId();
	}

	const branchType = await promptForBranchType(config.branchTypes);
	const description = await promptForDescription(config.maxDescriptionLength);
	const formattedDescription = toKebabCase(description);
	let branchName = `${branchType}/${formattedDescription}`;

	if (ticketId) {
		branchName = `${config.ticketIdPrefix}${ticketId}/${branchName}`;
	}

	console.log(chalk.green.bold(`✅ Creating branch: ${chalk.yellow.bold(branchName)}`));
	await createAndSwitchBranch(branchName);
};

run().catch(() => {
	console.error(chalk.redBright.bold('See ya! 👋'));
});
