import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Code, 
  Megaphone, 
  Mail, 
  Linkedin, 
  Github, 
  Menu, 
  X, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Zap, 
  TrendingUp, 
  Server, 
  Target, 
  ChevronRight, 
  ChevronLeft, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Download, 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  ChartBar, 
  Shield, 
  Globe, 
  Database,
  Cloud,
  Activity,
  Eye,
  ExternalLink,
  User,
  MessageSquare,
  Send,
  Phone,
  MapPin
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSkillArea, setSelectedSkillArea] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = {
    dataAnalyst: [
      { name: 'Power BI', level: 95 },
      { name: 'Tableau', level: 92 },
      { name: 'Excel', level: 97 },
      { name: 'Google Sheets', level: 94 },
      { name: 'SQL', level: 93 },
      { name: 'Python (Pandas, NumPy)', level: 90 }
    ],
    visualization: [
      { name: 'Power BI', level: 95 },
      { name: 'Tableau', level: 92 },
      { name: 'Looker Studio', level: 89 },
      { name: 'Matplotlib', level: 87 },
      { name: 'Seaborn', level: 88 }
    ],
    dataTracking: [
      { name: 'GA4', level: 93 },
      { name: 'GTM', level: 91 },
      { name: 'APIs', level: 89 }
    ],
    cloudAI: [
      { name: 'Oracle', level: 88 },
      { name: 'Databricks', level: 85 }
    ]
  };

  const dashboards = [
    {
      title: 'Heroes Campaign Dashboard',
      description: 'Comprehensive Excel dashboard for campaign analysis',
      icon: ChartBar,
      downloadUrl: '/assets/dashboards/Dashboard Data (HEROES.xlsx', 
      previewUrl: 'https://res.cloudinary.com/dxwzdftzm/raw/upload/v1765288665/Dashboard_Data_HEROES_igmnok.xlsx', 
      color: 'from-amber-600 to-orange-500',
      category: 'Excel Dashboard'
    },
    {
      title: 'Marvel MCU Dashboard',
      description: 'Interactive dashboard analyzing MCU data',
      icon: Shield,
      downloadUrl: '/assets/dashboards/MCU DASHBOARD.xlsx', 
      previewUrl: 'https://res.cloudinary.com/dxwzdftzm/raw/upload/v1765288812/MCU_DASHBOARD_esmatu.xlsx',
      color: 'from-emerald-600 to-teal-500',
      category: 'Excel Dashboard'
    }
  ];

  const posters = [
    {
      title: 'Bluecover Father\'s Day',
      imageUrl: "https://res.cloudinary.com/dxwzdftzm/image/upload/v1765285343/BLUECOVER_FATHER_S_DAY_tvkeaw.png",
      downloadUrl: "https://res.cloudinary.com/dxwzdftzm/image/upload/fl_attachment/v1765285343/BLUECOVER_FATHER_S_DAY_tvkeaw.png",
      category: 'Marketing Campaign',
      color: 'from-sky-600 to-blue-500'
    },
    {
      title: 'Maestroville Father\'s Day',
      imageUrl: "https://res.cloudinary.com/dxwzdftzm/image/upload/v1765285370/MAESTRO_FATHER_S_DAY2_o668rk.png",
      downloadUrl: "https://res.cloudinary.com/dxwzdftzm/image/upload/fl_attachment/v1765285370/MAESTRO_FATHER_S_DAY2_o668rk.png",
      category: 'Marketing Campaign',
      color: 'from-violet-600 to-purple-500'
    },
    {
      title: 'Undersea Campaign',
      imageUrl: "https://res.cloudinary.com/dxwzdftzm/image/upload/v1765285387/UNDERSEA_nvoehh.png",
      downloadUrl: "https://res.cloudinary.com/dxwzdftzm/image/upload/fl_attachment/v1765285387/UNDERSEA_nvoehh.png",
      category: 'Creative Design',
      color: 'from-cyan-600 to-teal-500'
    }
  ];

  const certifications = [
    {
      title: 'BCG Forage GenAI Certificate',
      description: 'Awarded for completing a job simulation in GenAI and data processing for BCG via Forage.',
      icon: Award,
      viewUrl: 'https://res.cloudinary.com/dxwzdftzm/image/upload/v1765290012/BCG-FORAGE_GEN_AI_CERTIFICATE_aqemie.pdf',
      downloadUrl: 'https://res.cloudinary.com/dxwzdftzm/image/upload/fl_attachment/v1765290012/BCG-FORAGE_GEN_AI_CERTIFICATE_aqemie.pdf',
      color: 'from-amber-600 to-yellow-500',
      issuer: 'BCG via Forage',
      date: '2025'
    },
    {
      title: 'Delloitte Data Analytics Professional',
      description: 'Comprehensive data analytics certification Delloitte',
      icon: Award,
      viewUrl: 'https://res.cloudinary.com/dxwzdftzm/image/upload/v1765290012/DELOITTE_DATA_ANALYTICS_lbhwnj.pdf',
      downloadUrl: 'https://res.cloudinary.com/dxwzdftzm/image/upload/fl_attachment/v1765290012/DELOITTE_DATA_ANALYTICS_lbhwnj.pdf',
      color: 'from-green-600 to-emerald-500',
      issuer: 'Delloitte',
      date: '2025'
    }
  ];

  const stats = [
    { label: 'Dashboards Created', value: '50+', color: 'text-amber-600', icon: ChartBar },
    { label: 'Posters Designed', value: '30+', color: 'text-emerald-600', icon: ImageIcon },
    { label: 'Certifications', value: '15+', color: 'text-rose-600', icon: Award },
    { label: 'Happy Clients', value: '25+', color: 'text-sky-600', icon: Globe }
  ];

  const tabs = ['about', 'skills', 'dashboards', 'posters', 'certifications', 'contact'];

  // Skills Section Completion
  const renderSkills = () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          The Arsenal
        </h2>
        <p className="text-xl text-gray-600">Tools, tech, and talents that get the job done</p>
      </div>

      {/* Skill Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {['all', 'dataAnalyst', 'visualization', 'dataTracking', 'cloudAI'].map((area) => (
          <button
            key={area}
            onClick={() => setSelectedSkillArea(area)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              selectedSkillArea === area
                ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white scale-105'
                : 'bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            {area === 'all' ? '🎯 All Skills' : 
              area === 'dataAnalyst' ? '📊 Data Analysis & BI' : 
              area === 'visualization' ? '📈 Visualization' : 
              area === 'dataTracking' ? '🌐 Tracking & Analytics' : '☁️ Cloud & AI'}
          </button>
        ))}
      </div>

      {/* Skills Display */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, skillList]) => (
          (selectedSkillArea === 'all' || selectedSkillArea === category) && (
            <div key={category} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    category === 'dataAnalyst' ? 'bg-amber-100' :
                    category === 'visualization' ? 'bg-emerald-100' : 
                    category === 'dataTracking' ? 'bg-rose-100' : 'bg-sky-100'
                  }`}>
                    {category === 'dataAnalyst' ? <BarChart3 className="text-amber-600" /> :
                      category === 'visualization' ? <Activity className="text-emerald-600" /> :
                      category === 'dataTracking' ? <Globe className="text-rose-600" /> :
                      <Cloud className="text-sky-600" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {category === 'dataAnalyst' ? 'Data Analysis & BI' :
                        category === 'visualization' ? 'Data Visualization' : 
                        category === 'dataTracking' ? 'Tracking & Analytics' : 'Cloud & AI'}
                    </h3>
                    <p className="text-sm text-gray-500">{skillList.length} skills</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {skillList.map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="font-semibold text-gray-900">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            category === 'dataAnalyst' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                            category === 'visualization' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                            category === 'dataTracking' ? 'bg-gradient-to-r from-rose-500 to-pink-500' :
                            'bg-gradient-to-r from-sky-500 to-blue-500'
                          }`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );

  // Dashboards Section
  const renderDashboards = () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Dashboard Portfolio
        </h2>
        <p className="text-xl text-gray-600">Interactive data visualizations and business insights</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {dashboards.map((dashboard, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r ${dashboard.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all`}></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-lg hover:scale-[1.02] transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${dashboard.color}`}>
                  <dashboard.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{dashboard.title}</h3>
                  <p className="text-gray-600">{dashboard.category}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{dashboard.description}</p>
              
              <div className="flex gap-3">
                <a
                  href={dashboard.downloadUrl}
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all border border-gray-300 text-gray-700"
                >
                  <Download size={20} />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => {
                    setSelectedDashboard(dashboard);
                    setShowPreview(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all text-white"
                >
                  <Eye size={20} />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Posters Section
  const renderPosters = () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
          Creative Designs
        </h2>
        <p className="text-xl text-gray-600">Marketing campaigns and visual storytelling</p>
      </div>

      {/* Poster Gallery */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posters.map((poster, idx) => (
          <div key={idx} className="group relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${poster.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all`}></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-lg hover:scale-[1.02] transition-all">
              <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                <img 
                  src={poster.imageUrl} 
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{poster.title}</h3>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {poster.category}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedPoster(poster);
                      setIsModalOpen(true);
                    }}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    <Maximize2 size={20} />
                  </button>
                  <a
                    href={poster.downloadUrl}
                    download
                    className="p-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 transition-all text-white"
                  >
                    <Download size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Poster Modal */}
      {isModalOpen && selectedPoster && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800">{selectedPoster.title}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={selectedPoster.imageUrl} 
                  alt={selectedPoster.title}
                  className="w-full max-h-[60vh] object-contain"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                    className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
                    className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    Reset Zoom
                  </button>
                </div>
                <a
                  href={selectedPoster.downloadUrl}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all text-white"
                >
                  <Download size={20} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Certifications Section
  const renderCertifications = () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
          Certifications
        </h2>
        <p className="text-xl text-gray-600">Professional credentials and achievements</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {certifications.map((cert, idx) => (
          <div key={idx} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all`}></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 shadow-lg hover:scale-[1.02] transition-all">
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-r ${cert.color}`}>
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{cert.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap size={16} />
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{cert.description}</p>
              
              <div className="flex gap-3">
                <a
                  href={cert.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all border border-gray-300 text-gray-700"
                >
                  <ExternalLink size={20} />
                  <span>View</span>
                </a>
                <a
                  href={cert.downloadUrl}
                  download
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all text-white"
                >
                  <Download size={20} />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Contact Section
  const renderContact = () => (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p className="text-xl text-gray-600">Get in touch for collaborations or opportunities</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <MessageSquare className="text-sky-600" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
                    <Mail className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">catherine@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Phone className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-800">+1 (234) 567-8900</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <MapPin className="text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-800">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all text-white"
                  >
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all border border-gray-300 text-gray-700"
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <Send className="text-orange-600" />
                Send a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Your Name</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <User size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-800"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Mail size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-800"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-gray-800"
                    placeholder="Project inquiry or collaboration"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none text-gray-800"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    // Handle form submission here
                    alert('Message sent!');
                    setContactForm({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all font-semibold text-lg flex items-center justify-center gap-3 text-white"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-gray-100 text-gray-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-amber-200/20 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-xl border border-amber-200 text-amber-600">
                  CK
                </div>
              </div>
              <div>
                <div className="font-black text-xl bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Catherine Kamau
                </div>
                <div className="text-xs text-gray-500">Data Analyst & Marketing Specialist</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 rounded-xl capitalize font-semibold transition-all ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {activeTab === tab && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl"></div>
                  )}
                  <span className="relative">{tab}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl capitalize font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-amber-600 to-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        {activeTab === 'about' && (
          <div className="space-y-12">
            {/* Hero */}
            <div className="text-center space-y-6 py-12">
              <div className="inline-block">
                <div className="text-sm font-bold text-amber-600 mb-2 animate-pulse">⚡ MULTI-TALENTED PROFESSIONAL ⚡</div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black">
                <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Catherine
                </span>
                <br />
                <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Kamau
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                Data Analyst | IT Support Specialist | Digital Marketing Expert
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <div className="px-6 py-2 bg-amber-100 border border-amber-200 rounded-full text-amber-700 font-semibold">
                  📊 Data Analyst
                </div>
                <div className="px-6 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 font-semibold">
                  💻 IT Support
                </div>
                <div className="px-6 py-2 bg-rose-100 border border-rose-200 rounded-full text-rose-700 font-semibold">
                  📈 Digital Marketer
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-lg hover:scale-105 transition-transform text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skill Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  icon: BarChart3, 
                  title: 'Data Analyst', 
                  desc: 'Turning complex data into actionable insights and beautiful visualizations',
                  gradient: 'from-amber-500 to-orange-500',
                  emoji: '📊',
                  skills: ['Power BI', 'Tableau', 'SQL', 'Python']
                },
                { 
                  icon: Code, 
                  title: 'IT Support Specialist', 
                  desc: 'Expert in troubleshooting, system administration, and network management',
                  gradient: 'from-emerald-500 to-teal-500',
                  emoji: '🛠️',
                  skills: ['Windows/Linux', 'Networking', 'Cybersecurity', 'Cloud']
                },
                { 
                  icon: Megaphone, 
                  title: 'Digital Marketer', 
                  desc: 'Creating compelling campaigns that drive engagement and conversions',
                  gradient: 'from-rose-500 to-pink-500',
                  emoji: '🚀',
                  skills: ['SEO/SEM', 'Analytics', 'Social Media', 'Content']
                }
              ].map((card, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all`}></div>
                  <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 shadow-lg hover:scale-105 transition-all">
                    <div className="text-5xl mb-4">{card.emoji}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{card.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {card.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* About Text */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-gray-200 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Sparkles className="text-amber-500" />
                  About Me
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  I'm a passionate multi-disciplinary professional with expertise in data analysis, 
                  IT support, and digital marketing. My journey began with data analytics, where I 
                  discovered the power of insights in driving business decisions. This led me to 
                  explore IT systems that support data infrastructure and eventually to marketing, 
                  where I learned to communicate data stories effectively.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  What sets me apart is my ability to bridge technical and creative domains. 
                  I can analyze complex datasets, ensure systems run smoothly, and create 
                  compelling marketing materials that resonate with audiences. I believe in 
                  continuous learning and staying updated with the latest technologies and trends.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeTab === 'skills' && renderSkills()}

        {/* Dashboards Section */}
        {activeTab === 'dashboards' && renderDashboards()}

        {/* Posters Section */}
        {activeTab === 'posters' && renderPosters()}

        {/* Certifications Section */}
        {activeTab === 'certifications' && renderCertifications()}

        {/* Contact Section */}
        {activeTab === 'contact' && renderContact()}
      </main>

      {/* Preview Modal */}
      {showPreview && selectedDashboard && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-gray-300 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800">{selectedDashboard.title}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 rounded-xl hover:bg-gray-200 transition-colors text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="aspect-video rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                <div className="text-center">
                  <ChartBar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Dashboard preview would be displayed here</p>
                  <p className="text-sm text-gray-400 mt-2">Click download to get the actual file</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-600">
                  <p className="text-sm">File format: .xlsx</p>
                  <p className="text-sm">Category: {selectedDashboard.category}</p>
                </div>
                <a
                  href={selectedDashboard.downloadUrl}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-500 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all text-white"
                >
                  <Download size={20} />
                  <span>Download Dashboard</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative mt-20 py-8 border-t border-gray-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="font-black text-xl bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent mb-2">
                Catherine Kamau
              </div>
              <p className="text-sm text-gray-500">© 2025 All rights reserved</p>
            </div>
            
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/CATHERINEKAMAU"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:catherine@example.com"
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
