import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbContextMenuModule,
  NbLayoutModule,
  NbThemeService,
} from '@nebular/theme';
import { SearchUsersComponent } from './search-users.component';

@NgModule({
  declarations: [SearchUsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbLayoutModule,
    NbCardModule,
    NbContextMenuModule,
  ],
  providers: [NbThemeService],
  exports: [SearchUsersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchUsersModule {}
