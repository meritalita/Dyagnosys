export default class HomePresenter {
  constructor({ view }) {
    this.view = view;
  }

  async initialize() {
    console.log('Home page initialized');
  }
}
