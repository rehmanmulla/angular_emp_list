import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor(
    private activatedroute: ActivatedRoute,
    public userService: UserService,
  ) { }

  data = {};
  sub;
  formControls = this.userService.form.controls;

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    mobileNo: new FormControl(''),
    lng: new FormControl(''),
    lat: new FormControl(''),
  });

  ngOnInit(): void {
    this.sub = this.activatedroute.paramMap.subscribe(params => {
      this.data = history.state.user;
      this.userService.form.setValue(this.data);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
