import HistoryPresenter from './history-presenter';
import Database from '../../data/database';

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
              <th>Rekomendasi</th>
            </tr>
          </thead>
          <tbody id="history-body"></tbody>
        </table>
      </section>
    `;
  }

  async afterRender() {
    const data = await HistoryPresenter.getHistoryData();
    HistoryPresenter.renderHistoryList(data);

    this._bindRecoButtons();
    this._bindDeleteButtons();
  }

  _bindRecoButtons() {
    document.querySelectorAll('.reco-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        const detail = await Database.getReportById(id);
        const targetContainer = document.getElementById(`reco-${id}`);

        if (targetContainer.classList.contains('hidden')) {
          targetContainer.classList.remove('hidden');
          targetContainer.innerHTML = `
            <div class="recommendation-box">
              ${detail.detail || 'Tidak ada rekomendasi.'}
            </div>
          `;
          btn.textContent = 'Tutup';
        } else {
          targetContainer.classList.add('hidden');
          targetContainer.innerHTML = '';
          btn.textContent = 'Lihat';
        }
      });
    });
  }

  _bindDeleteButtons() {
    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        const confirmed = confirm('Yakin ingin menghapus riwayat ini?');
        if (confirmed) {
          await Database.removeReport(id);
          const updatedData = await HistoryPresenter.getHistoryData();
          HistoryPresenter.renderHistoryList(updatedData);
          this._bindRecoButtons();
          this._bindDeleteButtons();
        }
      });
    });
  }
}
