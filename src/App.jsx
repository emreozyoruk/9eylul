import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // BUG #4: Ziyaretçi sayacı artmak yerine azalıyor (increment yerine decrement)
  const [visitorCount, setVisitorCount] = useState(1250)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // BUG #11: News count state hiç güncellenmemiş, her zaman 0 gösteriyor
  const [newsCount, setNewsCount] = useState(0)

  // BUG #9: useEffect dependency array yanlış - darkMode yerine boş array
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : ''
  }, []) // Boş array olduğu için darkMode değişse bile body class güncellenmez

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // BUG #2: Form submit fonksiyonu çağrılmıyor çünkü button type="button"
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const incrementVisitor = () => {
    // BUG #4: Burada + yerine - kullanılmış
    setVisitorCount(prev => prev - 1)
  }

  // BUG #10: Email validation regex yanlış - @ işaretinden sonra nokta kontrolü yok
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+$/ // Doğrusu: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const announcements = [
    {
      id: 1,
      title: "Bahar Dönemi Kayıtları Başladı",
      // BUG #3: Tarih formatı yanlış (YYYY/MM/DD yerine DD/MM/YYYY olmalı)
      date: "2025/01/15",
      description: "2024-2025 Bahar dönemi kayıtları başlamıştır."
    },
    {
      id: 2,
      title: "QA Workshop Etkinliği",
      date: "2025/12/12",
      description: "Yazılım Test ve QA konusunda workshop düzenlenecektir."
    },
    {
      id: 3,
      title: "Kariyer Günleri",
      date: "2025/03/20",
      description: "Sektörün önde gelen firmaları kampüsümüzde olacak."
    }
  ]

  const programs = [
    { id: 1, name: "Bilgisayar Mühendisliği", students: 450, icon: "💻" },
    { id: 2, name: "Yazılım Mühendisliği", students: 380, icon: "🖥️" },
    { id: 3, name: "Bilişim Sistemleri", students: 220, icon: "🌐" },
    // BUG #12: Öğrenci sayısı negatif (mantıksal hata)
    { id: 4, name: "Yapay Zeka ve Veri Bilimi", students: -180, icon: "🤖" }
  ]

  // BUG #13: Toplam öğrenci hesaplaması yanlış - reduce yerine sadece ilk elemanı alıyor
  const totalStudents = programs[0].students // Doğrusu: programs.reduce((sum, p) => sum + p.students, 0)

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">9 Eylül Üniversitesi</span>
        </div>
        
        {/* Hamburger Menu Button - Mobile */}
        <button 
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#anasayfa" onClick={() => setMobileMenuOpen(false)}>Ana Sayfa</a></li>
          <li><a href="#hakkimizda" onClick={() => setMobileMenuOpen(false)}>Hakkımızda</a></li>
          {/* BUG #1: Programlar linki yanlış yere yönlendiriyor (#iletisim yerine #programlar olmalı) */}
          <li><a href="#iletisim" onClick={() => setMobileMenuOpen(false)}>Programlar</a></li>
          <li><a href="#duyurular" onClick={() => setMobileMenuOpen(false)}>Duyurular</a></li>
          <li><a href="#iletisim" onClick={() => setMobileMenuOpen(false)}>İletişim</a></li>
        </ul>
        {/* BUG #6: Dark mode toggle onclick yerine onMouseOver kullanılmış */}
        <button 
          className="theme-toggle" 
          onMouseOver={() => setDarkMode(!darkMode)}
          title="Tema Değiştir"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="anasayfa" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {/* BUG #5: Başlıkta yazım hatası "Hoşgeldiniz" yerine "Hoşgedliniz" */}
            9 Eylül Üniversitesi'ne Hoşgedliniz
          </h1>
          <p className="hero-subtitle">
            Bilgi, Bilim ve Gelecek İçin Birlikte
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              {/* BUG #13: Toplam öğrenci sayısı yanlış hesaplanıyor */}
              <span className="stat-number">{totalStudents}</span>
              <span className="stat-label">Toplam Öğrenci</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Fakülte</span>
            </div>
            <div className="stat-item">
              {/* BUG #11: News count her zaman 0 gösteriyor */}
              <span className="stat-number">{newsCount}</span>
              <span className="stat-label">Duyuru</span>
            </div>
          </div>
          <button className="cta-button" onClick={incrementVisitor}>
            Keşfet ({visitorCount} ziyaretçi)
          </button>
        </div>
        <div className="hero-decoration">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section id="hakkimizda" className="about">
        <div className="section-container">
          <h2 className="section-title">Hakkımızda</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                9 Eylül Üniversitesi, 1982 yılında kurulan ve İzmir'in en köklü 
                üniversitelerinden biridir. Mühendislik, Tıp, Hukuk, İktisat ve 
                daha birçok alanda eğitim veren üniversitemiz, 40 yılı aşkın 
                tecrübesiyle geleceğin liderlerini yetiştirmektedir.
              </p>
              <p>
                Yazılım Test ve Kalite Güvence (QA) alanında düzenlediğimiz 
                bu workshop ile öğrencilerimize sektörde çok değerli olan 
                bug hunting yeteneklerini kazandırmayı hedefliyoruz.
              </p>
              {/* BUG #14: Telefon numarası tıklanabilir link olmalı ama düz metin */}
              <p className="contact-quick">
                📞 Hızlı İletişim: 0232 301 00 00
              </p>
            </div>
            <div className="about-image">
              {/* BUG #7: Alt text eksik (accessibility hatası) */}
              <div className="image-placeholder">
                <span>🏛️</span>
                <p>Kampüs Görünümü</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programlar Section */}
      <section id="programlar" className="programs">
        <div className="section-container">
          <h2 className="section-title">Bölümlerimiz</h2>
          <div className="programs-grid">
            {programs.map(program => (
              <div key={program.id} className="program-card">
                <span className="program-icon">{program.icon}</span>
                <h3>{program.name}</h3>
                {/* BUG #12: Negatif öğrenci sayısı gösteriliyor */}
                <p>{program.students} Öğrenci</p>
                <button className="program-button">Detaylar</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Duyurular Section */}
      <section id="duyurular" className="announcements">
        <div className="section-container">
          <h2 className="section-title">Duyurular</h2>
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-card">
                <div className="announcement-date">
                  {/* BUG #3: Tarih formatı yanlış gösteriliyor */}
                  📅 {announcement.date}
                </div>
                <h3>{announcement.title}</h3>
                <p>{announcement.description}</p>
                {/* BUG #8: Link href="#" kullanılmış, gerçek sayfa yok + yeni sekmede açılmıyor */}
                <a href="#" className="read-more">Devamını Oku →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim Section */}
      <section id="iletisim" className="contact">
        <div className="section-container">
          <h2 className="section-title">İletişim</h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <div className="info-item">
                <span className="info-icon">📍</span>
                <div>
                  <h4>Adres</h4>
                  <p>Cumhuriyet Bulvarı No:144, 35210 Konak/İzmir</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">📞</span>
                <div>
                  <h4>Telefon</h4>
                  <p>+90 232 301 00 00</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">✉️</span>
                <div>
                  <h4>E-posta</h4>
                  {/* BUG #15: Email linki mailto: protokolü eksik */}
                  <a href="info@deu.edu.tr" className="email-link">info@deu.edu.tr</a>
                </div>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              {formSubmitted && (
                <div className="success-message">
                  ✅ Mesajınız başarıyla gönderildi!
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Ad Soyad</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Adınızı giriniz"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-posta</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-posta adresinizi giriniz"
                  required
                />
                {/* BUG #10: Email validation göstergesi - yanlış regex kullanıyor */}
                {formData.email && (
                  <span className={`validation-hint ${validateEmail(formData.email) ? 'valid' : 'invalid'}`}>
                    {validateEmail(formData.email) ? '✓ Geçerli email' : '✗ Geçersiz email'}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message">Mesajınız</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Mesajınızı yazınız"
                  rows="4"
                  required
                ></textarea>
              </div>
              {/* BUG #2: Button type="button" olduğu için form submit olmuyor */}
              <button type="button" className="submit-button">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-icon">🎓</span>
            <span>9 Eylül Üniversitesi</span>
          </div>
          <div className="footer-links">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hakkimizda">Hakkımızda</a>
            <a href="#programlar">Programlar</a>
            <a href="#iletisim">İletişim</a>
          </div>
          <div className="footer-social">
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">🐦</a>
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">💼</a>
          </div>
          <p className="footer-copyright">
            {/* Doğru yıl gösterimi için Date kullanılmalı ama hardcoded 2024 yazılmış */}
            © 2024 9 Eylül Üniversitesi - QA Workshop Bug Hunting Challenge
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
