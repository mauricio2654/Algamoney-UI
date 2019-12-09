import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return this.http.get(this.pessoaUrl, { headers, params })
      .toPromise()
      .then(response => {
        const pessoas = response[`content`];
        const resultado = {
          pessoas,
          total: response[`totalElements`]
        };
        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoaUrl, { headers })
      .toPromise()
      .then(response => {
        const pessoas = response[`content`];
        return pessoas;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.delete(this.pessoaUrl + '/' + codigo, { headers })
      .toPromise()
      .then(() => null);

  }

  ativarOuDesativar(pessoa: any): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    if (pessoa.ativo) {
      pessoa.ativo = false;
    } else {
      pessoa.ativo = true;
    }
    console.log(this.pessoaUrl + '/' + pessoa.codigo + '/' + 'ativo');
    return this.http.put(this.pessoaUrl + '/' + pessoa.codigo + '/' + 'ativo', pessoa.ativo, { headers })
      .toPromise()
      .then(() => null);
  }
}
