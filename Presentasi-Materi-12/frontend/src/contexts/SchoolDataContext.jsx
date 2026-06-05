import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { heroApi, aboutApi, newsApi, annApi, majorsApi, galleryApi } from '../services/api';

const SchoolDataContext = createContext(null);

// ── Data fallback jika backend belum siap ─────────────────
const fallbackHero = {
  title: 'SMKN 2 Buduran',
  subtitle: 'Sekolah Menengah Kejuruan',
  description: 'Berkomitmen mempersiapkan lulusan yang kompeten, kompetitif di pasar kerja, dan siap berwirausaha.',
  tagline: 'Unggul, Mumpuni, & Berkarakter',
};

const fallbackAbout = {
  vision: 'Mewujudkan lembaga pendidikan dan pelatihan yang unggul, mumpuni, berkarakter, berlandaskan IPTEK, serta berbudaya industri dan peduli lingkungan',
  mission: [
    'Menyelenggarakan pendidikan dan pelatihan berstandar mutu tinggi yang berorientasi pada IPTEK dan nilai-nilai kemanusiaan.',
    'Membentuk karakter peserta didik yang beriman, bertakwa, berakhlak mulia, serta melestarikan budaya bangsa.',
    'Menciptakan lingkungan belajar yang aman, nyaman, bersih, dan berwawasan lingkungan.',
    'Menghasilkan lulusan berkualitas yang mampu memenuhi kebutuhan dunia usaha/dunia industri (DUDI) dan memiliki jiwa kewirausahaan.',
    'Meningkatkan kompetensi, profesionalisme, dan kesejahteraan seluruh tenaga pendidik dan kependidikan.',
  ],
  founded: '1979', students: '1.248', teachers: '100', graduates: '3.000+',
  address: 'Jl. Jenggolo No. 2A, Siwalanpanji, Kec. Buduran, Kab. Sidoarjo, Jawa Timur 61219',
  phone: '(031) 8964034', email: 'info@smkn2buduran.sch.id', website: 'www.smkn2buduran.sch.id',
  footerDesc: 'Mendidik generasi kompeten dan berkarakter untuk Indonesia yang lebih maju.',
  copyright: '© 2026 SMKN 2 Buduran. Hak Cipta Dilindungi.',
  schoolName: 'SMKN 2 Buduran', aboutSubtitle: 'Mengenal lebih dekat sekolah kami',
  majorTitle: 'Program Keahlian', majorSubtitle: '6 Jurusan unggulan siap membentuk masa depan Anda',
  newsTitle: 'Berita & Kegiatan', newsSubtitle: 'Informasi terbaru dari SMKN 2 Buduran',
  galleryTitle: 'Galeri Kegiatan', gallerySubtitle: 'Momen berharga kegiatan sekolah kami',
  annTitle: 'Pengumuman', annSubtitle: 'Informasi resmi dari pihak sekolah',
};

