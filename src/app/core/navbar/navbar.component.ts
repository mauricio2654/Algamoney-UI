import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import 'moment/locale/pt-br';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;
  display: boolean = false;
  horaPonto: string = moment(moment().subtract(3, 'hour')).format('DD/MM/YYYY HH:mm:ss');
  isEntrada = true;
  registrado = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    moment.locale('pt-BR');
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  showDialog() {
    this.display = true;
  }

  registraPonto() {
    this.horaPonto = moment().format('DD/MM/YYYY HH:mm:ss');
    this.registrado = true;
    if (this.isEntrada) {
      this.isEntrada = false;
    } else {
      this.isEntrada = true;
    }
  }
}
