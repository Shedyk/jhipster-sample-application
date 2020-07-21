import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICounty, County } from 'app/shared/model/county.model';
import { CountyService } from './county.service';
import { CountyComponent } from './county.component';
import { CountyDetailComponent } from './county-detail.component';
import { CountyUpdateComponent } from './county-update.component';

@Injectable({ providedIn: 'root' })
export class CountyResolve implements Resolve<ICounty> {
  constructor(private service: CountyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICounty> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((county: HttpResponse<County>) => {
          if (county.body) {
            return of(county.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new County());
  }
}

export const countyRoute: Routes = [
  {
    path: '',
    component: CountyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.county.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountyDetailComponent,
    resolve: {
      county: CountyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.county.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountyUpdateComponent,
    resolve: {
      county: CountyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.county.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountyUpdateComponent,
    resolve: {
      county: CountyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.county.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
