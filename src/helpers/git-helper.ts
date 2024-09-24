import simpleGit from 'simple-git';

const git = simpleGit();

/**
 * createAndSwitchBranch - Creates a new local Git branch and switches to it.
 * This function uses the simple-git library to automate the process of creating and switching to the new branch.
 *
 * After the branch is created and checked out, a confirmation message is logged to the console.
 *
 * Example:
 * createAndSwitchBranch('feat/new-feature')
 *
 * @param {string} branchName - The name of the branch to be created and switched to.
 * @returns {Promise<void>} - A promise that resolves once the branch is successfully created and switched.
 */
export const createAndSwitchBranch = async (branchName: string): Promise<void> => {
	await git.checkoutLocalBranch(branchName);
	console.log(`Switched to new branch: ${branchName}`);
};

/**
 * getCurrentBranchName - Retrieves the current Git branch name using simple-git.
 *
 * @returns {Promise<string>} The current branch name.
 */
export const getCurrentBranchName = async (): Promise<string> => {
	try {
		const branchSummary = await git.branchLocal();

		return branchSummary.current;
	} catch (error) {
		console.error('❌ Unable to retrieve the current branch name.');

		return '';
	}
};
