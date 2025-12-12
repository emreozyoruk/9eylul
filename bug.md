# 🐛 9 Eylül Üniversitesi - QA Workshop Bug Hunting Challenge

## 📋 TOPLAM 15 BUG LİSTESİ

> ⚠️ **DİKKAT:** Bu dosya eğitmenler içindir. Öğrencilere göstermeyiniz!

---

## BUG #1 - Navigation Hatası (UI/UX Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Navbar "Programlar" linki yanlış yere yönlendiriyor |
| **Açıklama** | Navigasyon menüsündeki "Programlar" butonuna tıklandığında, sayfa "Bölümlerimiz" bölümüne gitmesi gerekirken "İletişim" bölümüne yönlendiriyor. Link href değeri `#programlar` yerine `#iletisim` olarak tanımlanmış. |
| **Konum** | `src/App.jsx`, satır ~93 |
| **Severity** | Medium |
| **Çözüm** | `href="#iletisim"` → `href="#programlar"` |

---

## BUG #2 - Form Submit Çalışmıyor (Fonksiyonel Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | İletişim formu gönderilemiyor |
| **Açıklama** | İletişim formunu doldurup "Gönder" butonuna tıklandığında form submit olmuyor. Buton `type="submit"` yerine `type="button"` olarak tanımlanmış. |
| **Konum** | `src/App.jsx`, satır ~263 |
| **Severity** | High |
| **Çözüm** | `type="button"` → `type="submit"` |

---

## BUG #3 - Tarih Formatı Hatası (Data/Display Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Duyurulardaki tarihler yanlış formatta |
| **Açıklama** | Tarihler Türkiye standardı GG/AA/YYYY formatı yerine YYYY/MM/DD formatında. Örneğin "15/01/2025" yerine "2025/01/15" yazıyor. |
| **Konum** | `src/App.jsx`, satır ~52-66 |
| **Severity** | Low |
| **Çözüm** | `"2025/01/15"` → `"15/01/2025"` |

---

## BUG #4 - Sayaç Ters Çalışıyor (Logic/State Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Ziyaretçi sayacı artmak yerine azalıyor |
| **Açıklama** | "Keşfet" butonuna her tıklandığında ziyaretçi sayısı 1 artması gerekirken 1 azalıyor. `prev + 1` yerine `prev - 1` kullanılmış. |
| **Konum** | `src/App.jsx`, satır ~41 |
| **Severity** | Medium |
| **Çözüm** | `prev - 1` → `prev + 1` |

---

## BUG #5 - Yazım Hatası (Typo Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Ana başlıkta yazım hatası |
| **Açıklama** | Hero bölümündeki başlıkta "Hoşgeldiniz" yerine "Hoşgedliniz" yazıyor. |
| **Konum** | `src/App.jsx`, satır ~115 |
| **Severity** | Low |
| **Çözüm** | `Hoşgedliniz` → `Hoşgeldiniz` |

---

## BUG #6 - Yanlış Event Handler (Interaction Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Dark mode butonu tıklama yerine hover'da çalışıyor |
| **Açıklama** | Tema değiştirme butonu `onClick` yerine `onMouseOver` kullanıyor. Kullanıcı butona tıklamak yerine üzerine geldiğinde tema değişiyor. |
| **Konum** | `src/App.jsx`, satır ~100-104 |
| **Severity** | High |
| **Çözüm** | `onMouseOver` → `onClick` |

---

## BUG #7 - Placeholder Yapısı Hatalı (Semantic/Accessibility Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Kampüs görseli için semantik yapı hatalı |
| **Açıklama** | Hakkımızda bölümündeki "Kampüs Görünümü" placeholder'ı `<div>` ile yapılmış ancak gerçek bir görsel (`<img>`) kullanılması gerekiyor. Ayrıca mevcut yapıda `alt` attribute veya `aria-label` gibi accessibility özellikleri eksik. |
| **Konum** | `src/App.jsx`, satır ~168-172 |
| **Severity** | Medium |
| **Çözüm** | Gerçek bir görsel eklenip `alt` attribute'u ile birlikte kullanılmalı veya `role="img"` ve `aria-label` eklenmelidir |

---

## BUG #8 - Kırık Link (Link Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | "Devamını Oku" linkleri çalışmıyor |
| **Açıklama** | Duyurulardaki "Devamını Oku" linkleri `href="#"` ile tanımlanmış, gerçek bir sayfaya yönlendirmiyor. |
| **Konum** | `src/App.jsx`, satır ~195 |
| **Severity** | Low |
| **Çözüm** | Gerçek sayfa URL'leri eklenmeli veya modal açılmalı |

---

## BUG #9 - useEffect Dependency Hatası (React Hook Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Dark mode body class güncellenmiyor |
| **Açıklama** | `useEffect` hook'unda dependency array boş bırakılmış. `darkMode` state'i değiştiğinde body class'ı güncellenmiyor. Array'e `[darkMode]` eklenmeli. |
| **Konum** | `src/App.jsx`, satır ~18-20 |
| **Severity** | High |
| **Çözüm** | `}, [])` → `}, [darkMode])` |

---

