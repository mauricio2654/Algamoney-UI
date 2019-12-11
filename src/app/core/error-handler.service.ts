import { Router } from '@angular/router';
import { NotAuthenticatedError } from './../seguranca/money-http-interceptor';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
    ) { }

  handle(errorResponse: any) {
    let msg: string;
    console.log('Ocorreu um erro', errorResponse);
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      console.log('Ocorreu um erro ao processar sua solicitação', errorResponse);
      msg = 'Ocorreu um erro ao processar sua solicitação';
      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação!';
      }
    } else {
      msg = 'Erro ao processar o serviço remoto. Tente Novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
  }
}
