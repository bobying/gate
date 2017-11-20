import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DictSourceTypeComponent } from './dict-source-type.component';
import { DictSourceTypeDetailComponent } from './dict-source-type-detail.component';
import { DictSourceTypePopupComponent } from './dict-source-type-dialog.component';
import { DictSourceTypeDeletePopupComponent } from './dict-source-type-delete-dialog.component';

export const dictSourceTypeRoute: Routes = [
    {
        path: 'dict-source-type',
        component: DictSourceTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.dictSourceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dict-source-type/:id',
        component: DictSourceTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.dictSourceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictSourceTypePopupRoute: Routes = [
    {
        path: 'dict-source-type-new',
        component: DictSourceTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.dictSourceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dict-source-type/:id/edit',
        component: DictSourceTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.dictSourceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dict-source-type/:id/delete',
        component: DictSourceTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.dictSourceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
