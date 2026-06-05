import { motion, AnimatePresence } from 'framer-motion';
import { useSchoolData } from '../contexts/SchoolDataContext';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Edit2, Check, X, LogOut, Shield, User as UserIcon,
  LayoutDashboard, Plus, Trash2, Save
} from 'lucide-react';

/* ─────────────────────────────────────────────
   KOMPONEN INLINE EDIT
   Klik teks → jadi input/textarea → simpan/batal
───────────────────────────────────────────── */
function EditableText({ isAdmin, value, onSave, className = '', multiline = false, tag: Tag = 'span' }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const ref = useRef(null);

  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);
  useEffect(() => { setVal(value); }, [value]);

  const save = () => { if (val.trim()) onSave(val.trim()); setEditing(false); };
  const cancel = () => { setVal(value); setEditing(false); };

  if (!isAdmin) return <Tag className={className}>{value}</Tag>;

  if (editing) {
    return (
      <span className="inline-flex flex-col gap-1 w-full">
        {multiline ? (
          <textarea
            ref={ref}
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') cancel(); if (e.key === 'Enter' && e.ctrlKey) save(); }}
            rows={3}
            className="w-full bg-blue-900/30 border border-blue-400/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
          />
        ) : (
          <input
            ref={ref}
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel(); }}
            className="w-full bg-blue-900/30 border border-blue-400/60 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <span className="flex gap-1">
          <button onClick={save}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/20 border border-green-500/40 text-green-300 text-xs hover:bg-green-500/40 transition-colors">
            <Check size={12} /> Simpan
          </button>
          <button onClick={cancel}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 text-xs hover:bg-red-500/40 transition-colors">
            <X size={12} /> Batal
          </button>
        </span>
      </span>
    );
  }

  return (
    <Tag
      onClick={() => setEditing(true)}
      title="Klik untuk edit"
      className={`${className} relative group/edit cursor-text hover:bg-blue-500/10 hover:outline hover:outline-1 hover:outline-blue-400/40 hover:outline-offset-2 rounded transition-all`}
    >
      {value}
      <Edit2 size={10} className="inline-block ml-1 text-blue-400/60 opacity-0 group-hover/edit:opacity-100 transition-opacity shrink-0" />
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   MODAL TAMBAH/EDIT
───────────────────────────────────────────── */
function Modal({ title, children, onClose }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg bg-[#0f1628] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <button onClick={onClose} className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   HALAMAN UTAMA
───────────────────────────────────────────── */
export default function SchoolWebsite() {
  const {
    hero, setHero,
    about, setAbout,
    news, addNews, updateNews, deleteNews,
    announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
    majors, addMajor, updateMajor, deleteMajor,
    gallery, addGallery, deleteGallery,
  } = useSchoolData();

  const { user, isAdmin, logout } = useAuth();
  const admin = isAdmin();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  // Modal states
  const [newsModal, setNewsModal] = useState(null);   // null | 'add' | item
  const [annModal, setAnnModal] = useState(null);
  const [majorModal, setMajorModal] = useState(null);
  const [galleryModal, setGalleryModal] = useState(false);

  // Form states
  const emptyNews = { title: '', category: 'Berita', summary: '', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), image: '📰', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30' };
  const emptyAnn = { title: '', date: new Date().toLocaleDateString('id-ID'), type: 'info' };
  const emptyMajor = { name: '', icon: '📚', students: '0', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30', desc: '' };
  const emptyGallery = { title: '', emoji: '📷', color: 'bg-blue-500/30' };

  const [formNews, setFormNews] = useState(emptyNews);
  const [formAnn, setFormAnn] = useState(emptyAnn);
  const [formMajor, setFormMajor] = useState(emptyMajor);
  const [formGallery, setFormGallery] = useState(emptyGallery);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Jurusan', href: '#jurusan' },
    { label: 'Berita', href: '#berita' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Pengumuman', href: '#pengumuman' },
  ];

  const annColors = {
    urgent: 'bg-red-500/10 border-red-500/30',
    warning: 'bg-yellow-500/10 border-yellow-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
  };
  const annBadge = {
    urgent: { cls: 'bg-red-500/20 text-red-300', label: '🔴 Penting' },
    warning: { cls: 'bg-yellow-500/20 text-yellow-300', label: '🟡 Perhatian' },
    info: { cls: 'bg-blue-500/20 text-blue-300', label: '🔵 Info' },
  };

  /* helper singkat */
  const E = (props) => <EditableText isAdmin={admin} {...props} />;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans">

      {/* ═══ ADMIN BANNER ═══ */}
      {admin && (
        <motion.div initial={{ y: -50 }} animate={{ y: 0 }}
          className="sticky top-0 z-[100] bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-xl border-b border-white/10 px-6 py-2.5 flex items-center justify-between text-sm shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
            <span className="font-semibold text-white">✏️ Mode Edit Admin Aktif</span>
            <span className="text-blue-200/80 text-xs">— Klik teks mana saja untuk mengedit langsung</span>
          </div>
          <span className="text-xs text-white/50">Perubahan langsung tersimpan</span>
        </motion.div>
      )}

      {/* ═══ NAVBAR ═══ */}
      <nav className="sticky top-0 z-50 bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-white/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div className="flex items-center gap-3 shrink-0" whileHover={{ scale: 1.02 }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/30">S</div>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                <E value={hero.title} onSave={v => setHero(h => ({ ...h, title: v }))} className="text-white" />
              </h1>
              <p className="text-[10px] text-gray-400">Sekolah Menengah Kejuruan</p>
            </div>
          </motion.div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="text-sm text-gray-400 hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                {admin ? <Shield size={13} className="text-blue-400" /> : <UserIcon size={13} className="text-purple-400" />}
                <span className="text-xs text-gray-300">{user.name}</span>
                {admin && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 ml-1">Admin</span>}
              </div>
              {admin && (
                <Link to="/admin/dashboard"
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs hover:bg-blue-500/20 transition-colors">
                  <LayoutDashboard size={12} /> Dashboard
                </Link>
              )}
              <button onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs hover:bg-red-500/20 transition-colors">
                <LogOut size={12} /> Keluar
              </button>
            </div>
          ) : (
            <Link to="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              Masuk
            </Link>
          )}
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
        {/* BG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.05)_0%,_transparent_70%)]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>

            {/* Tagline badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
              <E value={hero.tagline} onSave={v => setHero(h => ({ ...h, tagline: v }))} className="text-blue-300" />
            </div>

            {/* Judul Besar */}
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                <E value={hero.title} onSave={v => setHero(h => ({ ...h, title: v }))} className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400" tag="span" />
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
              <E value={hero.subtitle} onSave={v => setHero(h => ({ ...h, subtitle: v }))} className="text-gray-200" />
            </h2>

            {/* Deskripsi */}
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              <E value={hero.description} onSave={v => setHero(h => ({ ...h, description: v }))} multiline className="text-gray-400" />
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a href="#jurusan" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all">
                Lihat Program Keahlian
              </motion.a>
              <motion.a href="#tentang" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-semibold text-white hover:bg-white/10 transition-all">
                Tentang Kami
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-6 mt-20">
            {[
              { key: 'students', label: 'Siswa Aktif' },
              { key: 'teachers', label: 'Tenaga Pendidik' },
              { key: 'graduates', label: 'Alumni' },
            ].map(s => (
              <div key={s.key} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="text-3xl font-black mb-1">
                  <E value={about[s.key]} onSave={v => setAbout(a => ({ ...a, [s.key]: v }))}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" />
                </div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TENTANG ═══ */}
      <section id="tentang" className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-4xl mb-4">
              <E value={about.schoolName || 'Tentang Sekolah'} onSave={v => setAbout(a => ({ ...a, schoolName: v }))}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" tag="span" />
            </h2>
            <p className="text-gray-400">
              <E value={about.aboutSubtitle || 'Mengenal lebih dekat sekolah kami'} onSave={v => setAbout(a => ({ ...a, aboutSubtitle: v }))} className="text-gray-400" />
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Visi */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl">🎯</div>
                <h3 className="text-xl font-bold text-white">Visi</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                <E value={about.vision} onSave={v => setAbout(a => ({ ...a, vision: v }))} multiline className="text-gray-300" />
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl">📌</div>
                <h3 className="text-xl font-bold text-white">Misi</h3>
              </div>
              <ul className="space-y-3">
                {about.mission.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 group/misi">
                    <span className="mt-1 w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs text-purple-300 shrink-0">{i + 1}</span>
                    <span className="text-gray-300 text-sm flex-1">
                      <E value={m} onSave={v => {
                        const newMission = [...about.mission];
                        newMission[i] = v;
                        setAbout(a => ({ ...a, mission: newMission }));
                      }} multiline className="text-gray-300 text-sm" />
                    </span>
                    {admin && (
                      <button onClick={() => {
                        const newMission = about.mission.filter((_, idx) => idx !== i);
                        setAbout(a => ({ ...a, mission: newMission }));
                      }} className="opacity-0 group-hover/misi:opacity-100 p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all shrink-0">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </li>
                ))}
                {admin && (
                  <li>
                    <button onClick={() => setAbout(a => ({ ...a, mission: [...a.mission, 'Misi baru (klik untuk edit)'] }))}
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2">
                      <Plus size={12} /> Tambah Misi
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎓', label: 'Berdiri Sejak', key: 'founded' },
              { icon: '👨‍🎓', label: 'Siswa Aktif', key: 'students' },
              { icon: '👨‍🏫', label: 'Guru & Staf', key: 'teachers' },
              { icon: '🏅', label: 'Lulusan', key: 'graduates' },
            ].map(s => (
              <div key={s.key} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  <E value={about[s.key]} onSave={v => setAbout(a => ({ ...a, [s.key]: v }))} className="text-white" />
                </div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ JURUSAN ═══ */}
      <section id="jurusan" className="py-24 px-6 relative">
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-3">
                <E value={about.majorTitle || 'Program Keahlian'} onSave={v => setAbout(a => ({ ...a, majorTitle: v }))}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" tag="span" />
              </h2>
              <p className="text-gray-400">
                <E value={about.majorSubtitle || 'Jurusan unggulan siap membentuk masa depan Anda'} onSave={v => setAbout(a => ({ ...a, majorSubtitle: v }))} className="text-gray-400" />
              </p>
            </div>
            {admin && (
              <button onClick={() => { setFormMajor(emptyMajor); setMajorModal('add'); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/30 transition-colors">
                <Plus size={16} /> Tambah Jurusan
              </button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majors.map((m, i) => (
              <motion.div key={m.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative p-6 rounded-3xl bg-gradient-to-br ${m.color} border ${m.border} backdrop-blur-xl group overflow-hidden`}>
                {/* Emoji bg */}
                <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:opacity-20 transition-opacity select-none">{m.icon}</div>

                {/* Admin actions */}
                {admin && (
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => { setFormMajor(m); setMajorModal(m); }}
                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => deleteMajor(m.id)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}

                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  <E value={m.name} onSave={v => updateMajor(m.id, { name: v })} className="text-white" />
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  <E value={m.desc} onSave={v => updateMajor(m.id, { desc: v })} multiline className="text-sm text-gray-400" />
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 border ${m.border} text-gray-300`}>
                  👥 <E value={m.students} onSave={v => updateMajor(m.id, { students: v })} className="text-gray-300 ml-1" /> Siswa
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BERITA ═══ */}
      <section id="berita" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-3">
                <E value={about.newsTitle || 'Berita & Kegiatan'} onSave={v => setAbout(a => ({ ...a, newsTitle: v }))}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" tag="span" />
              </h2>
              <p className="text-gray-400">
                <E value={about.newsSubtitle || 'Informasi terbaru dari sekolah kami'} onSave={v => setAbout(a => ({ ...a, newsSubtitle: v }))} className="text-gray-400" />
              </p>
            </div>
            {admin && (
              <button onClick={() => { setFormNews(emptyNews); setNewsModal('add'); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/30 transition-colors">
                <Plus size={16} /> Tambah Berita
              </button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((n, i) => (
              <motion.div key={n.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-3xl bg-gradient-to-br ${n.color} border ${n.border} backdrop-blur-xl group relative`}>

                {/* Admin actions */}
                {admin && (
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setFormNews(n); setNewsModal(n); }}
                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => deleteNews(n.id)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{n.image}</span>
                  <div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 border ${n.border} text-gray-300`}>
                      {n.category}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{n.date}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  <E value={n.title} onSave={v => updateNews(n.id, { title: v })} className="text-white group-hover:text-blue-300" />
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <E value={n.summary} onSave={v => updateNews(n.id, { summary: v })} multiline className="text-sm text-gray-400" />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALERI ═══ */}
      <section id="galeri" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-end justify-between mb-16">
            <div className="text-center w-full">
              <h2 className="text-4xl font-bold mb-3">
                <E value={about.galleryTitle || 'Galeri Kegiatan'} onSave={v => setAbout(a => ({ ...a, galleryTitle: v }))}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" tag="span" />
              </h2>
              <p className="text-gray-400">
                <E value={about.gallerySubtitle || 'Momen berharga kegiatan sekolah kami'} onSave={v => setAbout(a => ({ ...a, gallerySubtitle: v }))} className="text-gray-400" />
              </p>
            </div>
          </motion.div>

          {admin && (
            <div className="flex justify-end mb-6">
              <button onClick={() => { setFormGallery(emptyGallery); setGalleryModal(true); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-500/30 transition-colors">
                <Plus size={16} /> Tambah Foto
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((g, i) => (
              <motion.div key={g.id}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className={`relative aspect-video rounded-2xl ${g.color} border border-white/10 flex flex-col items-center justify-center gap-2 group overflow-hidden`}>
                <div className="text-5xl group-hover:scale-125 transition-transform duration-300">{g.emoji}</div>
                <p className="text-sm text-gray-300 font-medium px-2 text-center">
                  <E value={g.title} onSave={v => {
                    const idx = gallery.findIndex(x => x.id === g.id);
                    // Update via context if available, else use a workaround
                    deleteGallery(g.id);
                    addGallery({ ...g, title: v });
                  }} className="text-sm text-gray-300" />
                </p>
                {admin && (
                  <button onClick={() => deleteGallery(g.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/30 text-red-300 hover:bg-red-500/50 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={12} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PENGUMUMAN ═══ */}
      <section id="pengumuman" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-3">
                <E value={about.annTitle || 'Pengumuman'} onSave={v => setAbout(a => ({ ...a, annTitle: v }))}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" tag="span" />
              </h2>
              <p className="text-gray-400">
                <E value={about.annSubtitle || 'Informasi resmi dari pihak sekolah'} onSave={v => setAbout(a => ({ ...a, annSubtitle: v }))} className="text-gray-400" />
              </p>
            </div>
            {admin && (
              <button onClick={() => { setFormAnn(emptyAnn); setAnnModal('add'); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium shadow-lg shadow-purple-500/30 transition-colors">
                <Plus size={16} /> Tambah
              </button>
            )}
          </motion.div>

          <div className="space-y-3">
            {announcements.map((a, i) => (
              <motion.div key={a.id}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-center justify-between p-5 rounded-2xl border ${annColors[a.type]} group`}>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${annBadge[a.type].cls}`}>
                    {annBadge[a.type].label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">
                      <E value={a.title} onSave={v => updateAnnouncement(a.id, { title: v })} className="font-medium text-white" />
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <E value={a.date} onSave={v => updateAnnouncement(a.id, { date: v })} className="text-xs text-gray-500" />
                    </p>
                  </div>
                </div>
                {admin && (
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ml-3 shrink-0">
                    <button onClick={() => { setFormAnn(a); setAnnModal(a); }}
                      className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => deleteAnnouncement(a.id)}
                      className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-16 px-6 border-t border-white/10 bg-white/2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black">S</div>
              <h3 className="font-bold text-white">
                <E value={hero.title} onSave={v => setHero(h => ({ ...h, title: v }))} className="font-bold text-white" />
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              <E value={about.footerDesc || 'Mendidik generasi kompeten dan berkarakter untuk Indonesia yang lebih maju.'}
                onSave={v => setAbout(a => ({ ...a, footerDesc: v }))} multiline className="text-sm text-gray-400" />
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              {navLinks.map(l => (
                <li key={l.label}><a href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <E value={about.address || 'Alamat sekolah'} onSave={v => setAbout(a => ({ ...a, address: v }))} multiline className="text-sm text-gray-400" />
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <E value={about.phone || 'Nomor telepon'} onSave={v => setAbout(a => ({ ...a, phone: v }))} className="text-sm text-gray-400" />
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <E value={about.email || 'Email sekolah'} onSave={v => setAbout(a => ({ ...a, email: v }))} className="text-sm text-gray-400" />
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                <E value={about.website || 'Website sekolah'} onSave={v => setAbout(a => ({ ...a, website: v }))} className="text-sm text-gray-400" />
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 text-center text-xs text-gray-600">
          <E value={about.copyright || `© ${new Date().getFullYear()} ${hero.title}. Hak Cipta Dilindungi.`}
            onSave={v => setAbout(a => ({ ...a, copyright: v }))} className="text-xs text-gray-600" />
        </div>
      </footer>

      {/* ═══════════════════════════════════
          MODAL - TAMBAH/EDIT BERITA
      ═══════════════════════════════════ */}
      {newsModal && (
        <Modal title={newsModal === 'add' ? 'Tambah Berita' : 'Edit Berita'} onClose={() => setNewsModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Judul</label>
              <input value={formNews.title} onChange={e => setFormNews(f => ({ ...f, title: e.target.value }))}
                placeholder="Judul berita" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Kategori</label>
                <select value={formNews.category} onChange={e => setFormNews(f => ({ ...f, category: e.target.value }))}
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {['Prestasi', 'Pengumuman', 'Kegiatan', 'Fasilitas', 'Berita'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Emoji</label>
                <input value={formNews.image} onChange={e => setFormNews(f => ({ ...f, image: e.target.value }))}
                  placeholder="📰" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Ringkasan</label>
              <textarea value={formNews.summary} onChange={e => setFormNews(f => ({ ...f, summary: e.target.value }))}
                rows={3} placeholder="Ringkasan berita..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Tanggal</label>
              <input value={formNews.date} onChange={e => setFormNews(f => ({ ...f, date: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => {
              if (newsModal === 'add') addNews(formNews);
              else updateNews(newsModal.id, formNews);
              setNewsModal(null);
            }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2">
              <Save size={16} /> Simpan
            </button>
            <button onClick={() => setNewsModal(null)}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
              Batal
            </button>
          </div>
        </Modal>
      )}

      {/* ═══════════════════════════════════
          MODAL - TAMBAH/EDIT PENGUMUMAN
      ═══════════════════════════════════ */}
      {annModal && (
        <Modal title={annModal === 'add' ? 'Tambah Pengumuman' : 'Edit Pengumuman'} onClose={() => setAnnModal(null)}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Judul</label>
              <input value={formAnn.title} onChange={e => setFormAnn(f => ({ ...f, title: e.target.value }))}
                placeholder="Judul pengumuman"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Tipe</label>
                <select value={formAnn.type} onChange={e => setFormAnn(f => ({ ...f, type: e.target.value }))}
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="info">🔵 Info</option>
                  <option value="warning">🟡 Perhatian</option>
                  <option value="urgent">🔴 Penting</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Tanggal</label>
                <input value={formAnn.date} onChange={e => setFormAnn(f => ({ ...f, date: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => {
              if (annModal === 'add') addAnnouncement(formAnn);
              else updateAnnouncement(annModal.id, formAnn);
              setAnnModal(null);
            }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold flex items-center justify-center gap-2">
              <Save size={16} /> Simpan
            </button>
            <button onClick={() => setAnnModal(null)}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
              Batal
            </button>
          </div>
        </Modal>
      )}

      {/* ═══════════════════════════════════
          MODAL - TAMBAH/EDIT JURUSAN
      ═══════════════════════════════════ */}
      {majorModal && (
        <Modal title={majorModal === 'add' ? 'Tambah Jurusan' : 'Edit Jurusan'} onClose={() => setMajorModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Nama Jurusan</label>
                <input value={formMajor.name} onChange={e => setFormMajor(f => ({ ...f, name: e.target.value }))}
                  placeholder="Nama jurusan"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Icon (Emoji)</label>
                <input value={formMajor.icon} onChange={e => setFormMajor(f => ({ ...f, icon: e.target.value }))}
                  placeholder="📚"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Deskripsi</label>
              <textarea value={formMajor.desc} onChange={e => setFormMajor(f => ({ ...f, desc: e.target.value }))}
                rows={2} placeholder="Deskripsi singkat..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Jumlah Siswa</label>
              <input value={formMajor.students} onChange={e => setFormMajor(f => ({ ...f, students: e.target.value }))}
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => {
              if (majorModal === 'add') addMajor(formMajor);
              else updateMajor(majorModal.id, formMajor);
              setMajorModal(null);
            }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2">
              <Save size={16} /> Simpan
            </button>
            <button onClick={() => setMajorModal(null)}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
              Batal
            </button>
          </div>
        </Modal>
      )}

      {/* ═══════════════════════════════════
          MODAL - TAMBAH GALERI
      ═══════════════════════════════════ */}
      {galleryModal && (
        <Modal title="Tambah Item Galeri" onClose={() => setGalleryModal(false)}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Judul</label>
              <input value={formGallery.title} onChange={e => setFormGallery(f => ({ ...f, title: e.target.value }))}
                placeholder="Nama kegiatan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Emoji</label>
                <input value={formGallery.emoji} onChange={e => setFormGallery(f => ({ ...f, emoji: e.target.value }))}
                  placeholder="📷"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Warna Latar</label>
                <select value={formGallery.color} onChange={e => setFormGallery(f => ({ ...f, color: e.target.value }))}
                  className="w-full bg-[#0a0f1c] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="bg-blue-500/30">Biru</option>
                  <option value="bg-purple-500/30">Ungu</option>
                  <option value="bg-green-500/30">Hijau</option>
                  <option value="bg-yellow-500/30">Kuning</option>
                  <option value="bg-pink-500/30">Merah Muda</option>
                  <option value="bg-orange-500/30">Oranye</option>
                  <option value="bg-cyan-500/30">Cyan</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => { addGallery(formGallery); setGalleryModal(false); }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold flex items-center justify-center gap-2">
              <Save size={16} /> Simpan
            </button>
            <button onClick={() => setGalleryModal(false)}
              className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white">
              Batal
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
