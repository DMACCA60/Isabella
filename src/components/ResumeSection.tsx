import { useState } from 'react';
import { 
  GraduationCap, Briefcase, Award, Calendar, MapPin, Printer, 
  Map, Camera, Binary, FileText, CheckCircle2, ChevronRight, User,
  Download, Loader2, X
} from 'lucide-react';
import { CV_PROFILE, SKILL_CATEGORIES, EDUCATION, EXPERIENCE, AFFILIATIONS } from '../data';

export default function ResumeSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Map': return <Map className="w-5 h-5" />;
      case 'Camera': return <Camera className="w-5 h-5" />;
      case 'Binary': return <Binary className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    setShowDownloadModal(true);
    setIsGenerating(true);
    setDownloadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          window.print();
        }, 300);
      }
    }, 120);
  };

  return (
    <section id="resume" className="py-24 sm:py-32 bg-[#fcfbf9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header with Print Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 print:hidden">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 text-[#4a6b5d] font-semibold text-xs tracking-wider uppercase">
              <FileText className="w-4 h-4 text-[#bda373]" />
              Curriculum Vitae
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#1b2421] mb-4">
              Academic &amp; Professional Credentials
            </h2>
            <p className="text-[#1b2421]/75 leading-relaxed">
              Explore Isabella's first-class credentials, professional placement logs, and core competencies. 
              Use the PDF download or print option to output a cleanly styled, recruiter-ready physical document.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2a473d] hover:bg-[#1b2421] text-[#fcfbf9] font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF Resume
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#2a473d]/30 text-[#2a473d] hover:bg-[#e6e3dd]/30 font-sans font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Direct Print
            </button>
          </div>
        </div>

        {/* PRINT ONLY HEADER - Hidden on screen, shown in print mode */}
        <div className="hidden print:block mb-8 border-b-2 border-[#2a473d] pb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-display font-bold text-[#1b2421]">{CV_PROFILE.name}</h1>
              <p className="text-lg font-semibold text-[#4a6b5d] mt-1">{CV_PROFILE.title} | {CV_PROFILE.subtitle}</p>
              <p className="text-sm text-[#1b2421]/80 mt-1 max-w-3xl leading-relaxed">{CV_PROFILE.summary}</p>
            </div>
            <div className="text-right text-xs text-[#1b2421]/80 space-y-1 shrink-0 font-semibold font-sans">
              <p className="flex items-center justify-end gap-1.5"><MapPin className="w-3.5 h-3.5" /> {CV_PROFILE.location}</p>
              <p>Email: {CV_PROFILE.email}</p>
              <p>Phone: {CV_PROFILE.phone}</p>
              <p>LinkedIn: {CV_PROFILE.linkedIn}</p>
            </div>
          </div>
        </div>

        {/* MAIN CV GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 print:block print:space-y-8">
          
          {/* LEFT SIDEBAR: Skills & Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-8 print:block print:w-full">
            
            {/* SKILLS BOX */}
            <div className="bg-[#e6e3dd]/30 border border-[#2a473d]/10 rounded-2xl p-6 sm:p-8 print:bg-transparent print:border-none print:p-0">
              <h3 className="font-display font-bold text-xl text-[#1b2421] mb-6 flex items-center gap-2 border-b border-[#2a473d]/10 pb-3 print:mb-4 print:text-lg">
                <Award className="w-5 h-5 text-[#bda373]" />
                Technical Skillsets
              </h3>

              <div className="space-y-6 print:space-y-4">
                {SKILL_CATEGORIES.map((category, idx) => (
                  <div 
                    key={idx}
                    onMouseEnter={() => setActiveCategory(category.title)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className={`rounded-xl p-4.5 border transition-all duration-300 print:p-0 print:border-none ${
                      activeCategory === category.title
                        ? 'bg-[#fcfbf9] border-[#2a473d]/20 shadow-md'
                        : 'bg-[#fcfbf9]/50 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3 print:mb-1.5">
                      <div className="w-8 h-8 rounded-full bg-[#2a473d]/10 flex items-center justify-center text-[#2a473d] print:hidden">
                        {getSkillIcon(category.icon)}
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#2a473d]">{category.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="px-2 py-0.5 bg-[#fcfbf9] border border-[#2a473d]/10 text-[#1b2421]/90 rounded text-[11px] font-medium font-sans print:bg-transparent print:border-none print:px-0 print:after:content-[',_'] print:last:after:content-none print:text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATIONS & AFFILIATIONS BOX */}
            <div className="bg-[#e6e3dd]/30 border border-[#2a473d]/10 rounded-2xl p-6 sm:p-8 print:bg-transparent print:border-none print:p-0">
              <h3 className="font-display font-bold text-xl text-[#1b2421] mb-6 flex items-center gap-2 border-b border-[#2a473d]/10 pb-3 print:mb-4 print:text-lg">
                <CheckCircle2 className="w-5 h-5 text-[#bda373]" />
                Affiliations &amp; Credentials
              </h3>

              <div className="space-y-5 print:space-y-3">
                {AFFILIATIONS.map((aff, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="block font-bold text-[#2a473d]">{aff.title}</span>
                    <span className="block font-sans text-xs font-semibold text-[#4a6b5d]">{aff.organization}</span>
                    <p className="text-xs text-[#1b2421]/75 mt-1 leading-relaxed print:text-[11px]">{aff.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Timeline Education & Experience (8 cols) */}
          <div className="lg:col-span-8 space-y-10 print:block print:w-full print:space-y-6">
            
            {/* EDUCATION TIMELINE SECTION */}
            <div>
              <h3 className="font-display font-bold text-2xl text-[#1b2421] mb-8 flex items-center gap-2.5 border-b border-[#2a473d]/10 pb-3 print:mb-4 print:text-lg">
                <GraduationCap className="w-6 h-6 text-[#2a473d]" />
                Education Journey
              </h3>

              <div className="relative border-l-2 border-[#2a473d]/10 pl-6 sm:pl-8 ml-3 space-y-8 print:border-none print:pl-0 print:ml-0 print:space-y-4">
                
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#bda373] border-4 border-[#fcfbf9] print:hidden"></div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#1b2421]">{EDUCATION.degree} &mdash; <span className="text-[#2a473d]">{EDUCATION.grade}</span></h4>
                      <p className="font-sans text-sm font-semibold text-[#4a6b5d]">{EDUCATION.institution}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2a473d] bg-[#2a473d]/5 px-3 py-1 rounded-full w-fit print:bg-transparent print:p-0 print:font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#bda373] print:hidden" />
                      {EDUCATION.period}
                    </div>
                  </div>

                  {/* Relevant Modules list */}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#4a6b5d] mb-1.5">Key Syllabus Modules</span>
                    <div className="flex flex-wrap gap-1.5">
                      {EDUCATION.modules.map((mod, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-[#2a473d]/5 text-[#2a473d] text-xs font-semibold rounded print:bg-transparent print:p-0 print:after:content-[',_'] print:last:after:content-none font-sans">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dissertation Specific Box */}
                  <div className="bg-[#e6e3dd]/35 rounded-xl p-5 border border-[#2a473d]/10 print:bg-transparent print:p-0 print:border-none print:mt-2">
                    <span className="inline-block px-2.5 py-0.5 bg-[#bda373] text-[#fcfbf9] text-[9px] font-bold tracking-wider uppercase rounded mb-2 print:text-[#2a473d] print:bg-transparent print:p-0 print:font-bold">
                      Honours Dissertation Topic
                    </span>
                    <h5 className="font-display font-bold text-base text-[#1b2421] leading-snug mb-3">
                      "{EDUCATION.dissertation.title}"
                    </h5>
                    
                    <ul className="space-y-3.5 print:space-y-1.5">
                      {EDUCATION.dissertation.points.map((pt, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs text-[#1b2421]/80 leading-relaxed items-start">
                          <ChevronRight className="w-4 h-4 text-[#bda373] shrink-0 mt-0.5 print:hidden" />
                          <div>
                            <span className="font-bold text-[#2a473d] mr-1">{pt.category}:</span>
                            {pt.description}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* EXPERIENCE TIMELINE SECTION */}
            <div>
              <h3 className="font-display font-bold text-2xl text-[#1b2421] mb-8 flex items-center gap-2.5 border-b border-[#2a473d]/10 pb-3 print:mb-4 print:text-lg">
                <Briefcase className="w-6 h-6 text-[#2a473d]" />
                Professional &amp; Placement Experience
              </h3>

              <div className="relative border-l-2 border-[#2a473d]/10 pl-6 sm:pl-8 ml-3 space-y-10 print:border-none print:pl-0 print:ml-0 print:space-y-6">
                
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="relative space-y-3">
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-4 border-[#fcfbf9] print:hidden ${
                      exp.isPlacement ? 'bg-[#bda373]' : 'bg-[#2a473d]'
                    }`}></div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div>
                        <h4 className="font-display font-bold text-base text-[#1b2421] flex items-center gap-2 flex-wrap">
                          {exp.role}
                          {exp.isPlacement && (
                            <span className="px-2 py-0.5 bg-[#bda373]/25 text-[#2a473d] rounded text-[9px] font-bold uppercase tracking-wider print:text-stone-700">
                              Placement
                            </span>
                          )}
                        </h4>
                        <p className="font-sans text-sm font-semibold text-[#4a6b5d]">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2a473d] bg-[#2a473d]/5 px-3 py-1 rounded-full w-fit print:bg-transparent print:p-0 print:font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#bda373] print:hidden" />
                        {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex gap-2 text-xs text-[#1b2421]/85 leading-relaxed items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2a473d] shrink-0 mt-2 print:mt-1.5"></span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* High-Fidelity PDF Download Helper Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm flex items-center justify-center z-[100] px-4 print:hidden">
          <div className="bg-[#fcfbf9] border border-[#2a473d]/20 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button 
              onClick={() => setShowDownloadModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-[#2a473d]/10 flex items-center justify-center text-[#2a473d]">
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </div>
              <h3 className="font-display font-bold text-xl text-[#1b2421]">
                {isGenerating ? 'Structuring PDF Document...' : 'PDF Resume Ready'}
              </h3>
              <p className="text-xs text-[#4a6b5d] font-medium">
                Using system high-fidelity print rendering
              </p>
            </div>

            {/* Simulated generation progress bar */}
            {isGenerating && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#2a473d]">
                  <span>Optimizing styles...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-[#e6e3dd] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#bda373] h-full transition-all duration-150 ease-out"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Helpful print-to-pdf settings instructions card */}
            <div className="bg-[#2a473d]/5 border border-[#2a473d]/10 rounded-xl p-4 space-y-3 text-xs text-stone-700">
              <p className="font-bold text-[#2a473d] flex items-center gap-1.5">
                💡 Perfect PDF Guide:
              </p>
              <ul className="space-y-2.5 font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bda373] mt-1.5 shrink-0"></span>
                  <span><strong>Destination:</strong> Select <strong>"Save as PDF"</strong> in the printer dropdown.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bda373] mt-1.5 shrink-0"></span>
                  <span><strong>Background graphics:</strong> Turn this <strong>ON</strong> (under "More settings") to preserve the background colors, highlights, and icons.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bda373] mt-1.5 shrink-0"></span>
                  <span><strong>Headers and Footers:</strong> Turn this <strong>OFF</strong> to hide web URLs and print timestamps.</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  window.print();
                  setIsGenerating(false);
                }}
                className="flex-1 py-3 bg-[#2a473d] hover:bg-[#1b2421] text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Trigger Download
              </button>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-4 py-3 bg-[#e6e3dd]/40 hover:bg-[#e6e3dd]/80 text-[#2a473d] rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
