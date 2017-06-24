import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from '../_guards/index';


export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' }, canActivate: [AuthGuard] },
            { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } , canActivate: [AuthGuard]},
            { path: 'charts', loadChildren: 'app/pages/charting/charting.module#ChartingModule', data: { breadcrumb: 'Charts' }, canActivate: [AuthGuard] },
            { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' }, canActivate: [AuthGuard] },
            { path: 'mail', loadChildren: 'app/pages/mail/mail.module#MailModule', data: { breadcrumb: 'Mail' }, canActivate: [AuthGuard] },
            { path: 'calendar', loadChildren: 'app/pages/calendar/calendar.module#CalendarModule', data: { breadcrumb: 'Calendar' }, canActivate: [AuthGuard] },
            { path: 'form-elements', loadChildren: 'app/pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' }, canActivate: [AuthGuard] },
            { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' }, canActivate: [AuthGuard] },
            { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule', data: { breadcrumb: 'Editors' } , canActivate: [AuthGuard]},
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' }, canActivate: [AuthGuard] },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' }, canActivate: [AuthGuard] },
            { path: 'settings', loadChildren: 'app/pages/settings/settings.module#SettingsModule', data: { breadcrumb: 'Settings' }, canActivate: [AuthGuard] }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);