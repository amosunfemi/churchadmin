export class UDFValue {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    fld_name : string;
    fld_value : string;
    entity_name : string;
    entity_id : string;
}

export class Parish {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    full_name : string;
    description : string;
    main_parish : number;
    pastor_person_id : number;
    language_id : number;
    parent_id : number;
    user_defined_fields?: Array < UDFValue >
}

export class Country {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    name: string;
    iso_code: string;
    languages?: Array<Language>;
    currency: string;

}

export class Language {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    name: string;
    iso_code: string;
}

export class RegionState {
    id? : number;
    status : string;
    created_at? : Date;
    updated_at? : Date;
    name: string;
    iso_code?: string;
    description:string;
    main_city_town: string;
    country_id?: number;
    languages?: Array<Language>;
    user_defined_fields?: Array < UDFValue >
}

export class Titles {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    name: string;
    code: string;
    language_id:number;
}
export class DefaultParameters {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    parameter: string;
    entity: string;
    entity_id: number
}

export class IDType {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    code: string;
    country_id: number;
    issued_by: string;
}

export class AgeGroup {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    code: string;
    description: string;
    min_age: number;
    max_age: number;
}

export class Group {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    parish_id: number;
    name: string;
    description: string
    date_created?: Date;
}


export class Department {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    parish_id: number;
    name: string;
    description: string
    date_created?: Date;
}


export class Training {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    parish_id: number;
    name: string;
    description: string;
    repeated: boolean;
    duration: number;
    duration_unit: string;
    period: string;
    note: string;
}

export class Events {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    parish_id: number;
    name: string;
    description: string;
    repeated: boolean;
    periodicity: string;
    periodicities?: Array<EventPeriodicity>;
}

export class EventPeriodicity {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    event_type_id : number;
    week_day : string;
    month_date : number;
    start_time : Date;
    end_time : Date;
    cron_cmd : string;
}

export class EventAudience {
    id : number;
    status : string;
    created_at : Date;
    updated_at : Date;
    event_type_id : number;
    group_id : number;
    department_id : number;
    training_id : number;
    all_audience_members : boolean;
    all_church_members : boolean;
}