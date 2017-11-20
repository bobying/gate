import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjFile2DictComponent } from './proj-file-2-dict.component';
import { ProjFile2DictDetailComponent } from './proj-file-2-dict-detail.component';
import { ProjFile2DictPopupComponent } from './proj-file-2-dict-dialog.component';
import { ProjFile2DictDeletePopupComponent } from './proj-file-2-dict-delete-dialog.component';

@Injectable()
export class ProjFile2DictResolvePagingParams implements Resolve<any> {

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

export const projFile2DictRoute: Routes = [
    {
        path: 'proj-file-2-dict',
        component: ProjFile2DictComponent,
        resolve: {
            'pagingParams': ProjFile2DictResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFile2Dict.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proj-file-2-dict/:id',
        component: ProjFile2DictDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFile2Dict.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projFile2DictPopupRoute: Routes = [
    {
        path: 'proj-file-2-dict-new',
        component: ProjFile2DictPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFile2Dict.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proj-file-2-dict/:id/edit',
        component: ProjFile2DictPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFile2Dict.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proj-file-2-dict/:id/delete',
        component: ProjFile2DictDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFile2Dict.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
