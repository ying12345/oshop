import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
      if (user) { return true; }

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  ));
  }
}
