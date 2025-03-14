import * as path from 'path';
import * as fs from 'fs';
import * as core from '@actions/core';

/**
 * Utility functions for file operations
 */
export class FileUtils {
  /**
   * Detect the language of a file based on its extension
   */
  static detectLanguage(filePath: string): 'python' | 'typescript' | 'unknown' {
    const extension = path.extname(filePath).toLowerCase();
    
    switch (extension) {
      case '.py':
        return 'python';
      case '.ts':
      case '.tsx':
        return 'typescript';
      default:
        return 'unknown';
    }
  }

  /**
   * Check if a file should be included based on include/exclude patterns
   */
  static shouldIncludeFile(
    filePath: string,
    includeDirs: string[],
    excludeDirs: string[]
  ): boolean {
    // Normalize path for comparison
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    // Check if file is in an excluded directory
    for (const excludeDir of excludeDirs) {
      const normalizedExcludeDir = excludeDir.replace(/\\/g, '/');
      if (normalizedPath.startsWith(normalizedExcludeDir)) {
        return false;
      }
    }
    
    // If no include directories specified, include all non-excluded files
    if (includeDirs.length === 0 || (includeDirs.length === 1 && includeDirs[0] === '.')) {
      return true;
    }
    
    // Check if file is in an included directory
    for (const includeDir of includeDirs) {
      const normalizedIncludeDir = includeDir.replace(/\\/g, '/');
      if (normalizedPath.startsWith(normalizedIncludeDir)) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Read a file safely with error handling
   */
  static async readFile(filePath: string): Promise<string | null> {
    try {
      return await fs.promises.readFile(filePath, 'utf8');
    } catch (error) {
      core.error(`Error reading file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }

  /**
   * Write to a file safely with error handling
   */
  static async writeFile(filePath: string, content: string): Promise<boolean> {
    try {
      await fs.promises.writeFile(filePath, content, 'utf8');
      return true;
    } catch (error) {
      core.error(`Error writing to file ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }
}
