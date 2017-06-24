import { UDFValue } from './index';




export class Person {
    id:number;
    status:string;
    created_at:Date;
    updated_at:Date;
    other_name:string;
    last_name:string;
    gender:string;
    date_of_birth:Date;
    parish_id:number;
    age_group:number;
    title:number;
    country_of_origin:number;
    country_of_residence:number;
    region_state:number;
    salvation_status:string;
    picture_file:string;
    marital_status:string;
    language_id:number;
    date_joined:Date;
    Addresses?: Array<Address>;
    Contact?: Array<Contact>;
    user_defined_fields?: Array<UDFValue>
}

export class Contact {
    id:number;
    status:string;
    created_at:Date;
    updated_at:Date;
    person_id:number;
    phone_no:string;
    phone_no2:string;
    phone_no3:string;
    email:string;
    other_mail:string;
    web_site:string;
    facebook_id:string;
    google_id:string;
    entity_id:number;
    entity:string;
    user_defined_fields?: Array<UDFValue>
}

export class Address {
    id:number;
    status:string;
    created_at:Date;
    updated_at:Date;
    person_id:number;
    address_type:string;
    house_no:string;
    street:string;
    area:string;
    city_town:string;
    land_mark:string;
    coordinate:string;
    region_state:number;
    country:number;
    entity_id:number;
    entity:string;
    user_defined_fields?:Array<UDFValue>
}

