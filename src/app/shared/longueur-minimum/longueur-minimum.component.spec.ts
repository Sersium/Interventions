import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {

    it('Une phrase avec des mots est valide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: 'Vive angular' };
        let result = validator(valeurControle as AbstractControl);
        expect(result).toBeNull();
    })
    it('Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '   je le veux   ' };
        let result = validator(valeurControle as AbstractControl);
        expect(result).toBeNull();
    })
    it('Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: ' xx' };
        let result = validator(valeurControle as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    })
    it('Une phrase avec 2 espaces et 1 caractère est invalide.', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '  x' };
        let result = validator(valeurControle as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    })
    it('Une phrase avec 3 espaces et 3 caractères est valide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '   xxx' };
        let result = validator(valeurControle as AbstractControl);
        expect(result).toBeNull();
    })
    it('Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: '     xxxxx     ' };
        let result = validator(valeurControle as AbstractControl);
        expect(result).toBeNull();
    })
    it('Une chaîne nulle est invalide', () => {
        let validator = ZonesValidator.longueurMinimum(3);
        let valeurControle = { value: null };
        let result = validator(valeurControle as AbstractControl);
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    })
})