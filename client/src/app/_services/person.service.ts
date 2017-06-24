import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthenticationService} from './index';
import {User, Person} from '../_models/index';

@Injectable()
export class PersonService {
    private baseUrl : string = '/api/common';
    public token : string;
    public person_id:number
    

    constructor(private http : Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.person_id = currentUser && currentUser.person_id;
    }

    getPersonDetails() : Observable < Person > {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json' });
        let options = new RequestOptions({headers: headers});
        return this.http.get(`${this.baseUrl}/person/${this.person_id}`, options).map((response : Response) => response.json())
    }
}