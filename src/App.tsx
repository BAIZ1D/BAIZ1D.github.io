import { useState } from 'react';
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
      desc: 'Maintained detail-oriented service standards in world-class catering and client management. Transformed this high-end service mindset into a "user-first" product engineering ethos.',
      tags: ['Client Relations', 'Quality Assurance', 'Hospitality Ethos'],
      category: 'hospitality'
    }
  ];

  const filteredProjects = projects.filter(p => activeTab === 'all' || p.type === activeTab);
  const filteredExperience = workExperience.filter(job => activeExpTab === 'all' || job.category === activeExpTab);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-black p-4 md:p-8 selection:bg-neoYellow print:bg-white print:p-0">
      
      {/* Header Container */}
      <header className="max-w-6xl mx-auto mb-8 print:hidden">
        <div className="neo-card bg-neoYellow p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 md:w-28 md:h-28 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden shrink-0">
              <img src={profileImg} alt="Baizid Al Hamid" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
            </div>
            <div>
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

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 print:hidden">
        
        {/* Left Column: Profile Card + Tech Stack */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          {/* Contact & Links */}
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

          {/* Education & Academic Path */}
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
                <div className="text-xs text-zinc-500 font-bold mb-1">Master of Engineering (M.E.) · April 2026 - Present (Expected April 2028)</div>
                <p className="text-xs font-semibold text-zinc-700">
                  Graduate School of Information Science and Engineering.
                  <span className="block mt-2">
                    Specializing in Information Science and Engineering, focusing heavily on Machine Learning, Natural Language Processing, and Legal Text alignment.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Languages Section */}
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

          {/* Honors & Scholarships */}
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

        {/* Right Columns: Projects & Research Publications & Experience */}
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
                </article>
              ))}
            </div>
          </section>

          <hr className="border-t-4 border-black" />

          {/* Publications & Datasets Section */}
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
                <article className="neo-card bg-neoOrange p-6 text-black">
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
                <article className="neo-card bg-neoCyan p-6 text-black">
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
                        <svg className="w-4.5 h-4.5 inline mr-1.5 align-middle" viewBox="0 0 1500 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M1348.72 1168.37C1360.03 1142.67 1361.13 1113.74 1351.94 1087.55C1361.08 1064.58 1362.52 1038.87 1356.33 1014.97C1353.1 1002.63 1347.95 991.175 1341.12 980.965C1342.52 976.029 1343.6 970.929 1344.36 965.659C1349.44 930.378 1337.38 896.408 1313.59 870.403C1302.83 858.64 1289.91 849.894 1275.97 844.105C1284.44 805.888 1288.9 766.185 1288.9 725.475C1288.9 425.12 1046.33 181.36 746.772 181.36C447.213 181.36 204.644 425.12 204.644 725.475C204.644 767.136 209.317 807.743 218.176 846.781C206.46 852.482 195.618 860.354 186.431 870.403C162.65 896.406 150.585 930.384 155.658 965.659C156.415 970.926 157.505 976.031 158.904 980.965C152.074 991.175 146.922 1002.63 143.692 1014.97C137.445 1038.82 138.958 1064.63 148.078 1087.54C138.888 1113.74 139.992 1142.68 151.301 1168.37C171.605 1214.49 218.813 1243.21 283.614 1269C355.654 1297.68 435.229 1318.64 516.715 1318.64C582.532 1318.64 639.737 1302.62 681.509 1265.68C702.919 1268.26 724.699 1269.59 746.772 1269.59C770.797 1269.59 794.475 1268.02 817.706 1264.97C859.527 1302.39 917.048 1318.64 983.305 1318.64C1065.11 1318.64 1144.1 1297.79 1216.41 1269C1281.21 1243.21 1328.42 1214.49 1348.72 1168.37ZM1201.48 1231.5C1265.52 1206.01 1298.5 1182.26 1311.77 1152.11C1321.11 1130.89 1319.46 1106.41 1307.02 1086.84C1323.52 1061.54 1320.36 1036.98 1317.28 1025.19C1313.34 1010.15 1305.2 997.644 1294.14 988.661C1299.38 979.912 1302.89 970.461 1304.41 959.918C1307.59 937.779 1300.28 915.653 1283.81 897.648C1278.56 891.903 1272.36 887.26 1265.59 883.763C1253.45 877.49 1239.44 874.904 1225.67 876.26C1229.83 862.94 1233.45 849.38 1236.51 835.609C1244.38 800.161 1248.53 763.306 1248.53 725.476C1248.53 447.262 1023.89 221.726 746.772 221.726C469.656 221.726 245.01 447.262 245.01 725.476C245.01 763.44 249.193 800.424 257.122 835.988C260.135 849.506 263.69 862.818 267.762 875.901C254.074 875.791 240.392 879.604 228.93 886.961C224.276 889.948 219.988 893.519 216.214 897.648C199.743 915.653 192.427 937.779 195.613 959.918C197.128 970.461 200.637 979.912 205.881 988.661C194.823 997.644 186.678 1010.15 182.742 1025.19C179.66 1036.98 176.501 1061.54 192.997 1086.84C180.564 1106.41 178.908 1130.89 188.245 1152.11C201.517 1182.26 234.498 1206.01 298.542 1231.5C367.636 1259 441.978 1278.27 516.715 1278.27C584.432 1278.27 634.963 1259.67 667.239 1222.93C693.142 1227.07 719.707 1229.23 746.772 1229.23C775.811 1229.23 804.275 1226.75 831.964 1221.99C864.201 1259.36 915.014 1278.28 983.305 1278.28C1058.36 1278.28 1132.11 1259.11 1201.48 1231.5Z" fill="#22D3EE"/>
                          <path d="M635.221 1179.69C670.856 1127.23 668.331 1087.85 619.437 1038.79C570.542 989.739 542.081 917.979 542.081 917.979C542.081 917.979 531.45 876.301 507.236 880.136C483.022 883.971 465.244 946.254 515.964 984.357C566.684 1022.45 505.864 1048.33 486.35 1012.55C466.836 976.778 413.552 884.803 385.92 867.214C358.3 849.625 338.851 859.479 345.365 895.736C351.878 931.993 467.393 1019.87 456.154 1038.89C444.914 1057.9 405.304 1016.55 405.304 1016.55C405.304 1016.55 281.359 903.302 254.374 932.812C227.389 962.322 274.846 987.048 342.477 1028.15C410.121 1069.25 415.365 1080.1 405.77 1095.65C396.162 1111.2 246.864 984.825 232.84 1038.4C218.83 1091.97 385.208 1107.52 374.939 1144.5C364.671 1181.5 257.741 1074.5 235.87 1116.19C213.987 1157.89 386.762 1206.89 388.16 1207.25C443.969 1221.79 585.705 1252.59 635.221 1179.69Z" fill="#22D3EE"/>
                          <path d="M864.806 1179.69C829.171 1127.23 831.696 1087.85 880.591 1038.79C929.485 989.739 957.946 917.979 957.946 917.979C957.946 917.979 968.577 876.301 992.791 880.136C1017.01 883.971 1034.78 946.254 984.064 984.357C933.344 1022.45 994.164 1048.33 1013.68 1012.55C1033.19 976.778 1086.47 884.803 1114.11 867.214C1141.73 849.625 1161.18 859.479 1154.66 895.736C1148.15 931.993 1032.63 1019.87 1043.87 1038.89C1055.11 1057.9 1094.72 1016.55 1094.72 1016.55C1094.72 1016.55 1218.67 903.302 1245.65 932.812C1272.64 962.322 1225.18 987.048 1157.55 1028.15C1089.91 1069.25 1084.66 1080.1 1094.26 1095.65C1103.87 1111.2 1253.16 984.825 1267.19 1038.4C1281.2 1091.97 1114.82 1107.52 1125.09 1144.5C1135.36 1181.5 1242.29 1074.5 1264.16 1116.19C1286.04 1157.89 1113.27 1206.89 1111.87 1207.25C1056.06 1221.79 914.322 1252.59 864.806 1179.69Z" fill="#22D3EE"/>
                          <path d="M675.913 853.201C679.674 855.39 683.766 857.524 688.891 860.001C705.59 868.074 725.878 873.106 750.564 873.106C777.366 873.106 799.015 867.175 816.53 857.819C821.193 855.328 825.305 852.779 828.701 850.52C818.286 841.142 806.116 833.688 792.747 828.717C791.172 828.131 789.58 827.58 787.973 827.064C782.46 825.295 776.761 834.148 770.915 843.232C765.317 851.929 759.582 860.838 753.744 860.838C748.268 860.838 742.882 851.802 737.615 842.964C732.157 833.804 726.824 824.857 721.649 826.403C704.266 831.599 688.648 840.906 675.913 853.201Z" fill="#22D3EE"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M849.695 285.599C816.641 277.833 782.184 273.727 746.772 273.727C684.644 273.727 625.458 286.368 571.624 309.227C448.998 361.299 354.15 466.394 315.593 595.883C303.37 636.933 296.805 680.435 296.805 725.476C296.805 761.974 301.116 797.461 309.255 831.452C309.366 831.317 309.477 831.183 309.587 831.05C322.652 815.372 341.389 806.727 362.353 806.727C379.135 806.727 396.395 812.304 413.669 823.302C425.128 830.608 437.792 843.556 450.832 859.832C462.913 843.01 479.824 831.83 499.169 828.775C502.872 828.19 506.628 827.891 510.344 827.891H510.357C554.525 827.891 581.096 866.358 591.144 900.964C596.129 912.651 620.058 965.899 656.056 1002.01C710.873 1057.01 724.595 1113.75 697.461 1174.54C713.655 1176.32 730.108 1177.23 746.772 1177.23C747.445 1177.23 748.117 1177.22 748.789 1177.22L749.307 1177.22L750.29 1177.21C767.865 1177.08 785.2 1175.93 802.241 1173.83C775.534 1113.31 789.363 1056.8 843.964 1002.01C879.962 965.899 903.891 912.651 908.876 900.964C918.924 866.358 945.495 827.891 989.663 827.891H989.676C993.392 827.891 997.147 828.19 1000.85 828.775C1020.2 831.83 1037.11 843.01 1049.19 859.832C1062.23 843.556 1074.89 830.608 1086.35 823.302C1103.62 812.304 1120.89 806.727 1137.67 806.727C1156.17 806.727 1172.94 813.46 1185.6 825.819C1192.89 793.547 1196.74 759.963 1196.74 725.476C1196.74 709.883 1195.95 694.474 1194.42 679.288C1174.88 486.115 1034.11 328.922 849.695 285.599ZM652.93 884.744C603.394 843.337 581.677 781.979 581.677 742.068C581.677 711.101 602.797 721.605 636.467 738.35C666.402 753.238 706.256 773.059 750.01 773.059C793.763 773.059 833.618 753.238 863.553 738.35C897.223 721.605 918.343 711.101 918.343 742.068C918.343 780.4 900.71 842.529 852.745 880.809C827.567 900.728 794.093 914.485 750.509 914.485C709.56 914.485 677.534 902.691 652.93 884.744ZM919.726 619.809C914.761 612.591 909.541 605.002 902.523 602.514C896.04 600.216 887.549 603.626 879.395 606.901C868.994 611.078 859.142 615.035 854.701 606.649C837.914 574.953 849.899 535.595 881.471 518.742C913.042 501.889 952.244 513.922 969.031 545.618C985.818 577.315 973.833 616.672 942.261 633.525C932.68 638.64 926.437 629.564 919.726 619.809ZM597.494 602.514C590.477 605.002 585.256 612.591 580.291 619.809C573.581 629.564 567.337 638.64 557.756 633.525C526.185 616.672 514.2 577.315 530.986 545.618C547.773 513.922 586.975 501.889 618.547 518.742C650.118 535.595 662.103 574.953 645.317 606.649C640.876 615.035 631.023 611.078 620.623 606.901C612.468 603.626 603.977 600.216 597.494 602.514ZM1093.15 621.477C1093.15 644.811 1074.31 663.727 1051.07 663.727C1027.83 663.727 1008.98 644.811 1008.98 621.477C1008.98 598.143 1027.83 579.227 1051.07 579.227C1074.31 579.227 1093.15 598.143 1093.15 621.477ZM448.95 663.727C472.192 663.727 491.033 644.811 491.033 621.477C491.033 598.143 472.192 579.227 448.95 579.227C425.708 579.227 406.866 598.143 406.866 621.477C406.866 644.811 425.708 663.727 448.95 663.727Z" fill="#22D3EE"/>
                        </svg>
                        Hugging Face Datasets
                      </a>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </section>

          <hr className="border-t-4 border-black" />

          {/* Work Experience Section */}
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
                <div key={job.role + job.company} className="neo-card bg-white p-6">
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

        </div>

      </main>

      {/* Footer Container */}
      <footer className="max-w-6xl mx-auto mt-12 text-center text-xs font-extrabold text-zinc-400 uppercase py-6 border-t-4 border-black print:hidden">
        <div>© 2026 Baizid Al Hamid. All rights reserved.</div>
      </footer>

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
                  <div className="text-[9px] text-zinc-500 font-bold mb-1">April 2026 - Present (Expected 2028)</div>
                  <p className="text-[9px] text-zinc-700 leading-tight">
                    Graduate School of Info. Science & Eng. Specializing in Information Science and Engineering, focusing heavily on Machine Learning, NLP, and Legal Text alignment.
                  </p>
                </div>
                <div>
                  <div className="font-bold text-black text-[10px]">Ritsumeikan University</div>
                  <div className="text-[9px] text-zinc-500 font-bold">Bachelor of Engineering (B.E.)</div>
                  <div className="text-[9px] text-zinc-500 font-bold mb-1">April 2022 - April 2026</div>
                  <p className="text-[9px] text-zinc-700 leading-tight">
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
                  <div className="font-semibold text-zinc-800">TypeScript, JavaScript, Python, Bash, Java, C++</div>
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
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-black text-[10px]">{job.role}</span>
                      <span className="text-[8px] text-zinc-500 font-bold">{job.period}</span>
                    </div>
                    <div className="text-[9px] font-bold text-zinc-600 mb-1">{job.company}</div>
                    <p className="text-[9px] text-zinc-700 leading-relaxed">{job.desc}</p>
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
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-black text-[10px]">{proj.title}</span>
                      <span className="text-[8px] text-zinc-500 font-bold">{proj.stack.join(', ')}</span>
                    </div>
                    <p className="text-[9px] text-zinc-700 leading-normal">{proj.desc}</p>
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
