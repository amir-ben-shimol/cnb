<p align="center">
    <img src="https://github.com/amir-ben-shimol/cnb/blob/main/assets/brand.png" width="350" />
</p>

<p align="center">
	<a href="https://github.com/amir-ben-shimol/cnb">
    	<img src="https://img.shields.io/github/actions/workflow/status/amir-ben-shimol/cnb/integrate.yaml?label=CI&logo=GitHub" alt="CI status">
  	</a>
	<a href="https://www.npmjs.com/package/cnb">
    	<img src="https://img.shields.io/npm/dm/cnb?logo=NPM" alt="npm downloads">
  	</a>
	<a href="https://github.com/amir-ben-shimol/cnb">
    	<img src="https://img.shields.io/npm/l/cnb" alt="npm license">
  	</a>
	<a href="https://github.com/amir-ben-shimol/cnb">
    	<img src="https://img.shields.io/npm/v/cnb?label=version" alt="version">
  	</a>
</p>

<hr />

# 🚀 Create New Branch

✨ **cnb** is a simple and customizable CLI tool that helps you create Git branches following naming conventions, and validates (lints) branch names to ensure they follow the configured conventions.

## 🎬 Demo

![cnb](assets/demo.gif)

## 📦 Installation

Install the package as a dev dependency:

```bash
npm i -D cnb
```

## 🛠️ Usage

### Creating a New Branch

1. Add the following alias to your `.gitconfig`:

```shell
[alias]
cnb = "!npx cnb"
```

2. Add the following script to your `package.json`:

```json
"scripts": {
	"prepare": "git config --local include.path ../.gitconfig",
}
```

3. Make sure the prepare script runs before trying the new git alias. You can do this by running (only once):

```bash
npm i
```

Or explicitly run the script:

```bash
npm run prepare
```

4. Run the following command to create a new branch with naming conventions:

```bash
git cnb
```

This will prompt you with a set of options to choose from (e.g., `feat`, `fix`, `chore`, etc.). You'll also provide a short description that will be formatted into kebab-case.

Example:

-   Selected type: `feat`
-   Description: `configure notifications`

The branch created will be: `feat/configure-notifications`.

If your configuration requires a ticket ID (based on your config file), the flow will prompt you to enter that first.

### Linting a Branch Name

You can also use **cnb** to lint and validate if the current branch name follows your configured conventions.

1. Add the following script to your `package.json`:

```json
"scripts": {
	"cnb:check": "cnb --check"
}
```

2. Run the script to lint the current branch name:

```bash
npm run cnb:check
```

## 📁 Configuration

You can customize the behavior of **cnb** by creating a configuration file in your project root called `cnb.config.ts` (for ES6 environments) or `cnb.config.cjs` (for CommonJS environments).

### Configuration Options

| Option                 | Type       | Description                                                                                     | Default                             |
| ---------------------- | ---------- | ----------------------------------------------------------------------------------------------- | ----------------------------------- |
| `branchTypes`          | `string[]` | The types of branches you can select (e.g., `feat`, `fix`, `chore`, `style`)                    | `['feat', 'fix', 'chore', 'style']` |
| `maxDescriptionLength` | `number`   | The maximum length allowed for the branch description.                                          | `20`                                |
| `skipTicketId`         | `boolean`  | Whether to skip the ticket ID prompt.                                                           | `false`                             |
| `ticketIdPrefix`       | `string`   | The prefix to add to the ticket ID (e.g., `JIRA-`).                                             | `T-`                                |
| `separator`            | `string`   | The character(s) used to separate the ticket ID, branch type, and branch name (e.g., `/`, `_`). | `/`                                 |

### Example `cnb.config.ts` (ES6)

```ts
import type { CnbConfig } from 'cnb';

const config: CnbConfig = {
	branchTypes: ['feat', 'fix', 'chore', 'style'],
	maxDescriptionLength: 20,
	skipTicketId: false,
	ticketIdPrefix: 'JIRA-',
};

export default config;
```

### Example `cnb.config.cjs` (CommonJS)

```js
module.exports = {
	branchTypes: ['feat', 'fix', 'chore', 'style'],
	maxDescriptionLength: 20,
	skipTicketId: false,
	ticketIdPrefix: 'JIRA-',
};
```

## 🛠️ Note for ES6 vs. CommonJS Users

-   **For ES6 users**: Create your configuration file as `cnb.config.ts` and use `export default`.
-   **For CommonJS users**: Create your configuration file as `cnb.config.cjs` and use `module.exports`.

## 👥 Authors

<a href="https://github.com/amir-ben-shimol">
    <img src="https://avatars.githubusercontent.com/u/105565954?s=400&u=01efa537bf4368251ffa05954d13aa1861073b39&v=4" height="50" />
</a>

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
