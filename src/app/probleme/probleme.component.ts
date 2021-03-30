import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { IProbleme } from './probleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProblemes: IProbleme[];
  errorMessage: string;
  

  constructor(private fb: FormBuilder, private problemes: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({

      prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      Problemes: ['',[Validators.required]]

    });

    this.problemes.obtenirProblemes()
      .subscribe(cat => this.typesProblemes = cat,
        error => this.errorMessage = <any>error);
  }

  save(): void {

  }

}
