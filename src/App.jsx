import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const PROJECTS = [
  { id:"01", name:"Ponto HGA", private:true, url:null,
    tag:"Python · Desktop",
    desc:"GUI desktop para geração automática de fichas de ponto — 2 por página A4 — a partir de template PDF e planilha XLSX. Em uso ativo no Hospital Geral de Areias.",
    points:["Impacto direto em +800 colaboradores do hospital","Leitura de XLSX com detecção automática do cabeçalho","Geração de PDF 2 fichas/A4 via ReportLab","Distribuído como .exe via PyInstaller"],
    stack:["Python","Tkinter","pandas","openpyxl","ReportLab","pypdf","Pillow","PyInstaller"] },
  { id:"02", name:"TaskFlow", private:false, url:"github.com/nickdiegao/taskflow",
    tag:"TypeScript · API",
    desc:"API de gerenciamento de tarefas com autenticação JWT, filas assíncronas e cobertura de testes superior a 80%.",
    points:["JWT com roles e guardas de acesso por perfil","Filas Bull/Redis para e-mails assíncronos","Cobertura +80% com Jest e Supertest","Pipeline CI com GitHub Actions"],
    stack:["TypeScript","NestJS","PostgreSQL","Redis","Docker","Jest","GitHub Actions"] },
  { id:"03", name:"ecoEduca", private:false, url:"github.com/nickdiegao/ecoeduca",
    tag:"Java · Cloud",
    desc:"Plataforma educacional com arquitetura híbrida dual-stack e deploy em cloud AWS.",
    points:["APIs REST com Java/Spring Boot e Node.js/NestJS","MySQL relacional + MongoDB para conteúdo dinâmico","Deploy EC2 com banco gerenciado via RDS","Arquitetura em camadas: Clean Code + SOLID"],
    stack:["Java","Spring Boot","NestJS","MySQL","MongoDB","AWS EC2","Docker"] },
];

const SKILLS = [
  { cat:"Linguagens",    items:["TypeScript","JavaScript","Java","Node.js","Python"],  bars:[{n:"TypeScript",p:85},{n:"JavaScript",p:90},{n:"Python",p:70}] },
  { cat:"Frameworks",    items:["NestJS","Express.js","Spring Boot"],                  bars:[{n:"NestJS",p:85},{n:"Spring Boot",p:70},{n:"Express",p:80}] },
  { cat:"Testes",        items:["Jest","Supertest","JUnit","TDD"],                     bars:[{n:"Jest",p:80},{n:"TDD",p:75},{n:"JUnit",p:65}] },
  { cat:"Banco de Dados",items:["PostgreSQL","MongoDB","MySQL","Redis"],               bars:[{n:"PostgreSQL",p:80},{n:"MongoDB",p:70},{n:"Redis",p:65}] },
  { cat:"DevOps",        items:["Docker","GitHub Actions","AWS EC2","RDS","S3"],       bars:[{n:"Docker",p:80},{n:"AWS",p:70},{n:"CI/CD",p:75}] },
  { cat:"Conceitos",     items:["REST APIs","SOLID","Clean Code","Design Patterns"],   bars:[{n:"SOLID",p:85},{n:"Clean Code",p:88},{n:"REST",p:90}] },
];

