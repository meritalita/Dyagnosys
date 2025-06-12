import MonitoringPresenter from './monitoring-presenter';

export default class MonitoringPage {
  async render() {
    return `
      <section class="monitoring-section">
        <h2>Monitoring Sistem</h2>

        <div class="chart-container">
          <h3>Grafik Risiko Diabetes</h3>
          <canvas id="monitorChartDiabetes" width="400" height="200"></canvas>
        </div>

        <div class="chart-container" style="margin-top: 40px;">
          <h3>Grafik Risiko Jantung</h3>
          <canvas id="monitorChartHeart" width="400" height="200"></canvas>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const data = await MonitoringPresenter.fetchMonitoringData();
    MonitoringPresenter.renderChart(data);
  }
}
