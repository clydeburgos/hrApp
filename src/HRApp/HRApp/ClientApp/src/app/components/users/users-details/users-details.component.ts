import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/settings.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  busy: boolean = false;
  model: User;
  constructor(private authService: AuthService, private userService: UserService, private router: Router) { 
    this.model = new User();
  }

  ngOnInit() {
    let data = Object.assign(new User(), this.authService.user)
    this.model = data;
  }

  loadDetails(){

  }

  update(){
		this.busy = true;

		let newUser = Object.assign(new User(), this.model);
		this.userService.createUser(newUser)
			.subscribe(user => {
				this.busy = false;
			}, error => {
				this.busy = false;
			});
  }
}
