/* ============================================================
   Hotel Velora — app.js
   Full React application: data, components, pages, and mount.
   Requires React 18, ReactDOM 18, and Babel (loaded in HTML).
   ============================================================ */

const { useState, useEffect } = React;


/* ============================================================
   DESIGN TOKENS
   Central colour palette referenced by every component.
   ============================================================ */
const C = {
  gold:        '#c9a96e',
  goldDark:    '#a8864f',
  goldLight:   '#e8d4a8',
  cream:       '#f0ebe3',
  dark:        '#0c0a08',
  dark2:       '#131109',
  dark3:       '#1a1710',
  dark4:       '#222018',
  border:      'rgba(201,169,110,0.18)',
  borderHover: 'rgba(201,169,110,0.45)',
  text:        '#f0ebe3',
  muted:       '#9a9080',
  mutedLight:  '#c8bfb0',
};


/* ============================================================
   STATIC DATA
   ============================================================ */

const ROOMS = [
  {
    id: 1,
    name: 'Velora Suite',
    type: 'suite',
    price: 485,
    capacity: 2,
    size: '62 m²',
    view: 'Ocean View',
    floor: 12,
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    ],
    amenities: ['King Bed', 'Private Balcony', 'Jacuzzi', 'Butler Service', 'Living Room', 'Ocean View'],
    desc: 'The crown jewel of Hotel Velora. A stunning 62m² retreat on the 12th floor with sweeping ocean panoramas, a private plunge jacuzzi, and dedicated butler service. Pure indulgence redefined.',
  },
  {
    id: 2,
    name: 'Horizon Deluxe',
    type: 'deluxe',
    price: 295,
    capacity: 2,
    size: '45 m²',
    view: 'Garden & Pool',
    floor: 8,
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80',
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
    ],
    amenities: ['King Bed', 'Rain Shower', 'Garden View', 'Minibar', 'Work Desk', 'Smart TV'],
    desc: 'Elegant and spacious, the Horizon Deluxe offers serene views over our lush gardens and infinity pool. A 45m² sanctuary designed for modern comfort and refined aesthetics.',
  },
  {
    id: 3,
    name: 'Serenity King',
    type: 'standard',
    price: 185,
    capacity: 2,
    size: '32 m²',
    view: 'City View',
    floor: 5,
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&q=80',
    ],
    amenities: ['King Bed', 'Shower', 'City View', 'Minibar', 'Smart TV', 'Free WiFi'],
    desc: 'A beautifully appointed 32m² room featuring a plush king bed, city views, and all the amenities you need for a flawless stay.',
  },
  {
    id: 4,
    name: 'Dual Comfort',
    type: 'standard',
    price: 165,
    capacity: 4,
    size: '35 m²',
    view: 'City View',
    floor: 4,
    img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    imgs: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80'],
    amenities: ['Twin Beds', 'Shower', 'City View', 'Minibar', 'Smart TV', 'Free WiFi'],
    desc: 'Perfect for families or colleagues, offering two plush double beds in a well-designed 35m² space with elegant city views.',
  },
  {
    id: 5,
    name: 'Penthouse Retreat',
    type: 'penthouse',
    price: 890,
    capacity: 4,
    size: '110 m²',
    view: '360° Panoramic',
    floor: 15,
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    amenities: ['2 Bedrooms', 'Private Pool', '360° Views', 'Chef Service', 'Home Theatre', 'Personal Concierge'],
    desc: 'The pinnacle of luxury. Our 110m² penthouse crowns the 15th floor with a private rooftop pool, panoramic views, dedicated chef, and unparalleled service.',
  },
  {
    id: 6,
    name: 'Junior Suite',
    type: 'suite',
    price: 365,
    capacity: 2,
    size: '52 m²',
    view: 'Ocean Partial',
    floor: 9,
    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    imgs: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    ],
    amenities: ['King Bed', 'Sitting Area', 'Ocean View', 'Soaking Tub', 'Minibar', 'Nespresso'],
    desc: 'A sophisticated 52m² junior suite with a dedicated sitting area, deep soaking tub, and partial ocean views — the ideal choice for a romantic getaway.',
  },
];

const BOOKINGS_INIT = [
  { id: 'BK001', guestName: 'Emeka Okonkwo',   room: 1, roomName: 'Velora Suite',      checkIn: '2025-04-05', checkOut: '2025-04-08', nights: 3, guests: 2, total: 1455, status: 'confirmed',  paid: true,  email: 'emeka@mail.com',  phone: '+234 800 100 1001' },
  { id: 'BK002', guestName: 'Amaka Ihejirika',  room: 2, roomName: 'Horizon Deluxe',    checkIn: '2025-04-06', checkOut: '2025-04-10', nights: 4, guests: 2, total: 1180, status: 'confirmed',  paid: true,  email: 'amaka@mail.com',  phone: '+234 800 200 2002' },
  { id: 'BK003', guestName: 'James Nwosu',      room: 3, roomName: 'Serenity King',     checkIn: '2025-04-07', checkOut: '2025-04-09', nights: 2, guests: 1, total: 370,  status: 'pending',    paid: false, email: 'james@mail.com',  phone: '+234 800 300 3003' },
  { id: 'BK004', guestName: 'Chioma Adeyemi',   room: 5, roomName: 'Penthouse Retreat', checkIn: '2025-04-10', checkOut: '2025-04-14', nights: 4, guests: 3, total: 3560, status: 'confirmed',  paid: true,  email: 'chioma@mail.com', phone: '+234 800 400 4004' },
  { id: 'BK005', guestName: 'Tunde Bakare',     room: 4, roomName: 'Dual Comfort',      checkIn: '2025-04-03', checkOut: '2025-04-05', nights: 2, guests: 4, total: 330,  status: 'checked-in', paid: true,  email: 'tunde@mail.com',  phone: '+234 800 500 5005' },
  { id: 'BK006', guestName: 'Ngozi Eze',        room: 6, roomName: 'Junior Suite',      checkIn: '2025-04-08', checkOut: '2025-04-11', nights: 3, guests: 2, total: 1095, status: 'confirmed',  paid: false, email: 'ngozi@mail.com',  phone: '+234 800 600 6006' },
];


/* ============================================================
   SHARED UI COMPONENTS
   ============================================================ */

