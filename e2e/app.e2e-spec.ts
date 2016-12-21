import { OfflineMozPage } from './app.po';

describe('offline-moz App', function() {
  let page: OfflineMozPage;

  beforeEach(() => {
    page = new OfflineMozPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
