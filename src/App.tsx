import { AlignJustify, AlertTriangle, User, Star, MousePointerClick, CreditCard, ChevronDown, Type, Info, List, CheckSquare, Table, CalendarClock, Search } from 'lucide-react'
import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import AccordionPlayground from './components/AccordionPlayground'
import BadgePlayground from './components/BadgePlayground'
import TextInputPlayground from './components/TextInputPlayground'
import SelectPlayground from './components/SelectPlayground'
import CheckboxPlayground from './components/CheckboxPlayground'
import ButtonPlayground from './components/ButtonPlayground'
import TablePlayground from './components/TablePlayground'
import AlertPlayground from './components/AlertPlayground'
import DateTimePickerPlayground from './components/DateTimePickerPlayground'
import AboutPage from './components/AboutPage'
import CardPlayground from './components/CardPlayground'

const components = [
  {
    name: 'Accordion',
    icon: <AlignJustify size={22} />,
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    link: '/playground/accordion',
  },
  {
    name: 'Alert',
    icon: <AlertTriangle size={22} />,
    description: 'Displays important messages in a prominent way.',
    link: '/playground/alert',
  },
  {
    name: 'Avatar',
    icon: <User size={22} />,
    description: 'A graphical representation of a user or entity.',
    link: '#avatar',
  },
  {
    name: 'Badge',
    icon: <Star size={22} />,
    description: 'A small count or status indicator for UI elements.',
    link: '/playground/badge',
  },
  {
    name: 'Button',
    icon: <MousePointerClick size={22} />,
    description: 'A clickable button element for user actions.',
    link: '/playground/button',
  },
  {
    name: 'Card',
    icon: <CreditCard size={22} />,
    description: 'A flexible and extensible content container.',
    link: '/playground/card',
  },
  {
    name: 'Dropdown',
    icon: <ChevronDown size={22} />,
    description: 'A toggleable menu for displaying a list of actions.',
    link: '#dropdown',
  },
  {
    name: 'Text Input',
    icon: <Type size={22} />,
    description: 'A single-line field for user text input.',
    link: '/playground/text-input',
  },
  {
    name: 'Tooltip',
    icon: <Info size={22} />,
    description: 'A popup that displays information related to an element.',
    link: '#tooltip',
  },
  {
    name: 'Select',
    icon: <List size={22} />,
    description: 'A dropdown select input for choosing a single option from a list.',
    link: '/playground/select',
  },
  {
    name: 'Checkbox',
    icon: <CheckSquare size={22} />,
    description: 'A standard checkbox input for toggling boolean values.',
    link: '/playground/checkbox',
  },
  {
    name: 'Table',
    icon: <Table size={22} />,
    description: 'A flexible table component for displaying tabular data with sorting, selection, and pagination.',
    link: '/playground/table',
  },
  {
    name: 'Date/Time Picker',
    icon: <CalendarClock size={22} />,
    description: 'A flexible picker for dates, times, and ranges.',
    link: '/playground/date-time-picker',
  },
]

components.sort((a, b) => a.name.localeCompare(b.name));

