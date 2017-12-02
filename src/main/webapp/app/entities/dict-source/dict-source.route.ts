import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService, AuthoritiesConstants, Principal } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DictSourceComponent } from './dict-source.component';
import { DictSourceDetailComponent } from './dict-source-detail.component';
import { DictSourcePopupComponent } from './dict-source-dialog.component';
import { DictSourceDeletePopupComponent } from './dict-source-delete-dialog.component';

@Injectable()
export class DictSourceResolvePagingParams implements Resolve<any> {

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

export const dictSourceRoute: Routes = [
    {
        path: 'dict-source',
        component: DictSourceComponent,
        resolve: {
            'pagingParams': DictSourceResolvePagingParams
        },
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dict-source/:id',
        component: DictSourceDetailComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictSource.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictSourcePopupRoute: Routes = [
    {
        path: 'dict-source-new',
        component: DictSourcePopupComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dict-source/:id/edit',
        component: DictSourcePopupComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dict-source/:id/delete',
        component: DictSourceDeletePopupComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictSource.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