function Blobs() {
  return (
    <div className="blobs" aria-hidden="true">
      <svg className="blob blob-1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-1C87,14.2,81.4,28.4,73.3,41.1C65.2,53.9,54.6,65.2,41.6,71.9C28.6,78.6,14.3,80.7,-0.4,81.3C-15.1,81.9,-30.2,81.1,-43.3,74.9C-56.3,68.8,-67.3,57.3,-74.8,43.7C-82.3,30.1,-86.3,15.1,-85.1,0.7C-83.9,-13.7,-77.5,-27.4,-69.2,-39.7C-60.9,-52,-50.8,-62.9,-38.5,-70.9C-26.2,-78.9,-13.1,-84,1.4,-86.2C15.9,-88.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)"/>
      </svg>
      <svg className="blob blob-2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M39.5,-67.8C50.9,-60.3,59.7,-49.2,66.8,-36.7C73.9,-24.2,79.3,-10.4,79.1,3.2C78.9,16.9,73.1,30.3,65.2,42.5C57.3,54.7,47.3,65.7,35,71.8C22.7,77.9,8.1,79.1,-5.8,76.8C-19.7,74.5,-32.9,68.7,-44.9,60.5C-56.9,52.3,-67.7,41.7,-73.3,28.7C-78.9,15.7,-79.3,0.3,-75.8,-13.8C-72.3,-27.9,-64.9,-40.7,-54.8,-49.8C-44.7,-58.9,-31.9,-64.3,-19.5,-66.1C-7.1,-67.9,4.9,-66.1,16.6,-66.7C28.3,-67.3,28.1,-75.3,39.5,-67.8Z" transform="translate(100 100)"/>
      </svg>
      <svg className="blob blob-3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.7,-79.1C61.3,-71.4,71.8,-58.1,78.8,-43.2C85.8,-28.3,89.3,-11.8,87.4,3.8C85.5,19.4,78.2,33.8,69.1,46.5C60,59.2,49.1,70.2,36.1,76.4C23.1,82.6,8,84,-7.3,82.1C-22.6,80.2,-38.1,75,-50.4,66.2C-62.7,57.4,-71.8,45,-77.2,31C-82.6,17,-84.3,1.4,-81.2,-12.8C-78.1,-27,-70.2,-39.8,-60.1,-50.4C-50,-61,-37.7,-69.4,-24.6,-75.2C-11.5,-81,1.4,-84.2,14,-82.8C26.6,-81.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)"/>
      </svg>
      <svg className="blob blob-4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.2,-57.6C42.5,-50.3,49.1,-39.5,57.2,-27.9C65.3,-16.3,74.9,-3.9,75.8,9.3C76.7,22.5,68.9,36.5,58.9,47.7C48.9,58.9,36.7,65.7,23.1,71.9C9.5,76.5,-5.5,77.3,-20.4,74.2C-35.3,71.1,-50.1,64.1,-60.3,52.9C-70.5,41.7,-76.1,26.3,-77.3,10.7C-78.5,-4.9,-75.3,-20.7,-67.7,-33.5C-60.1,-46.3,-48.1,-56.1,-35.3,-61.7C-22.5,-67.3,-8.9,-68.7,2.9,-73C14.7,-77.3,23.9,-64.9,33.2,-57.6Z" transform="translate(100 100)"/>
      </svg>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ nome:"", email:"", assunto:"", mensagem:"" });
  const [status, setStatus] = useState(null);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.mensagem) { setStatus("empty"); return; }
    setStatus("sending");
    try {
      await emailjs.send("service_7fgc9p8","template_p984qvg",
        { nome:form.nome, email:form.email, assunto:form.assunto, mensagem:form.mensagem },
        "uS6X_dbxaOIfcTjUQ"
      );
      setStatus("ok"); setForm({ nome:"", email:"", assunto:"", mensagem:"" });
    } catch { setStatus("err"); }
  };
  return (
    <form className="cform" onSubmit={submit}>
      <div className="cform-row">
        <div className="cform-group"><label>Nome</label><input name="nome" value={form.nome} onChange={handle} placeholder="Seu nome" /></div>
        <div className="cform-group"><label>E-mail</label><input name="email" type="email" value={form.email} onChange={handle} placeholder="seu@email.com" /></div>
      </div>
      <div className="cform-group"><label>Assunto</label><input name="assunto" value={form.assunto} onChange={handle} placeholder="Oportunidade, projeto..." /></div>
      <div className="cform-group"><label>Mensagem</label><textarea name="mensagem" value={form.mensagem} onChange={handle} placeholder="Escreva aqui..." /></div>
      {status==="ok"    && <div className="cform-ok">✓ Mensagem enviada!</div>}
      {status==="empty" && <div className="cform-err">Preencha os campos obrigatórios.</div>}
      {status==="err"   && <div className="cform-err">Erro ao enviar. Tente novamente.</div>}
      <button type="submit" disabled={status==="sending"}>
        <span>{status==="sending" ? "Enviando..." : "Enviar mensagem"}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </form>
  );
}

