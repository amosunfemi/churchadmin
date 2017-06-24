export class Menu {
    id:number;
    title: string;
    routerLink: string;
    icon: string;
    selected: boolean;
    expanded: boolean;
    order: number;
    parent_id: number;
    is_parent: number;
    subMenu?: Array<Object>;
}