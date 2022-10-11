import { makeAutoObservable } from "mobx";
export class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  /**
   computed functions are called only if the variable used inside has been changed
   вызываются только в том случае, если переменная которая используется внутри была изменена
   */
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    // computed functions - вызываются только в том случае, если переменная которая используется внутри была изменена
    return this._user;
  }
}
