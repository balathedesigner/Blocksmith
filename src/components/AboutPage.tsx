import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, AlignJustify, MousePointerClick, List } from 'lucide-react';

export default function AboutPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', width: '100%', fontFamily: 'inherit', overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* Header/Nav */}
      <nav style={{
        width: '100%',
        padding: '2rem 2rem 0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
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
          <span style={{ fontWeight: 700, fontSize: 22, color: '#23272f', letterSpacing: '-1px' }}>Blocksmith UI</span>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <Link to="/" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>Home</Link>
          <Link to="/about" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>About</Link>
          <a href="mailto:boobalankannan6@gmail.com" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>Mail</a>
          <a href="https://www.linkedin.com/in/boopalakannan-kamaraj-aa3603144/" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', fontWeight: 500, textDecoration: 'underline', fontSize: 18 }}>LinkedIn</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        width: '100%',
        padding: '48px 0 32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        boxSizing: 'border-box',
      }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#23272f', marginBottom: 10, letterSpacing: '-1.5px', textAlign: 'left' }}>About Blocksmith UI</h1>
        <p style={{ fontSize: 22, color: '#63687a', maxWidth: 700, textAlign: 'left', margin: 0 }}>
          Building the bridge between design & development—one component at a time.
        </p>
      </section>

      {/* Main Grid Content */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <main
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            width: '100%',
            maxWidth: '1400px',
            padding: '48px 2rem 64px 2rem',
            boxSizing: 'border-box',
            overflowX: 'hidden',
          }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Who I Am */}
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: '#23272f', letterSpacing: '-1px', textAlign: 'left' }}>Who I Am</h2>
              <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7, textAlign: 'left' }}>
                Hi! I'm <span style={{ color: '#6366f1', fontWeight: 700 }}>Boopalakannan Kamaraj</span>, a UI/UX and product designer passionate about bridging the gap between design and development. I believe great products are built when designers and developers speak the same language—and that's what Blocksmith UI is all about.
              </p>
            </section>
            {/* My Mission */}
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: '#23272f', letterSpacing: '-1px', textAlign: 'left' }}>My Mission</h2>
              <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7, textAlign: 'left' }}>
                My goal is to design and build components that work out of the box in every state, variant, and scenario—so devs can focus on building, and designers don't have to panic during QA. No more missing edge cases or mystery meat buttons!
              </p>
            </section>
          </div>
          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* How I Work */}
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: '#23272f', letterSpacing: '-1px', textAlign: 'left' }}>How I Work</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#6366f1' }}><BadgeCheck size={20} /> ShadCN UI</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#6366f1' }}><AlignJustify size={20} /> Radix UI</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#6366f1' }}><MousePointerClick size={20} /> Lucide Icons</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#6366f1' }}><List size={20} /> Tailwind CSS</span>
              </div>
              <ul style={{ color: '#444', fontSize: 17, marginLeft: 24, marginTop: 0, textAlign: 'left' }}>
                <li>Designing for every state and edge case</li>
                <li>Accessibility and usability first</li>
                <li>Code and design in sync—always</li>
                <li>Continuous learning and sharing</li>
              </ul>
            </section>
            {/* What's Next */}
            <section>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10, color: '#23272f', letterSpacing: '-1px', textAlign: 'left' }}>What's Next</h2>
              <ul style={{ color: '#444', fontSize: 17, marginLeft: 24, marginTop: 0, textAlign: 'left' }}>
                <li>"Copy to Figma" for seamless design handoff</li>
                <li>More component variants and docs</li>
                <li>Live code playground and API reference</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
      {/* Responsive grid: 1 column on small screens */}
      <style>{`
        @media (max-width: 900px) {
          main[style] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
} 