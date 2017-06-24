import {Component, OnInit, ViewEncapsulation, ElementRef, HostListener} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {MenuService} from '../../../_services/index';
import {AppState} from "../../../app.state";
import {Menu} from '../../../_models/index';

import * as _ from "lodash";

@Component({selector: 'az-menu', encapsulation: ViewEncapsulation.None, templateUrl: './menu.component.html', styleUrls: ['./menu.component.scss'], providers: [MenuService]})

export class MenuComponent implements OnInit {
    public menuItems : Array < any >;
    public menus : Array < Menu >;
    public menuHeight : number;
    public isMenuCollapsed : boolean = false;
    public isMenuShouldCollapsed : boolean = false;
    public showHoverElem : boolean;
    public hoverElemHeight : number;
    public hoverElemTop : number;

    constructor(private _elementRef : ElementRef, private _router : Router, private _activatedRoute : ActivatedRoute, private _menuService : MenuService, private _state : AppState) {
        this.menuItems = _menuService.getMenuItems();
        _menuService
            .getUserMenus()
            .subscribe(m => {
                let topmenus = _.filter(m, { is_parent: 1 });
                _.forEach(topmenus, function(value, key){
                    let submenu = _.filter(m, {parent_id: value.id});
                    submenu = _.orderBy(submenu, ['display_order'], ['asc']);
                    if (submenu.length > 0){
                        value.subMenu = submenu;
                    }
                    _.remove(m, {is_parent: 0, parent_id: value.id})
                })
                this.menus = m;
            });
        this
            ._state
            .subscribe('menu.isCollapsed', (isCollapsed) => {
                this.isMenuCollapsed = isCollapsed;
            });

        this
            ._router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    let width = (window.innerWidth > 0)
                        ? window.innerWidth
                        : screen.width;
                    if (width <= 768) {
                        this
                            ._state
                            .notifyDataChanged('menu.isCollapsed', true);
                    }
                    window.scrollTo(0, 0);
                }
            });

    }

    public ngOnInit() : void {
        if(this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
        this.updateSidebarHeight();
    }

    @HostListener('window:resize')
    public onWindowResize() : void {
        var isMenuShouldCollapsed = this._shouldMenuCollapse();

        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
    }

    private _shouldMenuCollapse() : boolean {
        return window.innerWidth <= 768;
    }

    public menuCollapse() : void {
        this.menuCollapseStateChange(true);
    }

    public menuCollapseStateChange(isCollapsed : boolean) : void {
        this.isMenuCollapsed = isCollapsed;
        this
            ._state
            .notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    }

    public menuExpand() : void {
        this.menuCollapseStateChange(false);
    }

    public updateSidebarHeight() : void {
        this.menuHeight = this._elementRef.nativeElement.children[0].clientHeight - 84;
    }

    public hoverItem($event) : void {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        this.hoverElemTop = $event
            .currentTarget
            .getBoundingClientRect()
            .top - 60;
    }

    public collapseMenu($event, item) : boolean {
        if(this.isMenuCollapsed) {
            this.isMenuCollapsed = false;
            this
                ._state
                .notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        }

        var link = jQuery($event.currentTarget);
        if (link.parent().hasClass('sidebar-item-expanded')) {
            link
                .parent()
                .removeClass('sidebar-item-expanded');
            link
                .next()
                .slideUp(250);
        } else {
            link
                .parent()
                .parent()
                .find('li')
                .removeClass('sidebar-item-expanded');
            link
                .parent()
                .parent()
                .find('li .sidebar-sublist')
                .slideUp(250);
            link
                .parent()
                .toggleClass('sidebar-item-expanded');
            link
                .next()
                .slideToggle(250);
        }
        return false;
    }

}
