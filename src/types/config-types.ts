export type Config = {
	/**
	 * @property {string[]} branchTypes - An array of allowed branch types, such as 'feat', 'fix', 'chore', etc.
	 * These are the options the user will be prompted to choose from when creating a new branch.
	 * Example: ['feat', 'fix', 'chore', 'docs']
	 */
	readonly branchTypes: string[];

	/**
	 * @property {number} maxDescriptionLength - The maximum number of characters allowed for the branch description.
	 * This will enforce a limit on how long the branch description can be.
	 * Example: 30
	 */
	readonly maxDescriptionLength: number;

	/**
	 * @property {boolean} [skipTicketId] - (Optional) Whether to skip the ticket ID prompt when creating a branch.
	 * If set to true, the user will not be prompted to enter a ticket ID.
	 * Default: false
	 * Example: true
	 */
	readonly skipTicketId: boolean;

	/**
	 * @property {string} ticketIdPrefix - The prefix to prepend to the ticket ID when constructing the branch name.
	 * This can be useful for using issue tracking systems like JIRA or GitHub Issues, where each issue has a unique identifier.
	 * Example: 'JIRA-' or 'ISSUE-'
	 */
	readonly ticketIdPrefix: string;

	/**
	 * @property {string} separator - The character(s) used to separate words in the branch name.
	 * This can be customized based on project or organizational conventions, such as '/' or '_'.
	 * Example: '/'
	 */
	readonly separator: string;
};

export type CnbConfig = Partial<Config>;
