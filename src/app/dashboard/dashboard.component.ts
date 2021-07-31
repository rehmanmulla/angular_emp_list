import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userArray = [];
  rowIndexArray: any[];
  eachUserData = [];
  deleteMsg: boolean;
  closeResult: string;
  updateMsg: boolean;
  notUpdated: boolean;
  submitted: boolean;
  formControls = this.userService.form.controls;

  constructor(
    public userService: UserService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
    imgUrl: new FormControl(''),
    address: new FormControl(''),
    lng: new FormControl(''),
    lat: new FormControl(''),
  });

  ngOnInit() {
    this.userArray = [];
    this.userService.getUserList().subscribe(list => {
      this.userArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.rowIndexArray = Array.from(Array(
        Math.ceil(this.userArray.length / 3)
      ).keys());
    });
  }

  onClick(user) {
    this.router.navigate(['preview'], { state: { user: user } });
  }

}
