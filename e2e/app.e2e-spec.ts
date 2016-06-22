import { StreamdataAngular2Page } from './app.po';

describe('streamdata-angular2 App', function() {
  let page: StreamdataAngular2Page;

  beforeEach(() => {
    page = new StreamdataAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
