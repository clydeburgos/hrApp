import { Component, OnInit } from '@angular/core';
import { SignInModel } from 'src/app/models/signin.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  busy: boolean = false;
  model : SignInModel;
  constructor(
    private router: Router,
    private authService: AuthService,
    private pageService: PageService) { 
    this.model = new SignInModel();
    this.pageService.setTitle(this.pageService.getBaseTitle() + ' | Sign In');
		this.pageService.data.hideHeader = true;
  }

  ngOnInit() {
  }

  signIn(){
    this.busy = true;
    this.authService.login(this.model.Username, this.model.Password).subscribe((response) => {
				this.authService.setUserToken(response.token);
				this.router.navigate(['/home']);
				this.busy = false;
			}, error => {
				this.busy = false;
			});
  }

  navigateToCreate(){
    this.router.navigateByUrl('/signup')
  }
}
