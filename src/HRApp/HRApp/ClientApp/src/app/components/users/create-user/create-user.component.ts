import { ViewChild, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/settings.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  busy: boolean = false;
  model: User;

  @ViewChild("createUserForm")
  createUserForm: NgForm;
  
  constructor(
    private router: Router, 
    private userService: UserService) { 
      this.model = new User();
    }

  ngOnInit() {
  }

  submit() {
		if (this.createUserForm.invalid) return;

		this.busy = true;

		let newUser = Object.assign(new User(), this.model);
		this.userService.createUser(newUser)
			.subscribe(user => {
				this.router.navigate(['/users']);
				this.busy = false;
			}, error => {
				this.busy = false;
			});
  }
  
  navigateToSignIn(){
    this.router.navigateByUrl('signin');
  }
}
