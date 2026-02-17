const { useState, useEffect, useRef } = React;

// Accessing Lucide icons from the global window object
const { 
  ChevronRight, Cpu, Archive, ShieldCheck, Zap, TrendingUp, 
  Award, Target, Lock, ArrowRight, Cake, CircleDot, Users, Compass, Activity
} = lucide;

// --- Sub-Components ---

const Typewriter = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(20, 20, 25, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 116, 139, 0.3)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(100, 116, 139, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const Nav = ({ activePage, setActivePage }) => {
  const pages = [
    { id: 'home', label: 'Boot', icon: <Cpu size={16}/> },
    { id: 'timeline', label: 'Archive', icon: <Archive size={16}/> },
    { id: 'year19', label: 'Accel', icon: <Zap size={16}/> },
    { id: 'future', label: 'V.21', icon: <Target size={16}/> },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
      {pages.map((p) => (
        <button
          key={p.id}
          onClick={() => setActivePage(p.id)}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 text-xs font-medium uppercase tracking-widest ${
            activePage === p.id 
            ? 'bg-white text-slate-950 scale-105 shadow-lg shadow-white/10' 
            : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {p.icon}
          <span className="hidden md:inline">{p.label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- Page Components ---

const HomePage = ({ setActivePage }) => {
  const [bootStatus, setBootStatus] = useState('booting');

  useEffect(() => {
    const timer = setTimeout(() => setBootStatus('ready'), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (bootStatus === 'booting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] font-mono text-slate-400">
        <div className="w-64 h-1 bg-slate-800 rounded-full mb-4 overflow-hidden">
          <div className="h-full bg-white animate-[loading_2s_ease-in-out_infinite]" />
        </div>
        <div className="text-sm text-center px-4">
          <Typewriter text="Booting Personal Archive... Identity Confirmed: TULI ARON..." speed={30} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-24 py-8 animate-in fade-in duration-1000">
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-r from-blue-600/20 via-white/10 to-blue-600/20 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-950 shadow-xl shadow-white/20">
              <Cake size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Birthday Archive</h2>
              <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">March 8 • V.20</p>
            </div>
          </div>
          <div className="text-center md:text-right relative z-10">
            <p className="text-3xl font-black text-white italic">20 YEARS OLD</p>
          </div>
        </div>
      </section>

      <section className="text-center space-y-4 px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">TULI ARON</h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Version 2.0 • Online</p>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-6 pb-20">
        {['timeline', 'year19', 'future'].map((pageId) => (
          <button
            key={pageId}
            onClick={() => setActivePage(pageId)}
            className="group h-40 bg-slate-900/50 border border-white/5 rounded-xl hover:border-white/20 transition-all flex flex-col items-center justify-center p-4"
          >
            <h3 className="text-lg font-bold text-white uppercase">{pageId}</h3>
            <ArrowRight size={16} className="mt-4 text-white opacity-0 group-hover:opacity-100 transition-all" />
          </button>
        ))}
      </section>
    </div>
  );
};

// --- Main App Root ---

const App = () => {
  const [activePage, setActivePage] = useState('home');

  return (
    <div className="min-h-screen">
      <NeuralBackground />
      <div className="relative z-10 pb-32">
        {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
        {activePage === 'timeline' && <div className="p-20 text-center">Timeline Module Loaded</div>}
        {activePage === 'year19' && <div className="p-20 text-center">Year 19 Acceleration Loaded</div>}
        {activePage === 'future' && <div className="p-20 text-center">V.21 Future Protocol Loaded</div>}
      </div>
      <Nav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
              
