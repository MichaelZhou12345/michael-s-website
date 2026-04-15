/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  ChevronRight, 
  Gamepad2, 
  GraduationCap, 
  Briefcase, 
  MessageSquare,
  Bot,
  Zap,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Target,
  Users,
  BrainCircuit,
  BarChart
} from 'lucide-react';

// --- Types ---

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  tech: string[];
  result: string;
  icon: React.ReactNode;
  category: string;
  image: string;
  highlights: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  stats?: { label: string; value: string }[];
}

interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
  details?: string;
}

// --- Data ---

const PROJECTS: Project[] = [
  {
    id: "gesture-ai",
    title: "新年祝福手势互动活动",
    category: "AI 全栈开发",
    description: "基于大语言模型实现摄像头手势实时识别与前端交互，打造社交裂变 H5 活动。",
    fullDescription: "该项目是一个创新的社交互动 H5 活动，利用先进的计算机视觉技术和生成式 AI，为用户提供独特的新年祝福体验。用户通过摄像头做出特定手势，系统实时识别并触发相应的生成祝福语以及参与抽奖。",
    tech: ["Gemini AI", "React", "MediaPipe", "H5"],
    result: "社群参与率 >80%, 微信侧60%分享率",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    image: "/gesture.png",
    highlights: [
      "集成了 Gemini AI API 动态生成个性化新年寄语。",
      "优化了移动端 H5 的渲染性能，确保在各种机型上流畅运行。",
      "设计了完整的社交分享链路，实现了高效的裂变传播。"
    ]
  },
  {
    id: "nlp-engine",
    title: "文风写作 Skill 搭建",
    category: "NLP & 数据挖掘",
    description: "基于海量历史推文，通过数据清洗、特征提取与风格聚类，构建多种文风写作 Skill。",
    fullDescription: "本项目旨在通过深度学习，自动化提取和模拟特定的写作风格。通过对数千篇高质量推文的分析，构建了一个能够根据不同场景（如专业、幽默、严谨）自动生成或润色文案的引擎。",
    tech: ["Python", "PyTorch", "NLP", "Clustering"],
    result: "显著提升内容生产效率",
    icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "构建了包含 19 种细分文风的特征向量空间。",
      "利用 K-means 聚类算法实现了文风的自动分类与标注。",
      "为运营团队提供了可视化的文风分析与生成工具。"
    ]
  },
  {
    id: "steam-bot",
    title: "数据监测 AI 机器人",
    category: "自动化工具",
    description: "自动监测Steam平台畅销榜与在线榜，实时推送榜单变动与趋势，提供发行策略依据。",
    fullDescription: "这是一个全自动化的数据监测系统。它能够 24/7 不间断地抓取Steam游戏平台的榜单数据，并及时向决策团队推送深度分析报告。",
    tech: ["Python", "Scrapy", "Automation", "Data Viz"],
    result: "实现每日自动化监控与趋势沉淀",
    icon: <Bot className="w-5 h-5 text-blue-400" />,
    image: "/monitor.png",
    highlights: [
      "实现了对 Steam、App Store 等多平台数据的实时抓取。",
      "集成了企业微信机器人，实现关键信息的即时触达。",
      "构建了历史榜单数据库，为长期的发行策略提供数据支撑。"
    ]
  }
];

const EXPERIENCES: Experience[] = [
  {
    company: "头部互联网企业",
    role: "游戏运营（数据分析方向）",
    period: "2024 - 至今",
    location: "深圳",
    highlights: [
      "负责重点游戏项目全周期数据体系搭建与埋点校验。",
      "主导用户留存与流失分析，精准定位流失关键因素并驱动优化。",
      "搭建商业化分析体系，显著提升活跃 ARPU 与付费渗透率。",
      "通过用户行为聚类分析，为内容规划与分层运营提供决策支持。"
    ],

  }
];

