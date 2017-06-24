import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { PersonService } from '../_services/index';
import { Router } from '@angular/router';
import { Person } from '../_models/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [AuthenticationService, PersonService]
})
export class FullLayoutComponent implements OnInit {

  public router: Router;
  public loggedInPerson: Person = new Person();

  constructor(private _authService: AuthenticationService, private _router: Router, private _personService: PersonService) { 
    this._personService
      .getPersonDetails()
      .subscribe(person => {
        this.loggedInPerson = person;

      })
  }

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public logOut() {
    console.log("Logout");
    this
      ._authService
      .logout();
    this
      ._router
      .navigate(['/pages/login']);
  }
  ngOnInit(): void { 
    
  }
}
