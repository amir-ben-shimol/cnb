// src/cli.ts

import { promptForBranchType, promptForDescription, promptForTicketId } from './helpers/prompt-handler';
import { createAndSwitchBranch } from './helpers/git-helper';
import { defaultConfig } from './cnb';
import { toKebabCase } from './utils/string-utils';

async function run() {
	const config = defaultConfig;

	let ticketId = '';

	if (!config.skipTicketId) {
		ticketId = await promptForTicketId();
	}

	const branchType = await promptForBranchType();
	const description = await promptForDescription(config.maxDescriptionLength);

	const formattedDescription = toKebabCase(description);
	let branchName = `${branchType}/${formattedDescription}`;

	if (ticketId) {
		branchName = `${ticketId}/${branchName}`;
	}

	await createAndSwitchBranch(branchName);
}

run().catch((error) => {
	console.error('Error creating branch:', error);
	process.exit(1);
});
