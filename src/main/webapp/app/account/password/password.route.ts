import { Route } from '@angular/router';

import { UserRouteAccessService, AuthoritiesConstants } from '../../shared';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: [AuthoritiesConstants.USER],
        pageTitle: 'global.menu.account.password'
    },
    canActivate: [UserRouteAccessService]
};
