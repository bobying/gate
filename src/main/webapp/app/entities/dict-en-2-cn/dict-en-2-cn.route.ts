import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService, AuthoritiesConstants, Principal } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DictEn2CnComponent } from './dict-en-2-cn.component';
import { DictEn2CnDetailComponent } from './dict-en-2-cn-detail.component';
import { DictEn2CnPopupComponent } from './dict-en-2-cn-dialog.component';
import { DictEn2CnDeletePopupComponent } from './dict-en-2-cn-delete-dialog.component';

@Injectable()
export class DictEn2CnResolvePagingParams implements Resolve<any> {

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

export const dictEn2CnRoute: Routes = [
    {
        path: 'dict-en-2-cn',
        component: DictEn2CnComponent,
        resolve: {
            'pagingParams': DictEn2CnResolvePagingParams
        },
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictEn2Cn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dict-en-2-cn/:id',
        component: DictEn2CnDetailComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictEn2Cn.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictEn2CnPopupRoute: Routes = [
    {
        path: 'dict-en-2-cn-new',
        component: DictEn2CnPopupComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictEn2Cn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dict-en-2-cn/:id/edit',
        component: DictEn2CnPopupComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictEn2Cn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dict-en-2-cn/:id/delete',
        component: DictEn2CnDeletePopupComponent,
        data: {
            authorities: [AuthoritiesConstants.USER],
            pageTitle: 'gateApp.dictEn2Cn.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
