import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchUsersService } from './search-users.service';

fdescribe('SearchUsersService', () => {
  let service: SearchUsersService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchUsersService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Verify request from http', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.findUser('will');
    expect(spy).toHaveBeenCalled();
  });
});
