import { NgModule } from '@angular/core';
import { AdminLoginComponent } from './admin-login.component';
import { 
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule
       } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';


@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        ChartsModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
    
    ],
    declarations: [   
        AdminLoginComponent,
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AdminLoginModule {
}
