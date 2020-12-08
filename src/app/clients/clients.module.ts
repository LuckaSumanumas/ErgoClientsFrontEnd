import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  declarations: [ClientListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientListComponent
  ]
})
export class ClientsModule { }
