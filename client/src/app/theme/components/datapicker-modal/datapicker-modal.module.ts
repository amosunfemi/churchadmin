// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DatapickerModalComponent } from './datapicker-modal.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        NgxDatatableModule
    ],
    declarations: [
        DatapickerModalComponent,
    ],
    exports: [
        DatapickerModalComponent,
    ]
})
export class DatapickerModalModule {

}
