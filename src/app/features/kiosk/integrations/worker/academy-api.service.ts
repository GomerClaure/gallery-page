import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { kioskGroups } from '../../data/kiosk.data';
import { InterestGroup } from '../../models/kiosk.models';
import { WorkerGroupDto } from './worker-api.models';

@Injectable({ providedIn: 'root' })
export class AcademyApiService {
  getGroups(): Observable<InterestGroup[]> {
    return of(kioskGroups);
  }

  // Replace this mock endpoint with a Worker-backed call when the backend is ready.
  getWorkerEndpoint(path: string): string {
    return `/api/${path.replace(/^\/+/, '')}`;
  }

  // Suggested future Worker route:
  // GET /api/kiosk/branches/:branchSlug/groups
  getGroupsFromWorker(branchSlug: string): Observable<WorkerGroupDto[]> {
    void branchSlug;
    return of([]);
  }
}
