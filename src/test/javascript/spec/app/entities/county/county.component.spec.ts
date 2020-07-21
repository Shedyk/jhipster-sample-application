import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountyComponent } from 'app/entities/county/county.component';
import { CountyService } from 'app/entities/county/county.service';
import { County } from 'app/shared/model/county.model';

describe('Component Tests', () => {
  describe('County Management Component', () => {
    let comp: CountyComponent;
    let fixture: ComponentFixture<CountyComponent>;
    let service: CountyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CountyComponent],
      })
        .overrideTemplate(CountyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CountyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CountyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new County(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.counties && comp.counties[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
