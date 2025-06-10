import RecommendationsPresenter from './recommendations-presenter';

export default class RecommendationsPage {
  #presenter = null;

  async render() {
    return `
      <section class="recommendations">
        <h1>Gaya Hidup Sehat untuk Diabetes & Jantung</h1>
        <p class="subtitle">Jaga kesehatanmu, karena hidup adalah anugerah yang harus dijaga sebaik mungkin.</p>
        <div class="recommendation-list" id="recommendation-list"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RecommendationsPresenter();
    const container = document.getElementById('recommendation-list');
    const data = this.#presenter.getRecommendations();

    data.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'recommendation-card';
      card.innerHTML = `
        <img src="${item.images}" alt="${item.title}" />
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;
      container.appendChild(card);
    });
  }
}