/* ── Btn ────────────────────────────────────────────────────── */
const Btn = ({ children, variant = 'primary', onClick, style = {}, size = 'md', disabled = false }) => {
  const [hover, setHover] = useState(false);

  const base = {
    fontFamily:     "'Jost', sans-serif",
    fontWeight:     500,
    letterSpacing:  '0.12em',
    textTransform:  'uppercase',
    border:         'none',
    cursor:         disabled ? 'not-allowed' : 'pointer',
    display:        'inline-flex',
    alignItems:     'center',
    gap:            8,
    transition:     'all 0.3s ease',
    opacity:        disabled ? 0.5 : 1,
    fontSize:       size === 'sm' ? '0.72rem' : size === 'lg' ? '0.88rem' : '0.78rem',
    padding:        size === 'sm' ? '8px 18px' : size === 'lg' ? '18px 44px' : '12px 28px',
  };

  const variants = {
    primary: { background: hover ? C.goldDark : C.gold,       color: C.dark },
    outline: { background: 'transparent', color: hover ? C.gold : C.cream, border: `1px solid ${hover ? C.gold : C.border}` },
    ghost:   { background: hover ? 'rgba(201,169,110,0.12)' : 'transparent', color: hover ? C.gold : C.muted, border: 'none' },
    danger:  { background: hover ? '#c0392b' : '#e74c3c',     color: '#fff' },
    success: { background: hover ? '#1e8449' : '#27ae60',     color: '#fff' },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
};

/* ── Badge ──────────────────────────────────────────────────── */
const Badge = ({ status }) => {
  const map = {
    confirmed:    ['#27ae60', '#d5f5e3'],
    pending:      ['#e67e22', '#fdebd0'],
    'checked-in': ['#2980b9', '#d6eaf8'],
    'checked-out':['#7f8c8d', '#eaecee'],
    cancelled:    ['#c0392b', '#fadbd8'],
  };
  const [fg, bg] = map[status] || [C.muted, C.dark3];
  return (
    <span style={{ background: bg, color: fg, padding: '3px 12px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {status}
    </span>
  );
};

/* ── Modal ──────────────────────────────────────────────────── */
const Modal = ({ open, onClose, title, children, width = 600 }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.2s ease' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: C.dark3, border: `1px solid ${C.border}`, borderRadius: 4, width: '100%', maxWidth: width, maxHeight: '90vh', overflowY: 'auto', animation: 'fadeUp 0.3s ease' }}
      >
        {/* Header */}
        <div style={{ padding: '28px 32px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.5rem', fontWeight: 500, color: C.gold }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ padding: '28px 32px' }}>{children}</div>
      </div>
    </div>
  );
};

/* ── Input / Select ─────────────────────────────────────────── */
const Input = ({ label, value, onChange, type = 'text', placeholder = '', required = false, options = null }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>
      {label}{required && <span style={{ color: C.gold }}> *</span>}
    </label>
    {options ? (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', background: C.dark4, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "'Jost'", fontSize: '0.9rem', padding: '12px 16px', borderRadius: 2, outline: 'none' }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: '100%', background: C.dark4, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "'Jost'", fontSize: '0.9rem', padding: '12px 16px', borderRadius: 2, outline: 'none' }}
      />
    )}
  </div>
);


/* ============================================================
   NAVIGATION
   ============================================================ */
const Nav = ({ setPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Rooms', 'Amenities', 'Gallery', 'Book Now'];

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '0 60px', height: scrolled ? 68 : 84, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(12,10,8,0.97)' : 'transparent', borderBottom: scrolled ? `1px solid ${C.border}` : 'none', transition: 'all 0.4s ease', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
      {/* Logo */}
      <div onClick={() => setPage('public')} style={{ cursor: 'pointer' }}>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.08em', color: C.gold }}>VELORA</div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.35em', color: C.mutedLight, marginTop: -4, textTransform: 'uppercase' }}>Hotel & Residences</div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {links.map(l => (
          <button
            key={l}
            onClick={() => l === 'Book Now' ? setPage('booking') : null}
            style={{ background: 'none', border: 'none', color: l === 'Book Now' ? C.gold : C.mutedLight, cursor: 'pointer', fontFamily: "'Jost'", fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 14px', transition: 'color 0.2s' }}
          >
            {l}
          </button>
        ))}
        <Btn variant="outline" size="sm" onClick={() => setPage('admin')} style={{ marginLeft: 12 }}>
          Staff Portal
        </Btn>
      </div>
    </nav>
  );
};


/* ============================================================
   PUBLIC WEBSITE SECTIONS
   ============================================================ */

/* ── Hero ───────────────────────────────────────────────────── */
const HeroSection = ({ setPage }) => (
  <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>
    {/* Background image */}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85')", backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.04)', transition: 'transform 8s ease', animation: 'pulse 12s ease-in-out infinite' }} />
    {/* Gradient overlay */}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,10,8,0.45) 0%, rgba(12,10,8,0.2) 40%, rgba(12,10,8,0.75) 80%, rgba(12,10,8,1) 100%)' }} />

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(0.7rem,1.5vw,0.85rem)', fontWeight: 400, letterSpacing: '0.5em', textTransform: 'uppercase', color: C.gold, marginBottom: 20, animation: 'fadeUp 0.8s 0.2s both' }}>
        ✦ Welcome to Hotel Velora ✦
      </div>
      <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(3.5rem,8vw,7.5rem)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.01em', color: C.cream, marginBottom: 28, animation: 'fadeUp 0.8s 0.4s both' }}>
        Where Luxury<br /><em style={{ fontStyle: 'italic', color: C.gold }}>Meets Serenity</em>
      </h1>
      <p style={{ fontFamily: "'Jost'", fontSize: 'clamp(0.9rem,1.8vw,1.05rem)', fontWeight: 300, color: C.mutedLight, maxWidth: 520, lineHeight: 1.8, marginBottom: 48, animation: 'fadeUp 0.8s 0.6s both', letterSpacing: '0.03em' }}>
        Nestled on the coast of Lagos Island, Hotel Velora offers 87 meticulously crafted rooms, world-class dining, and an experience unlike anything else in West Africa.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp 0.8s 0.8s both' }}>
        <Btn variant="primary" size="lg" onClick={() => setPage('booking')}>Reserve Your Stay</Btn>
        <Btn variant="outline" size="lg">Explore Rooms</Btn>
      </div>
    </div>

    {/* Scroll indicator */}
    <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'fadeIn 1s 1.2s both' }}>
      <div style={{ fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted }}>Scroll</div>
      <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.gold}, transparent)`, animation: 'shimmer 2s ease-in-out infinite' }} />
    </div>
  </section>
);

/* ── Stats bar ──────────────────────────────────────────────── */
const StatsBar = () => (
  <div style={{ background: C.dark2, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '28px 60px', display: 'flex', justifyContent: 'center', gap: 80, flexWrap: 'wrap' }}>
    {[['87', 'Luxury Rooms'], ['3', 'Restaurants'], ['2', 'Infinity Pools'], ['15', 'Years of Excellence']].map(([n, l]) => (
      <div key={l} style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2.4rem', fontWeight: 600, color: C.gold, lineHeight: 1 }}>{n}</div>
        <div style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted, marginTop: 4 }}>{l}</div>
      </div>
    ))}
  </div>
);

/* ── Room card ──────────────────────────────────────────────── */
const RoomCard = ({ room, onBook }) => {
  const [hover, setHover] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ background: C.dark2, border: `1px solid ${hover ? C.borderHover : C.border}`, transition: 'all 0.35s ease', transform: hover ? 'translateY(-5px)' : 'none', boxShadow: hover ? '0 24px 60px rgba(0,0,0,0.5)' : 'none', overflow: 'hidden' }}
      >
        {/* Thumbnail */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={room.img} alt={room.name} style={{ width: '100%', height: 260, objectFit: 'cover', transition: 'transform 0.5s ease', transform: hover ? 'scale(1.06)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,10,8,0.7), transparent)', opacity: hover ? 1 : 0, transition: 'opacity 0.3s' }} />
          <div style={{ position: 'absolute', top: 16, right: 16, background: C.gold, color: C.dark, padding: '4px 12px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{room.type}</div>
          <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(12,10,8,0.8)', color: C.gold, padding: '4px 10px', fontSize: '0.68rem', fontWeight: 500, backdropFilter: 'blur(4px)' }}>Floor {room.floor}</div>
        </div>

        {/* Info */}
        <div style={{ padding: '28px 28px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.5rem', fontWeight: 500, color: C.cream }}>{room.name}</h3>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.6rem', fontWeight: 600, color: C.gold, lineHeight: 1 }}>${room.price}</div>
              <div style={{ fontSize: '0.65rem', color: C.muted, letterSpacing: '0.08em' }}>/ NIGHT</div>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>{room.desc.substring(0, 100)}…</p>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            {[room.size, room.view, `${room.capacity} Guest${room.capacity > 1 ? 's' : ''}`].map(d => (
              <span key={d} style={{ fontSize: '0.72rem', color: C.mutedLight, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: C.gold }}>—</span> {d}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn variant="primary" onClick={() => onBook(room)} style={{ flex: 1, justifyContent: 'center' }}>Book Now</Btn>
            <Btn variant="outline" onClick={() => setDetailOpen(true)}>Details</Btn>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title={room.name} width={680}>
        <img src={room.img} alt={room.name} style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 2, marginBottom: 24 }} />
        <p style={{ fontSize: '0.9rem', color: C.mutedLight, lineHeight: 1.8, marginBottom: 24 }}>{room.desc}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['Size', room.size], ['View', room.view], ['Floor', `Floor ${room.floor}`], ['Capacity', `${room.capacity} Guests`], ['Type', room.type], ['Rate', `$${room.price}/night`]].map(([k, v]) => (
            <div key={k} style={{ background: C.dark4, border: `1px solid ${C.border}`, padding: '14px 18px' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: '0.92rem', color: C.cream, textTransform: 'capitalize' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Amenities</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {room.amenities.map(a => (
              <span key={a} style={{ background: C.dark4, border: `1px solid ${C.border}`, padding: '6px 14px', fontSize: '0.78rem', color: C.mutedLight }}>✓ {a}</span>
            ))}
          </div>
        </div>
        <Btn variant="primary" size="lg" onClick={() => { onBook(room); setDetailOpen(false); }} style={{ width: '100%', justifyContent: 'center' }}>
          Book This Room
        </Btn>
      </Modal>
    </>
  );
};

/* ── Rooms section ──────────────────────────────────────────── */
const RoomsSection = ({ onBook }) => {
  const [filter, setFilter] = useState('all');
  const types = ['all', 'standard', 'deluxe', 'suite', 'penthouse'];
  const filtered = filter === 'all' ? ROOMS : ROOMS.filter(r => r.type === filter);

  return (
    <section style={{ padding: '110px 60px', background: C.dark }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '0.85rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Our Accommodations</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: C.cream, lineHeight: 1.1, marginBottom: 20 }}>
          Rooms & <em style={{ fontStyle: 'italic', color: C.gold }}>Suites</em>
        </h2>
        <p style={{ fontSize: '0.92rem', fontWeight: 300, color: C.muted, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.8 }}>
          Every room at Velora is a curated sanctuary, blending contemporary West African design with timeless luxury.
        </p>
        {/* Filter buttons */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{ background: filter === t ? C.gold : 'transparent', color: filter === t ? C.dark : C.muted, border: `1px solid ${filter === t ? C.gold : C.border}`, padding: '7px 20px', cursor: 'pointer', fontFamily: "'Jost'", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'capitalize', transition: 'all 0.2s' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
        {filtered.map(room => <RoomCard key={room.id} room={room} onBook={onBook} />)}
      </div>
    </section>
  );
};

/* ── Amenities section ──────────────────────────────────────── */
const AmenitiesSection = () => {
  const items = [
    { icon: '🍽️', title: 'Velora Restaurant',    desc: 'Michelin-starred Nigerian fusion cuisine with sweeping ocean views. Open for breakfast, lunch, and dinner.' },
    { icon: '🏊',  title: 'Infinity Pools',       desc: 'Two heated infinity pools on the 8th floor terrace, cascading toward the horizon of the Atlantic.' },
    { icon: '💆',  title: 'Velora Spa & Wellness', desc: '12 treatment rooms, a hammam, ice pool, and a team of world-class therapists. Reconnect your body and mind.' },
    { icon: '🏋️', title: 'Fitness Centre',        desc: 'State-of-the-art Technogym equipment with personal trainers, yoga classes, and panoramic city views.' },
    { icon: '🎭',  title: 'Events & Banqueting',   desc: '5 event spaces from intimate boardrooms to our Grand Ballroom, accommodating up to 500 guests.' },
    { icon: '🚗',  title: 'Concierge & Transfers', desc: '24/7 concierge service, private airport transfers, yacht charters, and exclusive excursion planning.' },
  ];

  return (
    <section style={{ padding: '110px 60px', background: C.dark2 }}>
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '0.85rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Hotel Facilities</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: C.cream, lineHeight: 1.1 }}>
          World-Class <em style={{ fontStyle: 'italic', color: C.gold }}>Amenities</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
        {items.map((item, i) => {
          const [hover, setHover] = useState(false);
          return (
            <div
              key={i}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ padding: '44px 40px', background: hover ? C.dark3 : C.dark2, borderRight: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, transition: 'background 0.3s' }}
            >
              <div style={{ fontSize: '2.2rem', marginBottom: 20 }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.4rem', fontWeight: 500, color: C.cream, marginBottom: 14 }}>{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.8 }}>{item.desc}</p>
              {hover && <div style={{ width: 32, height: 2, background: C.gold, marginTop: 20, transition: 'all 0.3s' }} />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ── Gallery section ────────────────────────────────────────── */
const GallerySection = () => {
  const imgs = [
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    'https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=800&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
  ];

  return (
    <section style={{ padding: '110px 0', background: C.dark }}>
      <div style={{ textAlign: 'center', marginBottom: 60, padding: '0 60px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '0.85rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Visual Journey</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: C.cream }}>
          Experience <em style={{ fontStyle: 'italic', color: C.gold }}>Velora</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 260px)', gap: 3 }}>
        {imgs.map((src, i) => {
          const [hover, setHover] = useState(false);
          return (
            <div
              key={i}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{ overflow: 'hidden', position: 'relative', gridRow: i === 0 ? 'span 2' : 'span 1' }}
            >
              <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hover ? 'scale(1.08)' : 'scale(1)' }} />
              {hover && <div style={{ position: 'absolute', inset: 0, background: 'rgba(201,169,110,0.15)', transition: 'all 0.3s' }} />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ── Testimonials ───────────────────────────────────────────── */
const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const reviews = [
    { text: '"Hotel Velora exceeded every expectation. The suite was breathtaking, the staff impossibly attentive, and the view from the infinity pool at sunset was the most beautiful thing I\'ve ever seen in Lagos."', name: 'Adaeze Okonkwo',       role: 'CEO, Lagos Fashion Week',         rating: 5 },
    { text: '"A truly world-class property. I\'ve stayed in luxury hotels across four continents, and Velora stands among the very best. The food at the restaurant alone is worth the trip."',                         name: 'James Ekechi',         role: 'Travel Writer, Condé Nast Africa', rating: 5 },
    { text: '"The penthouse was nothing short of extraordinary. We celebrated our anniversary there and Velora made it completely magical — from the private chef to the surprise sunset champagne setup."',           name: 'Funke & Rotimi Adesanya', role: 'Returning Guests',               rating: 5 },
  ];
  const r = reviews[active];

  return (
    <section style={{ padding: '110px 60px', background: `linear-gradient(135deg, ${C.dark2} 0%, ${C.dark3} 100%)`, textAlign: 'center' }}>
      <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '0.85rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Guest Stories</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 300, color: C.cream, marginBottom: 60 }}>
        What Our Guests <em style={{ fontStyle: 'italic', color: C.gold }}>Say</em>
      </h2>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', color: C.gold, lineHeight: 1, marginBottom: 8, fontFamily: "'Cormorant Garamond'", fontWeight: 300 }}>"</div>
        <p style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 300, fontStyle: 'italic', color: C.cream, lineHeight: 1.7, marginBottom: 36 }}>
          {r.text.slice(1, -1)}
        </p>
        <div style={{ color: C.gold, fontSize: '1rem', marginBottom: 16 }}>{'★'.repeat(r.rating)}</div>
        <div style={{ fontWeight: 600, color: C.cream, marginBottom: 4 }}>{r.name}</div>
        <div style={{ fontSize: '0.78rem', color: C.muted, letterSpacing: '0.06em' }}>{r.role}</div>
        {/* Pagination dots */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 36 }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 100, background: i === active ? C.gold : C.border, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── CTA section ────────────────────────────────────────────── */
const CTASection = ({ setPage }) => (
  <section style={{ padding: '110px 60px', background: C.dark, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
    <div>
      <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '0.85rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>Plan Your Visit</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem,4.5vw,3.8rem)', fontWeight: 300, color: C.cream, lineHeight: 1.1, marginBottom: 24 }}>
        Begin Your<br /><em style={{ fontStyle: 'italic', color: C.gold }}>Velora Story</em>
      </h2>
      <p style={{ fontSize: '0.9rem', color: C.muted, lineHeight: 1.85, maxWidth: 440, marginBottom: 40 }}>
        Whether you're celebrating a milestone, closing a deal, or simply seeking rest, Hotel Velora is your sanctuary on the shores of Lagos. Every stay is uniquely crafted for you.
      </p>
      <Btn variant="primary" size="lg" onClick={() => setPage('booking')}>Reserve Now</Btn>
    </div>
    <div style={{ position: 'relative' }}>
      <img src="https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80" alt="" style={{ width: '100%', height: 480, objectFit: 'cover' }} />
      <div style={{ position: 'absolute', bottom: -20, left: -20, background: C.gold, padding: '20px 28px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2rem', fontWeight: 600, color: C.dark, lineHeight: 1 }}>From $165</div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: C.dark, opacity: 0.7 }}>PER NIGHT</div>
      </div>
    </div>
  </section>
);

/* ── Footer ─────────────────────────────────────────────────── */
const Footer = () => (
  <footer style={{ background: C.dark2, borderTop: `1px solid ${C.border}`, padding: '80px 60px 40px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr', gap: 60, marginBottom: 60 }}>
      {/* Brand */}
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.8rem', fontWeight: 600, letterSpacing: '0.08em', color: C.gold, marginBottom: 4 }}>VELORA</div>
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', color: C.muted, marginBottom: 20 }}>HOTEL & RESIDENCES · LAGOS ISLAND</div>
        <p style={{ fontSize: '0.85rem', color: C.muted, lineHeight: 1.85, maxWidth: 280 }}>Where the energy of Africa meets the refinement of a truly world-class luxury hotel experience.</p>
      </div>

      {/* Nav columns */}
      {[['Navigation', ['Home', 'Rooms', 'Amenities', 'Gallery', 'Dining']], ['Services', ['Spa & Wellness', 'Events', 'Airport Transfer', 'Concierge', 'Private Chef']]].map(([h, ls]) => (
        <div key={h}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.cream, marginBottom: 20 }}>{h}</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ls.map(l => <li key={l} style={{ fontSize: '0.85rem', color: C.muted, cursor: 'pointer' }}>{l}</li>)}
          </ul>
        </div>
      ))}

      {/* Contact */}
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.cream, marginBottom: 20 }}>Contact</div>
        {[['📍', '15 Ocean Drive, Lagos Island, Nigeria'], ['📞', '+234 800 835 6727'], ['✉️', 'reservations@velora.ng'], ['🕐', 'Check-in: 3PM | Check-out: 12PM']].map(([ic, tx]) => (
          <div key={ic} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
            <span>{ic}</span>
            <span style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.5 }}>{tx}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <p style={{ fontSize: '0.78rem', color: C.muted }}>© 2025 Hotel Velora. All rights reserved.</p>
      <p style={{ fontSize: '0.72rem', color: C.muted, fontFamily: "'Cormorant Garamond'", letterSpacing: '0.2em', fontStyle: 'italic' }}>Crafted with Care in Lagos, Nigeria</p>
    </div>
  </footer>
);

/* ── Public site wrapper ────────────────────────────────────── */
const PublicSite = ({ setPage, onBook }) => (
  <div>
    <HeroSection setPage={setPage} />
    <StatsBar />
    <RoomsSection onBook={onBook} />
    <AmenitiesSection />
    <GallerySection />
    <TestimonialsSection />
    <CTASection setPage={setPage} />
    <Footer />
  </div>
);


/* ============================================================
   BOOKING PAGE  (3-step wizard)
   ============================================================ */
const BookingPage = ({ preRoom, setPage, addBooking }) => {
  const steps = ['Select Room', 'Guest Details', 'Confirm & Pay'];

  const [step,         setStep]         = useState(preRoom ? 1 : 0);
  const [selectedRoom, setSelectedRoom] = useState(preRoom);
  const [form,         setForm]         = useState({ firstName: '', lastName: '', email: '', phone: '', country: 'Nigeria', requests: '' });
  const [dates,        setDates]        = useState({ checkIn: '', checkOut: '' });
  const [guests,       setGuests]       = useState(1);
  const [payMethod,    setPayMethod]    = useState('card');
  const [loading,      setLoading]      = useState(false);
  const [done,         setDone]         = useState(false);
  const [bookingRef,   setBookingRef]   = useState('');

  /* Derived totals */
  const nights = (() => {
    if (!dates.checkIn || !dates.checkOut) return 0;
    const d = (new Date(dates.checkOut) - new Date(dates.checkIn)) / 86400000;
    return d > 0 ? d : 0;
  })();
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0;
  const taxes    = Math.round(subtotal * 0.075);
  const total    = subtotal + taxes;

  /* Confirm & create booking */
  const confirm = () => {
    setLoading(true);
    setTimeout(() => {
      const ref = 'BK' + String(Math.floor(Math.random() * 9000) + 1000);
      setBookingRef(ref);
      addBooking({
        id:       ref,
        guestName: `${form.firstName} ${form.lastName}`,
        room:     selectedRoom.id,
        roomName: selectedRoom.name,
        checkIn:  dates.checkIn,
        checkOut: dates.checkOut,
        nights, guests, total,
        status: 'confirmed',
        paid:   payMethod === 'card',
        email:  form.email,
        phone:  form.phone,
      });
      setLoading(false);
      setDone(true);
    }, 1800);
  };

  /* ── Confirmation screen ── */
  if (done) return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ textAlign: 'center', maxWidth: 520, animation: 'fadeUp 0.6s ease' }}>
        <div style={{ fontSize: '4rem', marginBottom: 24 }}>✨</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '3rem', fontWeight: 300, color: C.gold, marginBottom: 16 }}>Reservation Confirmed</h2>
        <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.1rem', color: C.mutedLight, marginBottom: 32, lineHeight: 1.7 }}>
          Dear {form.firstName}, your reservation is confirmed.<br />
          <span style={{ color: C.gold, fontWeight: 600 }}>Reference: {bookingRef}</span><br />
          A confirmation has been sent to {form.email || 'your email'}.
        </div>
        {/* Summary */}
        <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: 28, marginBottom: 32, textAlign: 'left' }}>
          {[['Room', selectedRoom?.name], ['Check-In', dates.checkIn], ['Check-Out', dates.checkOut], ['Nights', nights], ['Guests', guests], ['Total', `$${total.toLocaleString()}`]].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontSize: '0.88rem' }}>
              <span style={{ color: C.muted }}>{k}</span>
              <span style={{ color: k === 'Total' ? C.gold : C.cream, fontWeight: k === 'Total' ? 600 : 400 }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Btn variant="primary" onClick={() => setPage('public')}>Back to Home</Btn>
          <Btn variant="outline" onClick={() => setPage('admin')}>View in Admin</Btn>
        </div>
      </div>
    </div>
  );

  /* ── Wizard shell ── */
  return (
    <div style={{ minHeight: '100vh', background: C.dark }}>
      {/* Header + stepper */}
      <div style={{ background: C.dark2, borderBottom: `1px solid ${C.border}`, padding: '100px 60px 40px' }}>
        <Btn variant="ghost" onClick={() => setPage('public')} style={{ marginBottom: 20 }}>← Back</Btn>
        <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: C.cream }}>Book Your Stay</h1>
        <div style={{ display: 'flex', gap: 0, marginTop: 32 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: i < step ? 'pointer' : 'default' }} onClick={() => i < step && setStep(i)}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: i <= step ? C.gold : C.dark4, border: `1px solid ${i <= step ? C.gold : C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 600, color: i <= step ? C.dark : C.muted, transition: 'all 0.3s' }}>{i + 1}</div>
                <span style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === step ? C.gold : i < step ? C.mutedLight : C.muted }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: i < step ? C.gold : C.border, margin: '0 16px', alignSelf: 'center', transition: 'background 0.3s' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content + sidebar */}
      <div style={{ padding: '60px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, maxWidth: 1200, margin: '0 auto' }}>
        <div>
          {/* ── Step 0: Select Room ── */}
          {step === 0 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2rem', fontWeight: 400, color: C.cream, marginBottom: 8 }}>Choose Your Room</h2>
              <p style={{ color: C.muted, fontSize: '0.88rem', marginBottom: 32 }}>Select from our collection of carefully crafted accommodations.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                <Input label="Check-In Date"  type="date" value={dates.checkIn}  onChange={v => setDates(d => ({ ...d, checkIn: v }))}  required />
                <Input label="Check-Out Date" type="date" value={dates.checkOut} onChange={v => setDates(d => ({ ...d, checkOut: v }))} required />
              </div>
              <Input label="Number of Guests" value={guests} onChange={v => setGuests(Number(v))} options={[1, 2, 3, 4].map(n => ({ value: n, label: `${n} Guest${n > 1 ? 's' : ''}` }))} />
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {ROOMS.map(r => {
                  const sel = selectedRoom?.id === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRoom(r)}
                      style={{ display: 'flex', gap: 20, padding: 20, border: `1.5px solid ${sel ? C.gold : C.border}`, background: sel ? 'rgba(201,169,110,0.06)' : C.dark2, cursor: 'pointer', transition: 'all 0.2s', borderRadius: 2 }}
                    >
                      <img src={r.img} alt={r.name} style={{ width: 110, height: 80, objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.25rem', color: sel ? C.gold : C.cream }}>{r.name}</h3>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.4rem', color: C.gold }}>${r.price}</div>
                            <div style={{ fontSize: '0.62rem', color: C.muted }}>/ NIGHT</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
                          {[r.size, r.view, `${r.capacity} guests max`].map(d => (
                            <span key={d} style={{ fontSize: '0.72rem', color: C.muted }}>· {d}</span>
                          ))}
                        </div>
                      </div>
                      {sel && <div style={{ alignSelf: 'center', color: C.gold, fontSize: '1.4rem' }}>✓</div>}
                    </div>
                  );
                })}
              </div>
              <Btn
                variant="primary" size="lg"
                disabled={!selectedRoom || !dates.checkIn || !dates.checkOut || nights <= 0}
                onClick={() => setStep(1)}
                style={{ marginTop: 32, width: '100%', justifyContent: 'center' }}
              >
                Continue to Guest Details →
              </Btn>
            </div>
          )}

          {/* ── Step 1: Guest Details ── */}
          {step === 1 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2rem', fontWeight: 400, color: C.cream, marginBottom: 8 }}>Guest Information</h2>
              <p style={{ color: C.muted, fontSize: '0.88rem', marginBottom: 32 }}>Please enter your details to complete the reservation.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="First Name" value={form.firstName} onChange={v => setForm(f => ({ ...f, firstName: v }))} required />
                <Input label="Last Name"  value={form.lastName}  onChange={v => setForm(f => ({ ...f, lastName: v }))}  required />
              </div>
              <Input label="Email Address" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Input label="Phone Number" value={form.phone}   onChange={v => setForm(f => ({ ...f, phone: v }))} />
                <Input label="Country"      value={form.country} onChange={v => setForm(f => ({ ...f, country: v }))} options={['Nigeria','Ghana','UK','USA','France','UAE','South Africa'].map(c => ({ value: c, label: c }))} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 8 }}>Special Requests</label>
                <textarea
                  value={form.requests}
                  onChange={e => setForm(f => ({ ...f, requests: e.target.value }))}
                  placeholder="Any special requests, dietary requirements, or accessibility needs..."
                  style={{ width: '100%', minHeight: 100, background: C.dark4, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "'Jost'", fontSize: '0.9rem', padding: '12px 16px', borderRadius: 2, outline: 'none', resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
                <Btn variant="outline" onClick={() => setStep(0)}>← Back</Btn>
                <Btn
                  variant="primary" size="lg"
                  disabled={!form.firstName || !form.lastName || !form.email}
                  onClick={() => setStep(2)}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Review & Pay →
                </Btn>
              </div>
            </div>
          )}

          {/* ── Step 2: Confirm & Pay ── */}
          {step === 2 && (
            <div style={{ animation: 'fadeUp 0.4s ease' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2rem', fontWeight: 400, color: C.cream, marginBottom: 8 }}>Confirm & Pay</h2>
              <p style={{ color: C.muted, fontSize: '0.88rem', marginBottom: 32 }}>Review your booking details and select a payment method.</p>

              {/* Booking summary */}
              <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: 28, marginBottom: 32 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.2rem', color: C.gold, marginBottom: 20 }}>Booking Summary</h3>
                {[['Room', selectedRoom?.name], ['Guest', `${form.firstName} ${form.lastName}`], ['Email', form.email], ['Check-In', dates.checkIn], ['Check-Out', dates.checkOut], ['Duration', `${nights} night${nights !== 1 ? 's' : ''}`], ['Guests', guests]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontSize: '0.88rem' }}>
                    <span style={{ color: C.muted }}>{k}</span><span style={{ color: C.cream }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Payment method */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>Payment Method</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[['card', '💳 Credit / Debit Card'], ['transfer', '🏦 Bank Transfer'], ['invoice', '📄 Invoice (Corporate)']].map(([id, label]) => (
                    <div
                      key={id}
                      onClick={() => setPayMethod(id)}
                      style={{ padding: '14px 22px', border: `1.5px solid ${payMethod === id ? C.gold : C.border}`, background: payMethod === id ? 'rgba(201,169,110,0.08)' : 'transparent', cursor: 'pointer', fontSize: '0.85rem', color: payMethod === id ? C.gold : C.muted, transition: 'all 0.2s' }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card fields */}
              {payMethod === 'card' && (
                <div style={{ animation: 'fadeUp 0.3s ease' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
                    <div style={{ gridColumn: 'span 3' }}><Input label="Card Number"   placeholder="•••• •••• •••• ••••" value="" onChange={() => {}} /></div>
                    <Input label="Expiry Date"   placeholder="MM / YY" value="" onChange={() => {}} />
                    <Input label="CVV"           placeholder="•••"     value="" onChange={() => {}} />
                    <Input label="Name on Card"  placeholder="Full name" value="" onChange={() => {}} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <Btn variant="outline" onClick={() => setStep(1)}>← Back</Btn>
                <Btn
                  variant="primary" size="lg"
                  onClick={confirm}
                  disabled={loading || nights <= 0}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {loading
                    ? <span style={{ display: 'inline-block', width: 16, height: 16, border: `2px solid ${C.dark}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                    : `Confirm Booking · $${total.toLocaleString()}`}
                </Btn>
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar summary ── */}
        <div style={{ position: 'sticky', top: 100, height: 'fit-content' }}>
          <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.1rem', color: C.gold, marginBottom: 20 }}>Booking Summary</div>
            {selectedRoom ? (
              <>
                <img src={selectedRoom.img} alt="" style={{ width: '100%', height: 160, objectFit: 'cover', marginBottom: 16 }} />
                <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.3rem', color: C.cream, marginBottom: 8 }}>{selectedRoom.name}</h3>
                <div style={{ fontSize: '0.78rem', color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>{selectedRoom.view} · Floor {selectedRoom.floor} · {selectedRoom.size}</div>
                {nights > 0 && (
                  <>
                    {[['Room Rate', `$${selectedRoom.price} × ${nights} nights`, `$${subtotal.toLocaleString()}`], ['Taxes & Fees (7.5%)', '', `$${taxes.toLocaleString()}`]].map(([l, s, v]) => (
                      <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontSize: '0.82rem' }}>
                        <div>
                          <div style={{ color: C.muted }}>{l}</div>
                          {s && <div style={{ fontSize: '0.72rem', color: '#555' }}>{s}</div>}
                        </div>
                        <span style={{ color: C.cream }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '1rem', fontWeight: 600 }}>
                      <span style={{ color: C.cream }}>Total</span>
                      <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.5rem', color: C.gold }}>${total.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: C.muted, fontSize: '0.85rem' }}>Select a room to see pricing</div>
            )}
          </div>

          {/* Free cancellation note */}
          <div style={{ marginTop: 16, padding: 20, background: 'rgba(201,169,110,0.06)', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: C.gold, marginBottom: 10 }}>✓ Free Cancellation</div>
            <div style={{ fontSize: '0.78rem', color: C.muted, lineHeight: 1.6 }}>Cancel up to 48 hours before check-in for a full refund. No questions asked.</div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */
const AdminDash = ({ bookings, setBookings, setPage }) => {
  const [tab,      setTab]      = useState('overview');
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds,    setCreds]    = useState({ user: '', pass: '' });
  const [loginErr, setLoginErr] = useState(false);

  const login = () => {
    if (creds.user === 'admin' && creds.pass === 'velora2025') {
      setLoggedIn(true);
      setLoginErr(false);
    } else {
      setLoginErr(true);
    }
  };

  /* ── Login screen ── */
  if (!loggedIn) return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=60')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,10,8,0.92)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 420, animation: 'fadeUp 0.5s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2rem', fontWeight: 600, letterSpacing: '0.1em', color: C.gold }}>VELORA</div>
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: C.muted, marginBottom: 8 }}>HOTEL MANAGEMENT SYSTEM</div>
          <div style={{ width: 40, height: 1, background: C.border, margin: '0 auto' }} />
        </div>
        <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: 40 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.8rem', fontWeight: 400, color: C.cream, marginBottom: 8 }}>Staff Login</h2>
          <p style={{ fontSize: '0.82rem', color: C.muted, marginBottom: 32 }}>Enter your credentials to access the management portal.</p>
          <Input label="Username" value={creds.user} onChange={v => setCreds(c => ({ ...c, user: v }))} placeholder="admin" />
          <Input label="Password" type="password" value={creds.pass} onChange={v => setCreds(c => ({ ...c, pass: v }))} placeholder="••••••••••" />
          {loginErr && <div style={{ color: '#e74c3c', fontSize: '0.8rem', marginBottom: 16 }}>⚠ Invalid credentials. Try: admin / velora2025</div>}
          <Btn variant="primary" size="lg" onClick={login} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Sign In</Btn>
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.72rem', color: C.muted }}>Demo: admin / velora2025</div>
        </div>
        <Btn variant="ghost" onClick={() => setPage('public')} style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>← Back to Website</Btn>
      </div>
    </div>
  );

  /* Aggregate stats */
  const stats = {
    total:     bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    checkedIn: bookings.filter(b => b.status === 'checked-in').length,
    pending:   bookings.filter(b => b.status === 'pending').length,
    revenue:   bookings.filter(b => b.paid).reduce((a, b) => a + b.total, 0),
    occupancy: Math.round((bookings.filter(b => ['confirmed', 'checked-in'].includes(b.status)).length / ROOMS.length) * 100),
  };

  const sidebarTabs = [['📊', 'overview', 'Overview'], ['📅', 'bookings', 'Bookings'], ['🏨', 'rooms', 'Rooms'], ['👤', 'guests', 'Guests']];

  return (
    <div style={{ minHeight: '100vh', background: C.dark, display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: C.dark2, borderRight: `1px solid ${C.border}`, padding: '32px 0', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'fixed', top: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
        <div style={{ padding: '0 24px', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.4rem', fontWeight: 600, color: C.gold }}>VELORA</div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: C.muted }}>MANAGEMENT SYSTEM</div>
        </div>
        {sidebarTabs.map(([ic, id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', background: tab === id ? 'rgba(201,169,110,0.1)' : 'transparent', borderLeft: tab === id ? `2px solid ${C.gold}` : '2px solid transparent', border: 'none', color: tab === id ? C.gold : C.muted, cursor: 'pointer', fontFamily: "'Jost'", fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'all 0.2s', textAlign: 'left', width: '100%' }}
          >
            <span>{ic}</span>{label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 24px 24px', borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 20 }}>
          <button onClick={() => setPage('public')}  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '0.78rem', marginBottom: 10 }}>← Public Site</button>
          <button onClick={() => setPage('booking')} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: '0.78rem', marginBottom: 10 }}>+ New Booking</button>
          <button onClick={() => setLoggedIn(false)}  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '0.78rem' }}>⏻ Logout</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: 220, padding: 40, overflowY: 'auto' }}>
        {tab === 'overview' && <AdminOverview stats={stats} bookings={bookings} setTab={setTab} setPage={setPage} />}
        {tab === 'bookings' && <AdminBookings bookings={bookings} setBookings={setBookings} />}
        {tab === 'rooms'    && <AdminRooms bookings={bookings} />}
        {tab === 'guests'   && <AdminGuests bookings={bookings} />}
      </div>
    </div>
  );
};

/* ── Stat card ──────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, sub, color = C.gold }) => (
  <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: '24px 28px', transition: 'border-color 0.2s' }}>
    <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{icon}</div>
    <div style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2.2rem', fontWeight: 600, color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
    <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{label}</div>
    {sub && <div style={{ fontSize: '0.75rem', color: C.muted, marginTop: 6 }}>{sub}</div>}
  </div>
);

/* ── Admin overview tab ─────────────────────────────────────── */
const AdminOverview = ({ stats, bookings, setTab }) => {
  const recent = [...bookings].slice(0, 5);
  const barHeights = [40, 65, 45, 80, 55, 95, 70];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2.2rem', fontWeight: 400, color: C.cream }}>Good day, Manager</h1>
        <p style={{ color: C.muted, fontSize: '0.88rem' }}>Hotel Velora · Lagos Island · Live Dashboard</p>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        <StatCard icon="📅" label="Total Bookings" value={stats.total} />
        <StatCard icon="✅" label="Confirmed"      value={stats.confirmed} color="#27ae60" />
        <StatCard icon="🔑" label="Checked In"     value={stats.checkedIn} color="#3498db" />
        <StatCard icon="⏳" label="Pending"        value={stats.pending}   color="#e67e22" />
        <StatCard icon="💰" label="Revenue (Paid)" value={`$${stats.revenue.toLocaleString()}`} sub="from paid bookings" />
        <StatCard icon="🏨" label="Occupancy"      value={`${stats.occupancy}%`} color="#9b59b6" />
      </div>

      {/* Revenue bar chart */}
      <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.4rem', color: C.cream }}>Revenue Overview</h3>
          <span style={{ fontSize: '0.72rem', color: C.muted, background: C.dark4, padding: '4px 12px', borderRadius: 100 }}>This Month</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
          {days.map((d, i) => (
            <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: '100%', background: `linear-gradient(to top, ${C.gold}, ${C.goldLight})`, height: `${barHeights[i]}%`, borderRadius: '2px 2px 0 0', opacity: 0.85 }} />
              <span style={{ fontSize: '0.65rem', color: C.muted }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent bookings table */}
      <div style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.4rem', color: C.cream }}>Recent Bookings</h3>
          <Btn variant="ghost" size="sm" onClick={() => setTab('bookings')}>View All →</Btn>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {['Ref', 'Guest', 'Room', 'Check-In', 'Total', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map(b => (
              <tr key={b.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                <td style={{ padding: '12px', color: C.gold, fontWeight: 600 }}>{b.id}</td>
                <td style={{ padding: '12px', color: C.cream }}>{b.guestName}</td>
                <td style={{ padding: '12px', color: C.muted }}>{b.roomName}</td>
                <td style={{ padding: '12px', color: C.muted }}>{b.checkIn}</td>
                <td style={{ padding: '12px', color: C.cream }}>${b.total.toLocaleString()}</td>
                <td style={{ padding: '12px' }}><Badge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ── Admin bookings tab ─────────────────────────────────────── */
const AdminBookings = ({ bookings, setBookings }) => {
  const [search,    setSearch]    = useState('');
  const [filter,    setFilter]    = useState('all');
  const [selectedB, setSelectedB] = useState(null);
  const [addOpen,   setAddOpen]   = useState(false);
  const [newB,      setNewB]      = useState({ guestName: '', email: '', phone: '', room: '1', checkIn: '', checkOut: '', guests: 1, status: 'pending', paid: false });

  const filtered = bookings.filter(b => {
    const match = b.guestName.toLowerCase().includes(search.toLowerCase()) ||
                  b.id.toLowerCase().includes(search.toLowerCase()) ||
                  b.roomName.toLowerCase().includes(search.toLowerCase());
    return match && (filter === 'all' || b.status === filter);
  });

  const updateStatus  = (id, status) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b));
  const deleteBooking = (id)          => { setBookings(bs => bs.filter(b => b.id !== id)); setSelectedB(null); };

  const addNew = () => {
    const room   = ROOMS.find(r => r.id === Number(newB.room));
    const nights = newB.checkIn && newB.checkOut ? (new Date(newB.checkOut) - new Date(newB.checkIn)) / 86400000 : 1;
    const total  = room ? room.price * Math.max(nights, 1) : 0;
    setBookings(bs => [...bs, {
      ...newB,
      id:       'BK' + String(Math.floor(Math.random() * 9000) + 1000),
      room:     Number(newB.room),
      roomName: room?.name || '',
      nights:   Math.max(nights, 1),
      total:    Math.round(total),
    }]);
    setAddOpen(false);
    setNewB({ guestName: '', email: '', phone: '', room: '1', checkIn: '', checkOut: '', guests: 1, status: 'pending', paid: false });
  };

  const statusOptions = ['all', 'pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'];

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2.2rem', fontWeight: 400, color: C.cream }}>Bookings</h1>
          <p style={{ color: C.muted, fontSize: '0.85rem' }}>{bookings.length} total reservations</p>
        </div>
        <Btn variant="primary" onClick={() => setAddOpen(true)}>+ Add Booking</Btn>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, ID or room..."
          style={{ flex: 1, minWidth: 200, background: C.dark2, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "'Jost'", fontSize: '0.88rem', padding: '11px 18px', outline: 'none' }}
        />
        {statusOptions.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{ background: filter === s ? C.gold : 'transparent', color: filter === s ? C.dark : C.muted, border: `1px solid ${filter === s ? C.gold : C.border}`, padding: '8px 18px', cursor: 'pointer', fontFamily: "'Jost'", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'capitalize', transition: 'all 0.2s' }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: C.dark2, border: `1px solid ${C.border}`, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.dark3 }}>
              {['Ref', 'Guest', 'Room', 'Check-In', 'Check-Out', 'Nights', 'Total', 'Paid', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr
                key={b.id}
                style={{ borderBottom: `1px solid ${C.border}`, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = C.dark3}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '13px 14px', color: C.gold, fontWeight: 600, cursor: 'pointer' }} onClick={() => setSelectedB(b)}>{b.id}</td>
                <td style={{ padding: '13px 14px', color: C.cream }}>{b.guestName}</td>
                <td style={{ padding: '13px 14px', color: C.muted }}>{b.roomName}</td>
                <td style={{ padding: '13px 14px', color: C.muted, whiteSpace: 'nowrap' }}>{b.checkIn}</td>
                <td style={{ padding: '13px 14px', color: C.muted, whiteSpace: 'nowrap' }}>{b.checkOut}</td>
                <td style={{ padding: '13px 14px', color: C.cream, textAlign: 'center' }}>{b.nights}</td>
                <td style={{ padding: '13px 14px', color: C.cream, fontWeight: 600 }}>${b.total.toLocaleString()}</td>
                <td style={{ padding: '13px 14px' }}><span style={{ color: b.paid ? '#27ae60' : '#e74c3c', fontWeight: 600, fontSize: '0.75rem' }}>{b.paid ? '✓ Paid' : '✗ Unpaid'}</span></td>
                <td style={{ padding: '13px 14px' }}><Badge status={b.status} /></td>
                <td style={{ padding: '13px 14px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <Btn variant="ghost"   size="sm" onClick={() => setSelectedB(b)}>View</Btn>
                    {b.status === 'confirmed'  && <Btn variant="success" size="sm" onClick={() => updateStatus(b.id, 'checked-in')}>Check In</Btn>}
                    {b.status === 'checked-in' && <Btn variant="ghost"   size="sm" onClick={() => updateStatus(b.id, 'checked-out')}>Check Out</Btn>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: C.muted }}>No bookings found</div>}
      </div>

      {/* Booking detail modal */}
      <Modal open={!!selectedB} onClose={() => setSelectedB(null)} title={`Booking ${selectedB?.id}`} width={580}>
        {selectedB && <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {[['Guest Name', selectedB.guestName], ['Email', selectedB.email], ['Phone', selectedB.phone || '—'], ['Room', selectedB.roomName], ['Check-In', selectedB.checkIn], ['Check-Out', selectedB.checkOut], ['Duration', `${selectedB.nights} nights`], ['Guests', selectedB.guests], ['Total', `$${selectedB.total.toLocaleString()}`], ['Payment', selectedB.paid ? '✓ Paid' : '✗ Unpaid']].map(([k, v]) => (
              <div key={k} style={{ background: C.dark4, border: `1px solid ${C.border}`, padding: '14px 18px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: '0.9rem', color: k === 'Total' ? C.gold : k === 'Payment' ? (selectedB.paid ? '#27ae60' : '#e74c3c') : C.cream }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>Update Status</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'].map(s => (
                <button
                  key={s}
                  onClick={() => { updateStatus(selectedB.id, s); setSelectedB({ ...selectedB, status: s }); }}
                  style={{ padding: '6px 14px', background: selectedB.status === s ? C.gold : 'transparent', color: selectedB.status === s ? C.dark : C.muted, border: `1px solid ${selectedB.status === s ? C.gold : C.border}`, cursor: 'pointer', fontSize: '0.72rem', fontWeight: 500, textTransform: 'capitalize', transition: 'all 0.2s' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn variant="danger"  onClick={() => deleteBooking(selectedB.id)}>Delete Booking</Btn>
            <Btn variant="outline" onClick={() => setBookings(bs => bs.map(b => b.id === selectedB.id ? { ...b, paid: !b.paid } : b))}>
              {selectedB.paid ? 'Mark Unpaid' : 'Mark Paid'}
            </Btn>
          </div>
        </>}
      </Modal>

      {/* Add booking modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New Booking" width={560}>
        <Input label="Guest Full Name" value={newB.guestName} onChange={v => setNewB(b => ({ ...b, guestName: v }))} required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="Email" value={newB.email} onChange={v => setNewB(b => ({ ...b, email: v }))} />
          <Input label="Phone" value={newB.phone} onChange={v => setNewB(b => ({ ...b, phone: v }))} />
        </div>
        <Input label="Room" value={newB.room} onChange={v => setNewB(b => ({ ...b, room: v }))} options={ROOMS.map(r => ({ value: r.id, label: `${r.name} ($${r.price}/night)` }))} required />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="Check-In"  type="date" value={newB.checkIn}  onChange={v => setNewB(b => ({ ...b, checkIn: v }))}  required />
          <Input label="Check-Out" type="date" value={newB.checkOut} onChange={v => setNewB(b => ({ ...b, checkOut: v }))} required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Input label="Guests" value={newB.guests} onChange={v => setNewB(b => ({ ...b, guests: Number(v) }))} options={[1, 2, 3, 4].map(n => ({ value: n, label: `${n} Guest${n > 1 ? 's' : ''}` }))} />
          <Input label="Status" value={newB.status} onChange={v => setNewB(b => ({ ...b, status: v }))} options={['pending', 'confirmed', 'checked-in'].map(s => ({ value: s, label: s }))} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Btn variant="primary" size="lg" onClick={addNew} style={{ flex: 1, justifyContent: 'center' }} disabled={!newB.guestName || !newB.checkIn || !newB.checkOut}>Create Booking</Btn>
          <Btn variant="outline" onClick={() => setAddOpen(false)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
};

/* ── Admin rooms tab ────────────────────────────────────────── */
const AdminRooms = ({ bookings }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2.2rem', fontWeight: 400, color: C.cream }}>Room Management</h1>
        <p style={{ color: C.muted, fontSize: '0.85rem' }}>{ROOMS.length} rooms · Live availability & details</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {ROOMS.map(room => {
          const roomBookings = bookings.filter(b => b.room === room.id);
          const active       = roomBookings.find(b => ['confirmed', 'checked-in'].includes(b.status));
          const occupied     = !!active && active.status === 'checked-in';
          const reserved     = !!active && active.status === 'confirmed';
          const statusLabel  = occupied ? 'Occupied' : reserved ? 'Reserved' : 'Available';
          const statusColor  = occupied ? '#e74c3c' : reserved ? '#e67e22' : '#27ae60';

          return (
            <div
              key={room.id}
              onClick={() => setSelected(room)}
              style={{ background: C.dark2, border: `1px solid ${C.border}`, cursor: 'pointer', transition: 'all 0.2s', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{ position: 'relative' }}>
                <img src={room.img} alt={room.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, background: statusColor, color: '#fff', padding: '3px 10px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{statusLabel}</div>
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(12,10,8,0.85)', color: C.gold, padding: '3px 10px', fontSize: '0.65rem', fontWeight: 600 }}>Floor {room.floor}</div>
              </div>
              <div style={{ padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.2rem', color: C.cream }}>{room.name}</h3>
                  <span style={{ fontFamily: "'Cormorant Garamond'", fontSize: '1.2rem', color: C.gold }}>${room.price}/n</span>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[room.type, room.size, room.view].map(d => (
                    <span key={d} style={{ fontSize: '0.68rem', color: C.muted, background: C.dark4, padding: '3px 10px', textTransform: 'capitalize' }}>{d}</span>
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: C.muted }}>{roomBookings.length} total booking{roomBookings.length !== 1 ? 's' : ''}</div>
                {active && <div style={{ fontSize: '0.75rem', color: statusColor, marginTop: 4 }}>Current: {active.guestName}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Room detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''} width={620}>
        {selected && <>
          <img src={selected.img} alt="" style={{ width: '100%', height: 220, objectFit: 'cover', marginBottom: 20 }} />
          <p style={{ color: C.muted, fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 20 }}>{selected.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[['Type', selected.type], ['Size', selected.size], ['Floor', `Floor ${selected.floor}`], ['View', selected.view], ['Capacity', `${selected.capacity} guests`], ['Rate', `$${selected.price}/night`]].map(([k, v]) => (
              <div key={k} style={{ background: C.dark4, border: `1px solid ${C.border}`, padding: '12px 16px' }}>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: '0.88rem', color: C.cream, textTransform: 'capitalize' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>Amenities</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {selected.amenities.map(a => (
                <span key={a} style={{ background: C.dark4, border: `1px solid ${C.border}`, padding: '5px 12px', fontSize: '0.75rem', color: C.mutedLight }}>✓ {a}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 10 }}>Booking History</div>
            {bookings.filter(b => b.room === selected.id).length === 0
              ? <div style={{ color: C.muted, fontSize: '0.85rem' }}>No bookings for this room</div>
              : bookings.filter(b => b.room === selected.id).map(b => (
                  <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, fontSize: '0.82rem' }}>
                    <div>
                      <div style={{ color: C.cream, fontWeight: 600 }}>{b.guestName}</div>
                      <div style={{ color: C.muted, fontSize: '0.75rem' }}>{b.checkIn} → {b.checkOut}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: C.gold }}>${b.total.toLocaleString()}</div>
                      <Badge status={b.status} />
                    </div>
                  </div>
                ))}
          </div>
        </>}
      </Modal>
    </div>
  );
};

/* ── Admin guests tab ───────────────────────────────────────── */
const AdminGuests = ({ bookings }) => {
  const [search,   setSearch]   = useState('');
  const [selected, setSelected] = useState(null);

  const guests = bookings.filter(b => b.guestName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond'", fontSize: '2.2rem', fontWeight: 400, color: C.cream }}>Guest Directory</h1>
        <p style={{ color: C.muted, fontSize: '0.85rem' }}>{bookings.length} guest records</p>
      </div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search guests..."
        style={{ width: '100%', maxWidth: 400, background: C.dark2, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "'Jost'", fontSize: '0.88rem', padding: '12px 18px', outline: 'none', marginBottom: 24 }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {guests.map(b => {
          const guestBookings = bookings.filter(gb => gb.email === b.email);
          const totalSpent    = guestBookings.filter(gb => gb.paid).reduce((a, gb) => a + gb.total, 0);
          const initials      = b.guestName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
          return (
            <div
              key={b.id}
              onClick={() => setSelected(b)}
              style={{ background: C.dark2, border: `1px solid ${C.border}`, padding: '22px 24px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', color: C.dark, flexShrink: 0 }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 600, color: C.cream, marginBottom: 2 }}>{b.guestName}</div>
                  <div style={{ fontSize: '0.75rem', color: C.muted }}>{b.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <div><div style={{ color: C.muted, marginBottom: 2 }}>Bookings</div><div style={{ color: C.cream, fontWeight: 600 }}>{guestBookings.length}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ color: C.muted, marginBottom: 2 }}>Total Spent</div><div style={{ color: C.gold, fontWeight: 600 }}>${totalSpent.toLocaleString()}</div></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guest detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.guestName || ''} width={540}>
        {selected && <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            {[['Email', selected.email], ['Phone', selected.phone || '—'], ['Last Room', selected.roomName], ['Last Stay', `${selected.checkIn} → ${selected.checkOut}`]].map(([k, v]) => (
              <div key={k} style={{ background: C.dark4, border: `1px solid ${C.border}`, padding: '12px 16px' }}>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: '0.85rem', color: C.cream }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>Booking History</div>
          {bookings.filter(b => b.email === selected.email).map(b => (
            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <div>
                <div style={{ color: C.gold, fontSize: '0.8rem', fontWeight: 600, marginBottom: 2 }}>{b.id}</div>
                <div style={{ color: C.cream, fontSize: '0.88rem' }}>{b.roomName}</div>
                <div style={{ color: C.muted, fontSize: '0.75rem' }}>{b.checkIn} → {b.checkOut} · {b.nights} nights</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: C.gold, fontWeight: 600 }}>${b.total.toLocaleString()}</div>
                <Badge status={b.status} />
              </div>
            </div>
          ))}
        </>}
      </Modal>
    </div>
  );
};


/* ============================================================
   ROOT APP COMPONENT
   ============================================================ */
const App = () => {
  const [page,     setPage]     = useState('public');
  const [preRoom,  setPreRoom]  = useState(null);
  const [bookings, setBookings] = useState(BOOKINGS_INIT);

  const handleBook  = (room) => { setPreRoom(room); setPage('booking'); };
  const addBooking  = (b)    => setBookings(bs => [...bs, b]);

  return (
    <>
      {page !== 'admin' && <Nav setPage={setPage} />}
      {page === 'public'  && <PublicSite setPage={setPage} onBook={handleBook} />}
      {page === 'booking' && <BookingPage preRoom={preRoom} setPage={(p) => { setPreRoom(null); setPage(p); }} addBooking={addBooking} />}
      {page === 'admin'   && <AdminDash  bookings={bookings} setBookings={setBookings} setPage={setPage} />}
    </>
  );
};

/* Mount */
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
