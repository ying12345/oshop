import { Injectable } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { CanActivate,RouterStateSnapshot, ActivatedRouteSnapshot  } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from './shared/services/user.service';
import { Observable } from '../../node_modules/rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin));
  }
  // previous:
  /*canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map(appUser => appUser.isAdmin)
    )
  }*/
}
