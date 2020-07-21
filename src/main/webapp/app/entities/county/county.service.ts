import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ICounty } from 'app/shared/model/county.model';

type EntityResponseType = HttpResponse<ICounty>;
type EntityArrayResponseType = HttpResponse<ICounty[]>;

@Injectable({ providedIn: 'root' })
export class CountyService {
  public resourceUrl = SERVER_API_URL + 'api/counties';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/counties';

  constructor(protected http: HttpClient) {}

  create(county: ICounty): Observable<EntityResponseType> {
    return this.http.post<ICounty>(this.resourceUrl, county, { observe: 'response' });
  }

  update(county: ICounty): Observable<EntityResponseType> {
    return this.http.put<ICounty>(this.resourceUrl, county, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICounty>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounty[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICounty[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
