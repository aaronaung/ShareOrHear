import { ShareorhearPage } from './app.po';

describe('shareorhear App', function() {
  let page: ShareorhearPage;

  beforeEach(() => {
    page = new ShareorhearPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
