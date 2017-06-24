import { Injectable } from '@angular/core';
import { menuItems } from '../theme/components/menu/menu';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './index';
import { Observable } from 'rxjs/Rx';
import { Menu } from '../_models/index';
import { User } from '../_models/index';

@Injectable()
export class MenuService {
    private baseUrl: string = '/api/common/user';
    private usergroup_id: string;
    public token: string;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.usergroup_id = currentUser && currentUser.user_group_id;
        this.token = currentUser && currentUser.token;
    }

    public getMenuItems(): Array<Object> {
        return menuItems;
    }

    getUserMenus(): Observable<Menu[]> {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        console.log("Token" + this.token);
        return this.http.get(`${this.baseUrl}/usergroup/${this.usergroup_id}/menus`, options)
            .map((response: Response) => response.json());
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.token)
        return headers;
    }

    private setHeaders(): RequestOptions {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.authenticationService.token
        });
        let options = new RequestOptions({ headers: headers });
        return options
    }

}

function mapMenus(response: Response): Menu[] {
    // The response of the API has a results
    // property with the actual results
    return response.json().results.map(toMenu)
}

function toMenu(r: any): Menu {
    let menu = <Menu>({
        title: r.title,
        icon: r.icon,
        selected: r.selected,
        expanded: r.expanded,
        order: r.order
    });
    console.log('Parsed person:', menu);
    return menu;
}
