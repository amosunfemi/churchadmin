import { error } from 'util';
import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {Menu} from '../_models/index';

@Injectable()
export class AuthGuard implements CanActivate {
    private usergroup_id : number;
    private token : string;
    private baseUrl : string = '/api/common/user';
    constructor(private router : Router, private http : Http) {}

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true check if token is still valid
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.usergroup_id = currentUser && currentUser.user_group_id;
            this.token = currentUser && currentUser.token;
            
            /*this.getUserMenus()
                .subscribe(p => {  
                    
                    console.log(p);
                }, error => {
                    console.log(error);
                    localStorage.removeItem('currentUser');
                    this
                        .router
                        .navigate(['/login']);
                    return false;
                });*/

            return true;
        }

        // not logged in so redirect to login page
        this
            .router
            .navigate(['/pages/login']);
        return false;
    }

    getUserMenus(): Observable<Menu[]> {
        // add authorization header with jwt token
        if(!this.token){
            console.log("No token");
        }
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get(`${this.baseUrl}/usergroup/${this.usergroup_id}/menus`, options)
            .map((response: Response) => response.json());
    }
}