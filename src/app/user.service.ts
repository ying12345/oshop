import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {}
  save(user: firebase.User){
    console.log(this.db.object('/users/'+user.uid));
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  get(uid: string){
    return this.db.object('/users/' + uid);
  }
}
