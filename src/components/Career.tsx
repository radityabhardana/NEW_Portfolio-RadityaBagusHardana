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

        <h2 className="career-title">
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
                <h3 className="career-role-title">Web Developer &amp; Staf Teknis (PKL)</h3>
                <h4 className="career-role-sub">PT Kalibrasi Pengujian Indonesia · Januari – Juli 2026 (6 Bulan)</h4>
              </div>
            </div>
            <p className="career-year">2026</p>
            <p className="career-desc">
              Mengembangkan situs web internal menggunakan PHP, Bootstrap, dan
              MySQL untuk mendukung kebutuhan operasional perusahaan,
              melaksanakan kegiatan teknis kalibrasi serta pengujian alat ukur,
              dan mengelola pemindaian maupun pengarsipan data sertifikat.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h3 className="career-role-title">Rekayasa Perangkat Lunak (RPL)</h3>
                <h4 className="career-role-sub">SMK Bina Mandiri Multimedia · Bogor, Indonesia</h4>
              </div>
            </div>
            <p className="career-year">2024 – KINI</p>
            <p className="career-desc">
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
