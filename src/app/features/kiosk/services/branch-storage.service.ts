import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BranchStorageService {
  private readonly STORAGE_KEY = 'selected-branch-id';

  saveBranch(branchId: string): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, branchId);
    } catch (error) {
      console.warn('Failed to save branch to localStorage:', error);
    }
  }

  getBranch(): string | null {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to read branch from localStorage:', error);
      return null;
    }
  }

  clearBranch(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear branch from localStorage:', error);
    }
  }

  hasBranch(): boolean {
    return this.getBranch() !== null;
  }
}
