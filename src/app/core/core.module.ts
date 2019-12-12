import { ErrorHandlerService } from './error-handler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    ErrorHandlerService,
    Title,
    AuthService
  ]
})
export class CoreModule { }
