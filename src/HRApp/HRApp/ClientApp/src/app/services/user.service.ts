import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';
import { User } from "../models/settings.model";
@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient) { 
    }

    signIn(userId: number, user: User): Observable<User> {
		return this.http.put<User>('api/users/' + userId, user);
	}

    getUser(userId): Observable<User> {
		return this.http.get<User>('api/users/' + userId);
    }
    
    createUser(user: User): Observable<User> {
		return this.http.post<User>('api/users', user);
	}

	editUser(userId: number, user: User): Observable<User> {
		return this.http.put<User>('api/users/' + userId, user);
	}
}