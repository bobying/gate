import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjComponent } from './proj.component';
import { ProjDetailComponent } from './proj-detail.component';
import { ProjPopupComponent } from './proj-dialog.component';
import { ProjDeletePopupComponent } from './proj-delete-dialog.component';

@Injectable()
export class ProjResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const projRoute: Routes = [
    {
        path: 'proj',
        component: ProjComponent,
        resolve: {
            'pagingParams': ProjResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.proj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proj/:id',
        component: ProjDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.proj.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projPopupRoute: Routes = [
    {
        path: 'proj-new',
        component: ProjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.proj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proj/:id/edit',
        component: ProjPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.proj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proj/:id/delete',
        component: ProjDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.proj.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
