import { Injectable, computed, signal } from '@angular/core';

import { kioskBranches, kioskGroups } from '../data/kiosk-demo.data';
import { Branch, GroupLevel, InterestGroup, LevelEvent } from '../models/kiosk.models';
import { BranchStorageService } from './branch-storage.service';

@Injectable({ providedIn: 'root' })
export class AcademyContentService {
  private readonly selectedBranchId = signal<string | null>(null);

  readonly branches = signal<Branch[]>(kioskBranches);
  readonly groups = signal<InterestGroup[]>(kioskGroups);
  readonly selectedBranch = computed(
    () =>
      this.branches().find((branch) => branch.id === this.selectedBranchId()) ?? null,
  );

  constructor(private branchStorageService: BranchStorageService) {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const savedBranchId = this.branchStorageService.getBranch();
    if (savedBranchId) {
      this.selectedBranchId.set(savedBranchId);
    }
  }

  selectBranch(branchId: string): void {
    this.selectedBranchId.set(branchId);
    this.branchStorageService.saveBranch(branchId);
  }

  isBranchSelected(): boolean {
    return this.selectedBranchId() !== null;
  }

  ensureBranchSelected(): void {
    if (this.selectedBranchId()) {
      return;
    }

    const firstBranchId = this.branches()[0]?.id ?? null;
    if (firstBranchId) {
      this.selectBranch(firstBranchId);
    }
  }

  getGroup(groupId: string): InterestGroup | undefined {
    return this.groups().find((group) => group.id === groupId);
  }

  getLevel(groupId: string, levelId: string): GroupLevel | undefined {
    return this.getGroup(groupId)?.levels.find((level) => level.id === levelId);
  }

  getEvent(groupId: string, levelId: string, eventId: string): LevelEvent | undefined {
    return this.getLevel(groupId, levelId)?.events.find((event) => event.id === eventId);
  }

  getScreenSaverSlides(): { src: string; alt: string; badge: string }[] {
    // Retornar slides de la sucursal seleccionada actual
    const branch = this.selectedBranch();
    if (branch?.slides?.length) {
      return branch.slides;
    }
    // Si no hay sucursal seleccionada al inicio, tomar la de Heroínas por defecto
    return this.branches()[0]?.slides || [];
  }
}
