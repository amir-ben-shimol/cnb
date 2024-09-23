export type CnbConfig = {
	readonly branchTypes: string[];
	readonly maxDescriptionLength: number;
	readonly skipTicketId?: boolean;
	readonly ticketIdPrefix: string;
};
