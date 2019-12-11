import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';
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

  pessoaUrl: string;

  constructor(private http: HttpClient) {
    this.pessoaUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    return this.http.get(this.pessoaUrl, { params })
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
    return this.http.get(this.pessoaUrl)
      .toPromise()
      .then(response => {
        const pessoas = response[`content`];
        return pessoas;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(this.pessoaUrl + '/' + codigo)
      .toPromise()
      .then(() => null);

  }

  ativarOuDesativar(pessoa: any): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    if (pessoa.ativo) {
      pessoa.ativo = false;
    } else {
      pessoa.ativo = true;
    }
    return this.http.put(this.pessoaUrl + '/' + pessoa.codigo + '/' + 'ativo', pessoa.ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaUrl, pessoa)
      .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(this.pessoaUrl + '/' + codigo)
      .toPromise();
  }

  alterar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaUrl, pessoa)
      .toPromise();
  }
}
