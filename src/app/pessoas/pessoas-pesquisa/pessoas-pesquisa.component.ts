import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegitros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', { static: true }) grid;
  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.totalRegitros = resultado.total;
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluidoComSucesso() {
    this.messageService.add({ severity: 'success', summary: 'Exclusão', detail: 'Exclusão realizada com sucesso' });
  }

  confirmarExclusao(Pessoa: any) {
    this.confirmation.confirm({
      message: 'Deseja realmente excluir?',
      accept: () => {
        this.grid.reset();
        this.excluir(Pessoa);
      }
    });
  }

  excluir(codigo: number) {
    this.pessoaService.excluir(codigo)
      .then(() => {
        this.grid.reset();
        this.excluidoComSucesso();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  desativadoOuAtivadoComSucesso(msg: string) {
    this.messageService.add({ severity: 'success', detail: msg });
  }

  ativarOuDesativar(pessoa: any) {
    this.pessoaService.ativarOuDesativar(pessoa)
      .then(() => {
        let msg = pessoa.ativo ? 'Ativado com Sucesso' : 'Desativado com Sucesso';
        this.desativadoOuAtivadoComSucesso(msg);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
