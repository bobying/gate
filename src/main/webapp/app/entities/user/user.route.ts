import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserPopupComponent } from './user-dialog.component';
import { UserDeletePopupComponent } from './user-delete-dialog.component';

@Injectable()
export class UserResolvePagingParams implements Resolve<any> {

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

export const userRoute: Routes = [
    {
        path: 'user',
        component: UserComponent,
        resolve: {
            'pagingParams': UserResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.user.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user/:id',
        component: UserDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.user.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userPopupRoute: Routes = [
    {
        path: 'user-new',
        component: UserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.user.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user/:id/edit',
        component: UserPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.user.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user/:id/delete',
        component: UserDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.user.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
