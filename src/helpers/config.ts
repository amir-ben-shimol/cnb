/* eslint-disable @typescript-eslint/no-var-requires */
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import type { CnbConfig } from '../types/config-types';

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
 * mergeConfigs - This function merges the user's configuration with the default configuration.
 * It ensures that if the user specifies custom `branchTypes`, they override the default array.
 * All other settings are merged such that the user's settings take precedence over the defaults.
 *
 * @param {Partial<CnbConfig>} userConfig - The configuration provided by the user, which may override default settings.
 * @param {CnbConfig} defaultConfig - The default configuration that will be used if the user does not provide one.
 *
 * @returns {CnbConfig} The final merged configuration, combining the user and default settings.
 */
export const mergeConfigs = (userConfig: Partial<CnbConfig>, defaultConfig: CnbConfig): CnbConfig => {
	const branchTypes = userConfig.branchTypes || defaultConfig.branchTypes;

	return {
		...defaultConfig,
		...userConfig,
		branchTypes,
	};
};
