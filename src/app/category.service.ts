import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private db: AngularFireDatabase) {

   }

  getCategories () {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }  
    
    
    /*snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(items => {
      return items.map(item => item.key);
    });*/
  }
