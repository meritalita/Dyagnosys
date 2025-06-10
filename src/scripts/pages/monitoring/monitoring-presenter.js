import Chart from 'chart.js/auto';

export default class MonitoringPresenter {
  static async fetchMonitoringData() {
    return {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
      values: [12, 19, 3, 5, 8],
    };
  }

  static renderChart({ labels, values }) {
    const ctx = document.getElementById('monitorChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Aktivitas Sistem',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}
