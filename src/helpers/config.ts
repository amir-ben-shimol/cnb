/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import { register } from 'ts-node';
import type { CnbConfig, Config } from '../types/config-types';
import { isValidBranchChars } from './validators';

/**
 * loadUserConfig - This function attempts to load the user's custom configuration file.
 * It checks for two possible config files: `cnb.config.ts` for TypeScript users and `cnb.config.cjs`
 * for CommonJS users. If it finds a valid file, it will load and return the configuration object.
 *
 * If an error occurs during loading, it logs an error message and exits the process.
 * If no config file is found, it logs a warning and returns an empty object, indicating that default
 * settings should be used.
 *
 * @returns {Partial<CnbConfig>} The user's configuration if found, or an empty object if not.
 */
export const loadUserConfig = (): Partial<CnbConfig> => {
	const tsConfigPath = resolve(process.cwd(), 'cnb.config.ts');
	const cjsConfigPath = resolve(process.cwd(), 'cnb.config.cjs');

	if (existsSync(tsConfigPath)) {
		try {
			register({
				compilerOptions: {
					module: 'commonjs',
				},
			});
			const configModule = require(tsConfigPath);

			return configModule.default;
		} catch (error) {
			console.error(chalk.red('❌ Error loading TypeScript config. Ensure it uses "module.exports" instead of "export default" if using CommonJS.'));
			process.exit(1);
		}
	} else if (existsSync(cjsConfigPath)) {
		try {
			const configModule = require(cjsConfigPath);

			return configModule;
		} catch (error) {
			process.exit(1);
		}
	}

	console.log(chalk.yellow('⚠️ No custom config found. Using default config.'));
	console.log(chalk.yellow('ℹ️ You can create a "cnb.config.ts" or "cnb.config.cjs" file to customize your branch naming conventions.'));

	return {};
};

/**
 * validateUserConfig - This function validates the user's configuration object to ensure it meets the required structure.
 * It checks that the `branchTypes` property is an array of strings and that the `maxDescriptionLength` is a positive number and the skipTicketId is a boolean and the ticketIdPrefix and the separator are passing the isValidBranchChars function.
 * If any validation fails, it logs an error message and exits the process.
 * If the configuration is valid, it returns true.
 *
 * @param {Partial<CnbConfig>} userConfig - The user's configuration object to validate.
 *
 * @returns {boolean} True if the configuration is valid, false otherwise.
 */
export const validateUserConfig = (userConfig: Partial<CnbConfig>): boolean => {
	if (!Array.isArray(userConfig.branchTypes) || !userConfig.branchTypes.every((type) => typeof type === 'string')) {
		console.error(chalk.red('❌ Error: branchTypes must be an array of strings.'));

		return false;
	}

	if (typeof userConfig.maxDescriptionLength !== 'number' || userConfig.maxDescriptionLength <= 0) {
		console.error(chalk.red('❌ Error: maxDescriptionLength must be a positive number.'));

		return false;
	}

	if (typeof userConfig.skipTicketId !== 'boolean') {
		console.error(chalk.red('❌ Error: skipTicketId must be a boolean.'));

		return false;
	}

	if (typeof userConfig.ticketIdPrefix !== 'string' || !isValidBranchChars(userConfig.ticketIdPrefix)) {
		console.error(chalk.red('❌ Error: ticketIdPrefix must be a string with valid branch characters.'));

		return false;
	}

	if (typeof userConfig.separator !== 'string' || !isValidBranchChars(userConfig.separator)) {
		console.error(chalk.red('❌ Error: separator must be a string with valid branch characters.'));

		return false;
	}

	return true;
};

/**
 * mergeConfigs - This function merges the user's configuration with the default configuration.
 * It ensures that if the user specifies custom `branchTypes`, they override the default array.
 * All other settings are merged such that the user's settings take precedence over the defaults.
 *
 * @param {Partial<CnbConfig>} userConfig - The configuration provided by the user, which may override default settings.
 * @param {Config} defaultConfig - The default configuration that will be used if the user does not provide one.
 *
 * @returns {CnbConfig} The final merged configuration, combining the user and default settings.
 */
export const mergeConfigs = (userConfig: Partial<CnbConfig>, defaultConfig: Config): Config => {
	const branchTypes = userConfig.branchTypes || defaultConfig.branchTypes;

	return {
		...defaultConfig,
		...userConfig,
		branchTypes,
	};
};
