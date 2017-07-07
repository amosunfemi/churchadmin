import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'People'
        },
        children: [
            {
                path: 'messages',
                component: MessagesComponent,
                data: {
                    title: 'Messages'
                }
            },
            {
                path: 'notifications',
                component: NotificationsComponent,
                data: {
                    title: 'Notification'
                }
            },
            {
                path: 'tasks',
                component: TaskComponent,
                data: {
                    title: 'Task '
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkflowRoutingModule { }
