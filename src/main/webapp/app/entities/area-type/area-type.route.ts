import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { Area_typeComponent } from './area-type.component';
import { Area_typeDetailComponent } from './area-type-detail.component';
import { Area_typePopupComponent } from './area-type-dialog.component';
import { Area_typeDeletePopupComponent } from './area-type-delete-dialog.component';

export const area_typeRoute: Routes = [
    {
        path: 'area-type',
        component: Area_typeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.area_type.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'area-type/:id',
        component: Area_typeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.area_type.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const area_typePopupRoute: Routes = [
    {
        path: 'area-type-new',
        component: Area_typePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.area_type.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-type/:id/edit',
        component: Area_typePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.area_type.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area-type/:id/delete',
        component: Area_typeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gateApp.area_type.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
