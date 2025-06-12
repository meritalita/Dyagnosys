import DiabetesCheckPresenter from './check-diabetes-presenter';

class DiabetesCheckPage {
  async render() {
    return `
      <section class="diabetes-check container">
        <h2 class="text-2xl font-bold mb-4">Cek Risiko Diabetes</h2>
        <form id="diabetes-form" class="grid gap-4">
          <div>
            <label>Nama Pasien:
              <input type="text" name="NamaPasien" required class="input" />
            </label>
          </div>
          ${this._generateSelectField('HighBP', 'Apakah Anda memiliki tekanan darah tinggi?')}
          ${this._generateSelectField('HighChol', 'Apakah Anda memiliki kolesterol tinggi?')}
          ${this._generateSelectField('CholCheck', 'Apakah Anda rutin memeriksa kadar kolesterol?')}
          ${this._generateSelectField('Smoker', 'Apakah Anda merokok?')}
          ${this._generateSelectField('Stroke', 'Apakah Anda pernah mengalami stroke?')}
          ${this._generateSelectField('HeartDiseaseorAttack', 'Apakah Anda pernah mengalami serangan jantung?')}
          ${this._generateSelectField('PhysActivity', 'Apakah Anda aktif secara fisik?')}
          ${this._generateSelectField('Fruits', 'Apakah Anda rutin mengonsumsi buah?')}
          ${this._generateSelectField('Veggies', 'Apakah Anda rutin mengonsumsi sayur?')}
          ${this._generateSelectField('HvyAlcoholConsump', 'Apakah Anda mengonsumsi alkohol secara berlebihan?')}

          <div>
            <label>Kesehatan Umum (1 = sangat baik, 5 = sangat buruk):
              <input type="number" name="GenHlth" min="1" max="5" required class="input" />
            </label>
          </div>

          <div>
            <label>Jumlah hari tidak sehat mental dalam sebulan (0-30):
              <input type="number" name="MentHlth" min="0" max="30" required class="input" />
            </label>
          </div>

          <div>
            <label>Jumlah hari tidak sehat fisik dalam sebulan (0-30):
              <input type="number" name="PhysHlth" min="0" max="30" required class="input" />
            </label>
          </div>

          ${this._generateSelectField('DiffWalk', 'Apakah Anda kesulitan berjalan atau naik tangga?')}

          <div>
            <label>Jenis Kelamin:
              <select name="Sex" required class="select">
                <option value="" disabled selected>Pilih</option>
                <option value="1">Laki-laki</option>
                <option value="0">Perempuan</option>
              </select>
            </label>
          </div>

          <div>
            <label>Usia (Pilih angka 1–13 sesuai rentang umur):
              <select name="Age" required class="select">
                <option value="" disabled selected>Pilih Usia</option>
                <option value="1">1 - 18–24 tahun</option>
                <option value="2">2 - 25–29 tahun</option>
                <option value="3">3 - 30–34 tahun</option>
                <option value="4">4 - 35–39 tahun</option>
                <option value="5">5 - 40–44 tahun</option>
                <option value="6">6 - 45–49 tahun</option>
                <option value="7">7 - 50–54 tahun</option>
                <option value="8">8 - 55–59 tahun</option>
                <option value="9">9 - 60–64 tahun</option>
                <option value="10">10 - 65–69 tahun</option>
                <option value="11">11 - 70–74 tahun</option>
                <option value="12">12 - 75–79 tahun</option>
                <option value="13">13 - 80 tahun atau lebih</option>
              </select>
            </label>
          </div>

          <div>
            <label>BMI (Body Mass Index):
              <input type="number" name="BMI_clapped" step="0.1" required class="input" placeholder="Contoh: 22.5" />
            </label>
          </div>

          <div id="bmi-calc" class="hidden mt-2 space-y-2 bg-gray-50 p-3 rounded-md border">
            <div>
              <label>Berat Badan (kg): 
              <input type="number" id="weight-input" class="input w-full" /></label>
            </div>
            <div>
              <label>Tinggi Badan (cm):
               <input type="number" id="height-input" class="input w-full" /></label>
            </div>
            <button type="button" id="calc-bmi-btn" class="btn btn-sm btn-secondary">Hitung BMI Sekarang</button>
            <p id="bmi-output" class="text-sm text-green-600 mb-10"></p>
          </div>

          <button type="submit" class="btn btn-primary">Prediksi Risiko</button>
        </form>
        <div id="diabetes-result" class="mt-4"></div>
      </section>
    `;
  }

  async afterRender() {
    DiabetesCheckPresenter.init({
      form: document.querySelector('#diabetes-form'),
      resultContainer: document.querySelector('#diabetes-result'),
    });

    document.getElementById('toggle-bmi-calc')?.addEventListener('click', () => {
      const el = document.getElementById('bmi-calc');
      el.classList.toggle('hidden');
    });

    // Untuk menghitung BMI
    document.getElementById('calc-bmi-btn')?.addEventListener('click', () => {
      const weight = parseFloat(document.getElementById('weight-input').value);
      const heightCm = parseFloat(document.getElementById('height-input').value);

      if (weight > 0 && heightCm > 0) {
        const heightM = heightCm / 100;
        const bmi = (weight / heightM ** 2).toFixed(1);
        document.querySelector('input[name="BMI_clapped"]').value = bmi;
        document.getElementById('bmi-output').textContent = `✅ BMI Anda: ${bmi}`;
      } else {
        document.getElementById('bmi-output').textContent = `
         Masukkan berat dan tinggi dengan benar.`;
      }
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

export default DiabetesCheckPage;
