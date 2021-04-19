import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { IProbleme } from './typeprobleme';
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
  

  constructor(private fb: FormBuilder, private probleme: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({

      prenom: ['', [ZonesValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      Typeprobleme: ['',[Validators.required]],
      noTypenoProbleme: ['', Validators.required],
      typeNotification: ['NePasNotifier'],
      telephone: [{ value: '', disabled: true }],
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }]
      })
    });

    this.probleme.obtenirProblemes()
      .subscribe(cat => this.typesProblemes = cat,
        error => this.errorMessage = <any>error);
  };
  
  save(): void{};

 appliquerNotifications(typeNotification: string): void {
    const pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+";
    const pattern2 = "[0-9]+";
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const confirmerCourrielControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephoneControl = this.problemeForm.get('telephone');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    confirmerCourrielControl.clearValidators();
    confirmerCourrielControl.reset();
    confirmerCourrielControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.updateValueAndValidity();
    confirmerCourrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();

    if (typeNotification === 'courriel') {

      courrielControl.enable();
      courrielControl.setValidators([Validators.pattern(pattern), Validators.required]);
   
      confirmerCourrielControl.enable();
      confirmerCourrielControl.setValidators([Validators.required]);
  
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);

    } else if (typeNotification === 'NePasNotifier'){

      courrielControl.disable();
      confirmerCourrielControl.disable();
      telephoneControl.disable(); 

    } else if (typeNotification === 'telephone') {
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.minLength(10), Validators.maxLength(10), Validators.pattern(pattern2), Validators.required]);
    }


    courrielControl.updateValueAndValidity();
    confirmerCourrielControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();

  }
}
