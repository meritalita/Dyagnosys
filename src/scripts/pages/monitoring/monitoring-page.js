import MonitoringPresenter from './monitoring-presenter';

export default class MonitoringPage {
  async render() {
    return `
      <section class="monitoring-section">
        <h2>Monitoring Sistem</h2>
        <canvas id="monitorChart" width="400" height="200"></canvas>
      </section>
    `;
  }

  async afterRender() {
    const data = await MonitoringPresenter.fetchMonitoringData();
    MonitoringPresenter.renderChart(data);
  }
}
