import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { 
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatTreeModule
       } from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';

import { AdminCoreModule } from '../core/admin-core.module';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
    imports: [
        InfiniteScrollModule,
        CdkTreeModule,
        MatTreeModule,
        CdkTableModule,
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        AdminCoreModule,
        RouterModule
         ],
    declarations: [   
    AddUserComponent, ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [
    ],
    providers: [
    ]
})
export class PagesModule {
}
