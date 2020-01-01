import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/settings.model';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {
  model: User;
  constructor() { 
    this.model = new User();
  }

  ngOnInit() {
  }

}
