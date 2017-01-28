import { PollerbearPage } from './app.po';

describe('pollerbear App', function() {
  let page: PollerbearPage;

  beforeEach(() => {
    page = new PollerbearPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
