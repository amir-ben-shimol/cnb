import type { Config } from '../types/config-types';

/**
 * defaultConfig - The default configuration object used by the CNB tool.
 * This object defines the default settings for branch creation, including branch types, maximum description length,
 * whether to skip the ticket ID prompt, and the default ticket ID prefix.
 *
 * @type {Config}
 */
export const defaultConfig: Config = {
	branchTypes: ['feat', 'fix', 'chore', 'style'],
	maxDescriptionLength: 20,
	skipTicketId: false,
	ticketIdPrefix: 'T-',
	separator: '/',
};
