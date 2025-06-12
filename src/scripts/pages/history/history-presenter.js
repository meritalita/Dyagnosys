import Database from "../../data/database";

export default class HistoryPresenter {
  static async getHistoryData() {
    return await Database.getAllReports();
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
          <td>${item.hasil} <span class="badge badge-${item.tipe}">${item.tipe}</span></td>
          <td>
            <div class="action-buttons">
              <button class="detail-btn reco-btn" data-id="${item.id}">Lihat</button>
              <button class="detail-btn delete-btn" data-id="${item.id}">Hapus</button>
            </div>
            <div id="reco-${item.id}" class="hidden"></div>
          </td>
        </tr>
      `;
    });
  }
}
