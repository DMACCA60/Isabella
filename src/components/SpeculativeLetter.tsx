import React, { useState } from 'react';
import { 
  Building2, MapPin, Sparkles, Copy, Mail, Check, Compass, 
  ChevronRight, RefreshCw, PlusCircle, CheckSquare, Square
} from 'lucide-react';
import { TARGET_COMPANIES, CV_PROFILE } from '../data';
import { TargetCompany } from '../types';

export default function SpeculativeLetter() {
  const [selectedCompany, setSelectedCompany] = useState<TargetCompany>(TARGET_COMPANIES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Custom Company State
  const [isCustomCompany, setIsCustomCompany] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>("");
  const [customType, setCustomType] = useState<'Environmental' | 'Planning'>('Environmental');
  const [customLocation, setCustomLocation] = useState<string>("UK Office");

  // Custom Skills Toggles to refine the letter
  const [includeDissertation, setIncludeDissertation] = useState<boolean>(true);
  const [includeLandmark, setIncludeLandmark] = useState<boolean>(true);
  const [includePython, setIncludePython] = useState<boolean>(true);

  const getCompanyByName = (name: string) => {
    if (name === 'custom') {
      setIsCustomCompany(true);
      return;
    }
    setIsCustomCompany(false);
    const comp = TARGET_COMPANIES.find(c => c.name === name);
    if (comp) {
      setSelectedCompany(comp);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    
    const newComp: TargetCompany = {
      name: customName,
      type: customType,
      location: customLocation,
      description: `A progressive consultancy delivering expert ${customType.toLowerCase()} and spatial data solutions.`,
      alignment: customType === 'Environmental' 
        ? `Directly matches Isabella's environmental due diligence, flood risk modeling, and advanced spatial statistics expertise.`
        : `Matches Isabella's experience in creating Residential Agricultural Land Reports (RALRs) and constraint mapping to support planning consents.`
    };
    setSelectedCompany(newComp);
  };

  // Generate Tailored Letter Narrative
  const generateLetter = () => {
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const companyName = selectedCompany.name;
    const location = selectedCompany.location;
    const isPlanning = selectedCompany.type === 'Planning';

    const salutation = `Dear Hiring Manager at ${companyName},`;

    const intro = `I am writing to express my strong interest in joining ${companyName} as a Graduate ${isPlanning ? 'Planning & GIS' : 'Environmental & GIS'} Consultant. Having recently completed my BSc (Hons) Geography with First-Class Honours from the University of Sussex, and having already gained direct commercial consultancy experience, I am eager to apply my spatial analysis capabilities to support your projects in ${location}.`;

    const alignmentSection = isPlanning
      ? `I was particularly drawn to ${companyName} because of your stellar reputation in town planning and development consultancy. I understand that delivering professional spatial evidence and constraint mapping is key to overcoming planning objections. This matches my background perfectly: during my environmental risk consultancy placement at Landmark Information Group, I produced technical Residential Agricultural Land Reports (RALR) using QGIS, evaluating flood zones and regional liabilities to support early-stage land transactions under UK planning frameworks.`
      : `I was particularly drawn to ${companyName} because of your expert work in environmental consultancy and habitat mapping. Your focus aligns perfectly with my professional experience and core passions. During my placement at Landmark Information Group, I used professional geospatial tools to analyze multi-source data and map environmental constraints. My technical skills are directly relevant to your requirements for environmental due diligence, flood hazard screening, and Biodiversity Net Gain (BNG) modeling.`;

    const techSkillsSection = `Technically, I am highly proficient in QGIS, ArcGIS Pro, MapInfo, and Ordnance Survey data integration. `;

    const dissSection = includeDissertation 
      ? `For my dissertation, which focused on quantifying coastal cliff erosion at Telscombe Cliffs, I developed a rigorous workflow to process DJI UAV drone photography using Structure-from-Motion (SfM) photogrammetry into 3D point clouds. Crucially, I applied a strict Level of Detection (LoD) threshold to filter out sensor noise from stable surfaces, ensuring highly accurate volumetric calculations. Furthermore, my lagged linear regression analysis proved that 67% of geomorphic change is linked to antecedent storm wave energy proxies.`
      : "";

    const pythonSection = includePython
      ? `To ensure my research was reproducible, I automated my spatial data processing, error propagation models, and regression calculations using Python.`
      : "";

    const landmarkSection = includeLandmark
      ? `My placement experience taught me how to deliver client-ready deliverables under tight deadlines, collaborating closely with legal firms and developers.`
      : "";

    const conclusion = `With my First-Class degree, ArcGIS Pro Personal Licence, and Student Membership with the Royal Geographical Society (RGS), I am committed to continuous learning and professional standards. I possess a full, clean UK driving license and am fully prepared to relocate to support site surveys and local projects.\n\nThank you for your time and consideration. I would welcome the opportunity to discuss how my GIS expertise can support ${companyName}'s upcoming portfolios. My CV is attached, and you can explore interactive simulations of my spatial deliverables at my live portfolio website.\n\nYours sincerely,\n\nIsabella McInnes`;

    return `${today}\n\nIsabella McInnes\n${CV_PROFILE.email} | ${CV_PROFILE.phone}\n\n${salutation}\n\n${intro}\n\n${alignmentSection}\n\n${techSkillsSection} ${dissSection} ${pythonSection} ${landmarkSection}\n\n${conclusion}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateLetter());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailSubject = `Graduate GIS Inquiry - Isabella McInnes`;
  const mailtoLink = `mailto:${CV_PROFILE.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent("Dear Isabella,\n\nWe saw your portfolio and are interested in your GIS and mapping skills...")}`;

  return (
    <section id="speculative-kit" className="py-24 sm:py-32 bg-[#e6e3dd]/20 border-t border-[#2a473d]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4 text-[#4a6b5d] font-semibold text-xs tracking-wider uppercase">
            <Compass className="w-4 h-4 text-[#bda373]" />
            Hiring Manager Speculative Kit
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#1b2421] mb-4">
            Tailor Isabella’s Proposal to Your Firm
          </h2>
          <p className="text-[#1b2421]/75 leading-relaxed">
            Are you a hiring manager at an environmental or planning consultancy in Oxford or Reading? 
            Select your firm (or enter custom criteria) to instantly generate a tailored, high-converting 
            speculative cover letter backed by Isabella's specific CV data.
          </p>
        </div>

        {/* WORKSPACE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: Selection & Refinements (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Target Selector */}
            <div className="bg-[#fcfbf9] border border-[#2a473d]/10 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-[#2a473d] mb-4 flex items-center gap-2 border-b border-[#2a473d]/5 pb-2">
                <Building2 className="w-4 h-4 text-[#bda373]" />
                Select Target Agency
              </h3>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-[#4a6b5d] tracking-wider mb-1">Target Consultancies from Strategy</span>
                {TARGET_COMPANIES.map((comp) => (
                  <button
                    key={comp.name}
                    onClick={() => {
                      setIsCustomCompany(false);
                      setSelectedCompany(comp);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      selectedCompany.name === comp.name && !isCustomCompany
                        ? 'bg-[#2a473d] text-[#fcfbf9]'
                        : 'text-[#4a6b5d] bg-[#e6e3dd]/20 hover:bg-[#e6e3dd]/50 hover:text-[#1b2421]'
                    }`}
                  >
                    <span>{comp.name}</span>
                    <span className="text-[9px] opacity-80">{comp.type}</span>
                  </button>
                ))}

                <button
                  onClick={() => setIsCustomCompany(true)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl font-sans text-xs font-bold transition-all flex items-center justify-between mt-2 border border-dashed cursor-pointer ${
                    isCustomCompany
                      ? 'bg-[#2a473d] text-[#fcfbf9] border-[#2a473d]'
                      : 'text-[#bda373] bg-[#bda373]/5 border-[#bda373]/30 hover:bg-[#bda373]/10'
                  }`}
                >
                  <span>+ Custom Agency...</span>
                  <span className="text-[9px] uppercase font-bold">New</span>
                </button>
              </div>
            </div>

            {/* Custom Company Form */}
            {isCustomCompany && (
              <form onSubmit={handleCustomSubmit} className="bg-[#fcfbf9] border border-[#2a473d]/10 rounded-2xl p-6 shadow-sm space-y-4">
                <h4 className="text-xs uppercase font-bold text-[#2a473d] tracking-wider border-b border-[#2a473d]/5 pb-2">Configure Your Agency</h4>
                
                <div className="flex flex-col gap-1 text-xs">
                  <label className="font-bold text-[#4a6b5d]">Agency Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Wardell Armstrong"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="p-2 border border-[#e6e3dd] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2a473d] bg-[#fcfbf9]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="font-bold text-[#4a6b5d]">Location Area</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Reading"
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="p-2 border border-[#e6e3dd] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2a473d] bg-[#fcfbf9]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <label className="font-bold text-[#4a6b5d]">Consultancy Category</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setCustomType('Environmental')}
                      className={`py-1.5 rounded-lg border text-center font-bold cursor-pointer ${customType === 'Environmental' ? 'bg-[#2a473d] text-[#fcfbf9] border-[#2a473d]' : 'bg-[#fcfbf9] border-[#e6e3dd] text-[#4a6b5d]'}`}
                    >
                      Environmental
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomType('Planning')}
                      className={`py-1.5 rounded-lg border text-center font-bold cursor-pointer ${customType === 'Planning' ? 'bg-[#2a473d] text-[#fcfbf9] border-[#2a473d]' : 'bg-[#fcfbf9] border-[#e6e3dd] text-[#4a6b5d]'}`}
                    >
                      Town Planning
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#bda373] hover:bg-[#2a473d] text-[#fcfbf9] font-bold rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                >
                  Inject Custom Proposal
                </button>
              </form>
            )}

            {/* In-Depth Proposal Toggles */}
            <div className="bg-[#fcfbf9] border border-[#2a473d]/10 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-bold text-base text-[#2a473d] mb-4 border-b border-[#2a473d]/5 pb-2">
                Narrative Focus Adjustments
              </h3>
              
              <div className="space-y-3.5 text-xs text-[#4a6b5d]">
                <button 
                  onClick={() => setIncludeDissertation(!includeDissertation)}
                  className="flex items-center gap-2.5 font-semibold text-left select-none cursor-pointer w-full"
                >
                  {includeDissertation ? <CheckSquare className="w-4 h-4 text-[#2a473d]" /> : <Square className="w-4 h-4 text-[#4a6b5d]/50" />}
                  <span>Include Sussex Dissertation (UAV Photogrammetry)</span>
                </button>

                <button 
                  onClick={() => setIncludeLandmark(!includeLandmark)}
                  className="flex items-center gap-2.5 font-semibold text-left select-none cursor-pointer w-full"
                >
                  {includeLandmark ? <CheckSquare className="w-4 h-4 text-[#2a473d]" /> : <Square className="w-4 h-4 text-[#4a6b5d]/50" />}
                  <span>Include Landmark placement (RALR drafting)</span>
                </button>

                <button 
                  onClick={() => setIncludePython(!includePython)}
                  className="flex items-center gap-2.5 font-semibold text-left select-none cursor-pointer w-full"
                >
                  {includePython ? <CheckSquare className="w-4 h-4 text-[#2a473d]" /> : <Square className="w-4 h-4 text-[#4a6b5d]/50" />}
                  <span>Highlight Python automated scripting focus</span>
                </button>
              </div>
            </div>

            {/* Strategic alignment highlight */}
            <div className="bg-[#2a473d]/5 border border-[#2a473d]/10 rounded-2xl p-6 text-xs leading-relaxed text-[#2a473d]">
              <div className="flex items-center gap-2 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
                <Sparkles className="w-4 h-4 text-[#bda373]" />
                Firm Alignment Analysis
              </div>
              <p className="font-sans font-semibold mb-2 text-[#1b2421]/90">{selectedCompany.description}</p>
              <p className="italic text-[#1b2421]/80">&ldquo;{selectedCompany.alignment}&rdquo;</p>
            </div>

          </div>

          {/* RIGHT PANEL: Live Rendered Letter Cover (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top Toolbar controls */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-[#fcfbf9] border border-[#2a473d]/10 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#2a473d]">Active Format:</span>
                <span className="bg-[#bda373]/20 px-2.5 py-0.5 rounded font-bold text-[#2a473d]">Speculative Letter / Email Cover</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-5 py-2 rounded-lg bg-[#2a473d] hover:bg-[#1b2421] text-[#fcfbf9] font-bold text-xs tracking-wide transition-all shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#bda373]" />
                      Copied Text!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <a
                  href={mailtoLink}
                  className="px-5 py-2 rounded-lg border border-[#2a473d]/20 hover:border-[#2a473d] text-[#2a473d] hover:bg-[#e6e3dd]/30 font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#bda373]" />
                  Contact Isabella
                </a>
              </div>
            </div>

            {/* Letter Body Display */}
            <div className="bg-[#fcfbf9] border border-[#2a473d]/10 rounded-2xl p-6 sm:p-10 shadow-xl max-h-[600px] overflow-y-auto font-sans text-xs sm:text-sm text-[#1b2421]/90 relative">
              {/* Subtle watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-2 pointer-events-none select-none">
                <Compass className="w-72 h-72 text-[#2a473d]" />
              </div>

              <div className="whitespace-pre-wrap leading-relaxed relative z-10 select-all font-sans">
                {generateLetter()}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
