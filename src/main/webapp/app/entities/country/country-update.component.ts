import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICountry, Country } from 'app/shared/model/country.model';
import { CountryService } from './country.service';
import { ICounty } from 'app/shared/model/county.model';
import { CountyService } from 'app/entities/county/county.service';

@Component({
  selector: 'jhi-country-update',
  templateUrl: './country-update.component.html',
})
export class CountryUpdateComponent implements OnInit {
  isSaving = false;
  countries: ICounty[] = [];

  editForm = this.fb.group({
    id: [],
    countryName: [],
    country: [],
  });

  constructor(
    protected countryService: CountryService,
    protected countyService: CountyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.updateForm(country);

      this.countyService
        .query({ filter: 'country-is-null' })
        .pipe(
          map((res: HttpResponse<ICounty[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICounty[]) => {
          if (!country.country || !country.country.id) {
            this.countries = resBody;
          } else {
            this.countyService
              .find(country.country.id)
              .pipe(
                map((subRes: HttpResponse<ICounty>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICounty[]) => (this.countries = concatRes));
          }
        });
    });
  }

  updateForm(country: ICountry): void {
    this.editForm.patchValue({
      id: country.id,
      countryName: country.countryName,
      country: country.country,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.createFromForm();
    if (country.id !== undefined) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  private createFromForm(): ICountry {
    return {
      ...new Country(),
      id: this.editForm.get(['id'])!.value,
      countryName: this.editForm.get(['countryName'])!.value,
      country: this.editForm.get(['country'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICounty): any {
    return item.id;
  }
}
