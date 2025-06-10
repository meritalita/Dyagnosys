import HeartCheckPresenter from './heart-check-presenter';

class HeartCheckPage {
  async render() {
    return `
      <section class="heart-check container">
        <h2 class="text-2xl font-bold mb-4">Cek Risiko Penyakit Jantung</h2>
        <form id="heart-form" class="grid gap-4">
          ${this._generateSelectField('Chest_Pain', 'Apakah Anda mengalami nyeri dada?')}
          ${this._generateSelectField('Shortness_of_Breath', 'Apakah Anda kesulitan bernafas?')}
          ${this._generateSelectField('Fatigue', 'Apakah Anda merasa sangat lelah tanpa penyebab jelas?')}
          ${this._generateSelectField('Palpitations', 'Apakah detak jantung Anda tidak teratur atau cepat?')}
          ${this._generateSelectField('Dizziness', 'Apakah Anda sering pusing atau hampir pingsan?')}
          ${this._generateSelectField('Swelling', 'Apakah Anda mengalami pembengkakan di kaki/pergelangan kaki?')}
          ${this._generateSelectField('Pain_Arms_Jaw_Back', 'Apakah ada nyeri menjalar ke lengan, rahang, atau punggung?')}
          ${this._generateSelectField('Cold_Sweats_Nausea', 'Apakah Anda mengalami keringat dingin dan mual?')}
          ${this._generateSelectField('High_BP', 'Apakah Anda memiliki tekanan darah tinggi?')}
          ${this._generateSelectField('High_Cholesterol', 'Apakah Anda memiliki kolesterol tinggi?')}
          ${this._generateSelectField('Smoking', 'Apakah Anda merokok?')}
          ${this._generateSelectField('Obesity', 'Apakah Anda mengalami obesitas?')}
          ${this._generateSelectField('Sedentary_Lifestyle', 'Apakah Anda kurang aktivitas fisik?')}
          ${this._generateSelectField('Family_History', 'Apakah ada riwayat keluarga dengan penyakit jantung?')}

          <div>
            <label>Jenis Kelamin:
              <select name="Gender" required class="select">
                <option value="" disabled selected>Pilih</option>
                <option value="1">Laki-laki</option>
                <option value="0">Perempuan</option>
              </select>
            </label>
          </div>

          <div>
            <label>Usia:
              <input type="number" name="Age" required min="0" class="input" />
            </label>
          </div>

          <button type="submit" class="btn btn-primary">Prediksi Risiko</button>
        </form>
        <div id="heart-result" class="mt-4"></div>
      </section>
    `;
  }

  async afterRender() {
    HeartCheckPresenter.init({
      form: document.querySelector('#heart-form'),
      resultContainer: document.querySelector('#heart-result'),
    });
  }

  _generateSelectField(name, question) {
    return `
      <div class="field-row">
        <p class="question">${question}</p>
        <label><input type="radio" name="${name}" value="1" required /> Ya</label>
        <label><input type="radio" name="${name}" value="0" required /> Tidak</label>
      </div>
    `;
  }
}

export default HeartCheckPage;
