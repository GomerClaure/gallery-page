import { Injectable, signal } from '@angular/core';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'DIRECTOR' | 'SECRETARIA';
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Using signals for reactive state
  private readonly _currentUser = signal<AdminUser | null>(null);
  
  // Public readonly signals
  public readonly currentUser = this._currentUser.asReadonly();
  
  constructor() {
    this.checkSession();
  }

  get isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  get userRole(): 'DIRECTOR' | 'SECRETARIA' | null {
    const user = this._currentUser();
    return user ? user.role : null;
  }

  login(email: string, password: string): Promise<boolean> {
    // Basic mock logic. In real app, call API.
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'director@admin.com') {
          this.setSession({
            id: 1,
            name: 'Director Principal',
            email: email,
            role: 'DIRECTOR',
            avatar: 'https://ui-avatars.com/api/?name=Director+Principal&background=random'
          });
          resolve(true);
        } else if (email === 'secretaria@admin.com') {
          this.setSession({
            id: 2,
            name: 'Secretaria Gral',
            email: email,
            role: 'SECRETARIA',
            avatar: 'https://ui-avatars.com/api/?name=Secretaria+Gral&background=random'
          });
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('admin_session');
  }

  private setSession(user: AdminUser): void {
    this._currentUser.set(user);
    localStorage.setItem('admin_session', JSON.stringify(user));
  }

  private checkSession(): void {
    const storedUser = localStorage.getItem('admin_session');
    if (storedUser) {
      try {
        this._currentUser.set(JSON.parse(storedUser));
      } catch (e) {
        this.logout();
      }
    }
  }
}
