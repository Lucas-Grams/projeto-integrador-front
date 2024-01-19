import {Component, OnInit, ElementRef} from '@angular/core';
import {UnidadeService} from "../../../../core/services/unidade.service";
import {Unidade} from "../../../../core/models/unidade.model";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {UsuarioService} from "../../../../core/services/usuario.service";
import {Usuario} from "../../../../core/models/usuario.model";
import {Empresa} from "../../../../core/models/empresa.model";
import {EmpresaService} from "../../../../core/services/empresa.service";


@Component({
    selector: 'pnip-admin-listar-empresas',
    templateUrl: './listar-empresas.component.html',
    styleUrls: []
})
export class ListarEmpresasComponent implements OnInit {

    public breadcrumb = [
        {
            label: 'Home',
            url: '/portal-admin',
            home: true
        },
        {
            label: 'Empresas',
            active: true
        }
    ];

    empresas: Empresa[] = [];


    constructor(private empresaService: EmpresaService,
                private el: ElementRef) {
    }

    ngOnInit() {
        this.empresaService.findAll().subscribe((data) => {
            this.empresas = data;
        });
    }

    inativar(empresa: Empresa) {
        Swal.fire({
            title: 'Ops...',
            text: `Você tem certeza que deseja  ${empresa.ativo? 'inativar' : 'ativar'} esse empresa?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {
                this.empresaService.ativaInativa(empresa.uuid).subscribe((msg)=>{
                    if(msg.status == 'SUCCESS'){
                        Swal.fire({
                            title: 'Sucesso!',
                            text: `Empresa inativada/ativada com sucesso!.`,
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonText: 'OK'
                        }).then(()=>this.el.nativeElement.ownerDocument.defaultView.location.reload());

                    }
                });
            }

        })
    }


}
