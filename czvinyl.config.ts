import type { CzVinylConfig } from 'cz-vinyl';

const czvinylConfig: CzVinylConfig = {
	headerFormat: '{type}: {emoji} {subject}',
	skipTicketId: true,
	subjectMaxLength: 60,
	skipBody: true,
};

export default czvinylConfig;
