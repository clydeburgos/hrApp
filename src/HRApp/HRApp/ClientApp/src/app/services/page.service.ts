import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class PageService {
	private BASE_TITLE: string = "ScaleSquad HR Portal";

	public data: any = {};

	constructor(private titleService: Title) {
		this.data.hideHeader = false;
	}

	public getBaseTitle() {
		return this.BASE_TITLE;
	}

	public setTitle(title: string) {
		this.titleService.setTitle(title);
	}

	public getTitle() {
		this.titleService.getTitle();
	}
}
