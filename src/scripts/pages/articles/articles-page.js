import { getArticlesData } from './articles-presenter.js';

export default class ArticlesPage {
  async render() {
    return `<section id="articles" class="articles-container"></section>`;
  }

  async afterRender() {
    const container = document.querySelector('#articles');
    const articles = getArticlesData();

    articles.forEach((article, index) => {
  const card = document.createElement('div');
  card.className = 'article-card';

  card.innerHTML = `
    <img src="${article.image}" alt="${article.title}" class="article-image" />
    <h2 class="article-title">${article.title}</h2>
    <div class="article-content" id="article-content-${index}">${article.content}</div>
    <button class="read-more-btn" data-id="${index}">Lihat Selengkapnya</button>
  `;

  container.appendChild(card);
});

    // Handle read more button
    const buttons = document.querySelectorAll('.read-more-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        const contentEl = document.getElementById(`article-content-${id}`);
        contentEl.classList.toggle('expanded');
        button.textContent = contentEl.classList.contains('expanded')
          ? 'Tutup'
          : 'Lihat Selengkapnya';
      });
    });
  }
}
