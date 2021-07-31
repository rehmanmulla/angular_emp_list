import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../shared/user.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  path: String;
  images = [];

  constructor(
    private router: Router,
    public userService: UserService,
    public afStorage: AngularFireStorage
  ) { }
  submitted: boolean;
  confirmMsg: boolean;
  successMsg: boolean;
  formControls = this.userService.form.controls;

  ngOnInit(): void {
    this.userService.form.reset();
    this.userService.getPosition().then(pos => {
      this.userService.form.controls['lng'].setValue(pos.lng);
      this.userService.form.controls['lat'].setValue(pos.lat);
    });
  }

  upload($event) {
    this.path = $event.target.files[0];
  }

  onSubmit() {
    this.submitted = true;
    if (this.userService.form.valid) {
      this.confirmMsg = true;
      var filePath = '/files' + Math.random() + new Date().getTime();
      const fileRef = this.afStorage.ref(filePath);
      this.afStorage.upload(filePath, this.path).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.userService.form.value['imgUrl'] = url;
            this.userService.insertUser(this.userService.form.value);
            this.confirmMsg = false;
            this.successMsg = true;
            setTimeout(() => {
              this.successMsg = false,
                this.router.navigate(['/dashboard']);
            }, 2000);
            this.submitted = false;
            this.userService.form.reset();
          })
        })
      ).subscribe();
    }
  }

}