## BUG #10 - Yanlış Email Validation (Validation Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Email doğrulama eksik çalışıyor |
| **Açıklama** | Email validation regex'i `@` işaretinden sonra nokta kontrolü yapmıyor. `test@test` geçerli email olarak kabul ediliyor. |
| **Konum** | `src/App.jsx`, satır ~44-47 |
| **Severity** | Medium |
| **Çözüm** | `/^[^\s@]+@[^\s@]+$/` → `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |

---

## BUG #11 - State Güncellenmemiş (State Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Duyuru sayısı her zaman 0 gösteriyor |
| **Açıklama** | `newsCount` state'i 0 olarak başlatılıp hiç güncellenmemiş. 3 duyuru olmasına rağmen hero bölümünde "0 Duyuru" yazıyor. |
| **Konum** | `src/App.jsx`, satır ~15, ~132 |
| **Severity** | Medium |
| **Çözüm** | `useState(0)` → `useState(3)` veya `announcements.length` kullanılmalı |

---

## BUG #12 - Negatif Değer (Data Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Öğrenci sayısı negatif değer gösteriyor |
| **Açıklama** | "Yapay Zeka ve Veri Bilimi" bölümü için öğrenci sayısı `-180` olarak tanımlanmış. Mantıksal olarak imkansız bir değer. |
| **Konum** | `src/App.jsx`, satır ~75 |
| **Severity** | Medium |
| **Çözüm** | `students: -180` → `students: 180` |

---

## BUG #13 - Yanlış Toplam Hesaplama (Calculation Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Toplam öğrenci sayısı yanlış hesaplanıyor |
| **Açıklama** | Hero'daki toplam öğrenci sayısı tüm bölümlerin toplamı yerine sadece ilk bölümün (450) değerini gösteriyor. `reduce()` yerine `programs[0].students` kullanılmış. |
| **Konum** | `src/App.jsx`, satır ~78 |
| **Severity** | High |
| **Çözüm** | `programs[0].students` → `programs.reduce((sum, p) => sum + p.students, 0)` |

---

## BUG #14 - Tıklanamayan Telefon (UX Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Telefon numarası tıklanabilir link değil |
| **Açıklama** | Hakkımızda bölümündeki telefon numarası düz metin olarak yazılmış. Mobil cihazlarda `tel:` protokolü ile tıklanabilir olması gerekiyor. |
| **Konum** | `src/App.jsx`, satır ~162-164 |
| **Severity** | Low |
| **Çözüm** | `📞 Hızlı İletişim: 0232 301 00 00` → `📞 Hızlı İletişim: <a href="tel:+902323010000">0232 301 00 00</a>` |

---

## BUG #15 - Email Link Hatası (Link Bug)

| Alan | Detay |
|------|-------|
| **Başlık** | Email linki düzgün çalışmıyor |
| **Açıklama** | İletişim bölümündeki email adresi `mailto:` protokolü olmadan link yapılmış. Tıklandığında email uygulaması açılması gerekiyor ama açılmıyor. |
| **Konum** | `src/App.jsx`, satır ~225 |
| **Severity** | Medium |
| **Çözüm** | `href="info@deu.edu.tr"` → `href="mailto:info@deu.edu.tr"` |

---

## 📊 Bug Kategorileri Özeti

| Kategori | Adet | Bug Numaraları |
|----------|------|----------------|
| **UI/UX Bug** | 3 | #1, #5, #14 |
| **Fonksiyonel Bug** | 2 | #2, #6 |
| **Data/Logic Bug** | 4 | #3, #4, #12, #13 |
| **State Bug** | 2 | #9, #11 |
| **Validation Bug** | 1 | #10 |
| **Accessibility Bug** | 1 | #7 |
| **Link Bug** | 2 | #8, #15 |

---

## 🏆 Zorluk Seviyesi

| Zorluk | Bug Numaraları |
|--------|----------------|
| **Kolay (5)** | #3, #5, #8, #12, #14 |
| **Orta (6)** | #1, #4, #7, #10, #11, #15 |
| **Zor (4)** | #2, #6, #9, #13 |

---

## 📝 Öğrenciler İçin Bug Report Şablonu

```markdown
## 🐛 Bug Report

**Başlık:** [Kısa ve açıklayıcı bir başlık]

**Severity:** [Critical / High / Medium / Low]

**Adımlar:**
1. [İlk adım]
2. [İkinci adım]
3. ...

**Beklenen Sonuç:** [Ne olması gerekiyordu]

**Gerçekleşen Sonuç:** [Ne oldu]

**Konum:** [Dosya/Satır bilgisi - opsiyonel]

**Ekran Görüntüsü:** [Varsa ekleyin]
```

---

## 🎯 Puanlama Önerisi

| Zorluk | Puan |
|--------|------|
| Kolay Bug | 5 puan |
| Orta Bug | 10 puan |
| Zor Bug | 15 puan |

**Maksimum Puan:** 5×5 + 6×10 + 4×15 = 25 + 60 + 60 = **145 puan**

---

## 🚀 Projeyi Çalıştırma

```bash
cd /Users/emreozyoruk/Desktop/rpoject/dokuzeylul
npm install
npm run dev
```

Site: **http://localhost:5173**

---

*9 Eylül Üniversitesi QA Workshop - Bug Hunting Challenge*
*Tarih: 12 Aralık 2025*

