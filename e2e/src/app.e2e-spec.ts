import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();
    expect(await page.getTitleText()).toEqual('Veuillez renseigner les zones suivante et soumettre votre demande');
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', async () => {

    await page.viderToutesLesZones();
  
    await page.setChampsValidesScenarioNominal();                              
    expect(await page.boutonSubmit().isEnabled()).toBeTruthy();
  });

  it('zone DESCRIPTION DU PROBLEME a une bordure ROUGE si nombre de caractères insuffisant', async () => {

    await page.setZoneDescriptionProblemeCaracteresInsuffisant();  
    expect(await page.obtenirClasseZoneDescriptionProbleme()).toContain('is-invalid');
  });  


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});