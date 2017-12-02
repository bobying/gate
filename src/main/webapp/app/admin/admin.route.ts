import { Routes } from '@angular/router';
import { AuthoritiesConstants } from '../shared';

import {
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    metricsRoute,
    gatewayRoute,
    userMgmtRoute,
    userDialogRoute
} from './';

import { UserRouteAccessService } from '../shared';

const ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    gatewayRoute,
    ...userMgmtRoute,
    metricsRoute
];

export const adminState: Routes = [{
    path: '',
    data: {
        authorities: [AuthoritiesConstants.ADMIN]
    },
    canActivate: [UserRouteAccessService],
    children: ADMIN_ROUTES
},
    ...userDialogRoute
];
