import * as core from '@actions/core';
import * as github from '@actions/github';
import { ConfigManager } from './config/configManager';
import { RefactoringEngine } from './refactoring/refactoringEngine';
import { PullRequestManager } from './github/pullRequestManager';

async function run(): Promise<void> {
  try {
    const token = core.getInput('github-token', { required: true });
    
    // Use default values for configuration since these inputs were removed from action.yml
    const includeDirs = '.';
    const excludeDirs = 'node_modules,dist,build,.git,.github';
    const refactoringTypes = 'variable-renaming,code-formatting,method-extraction,duplicate-code,dead-code';
    const maxFilesPerPR = 10;

    core.info('Starting AI Refactoring Agent...');
    
    // Initialize the Octokit client
    const octokit = github.getOctokit(token);
    const context = github.context;
    
    // Load configuration
    const config = new ConfigManager({
      includeDirs: includeDirs.split(',').map(dir => dir.trim()),
      excludeDirs: excludeDirs.split(',').map(dir => dir.trim()),
      refactoringTypes: refactoringTypes.split(',').map(type => type.trim()),
      maxFilesPerPR
    });
    
    core.info(`Configuration loaded. Included directories: ${config.getIncludeDirs().join(', ')}`);
    
    // Initialize refactoring engine
    const refactoringEngine = new RefactoringEngine(config);
    
    // Initialize PR manager
    const prManager = new PullRequestManager(octokit, context, config);
    
    // Scan repository for refactoring opportunities
    core.info('Scanning repository for refactoring opportunities...');
    const refactoringResults = await refactoringEngine.scanRepository();
    
    if (refactoringResults.length === 0) {
      core.info('No refactoring opportunities found.');
      return;
    }
    
    core.info(`Found ${refactoringResults.length} refactoring opportunities.`);
    
    // Create pull requests with the refactoring suggestions
    await prManager.createPullRequests(refactoringResults);
    
    core.info('AI Refactoring Agent completed successfully.');
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred');
    }
  }
}

run();
