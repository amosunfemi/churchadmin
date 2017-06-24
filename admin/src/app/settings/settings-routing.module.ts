import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general.component';
import { EventComponent } from './event.component';
import { GroupComponent } from './group.component';
import { DepartmentComponent } from './department.component';
import { TrainingComponent } from './training.component';
import { CommunicationComponent } from './communication.component';
import { UserComponent } from './user.component';
import { RolesComponent } from './roles.component';
import { ParishesComponent } from './parishes.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Settings'
        },
        children: [
            {
                path: 'general',
                component: GeneralComponent,
                data: {
                    title: 'General Maintenances'
                }
            },
            {
                path: 'event',
                component: EventComponent,
                data: {
                    title: 'Event'
                }
            },
            {
                path: 'group',
                component: GroupComponent,
                data: {
                    title: 'Group & Department '
                }
            },
            {
                path: 'department',
                component: DepartmentComponent,
                data: {
                    title: 'Department '
                }
            },
            {
                path: 'training',
                component: TrainingComponent,
                data: {
                    title: 'Training '
                }
            },
            {
                path: 'communication',
                component: CommunicationComponent,
                data: {
                    title: 'Communication '
                }
            },
            {
                path: 'user',
                component: UserComponent,
                data: {
                    title: 'User '
                }
            },
            {
                path: 'roles',
                component: RolesComponent,
                data: {
                    title: 'User '
                }
            },
            {
                path: 'parishes',
                component: ParishesComponent,
                data: {
                    title: 'Parishes '
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