function LandingPage() {
  const [search, setSearch] = useState('')
  const filtered = components.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: 'linear-gradient(120deg, #23272f 60%, #2d3748 100%)',
        color: '#f3f4f6',
        padding: 0,
        textAlign: 'center',
        minHeight: 480,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Faint grid overlay for hero */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 40px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 40px)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        {/* Vibrant blurred background elements */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: 60,
          width: 180,
          height: 180,
          background: 'rgba(99, 102, 241, 0.45)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 30,
          right: 120,
          width: 220,
          height: 120,
          background: 'rgba(16, 185, 129, 0.35)',
          filter: 'blur(60px)',
          borderRadius: '50% 50% 60% 40%',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute',
          top: 120,
          right: 320,
          width: 120,
          height: 120,
          background: 'rgba(236, 72, 153, 0.30)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          zIndex: 0,
        }} />
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          padding: '2rem 2rem 0 2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 26,
              color: '#fff',
              letterSpacing: '-2px',
              boxShadow: '0 2px 8px rgba(99,102,241,0.10)',
            }}>B</div>
            <span style={{ fontWeight: 700, fontSize: 22, color: '#fff', letterSpacing: '-1px' }}>Blocksmith UI</span>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <Link to="/about" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>About</Link>
            <a href="mailto:boobalankannan6@gmail.com" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>Mail</a>
            <a href="https://www.linkedin.com/in/boopalakannan-kamaraj-aa3603144/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>LinkedIn</a>
          </div>
        </div>
        {/* Hero Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>Blocksmith UI</h1>
          <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: 600, margin: '0 auto' }}>
            Beautifully crafted React components for building modern web apps, with live playground, code, and API reference coming soon.
          </p>
        </div>
      </section>

      {/* Components Section */}
      <section style={{ width: '100%', maxWidth: 1720, margin: '48px auto 0 auto', padding: '4rem 0 3rem 0' }}>
        <div style={{ width: '100%', maxWidth: 1720, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32, width: '100%' }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: -1, margin: 0 }}>Components</h2>
            <div style={{ position: 'relative', width: 220 }}>
              <Search size={20} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#888', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search components..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: 220,
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  fontSize: 18,
                  outline: 'none',
                  background: '#fff',
                  color: '#222',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            rowGap: '2.5rem',
            alignItems: 'stretch',
            width: '100%',
            padding: '0 24px',
          }}
        >
          {filtered.length === 0 && (
            <div style={{ color: '#888', fontSize: 20, marginTop: 32, gridColumn: '1/-1' }}>No components found.</div>
          )}
          {filtered.map((comp) => (
            <div
              key={comp.name}
              className="card"
              style={{
                minWidth: 0,
                maxWidth: 320,
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                borderRadius: 16,
                cursor: 'pointer',
                transition: 'transform 0.15s',
                background: '#fff',
                color: '#222',
                marginBottom: '1rem',
                minHeight: 220,
                maxHeight: 260,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '2em',
              }}
            >
              <Link
                to={comp.link}
                style={{ textDecoration: 'none', color: 'inherit', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ margin: '1.5rem 0 0.5rem 0', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{comp.icon}</div>
                <h2 style={{ margin: '0.5rem 0', fontSize: 18 }}>{comp.name}</h2>
                <p style={{
                  color: '#666',
                  fontSize: '1rem',
                  minHeight: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxHeight: '4.5em',
                  textAlign: 'center',
                  margin: '0 0 1em 0',
                }}>{comp.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div style={{ minHeight: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: 28, fontWeight: 600 }}>
      <span>{title}</span>
      <span style={{ fontSize: 20, color: '#888', marginTop: 12 }}>Coming Soon</span>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      background: '#23272f',
      color: '#fff',
      textAlign: 'center',
      marginTop: 40,
      padding: '24px 0 12px 0',
    }}>
      <div style={{ fontSize: 16, marginBottom: 8 }}>
        <a href="mailto:boobalankannan6@gmail.com" style={{ color: '#a5b4fc', marginRight: 18, textDecoration: 'underline' }}>Mail</a>
        <a href="https://www.linkedin.com/in/boopalakannan-kamaraj-aa3603144/" target="_blank" rel="noopener noreferrer" style={{ color: '#a5b4fc', textDecoration: 'underline' }}>LinkedIn</a>
      </div>
      <div style={{ fontSize: 14, color: '#94a3b8' }}>© {new Date().getFullYear()} Blocksmith UI</div>
    </footer>
  );
}

function InnerApp() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ComingSoon title="Contact" />} />
        <Route path="/playground/accordion" element={<AccordionPlayground />} />
        <Route path="/playground/alert" element={<AlertPlayground />} />
        <Route path="/playground/badge" element={<BadgePlayground />} />
        <Route path="/playground/button" element={<ButtonPlayground />} />
        <Route path="/playground/select" element={<SelectPlayground />} />
        <Route path="/playground/text-input" element={<TextInputPlayground />} />
        <Route path="/playground/checkbox" element={<CheckboxPlayground />} />
        <Route path="/playground/table" element={<TablePlayground />} />
        <Route path="/playground/date-time-picker" element={<DateTimePickerPlayground />} />
        <Route path="/playground/card" element={<CardPlayground />} />
      </Routes>
      {!location.pathname.startsWith('/playground') && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}

/* Animations for blobs, underline, ticker */
const style = document.createElement('style');
style.innerHTML = `
@keyframes blobMove1 {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(20px, 30px) scale(1.08) rotate(8deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
}
@keyframes blobMove2 {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(-30px, 10px) scale(1.12) rotate(-6deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
}
@keyframes blobMove3 {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(15px, -20px) scale(0.95) rotate(12deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
}
@keyframes underlineSlide {
  0% { width: 64px; }
  100% { width: 120px; }
}
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-60%); }
}
`;
document.head.appendChild(style);
