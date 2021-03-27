import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static longueurMinimum(valeurMinimum: number): ValidatorFn {
        return (valeurControle: AbstractControl): { [key: string]: boolean } | null => {
            if (valeurControle.value == null) {
                return { 'nbreCaracteresInsuffisants': true };
            }
            if (valeurControle.value.trim().length >= valeurMinimum) {
                return null;
            }
            return { 'nbreCaracteresInsuffisants': true };
        };
    }
}