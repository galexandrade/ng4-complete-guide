import { Ng4CompleteGuidePage } from './app.po';

describe('ng4-complete-guide App', () => {
  let page: Ng4CompleteGuidePage;

  beforeEach(() => {
    page = new Ng4CompleteGuidePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
