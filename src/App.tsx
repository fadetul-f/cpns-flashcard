import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Flashcard = {
  id: number
  category: 'TWK' | 'TIU' | 'TKP'
  question: string
  answer: string
}

type CategoryFilter = 'ALL' | 'TWK' | 'TIU' | 'TKP'

const flashcards: Flashcard[] = [
  { id: 1, category: 'TWK', question: 'Sebutkan sila pertama Pancasila.', answer: 'Ketuhanan Yang Maha Esa.' },
  { id: 2, category: 'TWK', question: 'Sebutkan sila kedua Pancasila.', answer: 'Kemanusiaan yang adil dan beradab.' },
  { id: 3, category: 'TWK', question: 'Sebutkan sila ketiga Pancasila.', answer: 'Persatuan Indonesia.' },
  { id: 4, category: 'TWK', question: 'Sebutkan sila keempat Pancasila.', answer: 'Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan.' },
  { id: 5, category: 'TWK', question: 'Sebutkan sila kelima Pancasila.', answer: 'Keadilan sosial bagi seluruh rakyat Indonesia.' },
  { id: 6, category: 'TWK', question: 'Apa makna semboyan Bhinneka Tunggal Ika?', answer: 'Berbeda-beda tetapi tetap satu.' },
  { id: 7, category: 'TWK', question: 'Lambang negara Indonesia adalah?', answer: 'Garuda Pancasila.' },
  { id: 8, category: 'TWK', question: 'Bahasa negara Indonesia adalah?', answer: 'Bahasa Indonesia.' },
  { id: 9, category: 'TWK', question: 'Bentuk negara Indonesia menurut UUD 1945 adalah?', answer: 'Negara Kesatuan berbentuk Republik.' },
  { id: 10, category: 'TWK', question: 'Kedaulatan berada di tangan siapa?', answer: 'Rakyat.' },
  { id: 11, category: 'TWK', question: 'Indonesia adalah negara apa menurut UUD 1945?', answer: 'Negara hukum.' },
  { id: 12, category: 'TWK', question: 'Sebutkan salah satu tujuan negara dalam Pembukaan UUD 1945.', answer: 'Melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia.' },
  { id: 13, category: 'TWK', question: 'Sebutkan salah satu tujuan negara dalam Pembukaan UUD 1945.', answer: 'Memajukan kesejahteraan umum.' },
  { id: 14, category: 'TWK', question: 'Sebutkan salah satu tujuan negara dalam Pembukaan UUD 1945.', answer: 'Mencerdaskan kehidupan bangsa.' },
  { id: 15, category: 'TWK', question: 'Sebutkan salah satu tujuan negara dalam Pembukaan UUD 1945.', answer: 'Ikut melaksanakan ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial.' },
  { id: 16, category: 'TWK', question: 'Menurut UUD 1945, warga negara terkait pertahanan keamanan?', answer: 'Berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara.' },
  { id: 17, category: 'TWK', question: 'Makna nasionalisme dalam TWK?', answer: 'Mewujudkan kepentingan nasional dengan tetap mempertahankan identitas nasional.' },
  { id: 18, category: 'TWK', question: 'Makna integritas dalam TWK?', answer: 'Menjunjung tinggi kejujuran, ketangguhan, komitmen, dan konsistensi.' },
  { id: 19, category: 'TWK', question: 'Makna bela negara dalam TWK?', answer: 'Berperan aktif mempertahankan eksistensi bangsa dan negara.' },
  { id: 20, category: 'TWK', question: 'Makna pilar negara dalam TWK?', answer: 'Pemahaman dan pengamalan nilai Pancasila, UUD 1945, NKRI, dan Bhinneka Tunggal Ika.' },
  { id: 21, category: 'TWK', question: 'Makna bahasa negara dalam TWK?', answer: 'Menggunakan bahasa Indonesia sebagai bahasa persatuan.' },
  { id: 22, category: 'TWK', question: 'Contoh sikap integritas di tempat kerja?', answer: 'Menolak gratifikasi dan melaporkan jika ada.' },
  { id: 23, category: 'TWK', question: 'Contoh sikap nasionalisme dalam pelayanan publik?', answer: 'Mendahulukan kepentingan masyarakat di atas kepentingan pribadi.' },
  { id: 24, category: 'TWK', question: 'Contoh bela negara non-militer?', answer: 'Taat hukum dan menjaga persatuan di lingkungan.' },
  { id: 25, category: 'TWK', question: 'Apa arti NKRI sebagai prinsip bernegara?', answer: 'Negara kesatuan, bukan federal.' },
  { id: 26, category: 'TWK', question: 'Sila ketiga Pancasila menekankan nilai?', answer: 'Persatuan.' },
  { id: 27, category: 'TWK', question: 'Sila kedua Pancasila menekankan nilai?', answer: 'Kemanusiaan yang adil dan beradab.' },
  { id: 28, category: 'TWK', question: 'Sila kelima Pancasila menekankan nilai?', answer: 'Keadilan sosial.' },
  { id: 29, category: 'TWK', question: 'Sila keempat Pancasila menekankan nilai?', answer: 'Musyawarah/perwakilan.' },
  { id: 30, category: 'TWK', question: 'Integritas berarti konsisten terhadap?', answer: 'Kebenaran dan aturan meski ada tekanan.' },
  { id: 31, category: 'TWK', question: 'Sikap terhadap keberagaman budaya di kantor?', answer: 'Menghargai perbedaan dan bekerja sama.' },
  { id: 32, category: 'TWK', question: 'Apa yang dilakukan saat konflik kepentingan muncul?', answer: 'Mengungkapkan dan menghindari pengambilan keputusan.' },
  { id: 33, category: 'TWK', question: 'Bahasa negara diatur dalam pasal berapa UUD 1945?', answer: 'Pasal 36.' },
  { id: 34, category: 'TWK', question: 'Semboyan negara Indonesia adalah?', answer: 'Bhinneka Tunggal Ika.' },
  { id: 35, category: 'TWK', question: 'Lagu kebangsaan Indonesia adalah?', answer: 'Indonesia Raya.' },
  { id: 36, category: 'TWK', question: 'Bendera negara Indonesia adalah?', answer: 'Sang Merah Putih.' },
  { id: 37, category: 'TWK', question: 'Negara berdasar atas?', answer: 'Ketuhanan Yang Maha Esa.' },
  { id: 38, category: 'TWK', question: 'Sistem pertahanan dan keamanan negara dilaksanakan melalui?', answer: 'Sistem pertahanan dan keamanan rakyat semesta.' },
  { id: 39, category: 'TWK', question: 'Kedaulatan rakyat dijalankan menurut?', answer: 'Undang-Undang Dasar.' },
  { id: 40, category: 'TWK', question: 'Nasionalisme menuntut kita untuk?', answer: 'Mengutamakan kepentingan nasional di atas golongan.' },
  { id: 41, category: 'TIU', question: 'Dokter : Pasien = Guru : ?', answer: 'Murid.' },
  { id: 42, category: 'TIU', question: 'Kunci : Pintu = Password : ?', answer: 'Akun.' },
  { id: 43, category: 'TIU', question: 'Semua A adalah B. Semua B adalah C. Kesimpulan?', answer: 'Semua A adalah C.' },
  { id: 44, category: 'TIU', question: 'Semua pegawai negeri taat aturan. Budi pegawai negeri. Kesimpulan?', answer: 'Budi taat aturan.' },
  { id: 45, category: 'TIU', question: 'Jika hujan maka jalan basah. Jalan tidak basah. Kesimpulan?', answer: 'Tidak hujan.' },
  { id: 46, category: 'TIU', question: 'Hitung: 12 + 18/3 = ?', answer: '18.' },
  { id: 47, category: 'TIU', question: 'Deret: 2, 5, 11, 23, 47, ?', answer: '95.' },
  { id: 48, category: 'TIU', question: 'Deret: 3, 6, 12, 24, 48, ?', answer: '96.' },
  { id: 49, category: 'TIU', question: 'Perbandingan: A=3/4 x 200, B=150. Mana lebih besar?', answer: 'A = B.' },
  { id: 50, category: 'TIU', question: 'Seorang petugas memproses 12 berkas/jam. 7 jam?', answer: '84 berkas.' },
  { id: 51, category: 'TIU', question: '0,2 dari 150 = ?', answer: '30.' },
  { id: 52, category: 'TIU', question: 'Jika 3x + 5 = 20, x = ?', answer: '5.' },
  { id: 53, category: 'TIU', question: 'Jika 40% dari x = 64, x = ?', answer: '160.' },
  { id: 54, category: 'TIU', question: 'Perbandingan: A=25% x 320, B=70. Mana lebih besar?', answer: 'A lebih besar.' },
  { id: 55, category: 'TIU', question: 'Rata-rata 4, 6, 8, 10 = ?', answer: '7.' },
  { id: 56, category: 'TIU', question: '5 pekerja selesai 12 hari. 10 pekerja?', answer: '6 hari.' },
  { id: 57, category: 'TIU', question: 'Deret: 1, 4, 9, 16, 25, ?', answer: '36.' },
  { id: 58, category: 'TIU', question: 'Deret: 2, 3, 5, 8, 13, ?', answer: '21.' },
  { id: 59, category: 'TIU', question: 'Perbandingan: A=2^5, B=5^2. Mana lebih besar?', answer: 'A lebih besar.' },
  { id: 60, category: 'TIU', question: 'Harga 250000 diskon 20% menjadi?', answer: '200000.' },
  { id: 61, category: 'TIU', question: "Antonim 'absolut' adalah?", answer: 'Relatif.' },
  { id: 62, category: 'TIU', question: "Sinonim 'efisien' adalah?", answer: 'Hemat/berdaya guna.' },
  { id: 63, category: 'TIU', question: 'Mobil : Bensin = Tubuh : ?', answer: 'Makanan.' },
  { id: 64, category: 'TIU', question: 'Semua mahasiswa lulus. Andi tidak lulus. Kesimpulan?', answer: 'Andi bukan mahasiswa.' },
  { id: 65, category: 'TIU', question: 'Pola berulang A, B, C. Elemen ke-7?', answer: 'A.' },
  { id: 66, category: 'TIU', question: 'AB : CD = EF : ?', answer: 'GH.' },
  { id: 67, category: 'TIU', question: 'Rasio A:B=2:5 dan A+B=70. A=?', answer: '20.' },
  { id: 68, category: 'TIU', question: 'Jika 7x - 3 = 32, x = ?', answer: '5.' },
  { id: 69, category: 'TIU', question: 'Deret: 81, 27, 9, 3, 1, ?', answer: '1/3.' },
  { id: 70, category: 'TIU', question: 'Perbandingan: A=sqrt(144), B=11. Mana lebih besar?', answer: 'A lebih besar.' },
  { id: 71, category: 'TKP', question: 'Lansia bingung di loket layanan. Tindakan terbaik?', answer: 'Melayani dengan sabar, jelaskan langkah, bantu isi seperlunya.' },
  { id: 72, category: 'TKP', question: 'Rekan meminta akses data tanpa wewenang. Tindakan?', answer: 'Menolak, jelaskan aturan, dan laporkan jika perlu.' },
  { id: 73, category: 'TKP', question: 'Deadline ketat dan tim kurang orang. Tindakan?', answer: 'Koordinasi pembagian tugas dan minta bantuan atasan bila perlu.' },
  { id: 74, category: 'TKP', question: 'Tim terdiri dari beragam budaya. Tindakan?', answer: 'Gunakan komunikasi inklusif dan hormati perbedaan.' },
  { id: 75, category: 'TKP', question: 'Warga marah karena antre lama. Tindakan?', answer: 'Dengarkan, minta maaf, jelaskan prosedur, cari solusi.' },
  { id: 76, category: 'TKP', question: 'Atasan memerintah melanggar prosedur. Tindakan?', answer: 'Sampaikan keberatan berbasis aturan dan tetap patuh prosedur.' },
  { id: 77, category: 'TKP', question: 'Muncul konten radikal di lingkungan kerja. Tindakan?', answer: 'Laporkan melalui kanal resmi dan jangan menyebarkan.' },
  { id: 78, category: 'TKP', question: 'Sistem IT down saat pelayanan. Tindakan?', answer: 'Aktifkan prosedur manual dan koordinasi dengan unit TIK.' },
  { id: 79, category: 'TKP', question: 'Anda salah input data. Tindakan?', answer: 'Akui, perbaiki segera, dan laporkan sesuai prosedur.' },
  { id: 80, category: 'TKP', question: 'Rekan baru kesulitan tugas. Tindakan?', answer: 'Bantu dan bagikan informasi yang dibutuhkan.' },
  { id: 81, category: 'TKP', question: 'Jadwal bentrok dengan pelayanan publik. Tindakan?', answer: 'Prioritaskan layanan publik dan atur ulang jadwal.' },
  { id: 82, category: 'TKP', question: 'Warga menyodorkan uang agar dipercepat. Tindakan?', answer: 'Tolak, jelaskan aturan, dan laporkan.' },
  { id: 83, category: 'TKP', question: 'Anda tidak sependapat dengan tim. Tindakan?', answer: 'Sampaikan argumen dengan data, tetap menghargai.' },
  { id: 84, category: 'TKP', question: 'Diminta tugas di luar deskripsi namun mendesak. Tindakan?', answer: 'Kerjakan bila sesuai kewenangan dan koordinasi.' },
  { id: 85, category: 'TKP', question: 'Banyak tugas, waktu terbatas. Tindakan?', answer: 'Buat prioritas dan komunikasikan progres.' },
  { id: 86, category: 'TKP', question: 'Warga meminta info yang Anda tidak tahu. Tindakan?', answer: 'Cari sumber resmi atau rujuk rekan, jangan menebak.' },
  { id: 87, category: 'TKP', question: 'Kerja sama lintas instansi dibutuhkan. Tindakan?', answer: 'Koordinasi aktif dan berbagi informasi yang relevan.' },
  { id: 88, category: 'TKP', question: 'Ada diskriminasi pelayanan. Tindakan?', answer: 'Hentikan, tegur, dan laporkan.' },
  { id: 89, category: 'TKP', question: 'Atasan memberi kritik tajam. Tindakan?', answer: 'Terima, evaluasi, dan perbaiki kinerja.' },
  { id: 90, category: 'TKP', question: 'Rekan enggan berbagi info. Tindakan?', answer: 'Bangun komunikasi dan jelaskan tujuan pelayanan.' },
  { id: 91, category: 'TKP', question: 'Diminta membuat laporan dengan data belum valid. Tindakan?', answer: 'Verifikasi data terlebih dahulu.' },
  { id: 92, category: 'TKP', question: 'Tugas menuntut aplikasi baru. Tindakan?', answer: 'Belajar mandiri dan minta pelatihan.' },
  { id: 93, category: 'TKP', question: 'Keluhan warga viral di medsos. Tindakan?', answer: 'Tanggapi sopan via kanal resmi dan tindaklanjuti.' },
  { id: 94, category: 'TKP', question: 'Konflik internal tim meningkat. Tindakan?', answer: 'Fasilitasi musyawarah dan fokus pada tujuan.' },
  { id: 95, category: 'TKP', question: 'Melihat kesalahan yang bisa merugikan publik. Tindakan?', answer: 'Ingatkan dan laporkan sesuai prosedur.' },
  { id: 96, category: 'TKP', question: 'Bekerja lintas budaya intens. Tindakan?', answer: 'Adaptif dan menghargai perbedaan.' },
  { id: 97, category: 'TKP', question: 'Menemukan peluang perbaikan layanan. Tindakan?', answer: 'Usulkan kepada atasan dengan data.' },
  { id: 98, category: 'TKP', question: 'Ada tekanan memanipulasi data. Tindakan?', answer: 'Tolak dan jaga integritas.' },
  { id: 99, category: 'TKP', question: 'Anda terlambat karena alasan pribadi. Tindakan?', answer: 'Minta maaf dan kompensasi kerja.' },
  { id: 100, category: 'TKP', question: 'Ada perubahan kebijakan mendadak. Tindakan?', answer: 'Pelajari cepat dan sosialisasikan dengan jelas.' },
]

