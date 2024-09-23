import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { CnbConfig } from './types/config-types';
import { promptForBranchType, promptForDescription, promptForTicketId } from './helpers/prompt-handler';
import { createAndSwitchBranch } from './helpers/git-helper';
import { defaultConfig } from './cnb';
import { toKebabCase } from './utils/string-utils';

async function loadUserConfig(): Promise<Partial<CnbConfig>> {
	const configPath = resolve(process.cwd(), 'cnb.config.ts');

	if (existsSync(configPath)) {
		console.log('Custom config found. Loading...');
		const configModule = await import(configPath);

		return configModule.default;
	}

	console.log('No custom config found. Using default config.');

	return {};
}

async function run() {
	const tsNode = await import('ts-node');

	tsNode.register();

	const userConfig = await loadUserConfig(); // Load user config if it exists
	const config: CnbConfig = { ...defaultConfig, ...userConfig }; // Merge default and user config

	let ticketId = '';

	if (!config.skipTicketId) {
		ticketId = await promptForTicketId();
	}

	const branchType = await promptForBranchType();
	const description = await promptForDescription(config.maxDescriptionLength);

	const formattedDescription = toKebabCase(description);
	let branchName = `${branchType}/${formattedDescription}`;

	if (ticketId) {
		branchName = `${config.ticketIdPrefix || 'T-'}${ticketId}/${branchName}`;
	}

	await createAndSwitchBranch(branchName);
}

run().catch((error) => {
	console.error('Error creating branch:', error);
	process.exit(1);
});
