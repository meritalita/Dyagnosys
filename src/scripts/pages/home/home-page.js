import HomePresenter from './home-presenter';

export default class HomePage {
  #presenter = null;

  async render() {
  return `
    <section class="hero">
      <div class="hero-text">
        <h1>Chronic Illness Prediction</h1>
        <p>Identifying risks early for better health</p>
        <div class="hero-buttons">
          <button class="btn btn-primary">Check Diabetes Risk</button>
          <button class="btn btn-outline">Check Heart Risk</button>
        </div>
      </div>
      <div class="hero-image">
        <img src="/images/doctor-check.png" alt="Doctor Image" />
      </div>
    </section>

    <section class="features-grid">
      <div class="card">
        <img src="/images/icons/heart.png" alt="Health Suggestions Icon" class="icon-img" />
        <h2>Health Suggestions</h2>
        <p>Personalized advice for diabetes and heart.</p>
        <button class="btn btn-primary">View Suggestions</button>
      </div>

      <div class="card">
        <img src="/images/icons/article.png" alt="Health Articles Icon" class="icon-img" />
        <h2>Health Articles</h2>
        <p>Read articles on diabetes and health.</p>
        <button class="btn btn-primary">Go to Articles</button>
      </div>

      <div class="card">
        <img src="/images/icons/monitor.png" alt="Health Monitoring Icon" class="icon-img" />
        <h2>Health Monitoring Dashboard</h2>
        <p>Track your health data and monitor your progress.</p>
        <button class="btn btn-primary">Go to Monitoring</button>
      </div>

      <div class="card">
        <img src="/images/icons/history.png" alt="Examination History Icon" class="icon-img" />
        <h2>Examination History</h2>
        <p>Review your past diagnoses, and health.</p>
        <button class="btn btn-primary">Check Exams</button>
      </div>

      <div class="card">
        <img src="/images/icons/lifestyle.png" alt="Lifestyle Icon" class="icon-img" />
        <h2>Lifestyle Recommendations</h2>
        <p>Explore healthy habits to reduce sudden challenges and live balanced.</p>
        <button class="btn btn-primary">View Recommendations</button>
      </div>
    </section>
  `;
}

  async afterRender() {
  this.#presenter = new HomePresenter({ view: this });
  await this.#presenter.initialize();

  const diabetesButton = document.querySelector('.hero-buttons .btn.btn-primary');
  diabetesButton.addEventListener('click', () => {
    window.location.hash = '#/diabetes-check';
  });

  const heartCheckButton = document.querySelector('.hero-buttons .btn.btn-outline');
  heartCheckButton.addEventListener('click', () => {
    window.location.hash = '#/heart-check';
  });

  const suggestionButton = document.querySelector('.features-grid .card:nth-child(1) .btn');
  suggestionButton.addEventListener('click', () => {
    window.location.hash = '#/suggestions';
  });

  const articleButton = document.querySelector('.features-grid .card:nth-child(2) .btn');
  articleButton.addEventListener('click', () => {
    window.location.hash = '#/articles';
  });

  const monitoringButton = document.querySelector('.features-grid .card:nth-child(3) .btn');
  monitoringButton.addEventListener('click', () => {
    window.location.hash = '#/monitoring';
  });

  const historyButton = document.querySelector('.features-grid .card:nth-child(4) .btn');
  historyButton.addEventListener('click', () => {
    window.location.hash = '#/history';
  });

  const lifestyleButton = document.querySelector('.features-grid .card:nth-child(5) .btn');
  lifestyleButton.addEventListener('click', () => {
    window.location.hash = '#/recommendations';
  });
}
}