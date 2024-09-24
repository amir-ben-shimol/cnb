#!/usr/bin/env node

import chalk from 'chalk';
import type { CnbConfig } from './types/config-types';
import { promptForBranchType, promptForDescription, promptForTicketId } from './helpers/prompt-handler';
import { createAndSwitchBranch, getCurrentBranchName } from './helpers/git-helper';
import { defaultConfig } from './data/default-config';
import { toKebabCase } from './utils/string-utils';
import { loadUserConfig, mergeConfigs, validateUserConfig } from './helpers/config';
import { validateBranchName } from './helpers/validators';
import { CHECK_FLAG } from './data/consts';

/**
 * run - The main function that handles the flow of creating a new branch or linting the current branch name.
 */
const run = async (): Promise<void> => {
	const userConfig = loadUserConfig();
	const config: CnbConfig = mergeConfigs(userConfig, defaultConfig);

	const isValidConfig = validateUserConfig(config);

	if (!isValidConfig) {
		console.error(chalk.redBright.bold('❌ Invalid configuration. Please check your config file.'));

		return;
	}

	const args = process.argv.slice(2);

	if (args.includes(`--${CHECK_FLAG}`)) {
		const currentBranchName = await getCurrentBranchName();

		if (!currentBranchName) {
			console.error(chalk.redBright.bold('❌ Failed to get the current branch name.'));

			return;
		}

		validateBranchName(currentBranchName, config);

		return;
	}

	console.log('🚀' + chalk.magenta.bold('C') + 'reate' + ' ' + chalk.magenta.bold('N') + 'ew' + ' ' + chalk.magenta.bold('B') + 'ranch\n');
	let ticketId = '';

	if (!config.skipTicketId) {
		ticketId = await promptForTicketId();
	}

	const branchType = await promptForBranchType(config.branchTypes);
	const description = await promptForDescription(config.maxDescriptionLength);
	const formattedDescription = toKebabCase(description);
	let branchName = `${branchType}${config.separator}${formattedDescription}`;

	if (ticketId) {
		branchName = `${config.ticketIdPrefix}${ticketId}${config.separator}${branchName}`;
	}

	console.log(chalk.green.bold(`\n✅ Created branch: ${chalk.yellow.bold(branchName)}\n`));
	await createAndSwitchBranch(branchName);
};

run().catch(() => {
	console.error(chalk.redBright.bold('\nSee ya! 👋\n'));
});