const EDUCATION: Education[] = [
  {
    school: "康奈尔大学 (Cornell University)",
    degree: "运筹学与信息工程硕士 (数据科学方向)",
    period: "2023 - 2024",
    location: "纽约，美国"
  },
  {
    school: "加州大学戴维斯分校 (UC Davis)",
    degree: "计算机科学 本科",
    period: "2019 - 2023",
    location: "戴维斯，美国",
    details: "GPA: 3.7+ | 第一作者发表论文于 CVAA 2022"
  }
];

const PERSONALITY_TAGS = [
  { icon: <Sparkles className="w-4 h-4 text-blue-400" />, text: "数据驱动的决策者", desc: "用客观数据洞察主观行为" },
  { icon: <Target className="w-4 h-4 text-blue-400" />, text: "游戏行业深耕者", desc: "热爱游戏，更懂游戏背后的逻辑" },
  { icon: <BrainCircuit className="w-4 h-4 text-blue-400" />, text: "AI 落地实践家", desc: "致力于将 AI 转化为实际生产力" },
  { icon: <Users className="w-4 h-4 text-blue-400" />, text: "跨团队沟通桥梁", desc: "连接研发、用研与运营的纽带" }
];

// --- Components ---

const SectionHeader = ({ title, subtitle, className = "" }: { title: string, subtitle?: string, className?: string }) => (
  <div className={`mb-16 ${className}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-blue-200/60 max-w-2xl text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "首页", href: "#home" },
    { name: "关于", href: "#about" },
    { name: "项目", href: "#projects" },
    { name: "经历", href: "#experience" },
    { name: "联系", href: "#contact" },
  ];

  if (selectedProject) {
    return (
      <div className="min-h-screen font-sans bg-bg text-white grid-pattern">
        <nav className="fixed top-0 w-full z-50 py-6 glass border-b border-white/5">
          <div className="container-max flex justify-between items-center px-6">
            <button 
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> 返回项目
            </button>
            <div className="text-sm font-bold tracking-tighter">
              PROJECT <span className="text-blue-400">DETAIL</span>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-24 px-6">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-6">
                  {selectedProject.category}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{selectedProject.title}</h1>
                <p className="text-xl text-blue-100/60 leading-relaxed mb-12">
                  {selectedProject.fullDescription}
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">核心亮点</h3>
                    <ul className="space-y-4">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i} className="flex gap-4 text-blue-100/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div>
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">技术栈</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, i) => (
                          <span key={i} className="tag">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">项目成果</h3>
                      <p className="text-white font-bold">{selectedProject.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 grid-pattern">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="container-max flex justify-between items-center px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-extrabold tracking-tighter text-white"
          >
            MICHAEL<span className="text-blue-400">ZHOU</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold text-blue-200/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-[#0f172a] border-b border-white/5 p-6 flex flex-col gap-6 shadow-2xl"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-bold text-white"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-48 pb-32 px-6">
          <div className="container-max grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8 text-white">
                周是颉 <span className="text-blue-900/40">Michael</span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-blue-200/60 mb-10 leading-tight">
                在数据中洞察人性，<br />
                用 AI 赋能游戏未来。
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
                  联系我
                </a>
                <a href="#projects" className="px-8 py-4 rounded-full border border-white/10 font-bold hover:bg-white/5 transition-all">
                  查看作品
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-[4/5] bg-blue-900/20 rounded-[2rem] overflow-hidden border border-white/5"
            >
              <img 
                src="/profile.jpg" 
                alt="周是颉" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section-padding border-y border-white/5">
          <div className="container-max">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              {/* Left Side: Large Bio (3/5) */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.3em] mb-12 text-blue-400">About Me / 关于我</h2>
                  <p className="text-xl md:text-2xl font-bold text-white leading-[1.3] tracking-tight">
                    目前就职于国内领先的互联网企业，负责重点游戏项目的数据体系搭建与深度分析。
                  </p>
                  <p className="text-base md:text-lg text-blue-200/40 mt-6 leading-relaxed font-medium">
                    擅长从海量埋点数据中提炼有效数据，通过用户聚类分析与商业化建模驱动产品迭代。
                  </p>
                  <p className="text-base md:text-lg text-blue-400 mt-4 leading-relaxed font-bold">
                    同时，也擅长利用 AI 技术赋能游戏运营及发行，提升业务效率与决策精准度。
                  </p>
                </motion.div>
              </div>

              {/* Right Side: Education List (2/5) */}
              <div className="lg:col-span-2 pt-2">
                <h3 className="text-xs font-bold text-blue-400/40 uppercase tracking-widest mb-8">Education / 教育背景</h3>
                <div className="space-y-10">
                  {EDUCATION.map((edu, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-8 border-l border-blue-500/20"
                    >
                      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <div className="text-xs font-mono text-blue-400/60 mb-2">{edu.period}</div>
                      <h4 className="text-xl font-bold text-white mb-1">{edu.school}</h4>
                      <p className="text-blue-100/60 text-sm">{edu.degree}</p>
                      <div className="flex items-center gap-1 text-[10px] text-blue-400/30 font-bold uppercase mt-3">
                        <MapPin className="w-3 h-3" /> {edu.location}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Personality Traits as a clean row */}
            <div className="mt-24 pt-16 border-t border-white/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {PERSONALITY_TAGS.map((tag, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="text-blue-400">{tag.icon}</div>
                    <div>
                      <div className="font-bold text-white mb-1">{tag.text}</div>
                      <div className="text-xs text-blue-200/30 leading-snug">{tag.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-padding bg-blue-600/5">
          <div className="container-max">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-8">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-white">工作经历</h2>
                <p className="text-blue-200/40 max-w-xl text-lg">在头部互联网企业，利用数据为重点游戏项目进行深度数据运营分析与决策支撑。</p>
              </div>
              <div className="flex gap-4">
                {EXPERIENCES[0].stats?.map((stat, i) => (
                  <div key={i} className="px-6 py-4 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-12">
                  <div className="md:col-span-1">
                    <div className="text-blue-400/60 font-mono mb-2">{exp.period}</div>
                    <h3 className="text-2xl font-bold mb-1 text-white">{exp.company}</h3>
                    <p className="text-blue-200/40">{exp.role}</p>
                  </div>
                  <div className="md:col-span-2 space-y-6">
                    {exp.highlights.map((item, j) => (
                      <div key={j} className="flex gap-4 text-blue-100/60 text-lg leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-3 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-padding">
          <div className="container-max">
            <SectionHeader 
              title="AI 赋能项目" 
              subtitle="展示我在 AI 赋能、数据挖掘及自动化工具方向的探索与实践。"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {PROJECTS.map((project, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video rounded-2xl bg-blue-900/20 mb-6 overflow-hidden border border-white/5 relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-900/40 backdrop-blur-sm">
                      <div className="px-6 py-2 rounded-full bg-white text-blue-900 shadow-lg font-bold text-sm flex items-center gap-2">
                        查看项目详情 <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 p-2 rounded-lg bg-blue-900/60 backdrop-blur shadow-sm">
                      {project.icon}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-blue-400/60 uppercase tracking-widest mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-blue-100/40 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span key={j} className="tag">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding bg-bg relative overflow-hidden">
          <div className="container-max relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">联系我</h2>
              <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: Contact Info Cards */}
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-5 h-5" />, text: "michaelzhoushijie@163.com" },
                  { icon: <Phone className="w-5 h-5" />, text: "+86 18066057510" },
                  { icon: <MapPin className="w-5 h-5" />, text: "深圳市，中国" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {item.icon}
                    </div>
                    <div className="text-lg font-medium text-white/80">{item.text}</div>
                  </motion.div>
                ))}
              </div>

              {/* Right: Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <input 
                  type="text" 
                  placeholder="您的姓名" 
                  className="w-full px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <input 
                  type="email" 
                  placeholder="您的邮箱" 
                  className="w-full px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <input 
                  type="text" 
                  placeholder="主题" 
                  className="w-full px-8 py-5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <textarea 
                  placeholder="您的留言" 
                  rows={5}
                  className="w-full px-8 py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
                <div className="text-center pt-4">
                  <button className="px-12 py-4 rounded-full bg-transparent text-white font-bold hover:text-blue-400 transition-all">
                    发送留言
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
