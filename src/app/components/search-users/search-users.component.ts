import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserInfo } from './../../interfaces/user-info';
import { SearchUsersService } from './../../services/search-users.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
})
export class SearchUsersComponent implements OnDestroy {
  name = '';
  user: UserInfo | null = null;
  findUser = new Subject<string>();
  status: number | null = 0;
  private subscription = new Subscription();

  constructor(private usersService: SearchUsersService) {
    this.subscription.add(
      this.findUser
        .pipe(debounceTime(700), distinctUntilChanged())
        .subscribe((value) => {
          if (value) {
            this.subscription.add(
              this.usersService.findUser(value).subscribe(
                (res) => {
                  this.status = 200;
                  this.user = res;
                  console.log(8787, this.user);
                },
                (error) => {
                  console.error('Ocorreu um erro na busca do usuário:');
                  this.status = error.status;
                }
              )
            );
          } else {
            this.user = null;
            this.status = 0;
          }
        })
    );
  }

  onSearch() {
    this.findUser.next(this.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
