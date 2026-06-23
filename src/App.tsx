import { useState, useRef, useEffect } from 'react';
import profileImg from './assets/profile.jpg';
import { 
  Mail, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Database, 
  Brain, 
  Layers,
  GraduationCap, 
  Briefcase,
  Languages,
  Award
} from 'lucide-react';

interface Project {
  title: string;
  type: 'public' | 'private';
  desc: string;
  stack: string[];
  link?: string;
  repoLink?: string;
  citation?: string;
}

interface Job {
  role: string;
  company: string;
  period: string;
  desc: string;
  tags: string[];
  category: 'it' | 'teaching' | 'hospitality';
}

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private'>('all');
  const [activePubTab, setActivePubTab] = useState<'all' | 'publications' | 'datasets'>('all');
  const [activeExpTab, setActiveExpTab] = useState<'it' | 'teaching' | 'hospitality' | 'all'>('it');
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [consoleTab, setConsoleTab] = useState<'overview' | 'terminal'>('overview');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'input' | 'output'; text: string | React.ReactNode }>>([
    { type: 'output', text: "Welcome to Baizid's Interactive Terminal shell." },
    { type: 'output', text: "Type 'help' to see list of available commands." }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalState, setTerminalState] = useState<'main' | 'projects'>('main');

  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (consoleTab === 'terminal' && terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalLogs, consoleTab]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: Array<{ type: 'input' | 'output'; text: string | React.ReactNode }> = [
      ...terminalLogs,
      { type: 'input', text: `guest@baizid.dev:~$ ${terminalInput}` }
    ];

    if (terminalState === 'projects') {
      if (cmd === '1') {
        window.open('https://github.com/BAIZ1D/yterm', '_blank');
        newLogs.push({ type: 'output', text: 'Opening yterm source repository in a new tab...' });
        setTerminalState('main');
      } else if (cmd === '2') {
        window.open('https://github.com/BAIZ1D/petition-legislation-matching', '_blank');
        newLogs.push({ type: 'output', text: 'Opening petition-legislation-matching repository in a new tab...' });
        setTerminalState('main');
      } else if (cmd === '3') {
        window.open('https://www.baito-tracker.work', '_blank');
        newLogs.push({ type: 'output', text: 'Opening BaitoTracker live application in a new tab...' });
        setTerminalState('main');
      } else if (cmd === 'back') {
        newLogs.push({ type: 'output', text: 'Returned to main shell prompt.' });
        setTerminalState('main');
      } else {
        newLogs.push({ type: 'output', text: 'Invalid option. Select 1, 2, 3, or type "back".' });
      }
    } else {
      if (cmd === 'help') {
        newLogs.push({ 
          type: 'output', 
          text: (
            <span>
              Available commands:<br />
              &nbsp;&nbsp;<strong className="text-neoYellow">projects</strong> - Lists active repositories and SaaS links<br />
              &nbsp;&nbsp;<strong className="text-neoCyan">contact</strong>  - Show developer contact information<br />
              &nbsp;&nbsp;<strong className="text-neoOrange">clear</strong>    - Clear terminal buffer
            </span>
          )
        });
      } else if (cmd === 'projects') {
        setTerminalState('projects');
        newLogs.push({
          type: 'output',
          text: (
            <span>
              Select a project link to open:<br />
              &nbsp;&nbsp;[1] yterm (GitHub public repo)<br />
              &nbsp;&nbsp;[2] petition-legislation-matching (GitHub public repo)<br />
              &nbsp;&nbsp;[3] BaitoTracker (Live SaaS Application)<br />
              Type the number (1-3) to visit, or type <strong className="text-neoOrange">back</strong> to cancel.
            </span>
          )
        });
      } else if (cmd === 'contact') {
        newLogs.push({
          type: 'output',
          text: (
            <span>
              Contact info:<br />
              &nbsp;&nbsp;Email: <a href="mailto:baizid.al.hamid@gmail.com" className="underline hover:text-neoCyan">baizid.al.hamid@gmail.com</a><br />
              &nbsp;&nbsp;Phone: +81-90-5683-2771<br />
              &nbsp;&nbsp;LinkedIn: <a href="https://www.linkedin.com/in/baizidalhamid" target="_blank" rel="noreferrer" className="underline hover:text-neoCyan">linkedin.com/in/baizidalhamid</a>
            </span>
          )
        });
      } else if (cmd === 'clear') {
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      } else {
        newLogs.push({ type: 'output', text: `Command not found: '${cmd}'. Type 'help' for options.` });
      }
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const currentYear = new Date().getFullYear();
  const isGraduated = new Date() >= new Date('2028-04-01');
  const masterPeriod = isGraduated ? 'April 2026 - April 2028' : 'April 2026 - Present (Expected April 2028)';

  const bibtexCitation = `@inproceedings{alhamid2026automating,
  title={Automating Legal Statute Matching in Online Petition Systems},
  author={Al Hamid, Baizid and Kovacs, Mate and Salama, Shady and Serd{\\u}lt, Uwe},
  booktitle={Proceedings of the International Conference on eDemocracy \\& eGovernment (ICEDEG)},
  year={2026},
  note={Accepted for publication. To appear.}
}`;

  const copyToClipboard = (text: string, type: 'bibtex' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'bibtex') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const projects: Project[] = [
    {
      title: 'yterm',
      type: 'public',
      desc: 'Minimalist terminal-based YouTube client. Search, build custom playlists, and watch videos without ads or trackers. Blazingly fast CLI media client.',
      stack: ['Bash', 'FZF', 'MPV', 'yt-dlp', 'Shell'],
      repoLink: 'https://github.com/BAIZ1D/yterm'
    },
    {
      title: 'BaitoTracker',
      type: 'private',
      desc: 'Commercial SaaS shift management and salary estimation tool developed to help International Students in Japan track and optimize part-time job shifts and monthly income.',
      stack: ['React Native', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'Tailwind CSS'],
      link: 'https://www.baito-tracker.work'
    },
    {
      title: 'petition-legislation-matching',
      type: 'public',
      desc: 'A hybrid Information Retrieval and NLP framework automating legal statute matching in online petition systems. Evaluates cross-domain matching between citizen lay queries and structural statutory law.',
      stack: ['Python', 'PyTorch', 'Transformers', 'Qdrant (Vector DB)', 'BM25', 'spaCy', 'Blackstone'],
      repoLink: 'https://github.com/BAIZ1D/petition-legislation-matching'
    }
  ];

  const workExperience: Job[] = [
    {
      role: 'AI Engineer',
      company: '株式会社ジオリゾーム (GeoRhizome)',
      period: 'April 2026 - Present',
      desc: 'Developing localized document ingestion, multi-modal knowledge base querying pipelines, and secure enterprise AI/RAG solutions.',
      tags: ['Python', 'Llama.cpp', 'RAG', 'Docker', 'NLP'],
      category: 'it'
    },
    {
      role: 'Creator & Lead Developer',
      company: 'BaitoTracker SaaS',
      period: 'January 2026 - Present',
      desc: 'Architected and deployed a multi-platform application helping international students compute tax limits, work shifts, and pay calculations.',
      tags: ['React Native', 'TypeScript', 'Supabase', 'SaaS'],
      category: 'it'
    },
    {
      role: 'English Second Language Instructor',
      company: 'POC Field & RareJob Inc.',
      period: 'February 2024 - Present',
      desc: 'Leading vocabulary and conversational coaching sessions for business professionals and language students in Japan.',
      tags: ['ESL Instruction', 'Coaching', 'Communications'],
      category: 'teaching'
    },
    {
      role: 'Luxury Hospitality Specialist',
      company: 'The Ritz-Carlton & Four Seasons Kyoto',
      period: 'November 2022 - October 2023',
      desc: 'Refined my professional ethos by working at luxury hotels around Japan. Thus, approaching software with a detail-oriented and user-first mindset.',
      tags: ['Client Relations', 'Quality Assurance', 'Hospitality Ethos'],
      category: 'hospitality'
    }
  ];

  const filteredProjects = projects.filter(p => activeTab === 'all' || p.type === activeTab);
  const filteredExperience = workExperience.filter(job => activeExpTab === 'all' || job.category === activeExpTab);

  // Render Functions for Sections to avoid code duplication between Responsive layout variants
  const renderConnect = () => (
    <section className="neo-card bg-white p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2">Connect</h2>
      <div className="flex flex-col gap-3">
        <button 
          onClick={() => copyToClipboard('baizid.al.hamid@gmail.com', 'email')}
          className="neo-btn neo-btn-hover bg-neoCyan py-2 text-sm text-left px-4 font-bold border-2"
        >
          {copiedEmail ? <Check size={16} /> : <Mail size={16} />}
          {copiedEmail ? 'Email Copied!' : 'baizid.al.hamid@gmail.com'}
        </button>
        <a 
          href="https://www.linkedin.com/in/baizidalhamid" 
          target="_blank" 
          rel="noreferrer"
          className="neo-btn neo-btn-hover bg-neoGreen py-2 text-sm text-left px-4 font-bold border-2"
        >
          <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn Profile
        </a>
      </div>
    </section>
  );

  const renderEducation = () => (
    <section className="neo-card bg-white p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2 flex items-center gap-2">
        <GraduationCap size={22} /> Education
      </h2>
      <div className="flex flex-col gap-6">
        <div className="relative pl-6 border-l-2 border-black">
          <span className="absolute -left-[9px] top-1 w-4 h-4 bg-neoYellow border-2 border-black rounded-full"></span>
          <div className="font-bold text-sm">Ritsumeikan University</div>
          <div className="text-xs text-zinc-500 font-bold mb-1">Bachelor of Engineering (B.E.) · April 2022 - April 2026</div>
          <p className="text-xs font-semibold text-zinc-700">
            Major in Information Systems Science and Engineering.
            <span className="block mt-2">
              Standardized on advanced data structures, computational algorithms, and system architecture.
            </span>
          </p>
        </div>
        <div className="relative pl-6 border-l-2 border-black">
          <span className="absolute -left-[9px] top-1 w-4 h-4 bg-neoCyan border-2 border-black rounded-full"></span>
          <div className="font-bold text-sm">Ritsumeikan University</div>
          <div className="text-xs text-zinc-500 font-bold mb-1">Master of Engineering (M.E.) · {masterPeriod}</div>
          <p className="text-xs font-semibold text-zinc-700">
            Graduate School of Information Science and Engineering.
            <span className="block mt-2">
              Specializing in Information Science and Engineering, focusing heavily on Machine Learning, Natural Language Processing, and Legal Text alignment.
            </span>
          </p>
        </div>
      </div>
    </section>
  );

  const renderLanguages = () => (
    <section className="neo-card bg-white p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2 flex items-center gap-2">
        <Languages size={22} /> Languages
      </h2>
      <div className="flex flex-wrap gap-2">
        <span className="border-2 border-black bg-zinc-100 font-bold px-2 py-1 text-xs">English (Native)</span>
        <span className="border-2 border-black bg-zinc-100 font-bold px-2 py-1 text-xs">Bengali (Native)</span>
        <span className="border-2 border-black bg-zinc-100 font-bold px-2 py-1 text-xs">Japanese (Professional Working)</span>
        <span className="border-2 border-black bg-zinc-100 font-bold px-2 py-1 text-xs">Hindi (Professional)</span>
        <span className="border-2 border-black bg-zinc-100 font-bold px-2 py-1 text-xs">Urdu (Professional)</span>
      </div>
    </section>
  );

  const renderHonors = () => (
    <section className="neo-card bg-white p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2 flex items-center gap-2">
        <Award size={22} /> Honors & Awards
      </h2>
      <div className="flex flex-col gap-3 font-semibold text-xs text-zinc-700">
        <div className="border-l-4 border-neoYellow pl-2 py-1">
          <span className="font-extrabold text-black">JASSO Scholarship</span><br/>
          日本学生支援機構奨学金
        </div>
        <div className="border-l-4 border-neoCyan pl-2 py-1">
          <span className="font-extrabold text-black">Secondary School Certificate Scholarship</span><br/>
          National scholarship for academic excellence awarded by the Bangladesh Government.
        </div>
      </div>
    </section>
  );

  const renderTechStack = () => (
    <section className="neo-card bg-white p-6">
      <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2">Technical Stack</h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <div className="font-extrabold text-xs uppercase mb-2 text-zinc-500 flex items-center gap-1.5">
            <Terminal size={14} className="text-black" /> Languages
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['TypeScript', 'JavaScript', 'Python', 'Bash', 'Java'].map(lang => (
              <span key={lang} className="border-2 border-black bg-zinc-100 font-bold px-2 py-0.5 text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">{lang}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-extrabold text-xs uppercase mb-2 text-zinc-500 flex items-center gap-1.5">
            <Layers size={14} className="text-black" /> Full-Stack & UI
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['React Native', 'React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'].map(tool => (
              <span key={tool} className="border-2 border-black bg-neoGreen font-bold px-2 py-0.5 text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">{tool}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-extrabold text-xs uppercase mb-2 text-zinc-500 flex items-center gap-1.5">
            <Brain size={14} className="text-black" /> Machine Learning & NLP
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['PyTorch', 'Transformers', 'spaCy', 'Scikit-Learn', 'Blackstone'].map(ml => (
              <span key={ml} className="border-2 border-black bg-neoYellow font-bold px-2 py-0.5 text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">{ml}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-extrabold text-xs uppercase mb-2 text-zinc-500 flex items-center gap-1.5">
            <Database size={14} className="text-black" /> Cloud & Databases
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Supabase', 'PostgreSQL', 'Cloud Firestore', 'Qdrant (Vector DB)'].map(db => (
              <span key={db} className="border-2 border-black bg-neoCyan font-bold px-2 py-0.5 text-xs shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">{db}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderAboutMe = () => (
    <section className="neo-card neo-card-hover bg-white overflow-hidden">
      {/* Windows Console Title Bar */}
      <div className="bg-black text-white px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-4 border-black font-mono text-xs">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 border border-black"></span>
          </div>
          <div className="font-bold tracking-wider select-none text-[10px] md:text-xs">guest@baizid.dev: ~/about</div>
        </div>
        
        {/* Tab Selector */}
        <div className="flex border border-zinc-700 bg-zinc-900 p-0.5 rounded-none self-start sm:self-auto shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
          {(['overview', 'terminal'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setConsoleTab(tab)}
              className={`px-3 py-1 font-bold uppercase text-[9px] transition-colors ${
                consoleTab === tab ? 'bg-neoYellow text-black font-extrabold' : 'hover:bg-zinc-800 text-zinc-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      {/* Console Content */}
      {consoleTab === 'terminal' ? (
        <div 
          className="bg-zinc-950 text-emerald-400 font-mono text-xs md:text-sm p-5 h-[340px] flex flex-col justify-between cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <div ref={terminalScrollRef} className="overflow-y-auto pr-1 flex-1 flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
            {terminalLogs.map((log, idx) => (
              <div key={idx} className={log.type === 'input' ? 'text-white' : 'text-emerald-400 whitespace-pre-wrap leading-relaxed'}>
                {log.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800 shrink-0">
            <span className="text-white select-none font-bold">guest@baizid.dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white p-0 m-0 select-text caret-emerald-400 font-mono"
              placeholder="type 'help'..."
              autoFocus
            />
          </form>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-2xl font-bold uppercase mb-4 border-b-2 border-black pb-2 flex items-center gap-2">
            About Me
          </h2>
          
          <p className="text-sm font-semibold text-zinc-800 leading-relaxed mb-6">
            Hello, I’m Baizid Al Hamid (Al / アル). I am a software engineer and researcher driven by a passion for solving complex problems through Artificial Intelligence and intuitive web systems. Currently pursuing my Master’s at Ritsumeikan University, I focus on the intersection of machine learning and practical application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-black p-3.5 bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neoYellow/15 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              <div className="font-extrabold text-sm uppercase mb-1.5 flex items-center gap-1.5">
                <Brain size={16} /> Engineering
              </div>
              <p className="text-xs text-zinc-700 font-semibold leading-relaxed">
                Conducting AI & NLP research on legal text matching using LLMs and RAG-IR to align citizen petitions with legal statutes of a country.
              </p>
            </div>

            <div className="border-2 border-black p-3.5 bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neoCyan/15 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              <div className="font-extrabold text-sm uppercase mb-1.5 flex items-center gap-1.5">
                <Layers size={16} /> SaaS Dev
              </div>
              <p className="text-xs text-zinc-700 font-semibold leading-relaxed">
                Full-lifecycle developer of BaitoTracker, a SaaS application helping international students in Japan track and optimize part-time income.
              </p>
            </div>

            <div className="border-2 border-black p-3.5 bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neoOrange/15 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
              <div className="font-extrabold text-sm uppercase mb-1.5 flex items-center gap-1.5">
                <Briefcase size={16} /> Hospitality
              </div>
              <p className="text-xs text-zinc-700 font-semibold leading-relaxed">
                Refined my professional ethos by working at luxury hotels around Japan. Thus, approaching software with a detail-oriented and user-first mindset.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );

  const renderProjects = () => (
    <section className="flex flex-col gap-6">
      <div className="neo-card bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase">Projects Portfolio</h2>
        <div className="flex border-2 border-black p-0.5 bg-zinc-100 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {(['all', 'public', 'private'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 font-bold uppercase text-xs transition-colors ${
                activeTab === tab ? 'bg-black text-white' : 'hover:bg-zinc-200 text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map(project => (
          <article key={project.title} className="neo-card neo-card-hover bg-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 border-l-4 border-b-4 border-black px-3 py-1 font-bold uppercase text-xs bg-zinc-100 shadow-sm">
              {project.type}
            </div>
            <h3 className="text-2xl font-extrabold uppercase mb-3 flex items-center gap-2">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-700 font-semibold mb-4 leading-relaxed">
              {project.desc}
            </p>
            
            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.stack.map(st => (
                <span key={st} className="border border-black bg-zinc-50 font-bold px-2 py-0.5 text-xs">
                  {st}
                </span>
              ))}
            </div>

            {/* Links and citation */}
            <div className="flex flex-wrap gap-3">
              {project.repoLink && (
                <a 
                  href={project.repoLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="neo-btn neo-btn-hover bg-neoYellow px-4 py-1.5 text-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current inline" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> Source Code <ExternalLink size={10} />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="neo-btn neo-btn-hover bg-neoCyan px-4 py-1.5 text-xs"
                >
                  <ExternalLink size={14} /> Visit live app
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  const renderPublications = () => (
    <section className="flex flex-col gap-6">
      <div className="neo-card bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase">Publications & Datasets</h2>
        <div className="flex border-2 border-black p-0.5 bg-zinc-100 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {(['all', 'publications', 'datasets'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActivePubTab(tab)}
              className={`px-3 py-1 font-bold uppercase text-xs transition-colors ${
                activePubTab === tab ? 'bg-black text-white' : 'hover:bg-zinc-200 text-black'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Research & Publications Highlight */}
        {(activePubTab === 'all' || activePubTab === 'publications') && (
          <article className="neo-card neo-card-hover bg-neoOrange p-6 text-black">
            <h2 className="text-2xl font-bold uppercase mb-3 flex items-center gap-2">
              <FileText size={22} /> Research Publication
            </h2>
            <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-extrabold text-lg uppercase mb-1 leading-tight">
                Automating Legal Statute Matching in Online Petition Systems
              </h3>
              <p className="text-xs font-bold text-zinc-500 mb-3 uppercase">
                Proceedings of the International Conference on eDemocracy & eGovernment (ICEDEG) 2026
              </p>
              <p className="text-xs text-zinc-800 mb-4 font-semibold leading-relaxed">
                Evaluating structural statutory law alignment with citizen lay queries via a hybrid retrieval pipeline. Explores the impact of deep semantic retrieval systems combined with lexical BM25 matching.
              </p>
              <div className="text-xs font-bold mb-4">
                Collaborators: <span className="underline">Baizid Al Hamid</span>, Mate Kovacs, Shady Salama, Uwe Serdült.
              </div>
              <div className="border-t-2 border-black pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs uppercase text-zinc-500">Academic Citation (BibTeX)</span>
                  <button 
                    onClick={() => copyToClipboard(bibtexCitation, 'bibtex')}
                    className="flex items-center gap-1 border border-black bg-zinc-100 hover:bg-zinc-200 px-2.5 py-1 text-[10px] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    {copied ? <Check size={10} /> : <Copy size={10} />}
                    {copied ? 'Copied BibTeX!' : 'Copy BibTeX'}
                  </button>
                </div>
                <pre className="mono bg-zinc-50 border border-black p-3 text-[10px] text-zinc-800 overflow-x-auto whitespace-pre leading-normal">
                  {bibtexCitation}
                </pre>
              </div>
            </div>
          </article>
        )}

        {/* Published Dataset Highlight */}
        {(activePubTab === 'all' || activePubTab === 'datasets') && (
          <article className="neo-card neo-card-hover bg-neoCyan p-6 text-black">
            <h2 className="text-2xl font-bold uppercase mb-3 flex items-center gap-2">
              <Database size={22} /> Published Dataset
            </h2>
            <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-extrabold text-lg uppercase mb-1 leading-tight">
                Dataset for Automating Legal Statute Matching in UK Online Petition Systems
              </h3>
              <p className="text-xs font-bold text-zinc-500 mb-3 uppercase">
                Zenodo Repository · DOI: 10.5281/zenodo.18745175
              </p>
              <p className="text-xs text-zinc-800 mb-4 font-semibold leading-relaxed">
                A curated textual corpus of UK parliamentary acts processed via OCR and regular expressions, accompanied by a ground-truth evaluation set of 65 authentic citizen e-petitions mapped to expert statutory citations.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://doi.org/10.5281/zenodo.18745175" 
                  target="_blank" 
                  rel="noreferrer"
                  className="neo-btn neo-btn-hover bg-neoYellow px-4 py-1.5 text-xs"
                >
                  <ExternalLink size={12} /> Zenodo
                </a>
                <a 
                  href="https://huggingface.co/datasets/BA1Z1D/uk-petitions-legislations-matching" 
                  target="_blank" 
                  rel="noreferrer"
                  className="neo-btn neo-btn-hover bg-white text-black px-4 py-1.5 text-xs"
                >
                  <ExternalLink size={12} />
                  Hugging Face Datasets
                </a>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );

  const renderExperience = () => (
    <section className="flex flex-col gap-6">
      <div className="neo-card bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase flex items-center gap-2">
          <Briefcase size={22} /> Professional Experience
        </h2>
        <div className="flex border-2 border-black p-0.5 bg-zinc-100 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {(['it', 'teaching', 'hospitality', 'all'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveExpTab(tab)}
              className={`px-3 py-1 font-bold uppercase text-xs transition-colors ${
                activeExpTab === tab ? 'bg-black text-white' : 'hover:bg-zinc-200 text-black'
              }`}
            >
              {tab === 'it' ? 'IT' : tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        {filteredExperience.map(job => (
          <div key={job.role + job.company} className="neo-card neo-card-hover bg-white p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-black pb-2 mb-3">
              <div>
                <h3 className="font-extrabold text-lg uppercase leading-tight">{job.role}</h3>
                <span className="font-extrabold text-sm text-zinc-600">{job.company}</span>
              </div>
              <span className="border-2 border-black bg-zinc-100 text-xs font-extrabold px-3 py-1 self-start sm:self-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {job.period}
              </span>
            </div>
            <p className="text-xs text-zinc-700 font-semibold mb-4 leading-relaxed">
              {job.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {job.tags.map(tag => (
                <span key={tag} className="border border-black bg-zinc-50 font-bold px-2 py-0.5 text-[10px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-black selection:bg-neoYellow print:bg-white print:p-0">
      
      {/* Infinite Scrolling Ticker (Hidden on Print) */}
      <div className="w-full bg-black text-[#FACC15] border-b-4 border-black overflow-hidden py-2.5 print:hidden font-mono uppercase text-xs tracking-widest font-extrabold shadow-[0_4px_0_0_rgba(0,0,0,1)] relative z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="px-4">✦ AI Engineer & SaaS Developer ✦ Ritsumeikan University ✦ Open Source Contributor ✦ Osaka, Japan ✦</span>
          <span className="px-4">✦ AI Engineer & SaaS Developer ✦ Ritsumeikan University ✦ Open Source Contributor ✦ Osaka, Japan ✦</span>
          <span className="px-4">✦ AI Engineer & SaaS Developer ✦ Ritsumeikan University ✦ Open Source Contributor ✦ Osaka, Japan ✦</span>
          <span className="px-4">✦ AI Engineer & SaaS Developer ✦ Ritsumeikan University ✦ Open Source Contributor ✦ Osaka, Japan ✦</span>
        </div>
      </div>

      <div className="p-4 md:p-8 print:hidden">
      
      {/* Header Container */}
      <header className="max-w-6xl mx-auto mb-8 mt-12 md:mt-16 print:hidden">
        <div className="neo-card bg-neoYellow p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Pop-out Sticker Profile Picture */}
            <div className="relative -mt-16 md:-mt-20 md:-ml-12 w-32 h-32 md:w-36 md:h-36 bg-white p-2 border-4 border-black shadow-neoLg rounded-xl rotate-[-4deg] hover:rotate-[3deg] hover:scale-105 transition-all duration-300 transform cursor-pointer shrink-0">
              <div className="w-full h-full border-2 border-black overflow-hidden bg-zinc-200 rounded-lg">
                <img 
                  src={profileImg} 
                  alt="Baizid Al Hamid" 
                  className="w-full h-full object-cover" 
                  style={{ objectPosition: 'center 20%' }} 
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-neoOrange text-black font-extrabold text-[8px] px-1.5 py-0.5 border-2 border-black rotate-12 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] uppercase">
                Me ✦
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-block border-2 border-black bg-white px-3 py-1 font-bold uppercase text-xs mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                AI Engineer & SaaS Developer
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none mb-4">
                Baizid Al Hamid
              </h1>
              <p className="text-sm md:text-base font-semibold max-w-xl border-l-4 border-black pl-3 py-1">
                AI Engineer @ GeoRhizome | Graduate Student at Ritsumeikan University. Designing scalable SaaS architectures and intelligent semantic retrieval pipelines.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <div className="neo-card bg-white p-3 text-center font-bold text-sm flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black animate-pulse"></span>
              Active in Osaka, Japan
            </div>
            <a 
              href="https://github.com/BAIZ1D" 
              target="_blank" 
              rel="noreferrer"
              className="neo-btn neo-btn-hover bg-black text-white py-2 text-sm"
            >
              <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> github/BAIZ1D
            </a>
            <button 
              onClick={() => window.print()}
              className="neo-btn neo-btn-hover bg-neoOrange text-black py-2 text-sm flex items-center justify-center gap-2 border-2"
            >
              <FileText size={16} /> Download CV
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Layout Wrapper */}
      <main className="max-w-6xl mx-auto print:hidden">
        
        {/* Desktop Layout: 2 Columns */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {/* Left Column (1/3 width): Sidebar widgets */}
          <div className="col-span-1 flex flex-col gap-8">
            {renderConnect()}
            {renderEducation()}
            {renderLanguages()}
            {renderHonors()}
            {renderTechStack()}
          </div>
          {/* Right Column (2/3 width): Main contents */}
          <div className="col-span-2 flex flex-col gap-8">
            {renderAboutMe()}
            {renderProjects()}
            {renderPublications()}
            {renderExperience()}
          </div>
        </div>

        {/* Mobile Layout: Single column stacked in exact customized sequence */}
        <div className="flex flex-col gap-8 lg:hidden">
          {renderAboutMe()}
          {renderConnect()}
          {renderEducation()}
          {renderLanguages()}
          {renderHonors()}
          {renderTechStack()}
          {renderProjects()}
          {renderPublications()}
          {renderExperience()}
        </div>

      </main>

      {/* Footer Container */}
      <footer className="max-w-6xl mx-auto mt-12 text-center text-xs font-extrabold text-zinc-400 uppercase py-6 border-t-4 border-black print:hidden">
        <div>© {currentYear} Baizid Al Hamid. All rights reserved.</div>
      </footer>
      </div>

      {/* Printable CV Container (Hidden on screen, visible only on print) */}
      <div className="hidden print:block bg-white text-black p-8 font-sans text-xs max-w-[21cm] mx-auto leading-relaxed">
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4 mb-4">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-1">Baizid Al Hamid</h1>
          <p className="text-sm font-semibold uppercase mb-2 text-zinc-600">AI Engineer & SaaS Developer</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-zinc-700 font-semibold">
            <span>Osaka, Japan</span>
            <span>•</span>
            <span>baizid.al.hamid@gmail.com</span>
            <span>•</span>
            <span>github.com/BAIZ1D</span>
            <span>•</span>
            <span>linkedin.com/in/baizidalhamid</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column (1/3 width): Education, Skills, Languages */}
          <div className="col-span-1 border-r border-zinc-300 pr-6 flex flex-col gap-5">
            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase border-b-2 border-black pb-1 mb-2">Education</h2>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="font-bold text-black text-[10px]">Ritsumeikan University</div>
                  <div className="text-[9px] text-zinc-500 font-bold">Master of Engineering (M.E.)</div>
                  <div className="text-[9px] text-zinc-500 font-bold mb-1">{masterPeriod}</div>
                  <p className="text-[9px] text-zinc-700 leading-tight text-justify">
                    Graduate School of Info. Science & Eng. Specializing in Information Science and Engineering, focusing heavily on Machine Learning, NLP, and Legal Text alignment.
                  </p>
                </div>
                <div>
                  <div className="font-bold text-black text-[10px]">Ritsumeikan University</div>
                  <div className="text-[9px] text-zinc-500 font-bold">Bachelor of Engineering (B.E.)</div>
                  <div className="text-[9px] text-zinc-500 font-bold mb-1">April 2022 - April 2026</div>
                  <p className="text-[9px] text-zinc-700 leading-tight text-justify">
                    Major in Information Systems Science and Engineering. Standardized on advanced data structures, computational algorithms, and system architecture.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase border-b-2 border-black pb-1 mb-2">Technical Skills</h2>
              <div className="flex flex-col gap-2.5 text-[9px]">
                <div>
                  <div className="font-bold text-zinc-600 uppercase text-[8px]">Languages</div>
                  <div className="font-semibold text-zinc-800">TypeScript, JavaScript, Python, Bash, Java</div>
                </div>
                <div>
                  <div className="font-bold text-zinc-600 uppercase text-[8px]">Full-Stack & UI</div>
                  <div className="font-semibold text-zinc-800">React Native, React, Next.js, Node.js, Express, Tailwind CSS</div>
                </div>
                <div>
                  <div className="font-bold text-zinc-600 uppercase text-[8px]">ML & NLP</div>
                  <div className="font-semibold text-zinc-800">PyTorch, Transformers, spaCy, Blackstone</div>
                </div>
                <div>
                  <div className="font-bold text-zinc-600 uppercase text-[8px]">Cloud & DB</div>
                  <div className="font-semibold text-zinc-800">Supabase, PostgreSQL, Cloud Firestore, Qdrant</div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="text-xs font-bold uppercase border-b-2 border-black pb-1 mb-2">Languages</h2>
              <div className="flex flex-col gap-1 text-[9px] font-semibold text-zinc-800">
                <div>English (Native)</div>
                <div>Bengali (Native)</div>
                <div>Japanese (Professional Working)</div>
                <div>Hindi & Urdu (Professional)</div>
              </div>
            </div>
          </div>

          {/* Right Column (2/3 width): Experience, Projects */}
          <div className="col-span-2 flex flex-col gap-5">
            {/* Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase border-b-2 border-black pb-1 mb-2">Work Experience</h2>
              <div className="flex flex-col gap-4">
                {workExperience.map(job => (
                  <div key={job.role + job.company}>
                    <div className="flex justify-between items-baseline gap-2 mb-0.5">
                      <span className="font-bold text-black text-[10px]">{job.role}</span>
                      <span className="text-[8px] text-zinc-500 font-bold shrink-0">{job.period}</span>
                    </div>
                    <div className="text-[9px] font-bold text-zinc-600 mb-1">{job.company}</div>
                    <p className="text-[9px] text-zinc-700 leading-relaxed text-justify">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase border-b-2 border-black pb-1 mb-2">Key Projects</h2>
              <div className="flex flex-col gap-3">
                {projects.map(proj => (
                  <div key={proj.title}>
                    <div className="flex justify-between items-baseline gap-2 mb-0.5">
                      <span className="font-bold text-black text-[10px]">{proj.title}</span>
                      <span className="text-[8px] text-zinc-500 font-bold text-right shrink-0">{proj.stack.join(', ')}</span>
                    </div>
                    <p className="text-[9px] text-zinc-700 leading-normal text-justify">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
