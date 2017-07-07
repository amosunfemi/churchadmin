import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorComponent } from './visitor/visitor.component';
import { MemberComponent } from './member/member.component';
import { FamilyComponent } from './family/family.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'People'
        },
        children: [
            {
                path: 'member',
                component: MemberComponent,
                data: {
                    title: 'Member'
                }
            },
            {
                path: 'visitor',
                component: VisitorComponent,
                data: {
                    title: 'Visitors'
                }
            },
            {
                path: 'family',
                component: FamilyComponent,
                data: {
                    title: 'Family '
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeopleRoutingModule { }
