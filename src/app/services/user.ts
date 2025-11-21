import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = []  ;
  constructor() {
  }

  getUsers() {
    return this.users
  }

  getUserById(id: number) {
    return this.users.find(u => u.id == id)
  }

  save(u: User) {
    this.users.push(u)
  }
  remove(ind: number) {
    this.users.splice(ind, 1)
  }
}
