import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { PageService } from './services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public pageService: PageService, public authService: AuthService, private router: Router) {
		// Temporarily use pageService.data for state
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
