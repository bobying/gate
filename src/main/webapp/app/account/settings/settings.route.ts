import { Route } from '@angular/router';

import { UserRouteAccessService, AuthoritiesConstants } from '../../shared';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: [AuthoritiesConstants.USER],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
