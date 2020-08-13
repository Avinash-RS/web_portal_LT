import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';


import { AuthGuard } from '@core/services/_helpers/auth.guard';

export const appRoutes: Routes = [{
    path: 'auth', component: AuthComponent, children: [
      
        // { path: 'material-widgets', loadChildren: '../material-widgets/material-widgets.module#MaterialWidgetsModule' },
        {
            path: 'tables', loadChildren: '../tables/tables.module#TablesModule', data: { title: 'Admin Dashboard' },
            canActivate: [AuthGuard]
        },
      
      
        // tslint:disable-next-line:max-line-length
       
        {
            path: 'Wca',
            loadChildren: '../../wca/wca.module#WcaModule',
            data: { title: 'Web Content Authoring' }
        },
        {
            path: 'batch',
            loadChildren: '../../batch-management/batch-management.module#BatchManagementModule',
            data: { title: 'Batch Management' }
        },

        // { path: 'maps', loadChildren: '../maps/maps.module#MapsModule' },
        {
            path: 'charts', loadChildren: '../charts/charts.module#ChartsModule', data: { title: 'Admin Dashboard' },
            canActivate: [AuthGuard]
        },
        // { path: 'chats', loadChildren: '../chats/chat.module#ChatsModule' }, // fix this
        // { path: 'mail', loadChildren: '../mail/mail.module#MailModule' }, // fix this
        // { path: 'pages', loadChildren: '../pages/pages.module#PagesModule' },
        // { path: 'forms', loadChildren: '../forms/forms.module#FormModule' }, //fix this
        // { path: 'guarded-routes', loadChildren: '../guarded-routes/guarded-routes.module#GuardedRoutesModule' },
        // { path: 'editor', loadChildren: '../editor/editor.module#EditorModule' },
        // { path: 'scrumboard', loadChildren: '../scrumboard/scrumboard.module#ScrumboardModule' },
    ]
}];
