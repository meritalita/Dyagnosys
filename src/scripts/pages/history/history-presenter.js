export default class HistoryPresenter {
  static async getHistoryData() {
    return [
      { tanggal: '2025-06-01', nama: 'Andi', hasil: 'Normal' },
      { tanggal: '2025-06-03', nama: 'Siti', hasil: 'Deteksi Awal' },
    ];
  }

  static renderHistoryList(data) {
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = '';
    data.forEach((item, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.tanggal}</td>
          <td>${item.nama}</td>
          <td>${item.hasil}</td>
          <td><button class="detail-btn">Lihat</button></td>
        </tr>
      `;
    });
  }
}
