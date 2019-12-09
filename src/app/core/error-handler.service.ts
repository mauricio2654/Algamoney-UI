import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;
    console.log('Ocorreu um ero', errorResponse);
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (typeof errorResponse === 'object' && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = errorResponse.error[0].mensagemUsuario;
      console.log('Ocorreu um ero', errorResponse);
    } else {
      msg = 'Erro ao processar o serviço remoto. Tente Novamente.';
      console.log('Ocorreu um ero', errorResponse);
    }
    this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
  }
}
