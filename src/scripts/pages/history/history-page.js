import HistoryPresenter from './history-presenter';

export default class HistoryPage {
  async render() {
    return `
      <section class="history-section">
        <h2>Riwayat Diagnosa</h2>
        <table class="history-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Nama Pasien</th>
              <th>Hasil Diagnosa</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="history-body">
            <!-- Data riwayat akan dimuat di sini -->
          </tbody>
        </table>
      </section>
    `;
  }

 async afterRender() {
  const data = await HistoryPresenter.getHistoryData();
  HistoryPresenter.renderHistoryList(data);

  // Tambahkan aksi untuk tombol "Lihat"
  document.querySelectorAll('.detail-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      alert(`Detail untuk ${data[index].nama} pada ${data[index].tanggal}`);
    });
  });
}
}
