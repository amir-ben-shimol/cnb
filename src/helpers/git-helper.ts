import simpleGit from 'simple-git';

const git = simpleGit();

export const createAndSwitchBranch = async (branchName: string): Promise<void> => {
	await git.checkoutLocalBranch(branchName);
	console.log(`Switched to new branch: ${branchName}`);
};