export function SchoolDataProvider({ children }) {
  const [hero,          setHeroState]     = useState(fallbackHero);
  const [about,         setAboutState]    = useState(fallbackAbout);
  const [news,          setNews]          = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [majors,        setMajors]        = useState([]);
  const [gallery,       setGallery]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [dbConnected,   setDbConnected]   = useState(false);

  // Ref untuk akses nilai terkini tanpa closure stale
  const heroRef      = useRef(fallbackHero);
  const aboutRef     = useRef(fallbackAbout);
  const dbRef        = useRef(false);

  // Sync ref setiap kali state berubah
  useEffect(() => { heroRef.current  = hero;        }, [hero]);
  useEffect(() => { aboutRef.current = about;       }, [about]);
  useEffect(() => { dbRef.current    = dbConnected; }, [dbConnected]);

  // ── Muat semua data dari API saat pertama kali ────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [heroData, aboutData, newsData, annData, majorsData, galleryData] =
        await Promise.all([
          heroApi.get(),
          aboutApi.get(),
          newsApi.getAll(),
          annApi.getAll(),
          majorsApi.getAll(),
          galleryApi.getAll(),
        ]);

      const safeAbout = {
        ...fallbackAbout,
        ...aboutData,
        mission: Array.isArray(aboutData.mission)
          ? aboutData.mission
          : fallbackAbout.mission,
      };
      const safeHero = { ...fallbackHero, ...heroData };

      setHeroState(safeHero);
      setAboutState(safeAbout);
      setNews(newsData   || []);
      setAnnouncements(annData    || []);
      setMajors(majorsData || []);
      setGallery(galleryData || []);
      setDbConnected(true);
      console.log('✅ Data dimuat dari MySQL');
    } catch (err) {
      console.warn('⚠️ Backend tidak tersedia, pakai data fallback:', err.message);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── HERO — setHero: update state + otomatis simpan ke DB ──
  const setHero = useCallback((updater) => {
    const prev = heroRef.current;
    const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
    setHeroState(next);                             // update tampilan web
    if (dbRef.current) {                            // simpan ke MySQL
      heroApi.update(next)
        .then(() => console.log('💾 Hero tersimpan ke DB'))
        .catch(e => console.warn('⚠️ Gagal simpan hero:', e.message));
    }
  }, []);

  // ── ABOUT — setAbout: update state + otomatis simpan ke DB ─
  const setAbout = useCallback((updater) => {
    const prev = aboutRef.current;
    const raw  = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
    // Pastikan mission selalu array
    const next = {
      ...raw,
      mission: Array.isArray(raw.mission) ? raw.mission : prev.mission,
    };
    setAboutState(next);                            // update tampilan web
    if (dbRef.current) {                            // simpan ke MySQL
      aboutApi.update(next)
        .then(() => console.log('💾 About tersimpan ke DB'))
        .catch(e => console.warn('⚠️ Gagal simpan about:', e.message));
    }
  }, []);

  // ── NEWS CRUD ─────────────────────────────────────────────
  const addNews = async (item) => {
    if (dbRef.current) {
      const created = await newsApi.create(item);
      setNews(prev => [created, ...prev]);
      console.log('💾 Berita baru tersimpan ke DB, id:', created.id);
    } else {
      setNews(prev => [{ ...item, id: Date.now() }, ...prev]);
    }
  };

  const updateNews = async (id, data) => {
    if (dbRef.current) {
      const updated = await newsApi.update(id, data);
      setNews(prev => prev.map(n => n.id === id ? updated : n));
      console.log('💾 Berita id=' + id + ' diupdate di DB');
    } else {
      setNews(prev => prev.map(n => n.id === id ? { ...n, ...data } : n));
    }
  };

  const deleteNews = async (id) => {
    if (dbRef.current) {
      await newsApi.delete(id);
      console.log('🗑️ Berita id=' + id + ' dihapus dari DB');
    }
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // ── ANNOUNCEMENT CRUD ─────────────────────────────────────
  const addAnnouncement = async (item) => {
    if (dbRef.current) {
      const created = await annApi.create(item);
      setAnnouncements(prev => [created, ...prev]);
      console.log('💾 Pengumuman baru tersimpan ke DB, id:', created.id);
    } else {
      setAnnouncements(prev => [{ ...item, id: Date.now() }, ...prev]);
    }
  };

  const updateAnnouncement = async (id, data) => {
    if (dbRef.current) {
      const updated = await annApi.update(id, data);
      setAnnouncements(prev => prev.map(a => a.id === id ? updated : a));
      console.log('💾 Pengumuman id=' + id + ' diupdate di DB');
    } else {
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    }
  };

  const deleteAnnouncement = async (id) => {
    if (dbRef.current) {
      await annApi.delete(id);
      console.log('🗑️ Pengumuman id=' + id + ' dihapus dari DB');
    }
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  // ── MAJOR CRUD ────────────────────────────────────────────
  const addMajor = async (item) => {
    if (dbRef.current) {
      const created = await majorsApi.create(item);
      setMajors(prev => [...prev, created]);
      console.log('💾 Jurusan baru tersimpan ke DB, id:', created.id);
    } else {
      setMajors(prev => [...prev, { ...item, id: Date.now() }]);
    }
  };

  const updateMajor = async (id, data) => {
    if (dbRef.current) {
      const updated = await majorsApi.update(id, data);
      setMajors(prev => prev.map(m => m.id === id ? updated : m));
      console.log('💾 Jurusan id=' + id + ' diupdate di DB');
    } else {
      setMajors(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    }
  };

  const deleteMajor = async (id) => {
    if (dbRef.current) {
      await majorsApi.delete(id);
      console.log('🗑️ Jurusan id=' + id + ' dihapus dari DB');
    }
    setMajors(prev => prev.filter(m => m.id !== id));
  };

  // ── GALLERY CRUD ──────────────────────────────────────────
  const addGallery = async (item) => {
    if (dbRef.current) {
      const created = await galleryApi.create(item);
      setGallery(prev => [...prev, created]);
      console.log('💾 Galeri baru tersimpan ke DB, id:', created.id);
    } else {
      setGallery(prev => [...prev, { ...item, id: Date.now() }]);
    }
  };

  const deleteGallery = async (id) => {
    if (dbRef.current) {
      await galleryApi.delete(id);
      console.log('🗑️ Galeri id=' + id + ' dihapus dari DB');
    }
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  return (
    <SchoolDataContext.Provider value={{
      hero, about, news, announcements, majors, gallery,
      loading, dbConnected,
      // setHero & setAbout otomatis sync ke MySQL saat dipanggil
      setHero, setAbout,
      // CRUD otomatis sync ke MySQL
      addNews, updateNews, deleteNews,
      addAnnouncement, updateAnnouncement, deleteAnnouncement,
      addMajor, updateMajor, deleteMajor,
      addGallery, deleteGallery,
      refetch: fetchAll,
    }}>
      {children}
    </SchoolDataContext.Provider>
  );
}

export function useSchoolData() {
  return useContext(SchoolDataContext);
}
