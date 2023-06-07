import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserInfo } from './../../interfaces/user-info';
import { SearchUsersService } from './../../services/search-users.service';
import { SearchUsersComponent } from './search-users.component';

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;
  let searchUsersServiceSpy: jasmine.SpyObj<SearchUsersService>;

  beforeEach(() => {
    // Cria um objeto spy para o serviço SearchUsersService
    searchUsersServiceSpy = jasmine.createSpyObj('SearchUsersService', [
      'findUser',
    ]);

    TestBed.configureTestingModule({
      declarations: [SearchUsersComponent],
      providers: [
        { provide: SearchUsersService, useValue: searchUsersServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findUser service method when onSearch is called', () => {
    // Simula um nome de usuário para pesquisar
    const username = 'testuser';

    // Aciona o método onSearch
    component.name = username;
    component.onSearch();

    // Verifica se o método findUser do serviço foi chamado com o nome de usuário correto
    expect(searchUsersServiceSpy.findUser).toHaveBeenCalledWith(username);
  });

  it('should set user and status on successful user retrieval', () => {
    // Cria um objeto UserInfo simulado
    const user: UserInfo = {
      avatar_url: 'https://example.com/avatar.jpg',
      html_url: 'https://example.com/user',
      followers: undefined,
      following: undefined,
      public_repos: undefined,
    };

    // Configura o serviço para retornar o usuário simulado
    searchUsersServiceSpy.findUser.and.returnValue(of(user));

    // Aciona o método onSearch
    component.name = 'testuser';
    component.onSearch();

    // Verifica se o usuário e o status foram definidos corretamente
    expect(component.user).toEqual(user);
    expect(component.status).toBe(200);
  });

  it('should set status on error during user retrieval', () => {
    // Simula um erro no serviço
    const errorMessage = 'User not found';
    const errorStatus = 404;
    searchUsersServiceSpy.findUser.and.returnValue(
      throwError({ status: errorStatus, message: errorMessage })
    );

    // Aciona o método onSearch
    component.name = 'testuser';
    component.onSearch();

    // Verifica se o status foi definido corretamente
    expect(component.status).toBe(errorStatus);
  });
});
