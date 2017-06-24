//import { Title } from 'ng2-iq-select2/node_modules/@angular/platform-browser';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

import {AuthenticationService} from './index';
import {User, Person} from '../_models/index';
import { Country, Language, Parish, RegionState, DefaultParameters, IDType, Titles, AgeGroup, Group, 
        Department, Training, Currency, EventDetail, EventCategory, GroupDepartmentMember, GroupDepartmentRole } from '../_models/utility';

@Injectable()
export class SettingsService {
    private baseUrl : string = '/api/maintenance';
    private logicUrl : string = '/api/logic';
    public token : string;
    public person_id : number;
    public parish_id : number;
    public country_id : number;

    constructor(private http : Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.person_id = currentUser && currentUser.person_id;
        this.parish_id = currentUser && currentUser.parish_id;
    }

    private getHeaders() {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return options
    }

    getParishDetail() : Observable < Parish > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/parish/${this.parish_id}`, options)
            .map((response : Response) => response.json())
    }
    getParishes() : Observable < Parish[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/parish`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveParish(parish : Parish) : Observable < Parish > {
        return this
            .http
            .post(`${this.baseUrl}/parish`, JSON.stringify(parish), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateParish(parish : Parish) : Observable < Parish > {
        return this
            .http
            .patch(`${this.baseUrl}/parish`, JSON.stringify(parish), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    //Country methods
    saveCountry(ctry : Country) : Observable < Country > {
        return this
            .http
            .post(`${this.baseUrl}/country`, JSON.stringify(ctry), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateCountry(ctry : Country) : Observable < Country > {
        return this
            .http
            .patch(`${this.baseUrl}/country`, JSON.stringify(ctry), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCountries() : Observable < Country[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/country`, options)
            .map((response : Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCountryByID(id : number) : Observable < Country > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/country/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    getLanguageByID(id : number) : Observable < Language > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/language/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDefaults(): Observable <DefaultParameters[]> {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.logicUrl}/parameters/defaults`, options)
            .map((response : Response) => response.json())
    }

    //RegionState methods
    saveRegionState(reg : RegionState) : Observable < RegionState > {
        return this
            .http
            .post(`${this.baseUrl}/regionstate`, JSON.stringify(reg), this.getHeaders())
            .map((response : Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateRegionState(reg : RegionState) : Observable < RegionState > {
        return this
            .http
            .patch(`${this.baseUrl}/regionstate`, JSON.stringify(reg), this.getHeaders())
            .map((response : Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRegionStates() : Observable < RegionState[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/regionstate`, options)
            .map((response : Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRegionStateByCountryID(ctryid : number) : Observable < RegionState[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/regionstates/${ctryid}`, options)
            .map((response : Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRegionStateByID(id : number) : Observable < RegionState > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/regionstate/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    //Languages
    getLanguages() : Observable < Language[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/language`, options)
            .map((response : Response) => response.json())
            //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }


    //Parameters methods
    saveDefaultParameters(def_param : DefaultParameters) : Observable < DefaultParameters > {
        return this
            .http
            .post(`${this.logicUrl}/parameter`, JSON.stringify(def_param), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }





    //IDTypes methods
    saveIDType(idtype : IDType) : Observable < IDType > {
        return this
            .http
            .post(`${this.baseUrl}/idtype`, JSON.stringify(idtype), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateIDType(idtype : IDType) : Observable < IDType > {
        return this
            .http
            .patch(`${this.baseUrl}/idtype`, JSON.stringify(idtype), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }


    getIDTypes() : Observable < IDType[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/idtype`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    //Titles Methods
    getAllTitleByLanguage(lang_id : number) : Observable < Titles[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/title/${lang_id}`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveTitle(title : Titles) : Observable < Titles > {
        console.log(JSON.stringify(title));
        return this
            .http
            .post(`${this.baseUrl}/title`, JSON.stringify(title), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateTitle(title : Titles) : Observable < Titles > {
        return this
            .http
            .patch(`${this.baseUrl}/title`, JSON.stringify(title), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    //AgeGroups methods
    saveAgeGroup(agegrp : AgeGroup) : Observable < AgeGroup > {
        console.log(JSON.stringify(agegrp));
        return this
            .http
            .post(`${this.baseUrl}/agegroup`, JSON.stringify(agegrp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateAgeGroup(agegrp : AgeGroup) : Observable < AgeGroup > {
        return this
            .http
            .patch(`${this.baseUrl}/agegroup`, JSON.stringify(agegrp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAgeGroups() : Observable < AgeGroup[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/agegroup`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }


    //Groups methods
    saveGroup(grp : Group) : Observable < Group > {
        console.log(JSON.stringify(grp));
        return this
            .http
            .post(`${this.baseUrl}/group`, JSON.stringify(grp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateGroup(grp : Group) : Observable < Group > {
        return this
            .http
            .patch(`${this.baseUrl}/group`, JSON.stringify(grp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteGroup(grp : Group) : Observable < Group > {
        return this
            .http
            .delete(`${this.baseUrl}/group`, this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getGroups() : Observable < Group[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/group`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    //Departments methods
    saveDepartment(dept : Department) : Observable < Department > {
        console.log(JSON.stringify(dept));
        return this
            .http
            .post(`${this.baseUrl}/department`, JSON.stringify(dept), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateDepartment(dept : Department) : Observable < Department > {
        return this
            .http
            .patch(`${this.baseUrl}/department`, JSON.stringify(dept), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDepartment() : Observable < Department[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/department`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    //GroupsDepartmentMember methods
    saveGrpDptMember(grp : GroupDepartmentMember) : Observable < GroupDepartmentMember > {
        console.log(JSON.stringify(grp));
        return this
            .http
            .post(`${this.baseUrl}/group/member`, JSON.stringify(grp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateGrpDptMember(grp : GroupDepartmentMember) : Observable < GroupDepartmentMember > {
        return this
            .http
            .patch(`${this.baseUrl}/group/member`, JSON.stringify(grp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteGrpDptMember(grp : GroupDepartmentMember) : Observable < GroupDepartmentMember > {
        return this
            .http
            .delete(`${this.baseUrl}/group/member`, this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getGrpDptMembers() : Observable < GroupDepartmentMember[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/groups/members`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getGrpDptMemberByID(id : number) : Observable < GroupDepartmentMember > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        console.log(id);
        return this
            .http
            .get(`${this.baseUrl}/groups/member/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }


    //GroupsDepartmentRoles methods
    saveGrpDptRole(grp : GroupDepartmentRole) : Observable < GroupDepartmentRole > {
        console.log(JSON.stringify(grp));
        return this
            .http
            .post(`${this.baseUrl}/group/role`, JSON.stringify(grp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateGrpDptRole(grp : GroupDepartmentRole) : Observable < GroupDepartmentRole > {
        return this
            .http
            .patch(`${this.baseUrl}/group/role`, JSON.stringify(grp), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteGrpDptRole(grp : GroupDepartmentRole) : Observable < GroupDepartmentRole > {
        return this
            .http
            .delete(`${this.baseUrl}/group/role`, this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getGrpDptRoles() : Observable < GroupDepartmentRole[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/groups/role`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getGrpDptRolesByID(id : number) : Observable < GroupDepartmentMember > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        console.log(id);
        return this
            .http
            .get(`${this.baseUrl}/groups/role/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }


    //Training methods
    saveTraining(trg : Training) : Observable < Training > {
        console.log(JSON.stringify(trg));
        return this
            .http
            .post(`${this.baseUrl}/training`, JSON.stringify(trg), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateTraining(trg : Training) : Observable < Training > {
        return this
            .http
            .patch(`${this.baseUrl}/training`, JSON.stringify(trg), this.getHeaders())
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTrainings() : Observable < Training[] > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        return this
            .http
            .get(`${this.baseUrl}/training`, options)
            .map((response : Response) => response.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }


    //Currency methods
    saveCurrency(curr: Currency): Observable<Currency> {
        console.log(JSON.stringify(curr));
        return this
            .http
            .post(`${this.baseUrl}/currency`, JSON.stringify(curr), this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateCurrency(curr: Currency): Observable<Currency> {
        return this
            .http
            .patch(`${this.baseUrl}/currency`, JSON.stringify(curr), this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteCurrency(curr: Currency): Observable<Currency> {
        return this
            .http
            .delete(`${this.baseUrl}/currency`, this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllCurrencies(): Observable<Currency[]> {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this
            .http
            .get(`${this.baseUrl}/currency`, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCurrencyByID(id : number) : Observable < Currency > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        console.log(id);
        return this
            .http
            .get(`${this.baseUrl}/currency/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    


    //EventDetails methods
    saveEventDetail(event: EventDetail): Observable<EventDetail> {
        console.log(JSON.stringify(event));
        return this
            .http
            .post(`${this.baseUrl}/event`, JSON.stringify(event), this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateEventDetail(curr: EventDetail): Observable<EventDetail> {
        return this
            .http
            .patch(`${this.baseUrl}/event`, JSON.stringify(curr), this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteEventDetail(grp: EventDetail): Observable<EventDetail> {
        return this
            .http
            .delete(`${this.baseUrl}/currency`, this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllEventDetails(): Observable<EventDetail[]> {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this
            .http
            .get(`${this.baseUrl}/events`, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    //EventCategory methods
    saveEventCategory(curr: EventCategory): Observable<EventCategory> {
        console.log(JSON.stringify(curr));
        return this
            .http
            .post(`${this.baseUrl}/event/category`, JSON.stringify(curr), this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateEventCategory(curr: EventCategory): Observable<EventCategory> {
        return this
            .http
            .patch(`${this.baseUrl}/event/category`, JSON.stringify(curr), this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteEventCategory(curr: EventCategory): Observable<EventCategory> {
        return this
            .http
            .delete(`${this.baseUrl}/event/category`, this.getHeaders())
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllEventCategory(): Observable<EventCategory[]> {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this
            .http
            .get(`${this.baseUrl}/events/categories`, options)
            .map((response: Response) => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getEventCategoryByID(id : number) : Observable < EventCategory > {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.token,
            'Accept': 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        console.log(id);
        return this
            .http
            .get(`${this.baseUrl}/events/category/${id}`, options)
            .map((response : Response) => response.json())
            .catch((error : any) => Observable.throw(error.json().error || 'Server error'));
    }

    


}