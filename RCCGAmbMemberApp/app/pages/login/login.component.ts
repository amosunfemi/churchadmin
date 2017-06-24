import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { User } from './shared/user.model';
import { LoginService } from './shared/login.service';

import { registerElement } from "nativescript-angular/element-registry";

registerElement("Slide", () => require("nativescript-slides").Slide);
registerElement("SlideContainer", () => require("nativescript-slides").SlideContainer);


@Component({
	selector: 'login',
	moduleId: module.id,
	templateUrl: `./login.component.html`,
	//styleUrls: ["./login.component.css"],
	providers: [LoginService]
})

export class LoginComponent implements OnInit {
	user: User[] = [];

	constructor(private loginService: LoginService) { }

	public images: Array<any> = [];

	@ViewChild("slides") slides: ElementRef;

	ngOnInit() {
		this.images.push(
			{
				title: 'Sports',
				source: 'res://300x300.jpg'
			}
		);
		this.images.push(
			{
				title: 'Cats',
				source: 'res://Default.png'
			}
		);
		this.images.push(
			{
				title: 'Food',
				source: 'res://Icon.png'
			}
		);
		/*this.loginService.getList().subscribe((res) => {
			this.user = res;
		});*/
	}

	ngAfterViewInit() {
		let SlidesXml = this.slides.nativeElement;
		SlidesXml.constructView();
	}
}