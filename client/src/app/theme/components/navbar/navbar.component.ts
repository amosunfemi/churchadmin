import {Component, ViewEncapsulation, Pipe, PipeTransform} from '@angular/core';
import {AppState} from '../../../app.state';
import {AuthenticationService} from '../../../_services/index';
import {PersonService} from '../../../_services/index';
import {Router} from '@angular/router';
import {Person} from '../../../_models/index';
import {MomentModule} from 'angular2-moment';

@Component({selector: 'az-navbar', 
        encapsulation: ViewEncapsulation.None, templateUrl: './navbar.component.html', styleUrls: ['./navbar.component.scss'], providers: [PersonService]})

export class NavbarComponent {
    public isMenuCollapsed : boolean = false;
    public router : Router;
    public loggedInPerson:Person;

    constructor(private _state : AppState, private _authService : AuthenticationService, private _router:Router,
                    private _personService:PersonService) {
        this
            ._state
            .subscribe('menu.isCollapsed', (isCollapsed) => {
                this.isMenuCollapsed = isCollapsed;
            });
        _personService
            .getPersonDetails()
            .subscribe(person => {
                this.loggedInPerson = person;
                console.log(this.loggedInPerson);
            })
    }

    public toggleMenu() {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this
            ._state
            .notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    public logOut() {
        console.log("Logout");
        this
            ._authService
            .logout();
        this
            ._router
            .navigate(['login']);
    }
}
