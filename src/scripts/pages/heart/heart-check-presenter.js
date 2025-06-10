import * as tf from '@tensorflow/tfjs';

const HeartCheckPresenter = {
  async init({ form, resultContainer }) {
    this._form = form;
    this._resultContainer = resultContainer;

    try {
      this._model = await tf.loadGraphModel('/model_HeartRisk_tfjs/model.json');
    } catch (err) {
      this._resultContainer.innerHTML = '<p class="text-red-600">❌ Gagal memuat model. Periksa koneksi atau lokasi model.</p>';
      return;
    }

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._predict();
    });
  },

  async _predict() {
    this._resultContainer.innerHTML = '<p class="text-blue-500">⏳ Menganalisis risiko jantung...</p>';

    try {
      const formData = new FormData(this._form);

      const keys = [
        'Chest_Pain',
        'Shortness_of_Breath',
        'Fatigue',
        'Palpitations',
        'Dizziness',
        'Swelling',
        'Pain_Arms_Jaw_Back',
        'Cold_Sweats_Nausea',
        'High_BP',
        'High_Cholesterol',
        'Smoking',
        'Obesity',
        'Sedentary_Lifestyle',
        'Family_History',
        'Gender',
        'Age',
      ];

      const input = keys.map((key) => {
        const value = Number(formData.get(key));
        if (isNaN(value)) throw new Error(`Input "${key}" tidak valid.`);
        return value;
      });

      const inputTensor = tf.tensor2d([input]);
      const prediction = this._model.predict(inputTensor);
      const prob = (await prediction.data())[0];

      let level = '';
      let advice = '';

      if (prob >= 0.7) {
        level = `<p class="text-red-600 font-semibold">⚠️ Risiko jantung tinggi (${(prob * 100).toFixed(1)}%)</p>`;
        advice = this._getAdvice('high');
      } else if (prob >= 0.4) {
        level = `<p class="text-yellow-600 font-semibold">⚠️ Risiko jantung sedang (${(prob * 100).toFixed(1)}%)</p>`;
        advice = this._getAdvice('medium');
      } else {
        level = `<p class="text-green-600 font-semibold">✅ Risiko jantung rendah (${(prob * 100).toFixed(1)}%)</p>`;
        advice = this._getAdvice('low');
      }

      this._resultContainer.innerHTML = `
        ${level}
        <div class="mt-4 p-4 bg-gray-100 rounded-md">
          ${advice}
        </div>
      `;

      prediction.dispose();
      inputTensor.dispose();
    } catch (error) {
      this._resultContainer.innerHTML = `<p class="text-red-600">❌ Terjadi kesalahan saat prediksi: ${error.message}</p>`;
    }
  },

  _getAdvice(level) {
    if (level === 'high') {
      return `
        <h3 class="font-semibold mb-2">Rekomendasi untuk Risiko Tinggi:</h3>
        <ul class="list-disc ml-5">
          <li><strong>Pantangan makanan:</strong> Gorengan, daging berlemak, makanan cepat saji, tinggi garam dan gula.</li>
          <li><strong>Kegiatan yang harus dihindari:</strong> Merokok, stres berat, kurang tidur, minuman beralkohol.</li>
          <li><strong>Makanan sehat:</strong> Ikan berlemak (salmon), kacang-kacangan, buah beri, sayuran hijau, oatmeal.</li>
          <li><strong>Kegiatan yang disarankan:</strong> Olahraga ringan seperti jalan kaki, yoga, konsultasi rutin ke dokter.</li>
          <li><strong>Saran medis:</strong> Segera temui dokter jantung untuk pemeriksaan lebih lanjut.</li>
        </ul>
      `;
    } else if (level === 'medium') {
      return `
        <h3 class="font-semibold mb-2">Rekomendasi untuk Risiko Sedang:</h3>
        <ul class="list-disc ml-5">
          <li><strong>Pantangan makanan:</strong> Kurangi konsumsi makanan tinggi lemak jenuh dan garam.</li>
          <li><strong>Kegiatan yang harus dihindari:</strong> Duduk terlalu lama, begadang, kurang aktivitas fisik.</li>
          <li><strong>Makanan sehat:</strong> Buah segar, sayuran, ikan, minyak zaitun, biji-bijian utuh.</li>
          <li><strong>Kegiatan yang disarankan:</strong> Rutin berolahraga ringan, tidur cukup, meditasi atau relaksasi.</li>
          <li><strong>Saran medis:</strong> Konsultasikan gaya hidup Anda dengan petugas medis jika gejala berlanjut.</li>
        </ul>
      `;
    } else {
      return `
        <h3 class="font-semibold mb-2">Rekomendasi untuk Risiko Rendah:</h3>
        <ul class="list-disc ml-5">
          <li><strong>Pantangan makanan:</strong> Tetap batasi makanan tinggi lemak trans dan gula.</li>
          <li><strong>Kegiatan yang harus dihindari:</strong> Kebiasaan duduk lama tanpa aktivitas.</li>
          <li><strong>Makanan sehat:</strong> Sayur, buah, makanan tinggi serat, air putih cukup.</li>
          <li><strong>Kegiatan yang disarankan:</strong> Jaga rutinitas olahraga 3–5x seminggu, tidur teratur, manajemen stres.</li>
          <li><strong>Saran medis:</strong> Tetap lakukan pemeriksaan berkala untuk menjaga kesehatan jantung.</li>
        </ul>
      `;
    }
  },
};

export default HeartCheckPresenter;