function EasterEgg({ show, onClose }) {
  useEffect(() => {
    if (!show || !window.gsap) return;
    window.gsap.fromTo(".egg-inner > *", { opacity:0, y:30 }, { opacity:1, y:0, stagger:.08, duration:.6, ease:"power3.out" });
  }, [show]);
  return (
    <div className={`egg${show?" egg--show":""}`}>
      <div className="egg-inner">
        <div className="egg-tag">// secret.unlocked</div>
        <div className="egg-name">Nicholas<br/>Diego</div>
        <div className="egg-role">Backend Developer</div>
        <div className="egg-email">nickdiegao@gmail.com</div>
        <div className="egg-hint">digite NICK a qualquer momento</div>
        <button className="egg-close" onClick={onClose}>fechar ×</button>
      </div>
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [egg, setEgg] = useState(false);
  const keyBuf = useRef("");

  useEffect(() => {
    const gsap = window.gsap;
    const ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);

    /* HERO */
    const tl = gsap.timeline({ defaults:{ ease:"power4.out" } });
    tl.fromTo(".hero-eyebrow", { opacity:0, y:20 },        { opacity:1, y:0, duration:.5 }, .1)
      .fromTo(".hero-line-1",  { opacity:0, x:-80 },       { opacity:1, x:0, duration:.9 }, .2)
      .fromTo(".hero-line-2",  { opacity:0, x:-80 },       { opacity:1, x:0, duration:.9 }, .38)
      .fromTo(".hero-line-3",  { opacity:0, x:-80 },       { opacity:1, x:0, duration:.9 }, .52)
      .fromTo(".hero-sub",     { opacity:0, y:24 },        { opacity:1, y:0, duration:.7 }, .7)
      .fromTo(".hero-ctas",    { opacity:0, y:20 },        { opacity:1, y:0, duration:.6 }, .85)
      .fromTo(".blob",         { opacity:0, scale:.5 },    { opacity:1, scale:1, stagger:.15, duration:1.2, ease:"elastic.out(1,.6)" }, .1);

    /* ABOUT */
    gsap.fromTo(".about-big-text", { opacity:0, y:60 }, { opacity:1, y:0, duration:1, ease:"power3.out", clearProps:"all", scrollTrigger:{ trigger:".about-big-text", start:"top 85%" } });
    gsap.fromTo(".about-body p", { opacity:0, y:28 }, { opacity:1, y:0, stagger:.12, duration:.8, clearProps:"all", scrollTrigger:{ trigger:".about-body", start:"top 80%" } });
    gsap.fromTo(".stat-item", { opacity:0, y:40 }, { opacity:1, y:0, stagger:.1, duration:.7, clearProps:"all", scrollTrigger:{ trigger:".stats-row", start:"top 85%" } });

    /* SKILLS */
    /* SKILL BARS */
    setTimeout(() => {
      document.querySelectorAll(".sbar-fill").forEach(bar => {
        const pct = bar.dataset.pct;
        gsap.fromTo(bar,
          { width:"0%" },
          { width:`${pct}%`, duration:1.4, ease:"power2.out",
            scrollTrigger:{ trigger:bar, start:"top 95%" }
          }
        );
      });
    }, 400);

    gsap.fromTo(".skill-group", { opacity:0, y:36 }, { opacity:1, y:0, stagger:.07, duration:.7, ease:"power2.out", clearProps:"all", scrollTrigger:{ trigger:".skills-wrap", start:"top 80%" } });

    /* PROJECTS */
    PROJECTS.forEach((_,i) => {
      gsap.fromTo(`.proj-${i}`, { opacity:0, y:60 }, { opacity:1, y:0, duration:.9, ease:"power3.out", clearProps:"all", scrollTrigger:{ trigger:`.proj-${i}`, start:"top 85%" } });
    });

    /* EXP */
    gsap.fromTo(".exp-item", { opacity:0, y:48 }, { opacity:1, y:0, duration:.9, clearProps:"all", scrollTrigger:{ trigger:".exp-item", start:"top 82%" } });

    /* CONTACT */
    gsap.fromTo(".contact-left", { opacity:0, x:-60 }, { opacity:1, x:0, duration:.9, ease:"power3.out", clearProps:"all", scrollTrigger:{ trigger:".contact-wrap", start:"top 80%" } });
    gsap.fromTo(".contact-right", { opacity:0, x:60 }, { opacity:1, x:0, duration:.9, ease:"power3.out", clearProps:"all", scrollTrigger:{ trigger:".contact-wrap", start:"top 80%" } });

    /* SECTION HEADINGS */
    gsap.utils.toArray(".section-heading").forEach(el => {
      gsap.fromTo(el, { opacity:0, y:50 }, { opacity:1, y:0, duration:.9, ease:"power3.out", clearProps:"all", scrollTrigger:{ trigger:el, start:"top 85%" } });
    });

    return () => ST.getAll().forEach(t => t.kill());
  }, []);

  // Força o ScrollTrigger a recalcular posições após render
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const h = e => {
      keyBuf.current = (keyBuf.current + e.key.toUpperCase()).slice(-4);
      if (keyBuf.current === "NICK") setEgg(true);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const go = (id) => {
    setMenu(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (window.gsap) {
      window.gsap.to(window, { duration:.4, scrollTo:{ y:el, offsetY:70 }, ease:"power2.inOut" });
    } else {
      el.scrollIntoView({ behavior:"smooth" });
    }
  };

  const nav = [["sobre","sobre"],["skills","skills"],["projetos","projetos"],["contato","contato"]];

  return (
    <>
      <EasterEgg show={egg} onClose={() => setEgg(false)} />

      <nav className="nav">
        <div className="nav-logo">ND<span>.</span></div>
        <ul className="nav-links">
          {nav.map(([l,id]) => (
            <li key={l}><a href={`#${id}`} onClick={e=>{ e.preventDefault(); go(id); }}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-end">
          <span className="nav-avail"><span className="dot-pulse"/>disponível</span>
          <button className={`nav-burger${menu?" open":""}`} onClick={()=>setMenu(m=>!m)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`mob${menu?" mob--open":""}`}>
        {nav.map(([l,id]) => (
          <a key={l} href={`#${id}`} onClick={e=>{ e.preventDefault(); go(id); }}>{l}</a>
        ))}
      </div>

      {/* HERO — centralizado, sem foto */}
      <section className="hero" id="sobre">
        <Blobs />
        <div className="hero-content">
          <div className="hero-eyebrow"><span className="dot-pulse"/>Backend Developer · Recife, PE</div>
          <h1 className="hero-title">
            <span className="hero-line-1">OI, EU SOU</span>
            <span className="hero-line-2">NICHOLAS</span>
            <span className="hero-line-3">DIEGO<em>.</em></span>
          </h1>
          <p className="hero-sub">
            Desenvolvo <strong>APIs robustas</strong>, sistemas escaláveis<br/>
            e soluções que impactam pessoas reais.
          </p>
          <div className="hero-ctas">
            <button className="cta-main" onClick={()=>go("projetos")}>→ ver projetos</button>
            <a className="cta-ghost" href="#contato">→ entrar em contato</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-big-text">Código com<br/><span>propósito.</span></div>
          <div className="about-body">
            <p>Desenvolvedor com experiência em <strong>APIs RESTful</strong>, integração de sistemas e deploy em <strong>cloud AWS</strong>. Aplico TDD desde o início com foco em qualidade e confiabilidade.</p>
            <p>Atualmente na <strong>PRONET</strong>, diagnosticando incidentes em produção e apoiando integrações entre sistemas internos.</p>
            <div className="about-pills">
              <span>Português nativo</span><span>English C2</span><span>Remoto · Híbrido · Presencial</span>
            </div>
          </div>
        </div>
        <div className="stats-row">
          {[["UNINASSAU","Análise e Des. de Sistemas · 2023–2026"],["SENAI","Técnico em Informática · 2022–2023"],["+800","pessoas impactadas"],["+80%","cobertura de testes"]].map(([n,l])=>(
            <div className="stat-item" key={n}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills" id="skills">
        <h2 className="section-heading">Stack<br/><span>técnica.</span></h2>
        <div className="skills-wrap">
          {SKILLS.map((s,i)=>(
            <div className="skill-group" key={s.cat}>
              <div className="skill-group-num">0{i+1}</div>
              <div className="skill-group-cat">{s.cat}</div>
              <div className="skill-group-items">{s.items.map(t=><span key={t}>{t}</span>)}</div>
              <div className="skill-bars">
                {s.bars.map(b=>(
                  <div className="sbar" key={b.n}>
                    <div className="sbar-head">
                      <span>{b.n}</span>
                      <span className="sbar-pct">{b.p}%</span>
                    </div>
                    <div className="sbar-track">
                      <div className="sbar-fill" data-pct={b.p} style={{width:0}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects" id="projetos">
        <h2 className="section-heading">O que<br/><span>construí.</span></h2>
        {PROJECTS.map((p,i)=>(
          <article className={`proj proj-${i}`} key={p.id}>
            <div className="proj-header">
              <div className="proj-meta">
                <span className="proj-num">{p.id}</span>
                <span className="proj-tag">{p.tag}</span>
              </div>
              {p.private
                ? <span className="proj-lock">🔒 repositório privado</span>
                : <a className="proj-gh" href={`https://${p.url}`} target="_blank" rel="noopener noreferrer">ver no GitHub ↗</a>
              }
            </div>
            <h3 className="proj-name">{p.name}</h3>
            <p className="proj-desc">{p.desc}</p>
            <ul className="proj-pts">{p.points.map(pt=><li key={pt}>{pt}</li>)}</ul>
            <div className="proj-stack">{p.stack.map(t=><span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </section>

      {/* EXPERIENCE */}
      <section className="exp" id="experiencia">
        <h2 className="section-heading">Onde<br/><span>trabalhei.</span></h2>
        <div className="exp-item">
          <div className="exp-left">
            <div className="exp-period">Dez 2024 — Atual</div>
            <div className="exp-co">PRONET</div>
            <div className="exp-badge">Tempo integral</div>
          </div>
          <div className="exp-right">
            <div className="exp-role">Técnico de Operações de TI</div>
            <ul className="exp-pts">
              {["Diagnóstico e resolução de incidentes em sistemas web em produção.",
                "Investigação de falhas em backend e banco de dados com a equipe de dev.",
                "Tradução de requisitos de negócio em soluções técnicas multidisciplinares.",
                "Apoio em integração entre sistemas internos com proposta de melhorias."].map(pt=><li key={pt}>{pt}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contato">
        <div className="contact-wrap">
          <div className="contact-left">
            <h2 className="section-heading" style={{marginBottom:24}}>Vamos<br/>construir<br/><span>juntos?</span></h2>
            <p className="contact-sub">Aberto a oportunidades em desenvolvimento.<br/>Fala comigo!</p>
            <div className="contact-links">
              {[["✉","nickdiegao@gmail.com","mailto:nickdiegao@gmail.com"],
                ["in","LinkedIn","https://linkedin.com/in/nicholas-diego"],
                ["⌥","GitHub","https://github.com/nickdiegao"]].map(([ic,lb,hr])=>(
                <a key={lb} href={hr} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <span>{ic}</span><span>{lb}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-right"><ContactForm/></div>
        </div>
      </section>

      <footer className="footer">
        <span>Nicholas Diego · Recife, Brasil 🇧🇷</span>
        <span>© 2026</span>
      </footer>
    </>
  );
}