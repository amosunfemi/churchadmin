import {Injectable} from '@angular/core';
//import {menuItems} from '../theme/components/menu/menu';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {AuthenticationService} from './index';
import {Observable} from 'rxjs/Rx';
import {Menu, Parish} from '../_models/index';
import {User} from '../_models/index';

@Injectable()
export class ParishService {
    private baseUrl : string = '/api/maintenance';
    private parish_id : number;
    public token : string;

    constructor(private http : Http, private authenticationService : AuthenticationService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.parish_id = currentUser && currentUser.parish_id;
        this.token = currentUser && currentUser.token;
    }

    getAllParishes() : Observable < Parish[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});

        return this
            .http
            .get(`${this.baseUrl}/parish`, options)
            .map((response : Response) => response.json()).catch(this.handleError);;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token)
        return headers;
    }

    private setHeaders() : RequestOptions {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token
        });
        let options = new RequestOptions({headers: headers});
        return options
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }
}

