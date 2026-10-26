import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-eyebrow">
          <span className="u-label">02 — Tentang</span>
          <span className="about-rule" />
          <span className="u-label">Bogor, ID</span>
        </div>

        <h3 className="title">Tentang Saya</h3>

        <p className="para">
          Siswa kelas akhir Rekayasa Perangkat Lunak dengan 2 tahun pengalaman
          membangun aplikasi web modern, mengelola basis data, dan menghadirkan
          solusi digital nyata — memadukan alur kerja AI, teknologi blockchain,
          magang industri, serta kompetisi teknologi.
        </p>

        <dl className="about-facts">
          <div>
            <dt>Pendidikan</dt>
            <dd>SMK Bina Mandiri Multimedia (RPL)</dd>
          </div>
          <div>
            <dt>Pengalaman PKL · 6 Bulan</dt>
            <dd>PT Kalibrasi Pengujian Indonesia</dd>
          </div>
          <div>
            <dt>Sertifikasi &amp; Lomba</dt>
            <dd>AWS · Binance · IDN &amp; OSCAR</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default About;
