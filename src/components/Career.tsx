import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <div className="career-eyebrow">
          <span className="u-label">04 — Pengalaman</span>
          <span className="career-rule" />
          <span className="u-label">2 Tahun Pengalaman</span>
        </div>

        <h2>
          Pengalaman <span>&amp;</span>
          <br /> pendidikan
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Developer &amp; Staf Teknis (PKL)</h4>
                <h5>PT Kalibrasi Pengujian Indonesia · Januari – Juli 2026 (6 Bulan)</h5>
              </div>
            </div>
            <h3>2026</h3>
            <p>
              Mengembangkan situs web internal menggunakan PHP, Bootstrap, dan
              MySQL untuk mendukung kebutuhan operasional perusahaan,
              melaksanakan kegiatan teknis kalibrasi serta pengujian alat ukur,
              dan mengelola pemindaian maupun pengarsipan data sertifikat.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Rekayasa Perangkat Lunak (RPL)</h4>
                <h5>SMK Bina Mandiri Multimedia · Bogor, Indonesia</h5>
              </div>
            </div>
            <h3>2024 – KINI</h3>
            <p>
              Mendalami pengembangan perangkat lunak, arsitektur aplikasi web
              modern, perancangan basis data relasional, serta pemanfaatan agen
              AI untuk analisis kode, debugging, dan optimasi alur kerja
              pengembangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
