import { useState } from 'react';
import { 
  Mail, 
  FileText, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Database, 
  Brain, 
  Layers
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

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private'>('all');
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
      desc: 'Full-stack mobile and web application designed to simplify part-time job management. Log shifts, track hours, and dynamically compute estimated monthly income.',
      stack: ['React Native', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'Tailwind CSS'],
      link: 'https://www.baito-tracker.work'
    },
    {
      title: 'petition-legislation-matching',
      type: 'public',
      desc: 'A hybrid Information Retrieval and NLP framework automating legal statute matching in online petition systems. Evaluates cross-domain matching between citizen lay queries and structural statutory law.',
      stack: ['Python', 'PyTorch', 'Transformers', 'Qdrant (Vector DB)', 'BM25', 'spaCy', 'Blackstone'],
      repoLink: 'https://github.com/BAIZ1D/petition-legislation-matching',
      citation: bibtexCitation
    }
  ];

  const filteredProjects = projects.filter(p => activeTab === 'all' || p.type === activeTab);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-black p-4 md:p-8 selection:bg-neoYellow">
      
      {/* Header Container */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="neo-card bg-neoYellow p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-block border-2 border-black bg-white px-3 py-1 font-bold uppercase text-xs mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Software Engineer & Researcher
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-none mb-4">
              Baizid Al Hamid
            </h1>
            <p className="text-lg md:text-xl font-medium max-w-2xl border-l-4 border-black pl-3 py-1">
              Building high-fidelity full-stack applications, intelligent Natural Language Processing (NLP) pipelines, and fast terminal utilities.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            <div className="neo-card bg-white p-3 text-center font-bold text-sm flex items-center justify-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 border border-black animate-pulse"></span>
              Open to Opportunities
            </div>
            <a 
              href="https://github.com/BAIZ1D" 
              target="_blank" 
              rel="noreferrer"
              className="neo-btn neo-btn-hover bg-black text-white py-2 text-sm"
            >
              <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg> github/BAIZ1D
            </a>
          </div>
        </div>
      </header>

      {/* Grid Layout */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card + Tech Stack */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* About & Quick Links */}
          <section className="neo-card bg-white p-6">
            <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2">About Me</h2>
            <p className="text-sm leading-relaxed mb-6 font-medium text-zinc-700">
              I focus on bridges between complex algorithms and sleek developer tooling. My research spans cross-domain information retrieval, computational legal informatics, and high-performance terminal environments.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => copyToClipboard('baizid_alhamid@icloud.com', 'email')}
                className="neo-btn neo-btn-hover bg-neoCyan py-2 text-sm text-left px-4 font-bold border-2"
              >
                {copiedEmail ? <Check size={16} /> : <Mail size={16} />}
                {copiedEmail ? 'Email Copied!' : 'baizid_alhamid@icloud.com'}
              </button>
              <a 
                href="https://www.linkedin.com/in/baizid-al-hamid-499708170/" 
                target="_blank" 
                rel="noreferrer"
                className="neo-btn neo-btn-hover bg-neoGreen py-2 text-sm text-left px-4 font-bold border-2"
              >
                <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> LinkedIn Profile
              </a>
            </div>
          </section>

          {/* Education & Achievements */}
          <section className="neo-card bg-white p-6">
            <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2">Education & Research</h2>
            <div className="flex flex-col gap-6">
              <div className="relative pl-6 border-l-2 border-black">
                <span className="absolute -left-[9px] top-1 w-4 h-4 bg-neoYellow border-2 border-black rounded-full"></span>
                <div className="font-bold text-sm">International Conference publication</div>
                <div className="text-xs text-zinc-500 font-bold mb-1">ICEDEG 2026</div>
                <p className="text-xs font-semibold text-zinc-700">
                  Accepted paper on automated legal statute matching using hybrid semantic architectures.
                </p>
              </div>
              <div className="relative pl-6 border-l-2 border-black">
                <span className="absolute -left-[9px] top-1 w-4 h-4 bg-neoCyan border-2 border-black rounded-full"></span>
                <div className="font-bold text-sm">Specialization in NLP & IR</div>
                <div className="text-xs text-zinc-500 font-bold mb-1">Advanced Legal Informatics</div>
                <p className="text-xs font-semibold text-zinc-700">
                  Researching dense vector spaces and lexical indexes for cross-domain document retrieval.
                </p>
              </div>
            </div>
          </section>

          {/* Tech Stack Box */}
          <section className="neo-card bg-white p-6">
            <h2 className="text-2xl font-bold uppercase mb-4 border-b-4 border-black pb-2">Technical Stack</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <div className="font-extrabold text-xs uppercase mb-2 text-zinc-500 flex items-center gap-1.5">
                  <Terminal size={14} className="text-black" /> Languages
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['TypeScript', 'JavaScript', 'Python', 'Bash', 'Java', 'C++'].map(lang => (
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

        </div>

        {/* Right Columns: Projects & Research Publications */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Projects Section */}
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
                <article key={project.title} className="neo-card bg-white p-6 relative overflow-hidden">
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

                  {/* Bibliographic information for Research Projects */}
                  {project.citation && (
                    <div className="mt-6 border-t-2 border-black pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-extrabold text-xs uppercase text-zinc-500">Academic Citation</span>
                        <button 
                          onClick={() => copyToClipboard(project.citation || '', 'bibtex')}
                          className="flex items-center gap-1 border border-black bg-zinc-100 hover:bg-zinc-200 px-2 py-0.5 text-[10px] font-bold"
                        >
                          {copied ? <Check size={10} /> : <Copy size={10} />}
                          {copied ? 'Copied BibTeX!' : 'Copy BibTeX'}
                        </button>
                      </div>
                      <pre className="mono bg-zinc-50 border border-black p-3 text-[10px] text-zinc-800 overflow-x-auto whitespace-pre leading-normal">
                        {project.citation}
                      </pre>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Research & Publications Highlight */}
          <section className="neo-card bg-neoOrange p-6 text-black">
            <h2 className="text-2xl font-bold uppercase mb-3 flex items-center gap-2">
              <FileText size={22} /> Research Publication
            </h2>
            <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-extrabold text-lg uppercase mb-1">
                Automating Legal Statute Matching in Online Petition Systems
              </h3>
              <p className="text-xs font-bold text-zinc-500 mb-3 uppercase">
                Proceedings of the International Conference on eDemocracy & eGovernment (ICEDEG) 2026
              </p>
              <p className="text-xs text-zinc-800 mb-4 font-semibold leading-relaxed">
                Evaluating structural statutory law alignment with citizen lay queries via a hybrid retrieval pipeline. Explores the impact of deep semantic retrieval systems combined with lexical BM25 matching.
              </p>
              <div className="text-xs font-bold">
                Collaborators: <span className="underline">Baizid Al Hamid</span>, Mate Kovacs, Shady Salama, Uwe Serdült.
              </div>
            </div>
          </section>

        </div>

      </main>

      {/* Footer Container */}
      <footer className="max-w-6xl mx-auto mt-12 text-center text-xs font-extrabold text-zinc-400 uppercase py-6 border-t-4 border-black">
        <div>© 2026 Baizid Al Hamid. All rights reserved. Designed in Neo-Brutalist layout.</div>
      </footer>

    </div>
  );
}

export default App;
