import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase: AngularFireDatabase) { }
  userList: AngularFireList<any>;
  
  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
    imgUrl: new FormControl(''),
    lng: new FormControl(''),
    lat: new FormControl(''),
  });

  getUserList() {
    this.userList = this.firebase.list('users');
    return this.userList.snapshotChanges();
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
      },
      err => {
        reject(err);
      });
    });
  }

  insertUser(user) {
    this.userList = this.firebase.list('/users');
      if (user) {
        this.userList.push({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNo: user.mobileNo,
          imgUrl: user.imgUrl,
          lng: user.lng,
          lat: user.lat,
      });
    }
  }

}
