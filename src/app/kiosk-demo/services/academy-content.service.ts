import { Injectable, computed, signal } from '@angular/core';

import { kioskBranches, kioskGroups } from '../data/kiosk-demo.data';
import { Branch, GroupLevel, InterestGroup, LevelEvent } from '../models/kiosk.models';

@Injectable({ providedIn: 'root' })
export class AcademyContentService {
  private readonly selectedBranchId = signal<string | null>(null);

  readonly branches = signal<Branch[]>(kioskBranches);
  readonly groups = signal<InterestGroup[]>(kioskGroups);
  readonly selectedBranch = computed(
    () =>
      this.branches().find((branch) => branch.id === this.selectedBranchId()) ?? null,
  );

  selectBranch(branchId: string): void {
    this.selectedBranchId.set(branchId);
  }

  ensureBranchSelected(): void {
    if (this.selectedBranchId()) {
      return;
    }

    this.selectedBranchId.set(this.branches()[0]?.id ?? null);
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
}
