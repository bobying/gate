import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ProjFilesComponent } from './proj-files.component';
import { ProjFilesDetailComponent } from './proj-files-detail.component';
import { ProjFilesPopupComponent } from './proj-files-dialog.component';
import { ProjFilesDeletePopupComponent } from './proj-files-delete-dialog.component';

@Injectable()
export class ProjFilesResolvePagingParams implements Resolve<any> {

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

export const projFilesRoute: Routes = [
    {
        path: 'proj-files',
        component: ProjFilesComponent,
        resolve: {
            'pagingParams': ProjFilesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFiles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'proj-files/:id',
        component: ProjFilesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFiles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projFilesPopupRoute: Routes = [
    {
        path: 'proj-files-new',
        component: ProjFilesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFiles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proj-files/:id/edit',
        component: ProjFilesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFiles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'proj-files/:id/delete',
        component: ProjFilesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.projFiles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
