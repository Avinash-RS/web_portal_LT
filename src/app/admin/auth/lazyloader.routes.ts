import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserManagementComponent } from '../pages/user-management/user-management.component';
import { AddUserComponent } from '@admin/pages/add-user/add-user.component';
import { AuthGuard } from '@core/services/_helpers/auth.guard';
import { GroupManagementComponent } from '@admin/pages/group-management/group-management.component';
import { AdminCoursesComponent } from '@admin/pages/admin-courses/admin-courses.component';
import { PublishCourseComponent } from '@admin/pages/publish-course/publish-course.component';
import { ReportManagementComponent } from '@admin/pages/report-management/report-management.component';
import { WcaModule } from '../../wca/wca.module';
import { WcaComponent } from '../../wca/pages/wca/wca.component';
import { CatalogueManagementComponent } from '@admin/pages/catalogue-management/catalogue-management.component';

export const appRoutes: Routes = [{
    path: 'auth', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardComponent, data: { title: 'Admin Dashboard' } },
        { path: 'userManagement', component: UserManagementComponent, data: { title: 'Learner Management' }, canActivate: [AuthGuard] },
        { path: 'addUser', component: AddUserComponent, data: { title: 'Add New Learner' }, canActivate: [AuthGuard] },
        { path: 'publishCourse', component: PublishCourseComponent, data: { title: 'Publish Course' } },
        { path: 'viewReport', component: ReportManagementComponent, data: { title: 'Report Management' }, canActivate: [AuthGuard] },
        // { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        { path: 'tables', loadChildren: '../tables/tables.module#TablesModule', data : {title:'Admin Dashboard'} , canActivate: [AuthGuard] },
        { path : 'usergroup' , component: GroupManagementComponent,data: { title: 'User Group creation' }},
        { path: 'listCourses', component: AdminCoursesComponent, data: { title: 'View Courses' }, },
        { path: 'catalogue', component: CatalogueManagementComponent, data: { title: 'View Courses' }, },
        {
            path:'Wca',
            loadChildren: '../../wca/wca.module#WcaModule',
            data : {title:'Web Content Authoring'}
          },
          
        // { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        { path: 'charts', loadChildren: '../charts/charts.module#ChartsModule', data : {title:'Admin Dashboard'} , canActivate: [AuthGuard]  },
        // { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
        //{ path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
        // { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        // { path: 'forms', loadChildren: '../forms/forms.module#FormModule' }, //fix this
        // { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        // { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' }, 
        // { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
    ]
}];
