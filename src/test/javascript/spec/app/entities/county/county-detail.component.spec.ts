import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { CountyDetailComponent } from 'app/entities/county/county-detail.component';
import { County } from 'app/shared/model/county.model';

describe('Component Tests', () => {
  describe('County Management Detail Component', () => {
    let comp: CountyDetailComponent;
    let fixture: ComponentFixture<CountyDetailComponent>;
    const route = ({ data: of({ county: new County(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [CountyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CountyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load county on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.county).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
