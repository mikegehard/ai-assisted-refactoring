/**
 * Configuration manager for the AI Refactoring Agent
 * Handles loading and validating configuration settings
 */

export interface RefactoringConfig {
  includeDirs: string[];
  excludeDirs: string[];
  refactoringTypes: string[];
  maxFilesPerPR: number;
}

export class ConfigManager {
  private config: RefactoringConfig;

  constructor(config: RefactoringConfig) {
    this.config = this.validateConfig(config);
  }

  /**
   * Validates the provided configuration
   */
  private validateConfig(config: RefactoringConfig): RefactoringConfig {
    // Ensure maxFilesPerPR is within reasonable bounds
    if (isNaN(config.maxFilesPerPR) || config.maxFilesPerPR < 1) {
      config.maxFilesPerPR = 10; // Default to 10 if invalid
    } else if (config.maxFilesPerPR > 20) {
      config.maxFilesPerPR = 20; // Cap at 20 to prevent excessive PRs
    }

    // Validate refactoring types
    const validRefactoringTypes = [
      'variable-renaming',
      'code-formatting',
      'method-extraction',
      'duplicate-code',
      'dead-code'
    ];

    config.refactoringTypes = config.refactoringTypes.filter(type => 
      validRefactoringTypes.includes(type)
    );

    // If no valid refactoring types, use all
    if (config.refactoringTypes.length === 0) {
      config.refactoringTypes = [...validRefactoringTypes];
    }

    return config;
  }

  /**
   * Get directories to include in refactoring
   */
  getIncludeDirs(): string[] {
    return this.config.includeDirs;
  }

  /**
   * Get directories to exclude from refactoring
   */
  getExcludeDirs(): string[] {
    return this.config.excludeDirs;
  }

  /**
   * Get enabled refactoring types
   */
  getRefactoringTypes(): string[] {
    return this.config.refactoringTypes;
  }

  /**
   * Get maximum files per PR
   */
  getMaxFilesPerPR(): number {
    return this.config.maxFilesPerPR;
  }

  /**
   * Get the full configuration object
   */
  getConfig(): RefactoringConfig {
    return { ...this.config };
  }
}