function App() {
  const [index, setIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [jumpValue, setJumpValue] = useState('1')
  const [category, setCategory] = useState<CategoryFilter>('ALL')

  const filteredCards = useMemo(
    () => (category === 'ALL' ? flashcards : flashcards.filter((card) => card.category === category)),
    [category]
  )
  const total = filteredCards.length
  const current = filteredCards[index]
  const progress = useMemo(() => Math.round(((index + 1) / total) * 100), [index, total])
  const isFirst = index === 0
  const isLast = index === total - 1

  useEffect(() => {
    setJumpValue(String(index + 1))
  }, [index])

  useEffect(() => {
    setShowAnswer(false)
    setIndex(0)
  }, [category])

  const goPrev = () => {
    setShowAnswer(false)
    setIndex((prev) => (prev === 0 ? 0 : prev - 1))
  }

  const goNext = () => {
    setShowAnswer(false)
    setIndex((prev) => (prev === total - 1 ? prev : prev + 1))
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Flashcard CPNS 2026</h1>
          <p>Latihan cepat TWK, TIU, TKP. 100 kartu.</p>
          <p className="sources">Sumber rujukan: UUD 1945, KepmenPANRB 321/2024.</p>
        </div>
        <div className="meta">
          <div className="filter">
            <label htmlFor="categorySelect">Kategori</label>
            <select
              id="categorySelect"
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryFilter)}
            >
              <option value="ALL">Semua</option>
              <option value="TWK">TWK</option>
              <option value="TIU">TIU</option>
              <option value="TKP">TKP</option>
            </select>
          </div>
          <div className="counter">
            <input
              id="jumpInput"
              type="number"
              min={1}
              max={total}
              value={jumpValue}
              onChange={(e) => {
                const next = e.target.value
                setJumpValue(next)
                const raw = Number.parseInt(next, 10)
                if (Number.isNaN(raw)) return
                const clamped = Math.min(Math.max(raw, 1), total)
                if (clamped - 1 !== index) {
                  setShowAnswer(false)
                  setIndex(clamped - 1)
                }
              }}
            />
            <span className="counter-sep">/</span>
            <span className="counter-total">{total}</span>
          </div>
        </div>
      </header>

      <section className={`flashcard ${showAnswer ? 'flip' : ''}`}>
        <div className="label">{showAnswer ? 'Jawaban' : 'Soal'}</div>
        <div className="content">{showAnswer ? current.answer : current.question}</div>
      </section>

      <div className="actions">
        <button className="secondary" onClick={goPrev} disabled={isFirst}>
          Sebelumnya
        </button>
        <button className="primary" onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? 'Lihat Soal' : 'Lihat Jawaban'}
        </button>
        <button className="secondary" onClick={goNext} disabled={isLast}>
          Berikutnya
        </button>
      </div>

      <div className="progress">
        <div className="track">
          <div className="fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">{progress}% selesai</div>
      </div>
    </div>
  )
}

export default App
