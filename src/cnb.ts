import type { CnbConfig } from './types/config-types';

export const defaultConfig: CnbConfig = {
	branchTypes: ['feat', 'bugfix', 'chore', 'docs', 'style'],
	maxDescriptionLength: 20,
	skipTicketId: false,
};
