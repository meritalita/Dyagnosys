import Chart from 'chart.js/auto';
import Database from '../../data/database';

export default class MonitoringPresenter {
  static async fetchMonitoringData() {
    const reports = await Database.getAllReports();

    // Ambil dan urutkan data untuk diabetes
    const diabetesReports = reports
      .filter(report => report.tipe === 'diabetes')
      .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

    const diabetes = {
      labels: diabetesReports.map(report => report.tanggal),
      values: diabetesReports.map(report => {
        const match = report.hasil.match(/([\d.]+)%/);
        return match ? parseFloat(match[1]) : 0;
      }),
    };

    // Ambil dan urutkan data untuk jantung
    const heartReports = reports
      .filter(report => report.tipe === 'jantung')
      .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

    const heart = {
      labels: heartReports.map(report => report.tanggal),
      values: heartReports.map(report => {
        const match = report.hasil.match(/([\d.]+)%/);
        return match ? parseFloat(match[1]) : 0;
      }),
    };

    return { diabetes, heart };
  }

  static renderChart({ diabetes, heart }) {
    const diabetesCtx = document.getElementById('monitorChartDiabetes')?.getContext('2d');
    const heartCtx = document.getElementById('monitorChartHeart')?.getContext('2d');

    // Grafik Risiko Diabetes
    if (diabetesCtx) {
      new Chart(diabetesCtx, {
        type: 'line',
        data: {
          labels: diabetes.labels,
          datasets: [{
            label: 'Risiko Diabetes (%)',
            data: diabetes.values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            }
          }
        }
      });
    }

    // Grafik Risiko Jantung
    if (heartCtx) {
      new Chart(heartCtx, {
        type: 'line',
        data: {
          labels: heart.labels,
          datasets: [{
            label: 'Risiko Jantung (%)',
            data: heart.values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            }
          }
        }
      });
    }
  }
}
