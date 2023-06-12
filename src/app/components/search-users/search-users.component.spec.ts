import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbContextMenuModule,
  NbLayoutModule,
  NbThemeService,
} from '@nebular/theme';
import { SearchUsersComponent } from './search-users.component';

const NB_THEME_OPTIONS = new InjectionToken('Nebular Theme Options');

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        NbLayoutModule,
        NbCardModule,
        NbContextMenuModule,
      ],
      declarations: [SearchUsersComponent],
      providers: [NbThemeService],
    });
    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
