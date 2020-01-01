import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Role } from '../models/role.model';
import { User, Company } from '../models/settings.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

	private _user: User;
	public get user(): User {
		let token = this.getUserToken();
		if (token == null || token == '' || token == 'null') {
			return null;
		}

		// Invalidate user
		if (this.jwtHelperService.isTokenExpired(token)) {
			this.deleteUserToken();
			this._user = null;
			return null;
		}

		if (this._user == null) {
			let user = this.jwtHelperService.decodeToken(token);
			if (user != null) {
				this._user = new User();
                this._user.Id = user.id;
                this._user.Email = user.email;
				this._user.Username = user.username;
				this._user.FirstName = user.first_name;
				this._user.LastName = user.last_name;
                this._user.Role = user.role;
                this._user.Company = new Company();
                this._user.Company.Id = user.company_id;
                this._user.Company.BusinessName = user.company_name;    
			}
		}

		return this._user;
	}

	public login(username: string, password: string) : Observable<any> {
		return this.http.post('api/account/signin',
			{
				Username: username,
				Password: password
			});
	}

	public logout() {
		this._user = null;
		localStorage.removeItem('access_token');
	}

	public deleteUserToken() {
		localStorage.removeItem('access_token');
	}

	public setUserToken(token: string) {
		localStorage.setItem('access_token', token);
	}

	private getUserToken() {
		return localStorage.getItem('access_token');
	}
}
