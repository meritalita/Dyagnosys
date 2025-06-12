import Database from '../data/database';
import { nanoid } from 'nanoid';

export async function saveDiagnosisToHistory({ nama, tanggal, hasil, detail, tipe }) {
  const report = {
    id: `${Date.now()}-${nanoid(5)}`,
    nama,
    tanggal,
    hasil,
    detail,
    tipe,
  };

  await Database.putReport(report);
}
