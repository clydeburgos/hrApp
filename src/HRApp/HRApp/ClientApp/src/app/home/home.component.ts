import { Component } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private pageService: PageService){
    this.pageService.data.isLoginPage = false;
  }
}
