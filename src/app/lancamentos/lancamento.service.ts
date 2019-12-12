import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;

  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const lancamentos = response[`content`]
        const resultado = {
          lancamentos,
          total: response[`totalElements`]
        };
        return resultado;
      });
  }

  pesquisarRelatorio(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }
    return this.http.get(`${this.lancamentoUrl}?resumo`, { params })
      .toPromise()
      .then(response => {
        const lancamentos = response[`content`];
        const resultado = {
          lancamentos
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(this.lancamentoUrl + '/' + codigo)
      .toPromise()
      .then(() => null);
  }

  incluir(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentoUrl, lancamento)
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    this.converteStringParaData([lancamento]);
    return this.http.put<Lancamento>(this.lancamentoUrl + '/' + lancamento.codigo, lancamento)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(this.lancamentoUrl + '/' + codigo)
      .toPromise()
      .then(response => {
        const lancamento = response;

        this.converteStringParaData([lancamento]);

        return lancamento;
      });
  }

  private converteStringParaData(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
    }
  }
}
