import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserInfo } from './../../interfaces/user-info';
import { SearchUsersService } from './../../services/search-users.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
})
export class SearchUsersComponent {
  name: string = '';
  user!: UserInfo | null;
  findUser = new Subject<string>();
  status: number = 0;

  /**
   *
   */
  constructor(private usersService: SearchUsersService) {
    this.findUser
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.usersService
            .findUser(this.name)
            .pipe(debounceTime(700), distinctUntilChanged())
            .subscribe(
              (res) => {
                this.status = 200;
                this.user = res;
                console.log(8787, this.user);
              },
              (error) => {
                // Tratamento do erro aqui
                console.error('Ocorreu um erro na busca do usuário:');
                this.status = error.status;
              }
            );
        } else {
          this.user = null;
          this.status = 0;
        }
      });
  }

  onSearch() {
    this.findUser.next(this.name);
  }
}
