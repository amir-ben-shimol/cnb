import type { IntroCliConfig } from 'intro-cli';

const config: IntroCliConfig = {
	bigTitle: {
		label: 'cnb',
		color: 'blueBright',
		bold: true,
	},
	welcomeMessage: {
		label: 'Welcome to Intro cnb Project! Get ready to contribute 🚀',
		color: 'green',
		bold: true,
	},
	welcomeDivider: {
		label: '🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨🎉✨',
		color: 'yellowBright',
		bold: false,
	},
	rulesTitle: {
		label: 'Please follow these guidelines:',
		color: 'cyan',
		bold: true,
	},
	rules: [
		{
			emoji: '🛂',
			label: {
				label: 'Follow the coding standards at all times.',
				color: 'magentaBright',
				bold: true,
			},
		},
		{
			emoji: '🚀',
			label: {
				label: 'Make sure all tests pass before creating a pull request.',
				color: 'redBright',
				bold: true,
			},
		},
		{
			emoji: '✅',
			label: {
				label: 'Commit messages should be clear and follow our guidelines.',
				color: 'greenBright',
				bold: true,
			},
		},
		{
			emoji: '📦',
			label: {
				label: 'Use semantic versioning when releasing updates.',
				color: 'yellowBright',
				bold: true,
			},
		},
	],
};

export default config;
