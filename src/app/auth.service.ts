import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from '../../node_modules/rxjs';
import { ActivatedRoute } from '../../node_modules/@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { UserService} from './user.service';
import { AppUser} from './models/app-user';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute, 
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
    route.url.subscribe((u) => {console.log(route.snapshot.queryParamMap.get('returnUrl'))});
   }
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log('returnUrl', returnUrl);
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user=> 
        (user) ? this.userService.get(user.uid) : of<AppUser>(null)
      )); 
  }
}
