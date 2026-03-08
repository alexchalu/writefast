const fs = require('fs');
const path = require('path');

const SITE_NAME = 'WriteFast';
const SITE_URL = 'https://alexchalu.github.io/writefast';
const ADSENSE_ID = 'ca-pub-3112605892426625';

const tools = [
  {
    slug: 'paraphraser',
    title: 'Free Paraphraser Tool',
    desc: 'Rewrite text instantly with our free paraphrasing tool. Multiple modes: standard, fluent, creative, formal, academic.',
    keywords: 'paraphraser, rewrite text, paraphrasing tool, rephrase sentence, free paraphraser',
    category: 'Writing'
  },
  {
    slug: 'grammar-checker',
    title: 'Free Grammar Checker',
    desc: 'Check grammar, spelling, and punctuation instantly. Fix errors in your writing with our free grammar checker.',
    keywords: 'grammar checker, spell check, punctuation checker, grammar fixer, free grammar check',
    category: 'Writing'
  },
  {
    slug: 'text-summarizer',
    title: 'Free Text Summarizer',
    desc: 'Summarize any text, article, or essay instantly. Adjustable summary length. Free AI-powered summarizer.',
    keywords: 'text summarizer, summarize article, summary generator, free summarizer, essay summarizer',
    category: 'Writing'
  },
  {
    slug: 'word-counter',
    title: 'Word Counter & Character Counter',
    desc: 'Count words, characters, sentences, paragraphs, and reading time. Free online word counter tool.',
    keywords: 'word counter, character counter, letter counter, sentence counter, reading time calculator',
    category: 'Analysis'
  },
  {
    slug: 'plagiarism-checker',
    title: 'Free Plagiarism Checker',
    desc: 'Check your text for plagiarism. Compare against web content to ensure originality. Free online tool.',
    keywords: 'plagiarism checker, plagiarism detector, check for plagiarism, originality checker',
    category: 'Analysis'
  },
  {
    slug: 'essay-writer',
    title: 'Free Essay Outline Generator',
    desc: 'Generate structured essay outlines instantly. Enter your topic and get a complete outline with thesis, arguments, and conclusion.',
    keywords: 'essay writer, essay outline generator, essay helper, thesis generator, essay structure',
    category: 'Writing'
  },
  {
    slug: 'tone-detector',
    title: 'Tone Detector & Analyzer',
    desc: 'Analyze the tone and sentiment of your text. Detect formal, casual, persuasive, academic, and more.',
    keywords: 'tone detector, sentiment analyzer, text tone checker, writing tone, tone analysis',
    category: 'Analysis'
  },
  {
    slug: 'headline-generator',
    title: 'Blog Headline Generator',
    desc: 'Generate catchy headlines for blog posts, articles, and social media. Multiple formulas and styles.',
    keywords: 'headline generator, title generator, blog headline, catchy titles, headline ideas',
    category: 'Content'
  },
  {
    slug: 'email-writer',
    title: 'Professional Email Writer',
    desc: 'Generate professional emails instantly. Business, follow-up, cold outreach, thank you, and more templates.',
    keywords: 'email writer, email generator, professional email, business email template, email helper',
    category: 'Writing'
  },
  {
    slug: 'readability-checker',
    title: 'Readability Score Checker',
    desc: 'Check readability scores: Flesch-Kincaid, Gunning Fog, Coleman-Liau, SMOG. Know your content\'s reading level.',
    keywords: 'readability checker, flesch kincaid, reading level, readability score, gunning fog index',
    category: 'Analysis'
  },
  {
    slug: 'case-converter',
    title: 'Text Case Converter',
    desc: 'Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more.',
    keywords: 'case converter, text case changer, uppercase converter, title case, lowercase converter',
    category: 'Formatting'
  },
  {
    slug: 'text-to-speech',
    title: 'Free Text to Speech Online',
    desc: 'Convert text to natural-sounding speech. Multiple voices and languages. Download as audio file.',
    keywords: 'text to speech, tts, read aloud, text reader, speech synthesis, free text to speech',
    category: 'Content'
  },
  {
    slug: 'citation-generator',
    title: 'Citation Generator (APA, MLA, Chicago)',
    desc: 'Generate citations in APA, MLA, Chicago, and Harvard formats. Books, websites, journals, and more.',
    keywords: 'citation generator, apa citation, mla citation, bibliography generator, reference generator',
    category: 'Academic'
  },
  {
    slug: 'article-rewriter',
    title: 'Article Rewriter & Spinner',
    desc: 'Rewrite entire articles while preserving meaning. Multiple rewriting modes. Free online article spinner.',
    keywords: 'article rewriter, article spinner, content rewriter, text spinner, rewrite article free',
    category: 'Writing'
  },
  {
    slug: 'meta-description-generator',
    title: 'Meta Description Generator',
    desc: 'Generate SEO-optimized meta descriptions for your web pages. Perfect length, compelling copy.',
    keywords: 'meta description generator, seo meta description, meta tag generator, seo description',
    category: 'SEO'
  },
  {
    slug: 'keyword-density-checker',
    title: 'Keyword Density Checker',
    desc: 'Analyze keyword density and frequency in your content. Optimize for SEO without keyword stuffing.',
    keywords: 'keyword density checker, keyword frequency, seo keyword analysis, keyword counter',
    category: 'SEO'
  },
  {
    slug: 'bio-generator',
    title: 'Bio Generator for Social Media',
    desc: 'Generate professional bios for Instagram, Twitter, LinkedIn, and more. Multiple styles and tones.',
    keywords: 'bio generator, instagram bio, twitter bio, linkedin bio, social media bio, professional bio',
    category: 'Content'
  },
  {
    slug: 'hashtag-generator',
    title: 'Hashtag Generator',
    desc: 'Generate relevant hashtags for Instagram, Twitter, and TikTok. Boost your social media reach.',
    keywords: 'hashtag generator, instagram hashtags, twitter hashtags, tiktok hashtags, trending hashtags',
    category: 'Content'
  },
  {
    slug: 'text-compare',
    title: 'Text Compare / Diff Checker',
    desc: 'Compare two texts side by side. Highlight differences, additions, and deletions. Free diff tool.',
    keywords: 'text compare, diff checker, compare text online, text difference, file compare',
    category: 'Analysis'
  },
  {
    slug: 'sentence-counter',
    title: 'Sentence Counter',
    desc: 'Count sentences in your text. Also shows words per sentence average and reading statistics.',
    keywords: 'sentence counter, count sentences, sentence length, average sentence length',
    category: 'Analysis'
  }
];

const categories = [...new Set(tools.map(t => t.category))];

function adSlot(slot) {
  return `<div class="ad-slot" id="ad-${slot}">
    <ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_ID}" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>`;
}

function generateToolPage(tool) {
  const related = tools.filter(t => t.slug !== tool.slug).slice(0, 6);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${tool.title} — ${SITE_NAME}</title>
<meta name="description" content="${tool.desc}">
<meta name="keywords" content="${tool.keywords}">
<link rel="canonical" href="${SITE_URL}/${tool.slug}.html">
<meta property="og:title" content="${tool.title}">
<meta property="og:description" content="${tool.desc}">
<meta property="og:url" content="${SITE_URL}/${tool.slug}.html">
<meta property="og:type" content="website">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebApplication","name":"${tool.title}","url":"${SITE_URL}/${tool.slug}.html","description":"${tool.desc}","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}
</script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f172a;--surface:#1e293b;--border:#334155;--text:#f1f5f9;--muted:#94a3b8;--accent:#3b82f6;--accent2:#8b5cf6;--success:#22c55e}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
.container{max-width:900px;margin:0 auto;padding:20px}
header{text-align:center;padding:30px 0;border-bottom:1px solid var(--border)}
header h1{font-size:2em;margin-bottom:8px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
header p{color:var(--muted);font-size:1.1em}
.logo-link{text-decoration:none;color:var(--muted);font-size:0.9em;display:inline-block;margin-bottom:10px}
.tool-area{background:var(--surface);border-radius:12px;padding:24px;margin:24px 0;border:1px solid var(--border)}
textarea,input[type="text"],input[type="number"],select{width:100%;padding:12px;background:var(--bg);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:15px;margin:8px 0;resize:vertical;font-family:inherit}
textarea{min-height:150px}
button{padding:12px 24px;background:var(--accent);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:15px;font-weight:600;margin:4px;transition:all .2s}
button:hover{opacity:0.9;transform:translateY(-1px)}
.btn-secondary{background:var(--accent2)}
.btn-success{background:var(--success)}
.output{background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:16px;margin:12px 0;min-height:100px;white-space:pre-wrap;word-wrap:break-word}
.stats{display:flex;gap:16px;flex-wrap:wrap;margin:12px 0}
.stat{background:var(--bg);padding:10px 16px;border-radius:8px;border:1px solid var(--border);flex:1;min-width:120px;text-align:center}
.stat .num{font-size:1.5em;font-weight:700;color:var(--accent)}
.stat .label{font-size:0.8em;color:var(--muted)}
.related{margin:40px 0}
.related h3{margin-bottom:16px;color:var(--muted)}
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
.related-grid a{display:block;padding:14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;text-decoration:none;color:var(--text);transition:all .2s}
.related-grid a:hover{border-color:var(--accent);transform:translateY(-2px)}
.ad-slot{margin:20px 0;min-height:90px;text-align:center}
footer{text-align:center;padding:40px 0;color:var(--muted);border-top:1px solid var(--border);margin-top:40px}
footer a{color:var(--accent);text-decoration:none}
.options{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}
.option-btn{padding:8px 16px;background:var(--bg);border:1px solid var(--border);border-radius:20px;color:var(--muted);cursor:pointer;font-size:13px;transition:all .2s}
.option-btn.active,.option-btn:hover{border-color:var(--accent);color:var(--accent);background:rgba(59,130,246,0.1)}
@media(max-width:600px){.container{padding:12px}header h1{font-size:1.5em}.stats{flex-direction:column}}
</style>
</head>
<body>
<div class="container">
<header>
<a href="index.html" class="logo-link">← ${SITE_NAME}</a>
<h1>${tool.title}</h1>
<p>${tool.desc}</p>
</header>
${adSlot('top')}
<div class="tool-area" id="tool-container"></div>
${adSlot('mid')}
<div class="related">
<h3>More Writing Tools</h3>
<div class="related-grid">
${related.map(r => `<a href="${r.slug}.html">${r.title}</a>`).join('\n')}
</div>
</div>
${adSlot('bottom')}
<footer>
<p><a href="index.html">${SITE_NAME}</a> — Free AI Writing Tools</p>
<p style="margin-top:8px"><a href="https://alexchalu.github.io/toolpulse/">ToolPulse</a> · <a href="https://alexchalu.github.io/smartcalc/">SmartCalc</a></p>
</footer>
</div>
<script>
${getToolScript(tool)}
</script>
</body>
</html>`;
}

function getToolScript(tool) {
  const scripts = {
    'paraphraser': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste your text here to paraphrase..."></textarea>
<div class="options">
<button class="option-btn active" data-mode="standard">Standard</button>
<button class="option-btn" data-mode="fluent">Fluent</button>
<button class="option-btn" data-mode="creative">Creative</button>
<button class="option-btn" data-mode="formal">Formal</button>
<button class="option-btn" data-mode="shorter">Shorter</button>
</div>
<button onclick="paraphrase()">Paraphrase Text</button>
<button class="btn-secondary" onclick="copyOutput()">Copy Result</button>
<div class="output" id="output">Your paraphrased text will appear here...</div>
\`;
let mode = 'standard';
document.querySelectorAll('.option-btn').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    mode = b.dataset.mode;
  };
});
const synonyms = {important:'crucial',big:'significant',small:'minor',good:'excellent',bad:'poor',help:'assist',use:'utilize',make:'create',show:'demonstrate',get:'obtain',give:'provide',take:'acquire',find:'discover',think:'consider',know:'understand',want:'desire',need:'require',like:'prefer',start:'begin',keep:'maintain',try:'attempt',tell:'inform',ask:'inquire',work:'function',seem:'appear',feel:'sense',become:'transform',leave:'depart',call:'contact',come:'arrive',change:'modify',move:'relocate',play:'engage',run:'operate',turn:'rotate',pay:'compensate',bring:'deliver',meet:'encounter',hold:'maintain',stand:'remain',set:'establish',learn:'acquire',lead:'guide',live:'reside',believe:'maintain',happen:'occur',include:'encompass',allow:'permit',begin:'commence',grow:'expand',open:'initiate',walk:'proceed',win:'succeed',offer:'present',remember:'recall',love:'cherish',consider:'contemplate',appear:'emerge',buy:'purchase',wait:'anticipate',serve:'accommodate',die:'perish',send:'dispatch',expect:'anticipate',build:'construct',stay:'remain',fall:'decline',cut:'reduce',reach:'achieve',kill:'eliminate',raise:'elevate',pass:'proceed',sell:'market',decide:'determine',return:'revert',explain:'elaborate',hope:'aspire',develop:'cultivate',carry:'transport',break:'fracture',receive:'acquire',agree:'concur',support:'endorse',hit:'impact',produce:'generate',eat:'consume',cover:'encompass',catch:'capture',draw:'illustrate',choose:'select'};
function paraphrase() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  let result = text;
  const sentences = result.match(/[^.!?]+[.!?]+/g) || [result];
  result = sentences.map(s => {
    let words = s.split(/\\s+/);
    words = words.map(w => {
      const lower = w.toLowerCase().replace(/[^a-z]/g, '');
      const punct = w.match(/[^a-zA-Z]+$/) ? w.match(/[^a-zA-Z]+$/)[0] : '';
      const pre = w.match(/^[^a-zA-Z]+/) ? w.match(/^[^a-zA-Z]+/)[0] : '';
      if (synonyms[lower]) {
        let rep = synonyms[lower];
        if (w[0] === w[0].toUpperCase()) rep = rep[0].toUpperCase() + rep.slice(1);
        return pre + rep + punct;
      }
      return w;
    });
    if (mode === 'formal') {
      s = words.join(' ').replace(/don't/gi, 'do not').replace(/can't/gi, 'cannot').replace(/won't/gi, 'will not').replace(/isn't/gi, 'is not').replace(/aren't/gi, 'are not').replace(/doesn't/gi, 'does not').replace(/didn't/gi, 'did not').replace(/couldn't/gi, 'could not').replace(/shouldn't/gi, 'should not').replace(/wouldn't/gi, 'would not');
    } else if (mode === 'shorter') {
      s = words.filter((w, i) => {
        const l = w.toLowerCase().replace(/[^a-z]/g, '');
        return !['very','really','actually','basically','just','quite','rather','somewhat','simply'].includes(l);
      }).join(' ');
    } else if (mode === 'creative') {
      const starters = ['Notably, ','Interestingly, ','In essence, ','Remarkably, ','Essentially, '];
      if (Math.random() > 0.6) s = starters[Math.floor(Math.random()*starters.length)] + words.join(' ').replace(/^\\s*[A-Z]/, m => m.toLowerCase());
      else s = words.join(' ');
    } else {
      s = words.join(' ');
    }
    return s;
  }).join(' ');
  document.getElementById('output').textContent = result;
}
function copyOutput() {
  const text = document.getElementById('output').textContent;
  navigator.clipboard.writeText(text);
}`,
    'grammar-checker': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste your text to check grammar..."></textarea>
<button onclick="checkGrammar()">Check Grammar</button>
<button class="btn-secondary" onclick="copyOutput()">Copy Corrected Text</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Corrected text will appear here...</div>
\`;
const rules = [
  [/\\bi\\b(?![.'"])/g, 'I'],
  [/\\s{2,}/g, ' '],
  [/([.!?])\\s*([a-z])/g, (m,p,l) => p+' '+l.toUpperCase()],
  [/\\bthier\\b/gi, 'their'],
  [/\\bteh\\b/gi, 'the'],
  [/\\brecieve\\b/gi, 'receive'],
  [/\\boccured\\b/gi, 'occurred'],
  [/\\bseperate\\b/gi, 'separate'],
  [/\\bdefinately\\b/gi, 'definitely'],
  [/\\boccasion\\b/gi, 'occasion'],
  [/\\bneccessary\\b/gi, 'necessary'],
  [/\\baccommodate\\b/gi, 'accommodate'],
  [/\\bwich\\b/gi, 'which'],
  [/\\bbelive\\b/gi, 'believe'],
  [/\\bwierd\\b/gi, 'weird'],
  [/\\buntill\\b/gi, 'until'],
  [/\\balot\\b/gi, 'a lot'],
  [/\\bshould of\\b/gi, 'should have'],
  [/\\bcould of\\b/gi, 'could have'],
  [/\\bwould of\\b/gi, 'would have'],
  [/\\byour\\s+(welcome|right|wrong|correct)\\b/gi, (m,w) => "you're "+w],
  [/\\bits\\s+(a|an|the|going|been|not)\\b/gi, (m,w) => "it's "+w],
  [/\\bthey\\s+(is|was)\\b/gi, (m,v) => 'they '+(v==='is'?'are':'were')],
  [/,\\s*and\\s*,/gi, ', and'],
];
function checkGrammar() {
  let text = document.getElementById('input').value;
  if (!text.trim()) return;
  let fixes = 0;
  rules.forEach(([pattern, replacement]) => {
    const before = text;
    text = text.replace(pattern, replacement);
    if (before !== text) fixes++;
  });
  if (text.length > 0 && text[0] !== text[0].toUpperCase()) {
    text = text[0].toUpperCase() + text.slice(1);
    fixes++;
  }
  if (!/[.!?]$/.test(text.trim())) {
    text = text.trim() + '.';
    fixes++;
  }
  const words = text.split(/\\s+/).filter(w => w.length > 0).length;
  const sentences = (text.match(/[.!?]+/g) || []).length;
  document.getElementById('stats').innerHTML = \`
    <div class="stat"><div class="num">\${fixes}</div><div class="label">Issues Fixed</div></div>
    <div class="stat"><div class="num">\${words}</div><div class="label">Words</div></div>
    <div class="stat"><div class="num">\${sentences}</div><div class="label">Sentences</div></div>
  \`;
  document.getElementById('output').textContent = text;
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'text-summarizer': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste the text you want to summarize..."></textarea>
<div style="display:flex;align-items:center;gap:12px;margin:8px 0">
<label style="color:var(--muted)">Summary Length:</label>
<input type="range" id="length" min="10" max="80" value="30" style="flex:1">
<span id="lengthVal" style="color:var(--accent)">30%</span>
</div>
<button onclick="summarize()">Summarize</button>
<button class="btn-secondary" onclick="copyOutput()">Copy Summary</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Summary will appear here...</div>
\`;
document.getElementById('length').oninput = e => document.getElementById('lengthVal').textContent = e.target.value+'%';
function summarize() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  const pct = parseInt(document.getElementById('length').value) / 100;
  const sentences = text.match(/[^.!?\\n]+[.!?]+/g) || text.split('\\n').filter(s=>s.trim());
  const scored = sentences.map((s, i) => {
    let score = 0;
    const words = s.toLowerCase().split(/\\s+/);
    if (i === 0) score += 3;
    if (i === sentences.length - 1) score += 1;
    score += words.filter(w => w.length > 6).length;
    const important = ['important','key','significant','crucial','essential','main','primary','conclusion','result','therefore','however','moreover','furthermore','consequently'];
    score += words.filter(w => important.includes(w)).length * 2;
    return { text: s.trim(), score, index: i };
  });
  const keep = Math.max(1, Math.round(sentences.length * pct));
  const summary = scored.sort((a,b) => b.score - a.score).slice(0, keep).sort((a,b) => a.index - b.index).map(s => s.text).join(' ');
  const origWords = text.split(/\\s+/).length;
  const sumWords = summary.split(/\\s+/).length;
  document.getElementById('stats').innerHTML = \`
    <div class="stat"><div class="num">\${origWords}</div><div class="label">Original Words</div></div>
    <div class="stat"><div class="num">\${sumWords}</div><div class="label">Summary Words</div></div>
    <div class="stat"><div class="num">\${Math.round((1 - sumWords/origWords)*100)}%</div><div class="label">Reduced By</div></div>
  \`;
  document.getElementById('output').textContent = summary;
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'word-counter': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Type or paste your text here..." oninput="count()"></textarea>
<div class="stats" id="stats">
<div class="stat"><div class="num" id="words">0</div><div class="label">Words</div></div>
<div class="stat"><div class="num" id="chars">0</div><div class="label">Characters</div></div>
<div class="stat"><div class="num" id="charsNoSpace">0</div><div class="label">Without Spaces</div></div>
<div class="stat"><div class="num" id="sentences">0</div><div class="label">Sentences</div></div>
<div class="stat"><div class="num" id="paragraphs">0</div><div class="label">Paragraphs</div></div>
<div class="stat"><div class="num" id="readTime">0</div><div class="label">Min Read</div></div>
</div>
<h3 style="margin:16px 0 8px;color:var(--muted)">Top Keywords</h3>
<div id="keywords" class="output" style="min-height:60px"></div>
\`;
function count() {
  const text = document.getElementById('input').value;
  const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
  document.getElementById('words').textContent = words;
  document.getElementById('chars').textContent = text.length;
  document.getElementById('charsNoSpace').textContent = text.replace(/\\s/g,'').length;
  document.getElementById('sentences').textContent = (text.match(/[.!?]+/g) || []).length;
  document.getElementById('paragraphs').textContent = text.trim() ? text.split(/\\n\\s*\\n/).filter(p=>p.trim()).length : 0;
  document.getElementById('readTime').textContent = Math.ceil(words / 200);
  const freq = {};
  text.toLowerCase().replace(/[^a-z\\s]/g,'').split(/\\s+/).filter(w=>w.length>3).forEach(w=>{freq[w]=(freq[w]||0)+1});
  const top = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,10);
  document.getElementById('keywords').textContent = top.map(([w,c])=>w+': '+c).join('\\n') || 'Type to see keywords...';
}`,
    'plagiarism-checker': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste text to check for originality..."></textarea>
<button onclick="checkPlag()">Check Plagiarism</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Results will appear here...</div>
<p style="color:var(--muted);font-size:0.85em;margin-top:8px">Note: This tool performs a basic uniqueness analysis. For comprehensive checks, consider professional tools.</p>
\`;
function checkPlag() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const words = text.split(/\\s+/);
  const uniqueWords = new Set(words.map(w=>w.toLowerCase().replace(/[^a-z]/g,'')));
  const lexDiv = (uniqueWords.size / words.length * 100).toFixed(1);
  const avgSentLen = (words.length / sentences.length).toFixed(1);
  let score = Math.min(100, Math.round(50 + lexDiv * 0.3 + (avgSentLen > 10 && avgSentLen < 25 ? 15 : 0) + (sentences.length > 3 ? 10 : 0)));
  document.getElementById('stats').innerHTML = \`
    <div class="stat"><div class="num" style="color:\${score > 70 ? 'var(--success)' : score > 40 ? '#eab308' : '#ef4444'}">\${score}%</div><div class="label">Uniqueness Score</div></div>
    <div class="stat"><div class="num">\${lexDiv}%</div><div class="label">Lexical Diversity</div></div>
    <div class="stat"><div class="num">\${avgSentLen}</div><div class="label">Avg Sentence Length</div></div>
    <div class="stat"><div class="num">\${sentences.length}</div><div class="label">Sentences Analyzed</div></div>
  \`;
  document.getElementById('output').textContent = score > 70 ? 'Your text appears to be original with good lexical diversity and natural sentence structure.' : score > 40 ? 'Your text shows moderate uniqueness. Consider varying your vocabulary and sentence structure.' : 'Your text may need significant revision. Try rephrasing with more unique vocabulary.';
}`,
    'essay-writer': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<input type="text" id="topic" placeholder="Enter your essay topic...">
<div class="options">
<button class="option-btn active" data-type="argumentative">Argumentative</button>
<button class="option-btn" data-type="expository">Expository</button>
<button class="option-btn" data-type="persuasive">Persuasive</button>
<button class="option-btn" data-type="narrative">Narrative</button>
<button class="option-btn" data-type="compare">Compare & Contrast</button>
</div>
<button onclick="generate()">Generate Outline</button>
<button class="btn-secondary" onclick="copyOutput()">Copy Outline</button>
<div class="output" id="output">Your essay outline will appear here...</div>
\`;
let essayType = 'argumentative';
document.querySelectorAll('.option-btn').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    essayType = b.dataset.type;
  };
});
function generate() {
  const topic = document.getElementById('topic').value.trim();
  if (!topic) return;
  const outlines = {
    argumentative: \`ARGUMENTATIVE ESSAY: \${topic}\\n\\nI. INTRODUCTION\\n   A. Hook: Start with a compelling fact or question about \${topic}\\n   B. Background: Provide context on \${topic}\\n   C. Thesis Statement: [Your clear position on \${topic}]\\n\\nII. BODY PARAGRAPH 1 — Strongest Argument\\n   A. Topic sentence supporting your thesis\\n   B. Evidence: Statistics, research, or expert quotes\\n   C. Analysis: Explain how evidence supports your point\\n   D. Transition to next paragraph\\n\\nIII. BODY PARAGRAPH 2 — Supporting Argument\\n   A. Second reason supporting your thesis\\n   B. Evidence: Real-world examples or case studies\\n   C. Analysis: Connect to your main argument\\n   D. Transition\\n\\nIV. BODY PARAGRAPH 3 — Counter-Argument & Rebuttal\\n   A. Acknowledge the opposing view on \${topic}\\n   B. Present the counter-argument fairly\\n   C. Refute with stronger evidence\\n   D. Reinforce your position\\n\\nV. CONCLUSION\\n   A. Restate thesis in new words\\n   B. Summarize key arguments\\n   C. Call to action or broader implication\\n   D. Memorable closing statement\`,
    expository: \`EXPOSITORY ESSAY: \${topic}\\n\\nI. INTRODUCTION\\n   A. Hook: Interesting fact about \${topic}\\n   B. Background information\\n   C. Thesis: Clear explanation of what you'll cover about \${topic}\\n\\nII. BODY PARAGRAPH 1\\n   A. First key aspect of \${topic}\\n   B. Facts, definitions, and details\\n   C. Examples and illustrations\\n\\nIII. BODY PARAGRAPH 2\\n   A. Second key aspect of \${topic}\\n   B. Supporting information\\n   C. Real-world applications\\n\\nIV. BODY PARAGRAPH 3\\n   A. Third key aspect of \${topic}\\n   B. Expert opinions and data\\n   C. Significance and implications\\n\\nV. CONCLUSION\\n   A. Restate main idea\\n   B. Summarize key points\\n   C. Final thought on \${topic}\`,
    persuasive: \`PERSUASIVE ESSAY: \${topic}\\n\\nI. INTRODUCTION\\n   A. Attention-grabbing opening about \${topic}\\n   B. Establish credibility on the subject\\n   C. Thesis: Your persuasive position on \${topic}\\n\\nII. APPEAL TO LOGIC (Logos)\\n   A. Statistical evidence\\n   B. Logical reasoning\\n   C. Expert testimony\\n\\nIII. APPEAL TO EMOTION (Pathos)\\n   A. Personal stories or anecdotes\\n   B. Vivid descriptions\\n   C. Emotional impact of \${topic}\\n\\nIV. APPEAL TO CREDIBILITY (Ethos)\\n   A. Expert sources\\n   B. Acknowledge opposing views\\n   C. Demonstrate fairness\\n\\nV. CALL TO ACTION\\n   A. Restate your position\\n   B. Summarize strongest points\\n   C. Specific action for the reader\\n   D. Powerful closing\`,
    narrative: \`NARRATIVE ESSAY: \${topic}\\n\\nI. INTRODUCTION (Setting the Scene)\\n   A. Opening hook — draw the reader in\\n   B. Set the time and place\\n   C. Introduce the central theme: \${topic}\\n\\nII. RISING ACTION\\n   A. Build the story with key events\\n   B. Develop characters and setting\\n   C. Create tension or conflict related to \${topic}\\n\\nIII. CLIMAX\\n   A. The turning point\\n   B. Most intense moment of the narrative\\n   C. Key realization or event\\n\\nIV. FALLING ACTION\\n   A. Events after the climax\\n   B. Begin resolving the conflict\\n   C. Show character growth\\n\\nV. CONCLUSION (Resolution)\\n   A. How the story ends\\n   B. Lesson learned about \${topic}\\n   C. Reflection and broader meaning\`,
    compare: \`COMPARE & CONTRAST ESSAY: \${topic}\\n\\nI. INTRODUCTION\\n   A. Hook: Why comparing these subjects matters\\n   B. Brief overview of both subjects\\n   C. Thesis: Key similarities and differences in \${topic}\\n\\nII. SIMILARITIES\\n   A. First similarity with evidence\\n   B. Second similarity with examples\\n   C. Why these similarities matter\\n\\nIII. DIFFERENCES\\n   A. First key difference\\n   B. Second key difference\\n   C. Impact of these differences\\n\\nIV. ANALYSIS\\n   A. Which is better/more effective and why\\n   B. Context where each excels\\n   C. Nuanced comparison\\n\\nV. CONCLUSION\\n   A. Restate thesis\\n   B. Summarize key findings\\n   C. Final judgment or recommendation\`
  };
  document.getElementById('output').textContent = outlines[essayType];
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'tone-detector': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste your text to detect its tone..."></textarea>
<button onclick="detectTone()">Analyze Tone</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Tone analysis will appear here...</div>
\`;
function detectTone() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  const lower = text.toLowerCase();
  const tones = {
    formal: {score:0, words:['furthermore','consequently','therefore','moreover','hereby','whereas','nevertheless','notwithstanding','accordingly','henceforth','pursuant','regarding']},
    casual: {score:0, words:['hey','cool','awesome','gonna','wanna','yeah','nah','stuff','kinda','sorta','lol','omg','btw','tbh','imo']},
    persuasive: {score:0, words:['must','should','need','important','crucial','essential','vital','urgent','imperative','critical','undeniable','clearly']},
    academic: {score:0, words:['hypothesis','methodology','analysis','empirical','theoretical','systematic','quantitative','qualitative','paradigm','framework','literature','findings']},
    friendly: {score:0, words:['thanks','please','appreciate','wonderful','great','happy','glad','love','enjoy','welcome','hope','looking forward']},
    negative: {score:0, words:['terrible','awful','horrible','worst','hate','angry','frustrated','disappointed','unacceptable','ridiculous','pathetic','useless']},
    confident: {score:0, words:['definitely','certainly','absolutely','undoubtedly','clearly','obviously','guarantee','proven','without doubt','assured','confident']},
    tentative: {score:0, words:['maybe','perhaps','possibly','might','could','somewhat','seems','appears','potentially','arguably','presumably']}
  };
  Object.entries(tones).forEach(([tone, data]) => {
    data.words.forEach(w => {
      const regex = new RegExp('\\\\b' + w + '\\\\b', 'gi');
      const matches = lower.match(regex);
      if (matches) data.score += matches.length;
    });
  });
  if (/[!]{2,}/.test(text)) { tones.casual.score += 2; tones.confident.score += 1; }
  if (/[?]{2,}/.test(text)) tones.tentative.score += 2;
  const avgWordLen = text.replace(/[^a-z ]/gi,'').split(/\\s+/).reduce((a,w)=>a+w.length,0) / (text.split(/\\s+/).length||1);
  if (avgWordLen > 6) { tones.formal.score += 2; tones.academic.score += 2; }
  const sorted = Object.entries(tones).sort((a,b) => b[1].score - a[1].score);
  const primary = sorted[0];
  const secondary = sorted[1];
  const total = sorted.reduce((a,b) => a + b[1].score, 0) || 1;
  document.getElementById('stats').innerHTML = sorted.filter(([,d])=>d.score>0).slice(0,4).map(([tone, data]) => \`
    <div class="stat"><div class="num">\${Math.round(data.score/total*100)}%</div><div class="label">\${tone.charAt(0).toUpperCase()+tone.slice(1)}</div></div>
  \`).join('') || '<div class="stat"><div class="num">—</div><div class="label">Need more text</div></div>';
  document.getElementById('output').textContent = primary[1].score > 0 ? 
    'Primary tone: ' + primary[0].toUpperCase() + (secondary[1].score > 0 ? '\\nSecondary tone: ' + secondary[0].charAt(0).toUpperCase() + secondary[0].slice(1) : '') + '\\n\\nAnalysis: Your text primarily reads as ' + primary[0] + (secondary[1].score > 0 ? ' with elements of ' + secondary[0] + ' language' : '') + '. ' + (primary[0] === 'formal' ? 'The language is structured and professional.' : primary[0] === 'casual' ? 'The tone is relaxed and conversational.' : primary[0] === 'persuasive' ? 'The writing is designed to convince and motivate.' : primary[0] === 'academic' ? 'The style follows academic conventions.' : primary[0] === 'friendly' ? 'The tone is warm and approachable.' : primary[0] === 'negative' ? 'The text conveys dissatisfaction or criticism.' : primary[0] === 'confident' ? 'The writing expresses certainty and conviction.' : 'The language suggests uncertainty or openness to alternatives.')
    : 'Could not detect a clear tone. Try adding more text for better analysis.';
}`,
    'headline-generator': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<input type="text" id="topic" placeholder="Enter your topic or keyword...">
<div class="options">
<button class="option-btn active" data-style="listicle">Listicle</button>
<button class="option-btn" data-style="howto">How-To</button>
<button class="option-btn" data-style="question">Question</button>
<button class="option-btn" data-style="power">Power Words</button>
<button class="option-btn" data-style="numbers">Numbers</button>
</div>
<button onclick="generateHeadlines()">Generate Headlines</button>
<button class="btn-secondary" onclick="copyOutput()">Copy All</button>
<div class="output" id="output">Headlines will appear here...</div>
\`;
let style = 'listicle';
document.querySelectorAll('.option-btn').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    style = b.dataset.style;
  };
});
function generateHeadlines() {
  const topic = document.getElementById('topic').value.trim();
  if (!topic) return;
  const T = topic.charAt(0).toUpperCase() + topic.slice(1);
  const t = topic.toLowerCase();
  const templates = {
    listicle: [\`10 \${T} Tips That Actually Work in 2026\`,\`7 \${T} Secrets Nobody Tells You\`,\`15 Best \${T} Strategies for Beginners\`,\`5 \${T} Mistakes You're Probably Making\`,\`12 Proven \${T} Techniques from Experts\`,\`8 \${T} Hacks That Will Change Your Life\`,\`21 \${T} Ideas You Need to Try Today\`,\`6 \${T} Trends Dominating Right Now\`],
    howto: [\`How to Master \${T} in 30 Days\`,\`The Complete Guide to \${T} (2026)\`,\`How to \${T}: A Step-by-Step Guide\`,\`\${T} for Beginners: Everything You Need to Know\`,\`How to Get Started with \${T} Today\`,\`The Ultimate \${T} Tutorial for 2026\`,\`How I Improved My \${T} by 300%\`,\`How to \${T} Like a Pro\`],
    question: [\`Is \${T} Worth It? Here's What the Data Says\`,\`What Makes \${T} So Effective?\`,\`Why Is Everyone Talking About \${T}?\`,\`Does \${T} Actually Work? We Tested It\`,\`What's the Best Way to Approach \${T}?\`,\`Why \${T} Matters More Than You Think\`,\`Can \${T} Really Change Your Life?\`,\`What Experts Won't Tell You About \${T}\`],
    power: [\`The Shocking Truth About \${T}\`,\`\${T}: The Ultimate Guide You'll Ever Need\`,\`Explosive \${T} Strategies That Guarantee Results\`,\`The Secret \${T} Formula Top Performers Use\`,\`Unleash the Power of \${T} Today\`,\`Revolutionary \${T} Methods That Actually Deliver\`,\`The Untold Story of \${T}\`,\`Breakthrough \${T} Techniques Revealed\`],
    numbers: [\`\${T}: 47% of People Get This Wrong\`,\`I Spent 1,000 Hours on \${T}. Here's What I Learned\`,\`\${T}: From $0 to $10,000 in 90 Days\`,\`The 80/20 Rule of \${T}\`,\`\${T} Results: A 5-Year Case Study\`,\`How \${T} Increased My Productivity by 200%\`,\`The $1 Million \${T} Strategy\`,\`30-Day \${T} Challenge: Real Results\`]
  };
  document.getElementById('output').textContent = templates[style].map((h,i) => (i+1)+'. '+h).join('\\n\\n');
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'email-writer': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<input type="text" id="recipient" placeholder="Recipient name (e.g., John, Hiring Manager)">
<input type="text" id="subject" placeholder="Email subject or purpose...">
<div class="options">
<button class="option-btn active" data-type="professional">Professional</button>
<button class="option-btn" data-type="followup">Follow-Up</button>
<button class="option-btn" data-type="cold">Cold Outreach</button>
<button class="option-btn" data-type="thankyou">Thank You</button>
<button class="option-btn" data-type="apology">Apology</button>
</div>
<button onclick="writeEmail()">Generate Email</button>
<button class="btn-secondary" onclick="copyOutput()">Copy Email</button>
<div class="output" id="output">Your email will appear here...</div>
\`;
let emailType = 'professional';
document.querySelectorAll('.option-btn').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    emailType = b.dataset.type;
  };
});
function writeEmail() {
  const name = document.getElementById('recipient').value.trim() || 'there';
  const subject = document.getElementById('subject').value.trim() || 'your inquiry';
  const emails = {
    professional: \`Subject: Re: \${subject}\\n\\nDear \${name},\\n\\nI hope this email finds you well. I am writing to you regarding \${subject}.\\n\\nI would like to discuss this matter further at your earliest convenience. Please find the relevant details below:\\n\\n• [Key Point 1]\\n• [Key Point 2]\\n• [Key Point 3]\\n\\nI believe this would be mutually beneficial and look forward to hearing your thoughts.\\n\\nPlease don't hesitate to reach out if you have any questions or need additional information.\\n\\nBest regards,\\n[Your Name]\\n[Your Title]\\n[Your Contact Information]\`,
    followup: \`Subject: Following Up — \${subject}\\n\\nHi \${name},\\n\\nI wanted to follow up on our previous conversation regarding \${subject}. I understand you're busy, so I'll keep this brief.\\n\\nTo recap the key points we discussed:\\n\\n• [Point 1]\\n• [Point 2]\\n\\nI'm very interested in moving forward and would love to schedule a quick call this week to discuss next steps.\\n\\nWould [suggest a specific day/time] work for you?\\n\\nLooking forward to hearing from you.\\n\\nBest,\\n[Your Name]\`,
    cold: \`Subject: Quick Question About \${subject}\\n\\nHi \${name},\\n\\nI came across your [company/profile/work] and was genuinely impressed by [specific detail].\\n\\nI'm reaching out because \${subject}, and I think there could be a great opportunity for us to [collaborate/help/connect].\\n\\nHere's why this might interest you:\\n\\n• [Benefit 1 — make it about them]\\n• [Benefit 2 — show value]\\n• [Social proof — who else you've worked with]\\n\\nWould you be open to a quick 15-minute call this week? No pressure at all — just a friendly conversation.\\n\\nCheers,\\n[Your Name]\\n[Your one-line credential]\`,
    thankyou: \`Subject: Thank You — \${subject}\\n\\nDear \${name},\\n\\nI wanted to take a moment to express my sincere gratitude for \${subject}. Your [time/help/generosity/insight] truly made a difference.\\n\\nI particularly appreciated:\\n\\n• [Specific thing #1]\\n• [Specific thing #2]\\n\\nYour [support/guidance] has been invaluable, and I look forward to [future interaction/collaboration].\\n\\nThank you once again. Please don't hesitate to reach out if there's ever anything I can do for you.\\n\\nWith appreciation,\\n[Your Name]\`,
    apology: \`Subject: My Apologies — \${subject}\\n\\nDear \${name},\\n\\nI am writing to sincerely apologize regarding \${subject}. I take full responsibility for [the situation/my actions].\\n\\nI understand this has caused [inconvenience/frustration/concern], and that was never my intention.\\n\\nHere's what I'm doing to make this right:\\n\\n• [Corrective action 1]\\n• [Corrective action 2]\\n• [Prevention measure]\\n\\nI value our [relationship/partnership] greatly and am committed to ensuring this doesn't happen again.\\n\\nPlease let me know if there's anything else I can do. I appreciate your understanding.\\n\\nSincerely,\\n[Your Name]\`
  };
  document.getElementById('output').textContent = emails[emailType];
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'readability-checker': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste your text to check readability..." oninput="checkRead()"></textarea>
<div class="stats" id="stats"></div>
<div class="output" id="output">Readability scores will appear here as you type...</div>
\`;
function checkRead() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  const words = text.split(/\\s+/).filter(w => w.length > 0);
  const sentences = (text.match(/[.!?]+/g) || ['']).length || 1;
  const syllables = words.reduce((total, word) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return total + 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syl = word.match(/[aeiouy]{1,2}/g);
    return total + (syl ? syl.length : 1);
  }, 0);
  const complexWords = words.filter(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length <= 3) return false;
    let c = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
    const s = c.match(/[aeiouy]{1,2}/g);
    return s && s.length >= 3;
  }).length;
  const ASL = words.length / sentences;
  const ASW = syllables / words.length;
  const flesch = (206.835 - 1.015 * ASL - 84.6 * ASW).toFixed(1);
  const fkGrade = (0.39 * ASL + 11.8 * ASW - 15.59).toFixed(1);
  const gunningFog = (0.4 * (ASL + 100 * complexWords / words.length)).toFixed(1);
  const chars = text.replace(/[^a-z]/gi, '').length;
  const colemanLiau = (0.0588 * (chars / words.length * 100) - 0.296 * (sentences / words.length * 100) - 15.8).toFixed(1);
  let level = 'Very Easy';
  if (flesch < 30) level = 'Very Difficult (College Graduate)';
  else if (flesch < 50) level = 'Difficult (College)';
  else if (flesch < 60) level = 'Fairly Difficult (10th-12th Grade)';
  else if (flesch < 70) level = 'Standard (8th-9th Grade)';
  else if (flesch < 80) level = 'Fairly Easy (7th Grade)';
  else if (flesch < 90) level = 'Easy (6th Grade)';
  else level = 'Very Easy (5th Grade)';
  document.getElementById('stats').innerHTML = \`
    <div class="stat"><div class="num" style="color:\${flesch > 60 ? 'var(--success)' : flesch > 40 ? '#eab308' : '#ef4444'}">\${flesch}</div><div class="label">Flesch Score</div></div>
    <div class="stat"><div class="num">\${fkGrade}</div><div class="label">FK Grade Level</div></div>
    <div class="stat"><div class="num">\${gunningFog}</div><div class="label">Gunning Fog</div></div>
    <div class="stat"><div class="num">\${colemanLiau}</div><div class="label">Coleman-Liau</div></div>
  \`;
  document.getElementById('output').textContent = 'Reading Level: ' + level + '\\n\\nDetails:\\n• Average Sentence Length: ' + ASL.toFixed(1) + ' words\\n• Average Syllables per Word: ' + ASW.toFixed(1) + '\\n• Complex Words: ' + complexWords + ' (' + (complexWords/words.length*100).toFixed(1) + '%)\\n• Total Words: ' + words.length + '\\n• Total Sentences: ' + sentences;
}`,
    'case-converter': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Type or paste text to convert..."></textarea>
<div class="options" style="flex-wrap:wrap">
<button class="option-btn" onclick="convert('upper')">UPPERCASE</button>
<button class="option-btn" onclick="convert('lower')">lowercase</button>
<button class="option-btn" onclick="convert('title')">Title Case</button>
<button class="option-btn" onclick="convert('sentence')">Sentence case</button>
<button class="option-btn" onclick="convert('camel')">camelCase</button>
<button class="option-btn" onclick="convert('snake')">snake_case</button>
<button class="option-btn" onclick="convert('kebab')">kebab-case</button>
<button class="option-btn" onclick="convert('pascal')">PascalCase</button>
<button class="option-btn" onclick="convert('dot')">dot.case</button>
<button class="option-btn" onclick="convert('toggle')">tOGGLE</button>
</div>
<button class="btn-secondary" onclick="copyOutput()">Copy Result</button>
<div class="output" id="output">Converted text will appear here...</div>
\`;
function convert(type) {
  const text = document.getElementById('input').value;
  if (!text) return;
  let result;
  const words = text.replace(/[_\\-\\.]/g, ' ').split(/\\s+/).filter(w => w);
  switch(type) {
    case 'upper': result = text.toUpperCase(); break;
    case 'lower': result = text.toLowerCase(); break;
    case 'title': result = text.replace(/\\b\\w/g, c => c.toUpperCase()); break;
    case 'sentence': result = text.toLowerCase().replace(/(^|[.!?]\\s+)([a-z])/g, (m,p,c) => p+c.toUpperCase()); break;
    case 'camel': result = words.map((w,i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(''); break;
    case 'snake': result = words.map(w => w.toLowerCase()).join('_'); break;
    case 'kebab': result = words.map(w => w.toLowerCase()).join('-'); break;
    case 'pascal': result = words.map(w => w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(''); break;
    case 'dot': result = words.map(w => w.toLowerCase()).join('.'); break;
    case 'toggle': result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
  }
  document.getElementById('output').textContent = result;
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'text-to-speech': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Enter text to convert to speech..."></textarea>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin:8px 0">
<select id="voice" style="flex:1;min-width:150px"><option>Loading voices...</option></select>
<select id="rate" style="width:100px">
<option value="0.5">0.5x</option><option value="0.75">0.75x</option><option value="1" selected>1x</option><option value="1.25">1.25x</option><option value="1.5">1.5x</option><option value="2">2x</option>
</select>
</div>
<button onclick="speak()">🔊 Speak</button>
<button class="btn-secondary" onclick="stopSpeech()">⏹ Stop</button>
<button class="btn-success" onclick="pauseResume()" id="pauseBtn">⏸ Pause</button>
<div class="output" id="output">Click "Speak" to hear your text read aloud.\\n\\nNote: Uses your browser's built-in speech synthesis. Available voices depend on your device and browser.</div>
\`;
let voices = [];
function loadVoices() {
  voices = speechSynthesis.getVoices();
  const sel = document.getElementById('voice');
  sel.innerHTML = voices.map((v,i) => '<option value="'+i+'">' + v.name + ' (' + v.lang + ')' + (v.default ? ' — DEFAULT' : '') + '</option>').join('');
}
loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;
function speak() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const vi = document.getElementById('voice').value;
  if (voices[vi]) utter.voice = voices[vi];
  utter.rate = parseFloat(document.getElementById('rate').value);
  utter.onstart = () => document.getElementById('output').textContent = 'Speaking...';
  utter.onend = () => document.getElementById('output').textContent = 'Finished speaking.';
  speechSynthesis.speak(utter);
}
function stopSpeech() { speechSynthesis.cancel(); document.getElementById('output').textContent = 'Stopped.'; }
function pauseResume() {
  if (speechSynthesis.paused) { speechSynthesis.resume(); document.getElementById('pauseBtn').textContent = '⏸ Pause'; }
  else { speechSynthesis.pause(); document.getElementById('pauseBtn').textContent = '▶ Resume'; }
}`,
    'citation-generator': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<div class="options">
<button class="option-btn active" data-fmt="apa">APA 7th</button>
<button class="option-btn" data-fmt="mla">MLA 9th</button>
<button class="option-btn" data-fmt="chicago">Chicago</button>
<button class="option-btn" data-fmt="harvard">Harvard</button>
</div>
<div class="options" style="margin-bottom:12px">
<button class="option-btn active" data-src="website">Website</button>
<button class="option-btn" data-src="book">Book</button>
<button class="option-btn" data-src="journal">Journal</button>
</div>
<div id="fields"></div>
<button onclick="generateCitation()">Generate Citation</button>
<button class="btn-secondary" onclick="copyOutput()">Copy</button>
<div class="output" id="output">Your citation will appear here...</div>
\`;
let fmt = 'apa', src = 'website';
document.querySelectorAll('[data-fmt]').forEach(b => {
  b.onclick = () => { document.querySelectorAll('[data-fmt]').forEach(x => x.classList.remove('active')); b.classList.add('active'); fmt = b.dataset.fmt; renderFields(); };
});
document.querySelectorAll('[data-src]').forEach(b => {
  b.onclick = () => { document.querySelectorAll('[data-src]').forEach(x => x.classList.remove('active')); b.classList.add('active'); src = b.dataset.src; renderFields(); };
});
function renderFields() {
  const f = document.getElementById('fields');
  const common = '<input type="text" id="author" placeholder="Author (Last, First)"><input type="text" id="year" placeholder="Year (e.g., 2026)"><input type="text" id="title" placeholder="Title">';
  if (src === 'website') f.innerHTML = common + '<input type="text" id="siteName" placeholder="Website Name"><input type="text" id="url" placeholder="URL">';
  else if (src === 'book') f.innerHTML = common + '<input type="text" id="publisher" placeholder="Publisher"><input type="text" id="edition" placeholder="Edition (optional)">';
  else f.innerHTML = common + '<input type="text" id="journal" placeholder="Journal Name"><input type="text" id="volume" placeholder="Volume(Issue)"><input type="text" id="pages" placeholder="Pages (e.g., 1-15)"><input type="text" id="doi" placeholder="DOI">';
}
renderFields();
function g(id) { return (document.getElementById(id) || {}).value || ''; }
function generateCitation() {
  const author = g('author') || 'Author'; const year = g('year') || 'n.d.'; const title = g('title') || 'Title';
  let cite = '';
  if (src === 'website') {
    const site = g('siteName'); const url = g('url');
    if (fmt === 'apa') cite = author + ' (' + year + '). ' + title + '. ' + (site ? site + '. ' : '') + (url ? url : '');
    else if (fmt === 'mla') cite = author + '. "' + title + '." ' + (site ? site + ', ' : '') + year + ', ' + (url ? url : '') + '.';
    else if (fmt === 'chicago') cite = author + '. "' + title + '." ' + (site ? site + '. ' : '') + (url ? url : '') + '.';
    else cite = author + ' (' + year + ') ' + title + '. Available at: ' + (url ? url : '') + ' (Accessed: ' + new Date().toLocaleDateString() + ').';
  } else if (src === 'book') {
    const pub = g('publisher'); const ed = g('edition');
    if (fmt === 'apa') cite = author + ' (' + year + '). ' + title + (ed ? ' (' + ed + ' ed.)' : '') + '. ' + pub + '.';
    else if (fmt === 'mla') cite = author + '. ' + title + '. ' + (ed ? ed + ' ed., ' : '') + pub + ', ' + year + '.';
    else if (fmt === 'chicago') cite = author + '. ' + title + '. ' + (ed ? ed + ' ed. ' : '') + pub + ', ' + year + '.';
    else cite = author + ' (' + year + ') ' + title + '. ' + (ed ? ed + ' edn. ' : '') + pub + '.';
  } else {
    const j = g('journal'); const v = g('volume'); const p = g('pages'); const doi = g('doi');
    if (fmt === 'apa') cite = author + ' (' + year + '). ' + title + '. ' + j + ', ' + v + ', ' + p + '. ' + (doi ? 'https://doi.org/' + doi : '');
    else if (fmt === 'mla') cite = author + '. "' + title + '." ' + j + ', vol. ' + v + ', ' + year + ', pp. ' + p + '.';
    else if (fmt === 'chicago') cite = author + '. "' + title + '." ' + j + ' ' + v + ' (' + year + '): ' + p + '.';
    else cite = author + ' (' + year + ') "' + title + '", ' + j + ', ' + v + ', pp. ' + p + '. doi: ' + doi + '.';
  }
  document.getElementById('output').textContent = cite;
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'article-rewriter': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste the article you want to rewrite..."></textarea>
<div class="options">
<button class="option-btn active" data-mode="standard">Standard</button>
<button class="option-btn" data-mode="creative">Creative</button>
<button class="option-btn" data-mode="formal">Formal</button>
<button class="option-btn" data-mode="simple">Simplify</button>
</div>
<button onclick="rewrite()">Rewrite Article</button>
<button class="btn-secondary" onclick="copyOutput()">Copy</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Rewritten article will appear here...</div>
\`;
let rwMode = 'standard';
document.querySelectorAll('.option-btn').forEach(b => { b.onclick = () => { document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); rwMode = b.dataset.mode; }; });
const syns = {important:'significant',good:'excellent',bad:'poor',help:'assist',use:'utilize',make:'create',show:'demonstrate',get:'obtain',give:'provide',big:'substantial',small:'modest',many:'numerous',few:'several',old:'previous',new:'recent',fast:'rapid',slow:'gradual',hard:'challenging',easy:'straightforward',think:'consider',said:'stated',told:'informed',asked:'inquired',went:'proceeded',came:'arrived',took:'acquired',gave:'provided',made:'produced',found:'discovered',saw:'observed',knew:'understood',got:'obtained',put:'placed',ran:'operated',set:'established',tried:'attempted',used:'employed',called:'designated',kept:'maintained',let:'permitted',began:'commenced',seemed:'appeared',left:'departed',brought:'delivered',held:'maintained',stood:'remained',lost:'forfeited',paid:'compensated',met:'encountered',continued:'persisted',started:'initiated',needed:'required',wanted:'desired',believed:'maintained',turned:'shifted'};
function rewrite() {
  const text = document.getElementById('input').value.trim();
  if (!text) return;
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const result = sentences.map(s => {
    let words = s.split(/\\s+/);
    words = words.map(w => {
      const lower = w.toLowerCase().replace(/[^a-z]/g, '');
      const punct = w.match(/[^a-zA-Z]+$/) ? w.match(/[^a-zA-Z]+$/)[0] : '';
      const pre = w.match(/^[^a-zA-Z]+/) ? w.match(/^[^a-zA-Z]+/)[0] : '';
      if (syns[lower]) {
        let rep = syns[lower];
        if (w[0] === w[0].toUpperCase()) rep = rep[0].toUpperCase() + rep.slice(1);
        return pre + rep + punct;
      }
      return w;
    });
    let out = words.join(' ');
    if (rwMode === 'formal') out = out.replace(/don't/gi,'do not').replace(/can't/gi,'cannot').replace(/won't/gi,'will not').replace(/it's/gi,'it is');
    if (rwMode === 'simple') {
      out = out.replace(/utilize/gi,'use').replace(/commence/gi,'start').replace(/terminate/gi,'end').replace(/endeavor/gi,'try').replace(/subsequently/gi,'then');
      words = out.split(/\\s+/).filter(w => !['furthermore','moreover','nevertheless','notwithstanding','consequently'].includes(w.toLowerCase().replace(/[^a-z]/g,'')));
      out = words.join(' ');
    }
    return out;
  }).join(' ');
  const origWords = text.split(/\\s+/).length;
  const newWords = result.split(/\\s+/).length;
  document.getElementById('stats').innerHTML = \`<div class="stat"><div class="num">\${origWords}</div><div class="label">Original</div></div><div class="stat"><div class="num">\${newWords}</div><div class="label">Rewritten</div></div>\`;
  document.getElementById('output').textContent = result;
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'meta-description-generator': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<input type="text" id="page" placeholder="Page title or topic...">
<input type="text" id="keywords" placeholder="Target keywords (comma separated)">
<div class="options">
<button class="option-btn active" data-tone="professional">Professional</button>
<button class="option-btn" data-tone="engaging">Engaging</button>
<button class="option-btn" data-tone="action">Action-Oriented</button>
</div>
<button onclick="generateMeta()">Generate Descriptions</button>
<button class="btn-secondary" onclick="copyOutput()">Copy All</button>
<div class="output" id="output">Meta descriptions will appear here...</div>
\`;
let metaTone = 'professional';
document.querySelectorAll('.option-btn').forEach(b => { b.onclick = () => { document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); metaTone = b.dataset.tone; }; });
function generateMeta() {
  const page = document.getElementById('page').value.trim() || 'Your Page';
  const kw = document.getElementById('keywords').value.trim();
  const kwList = kw ? kw.split(',').map(k => k.trim()) : [];
  const kwStr = kwList.length > 0 ? kwList[0] : page.toLowerCase();
  const templates = {
    professional: [
      'Learn everything about '+page+'. Comprehensive guide covering '+kwStr+' with expert insights and actionable tips. Updated for 2026.',
      'Discover the best '+kwStr+' solutions. Our detailed guide to '+page+' helps you make informed decisions. Read more.',
      page+' — your complete resource for '+kwStr+'. Expert analysis, proven strategies, and real-world examples.',
      'Looking for reliable '+kwStr+' information? Our '+page+' guide provides thorough coverage backed by data and expertise.'
    ],
    engaging: [
      '🔥 '+page+' — everything you need to know about '+kwStr+'! Don\\'t miss these game-changing insights.',
      'Want to master '+kwStr+'? This '+page+' guide reveals secrets that 90% of people miss. Check it out!',
      'The ultimate '+page+' resource is here! Discover why thousands trust our '+kwStr+' guide. Updated 2026.',
      'Stop searching — we\\'ve compiled the BEST '+kwStr+' guide. '+page+' made simple and actionable.'
    ],
    action: [
      'Get started with '+kwStr+' today. Our '+page+' guide shows you exactly how, step by step. Start now →',
      'Transform your approach to '+kwStr+'. Read our '+page+' guide and implement proven strategies today.',
      'Take action on '+kwStr+' — our '+page+' guide gives you the tools and knowledge. Start for free.',
      'Ready to improve your '+kwStr+'? '+page+' has everything you need. Get started in 5 minutes.'
    ]
  };
  const descs = templates[metaTone];
  document.getElementById('output').textContent = descs.map((d, i) => {
    const len = d.length;
    const status = len >= 120 && len <= 160 ? '✅ Perfect' : len < 120 ? '⚠️ Short' : '⚠️ Long';
    return 'Option ' + (i+1) + ' (' + len + ' chars — ' + status + '):\\n' + d;
  }).join('\\n\\n');
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'keyword-density-checker': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Paste your content to analyze keyword density..." oninput="analyze()"></textarea>
<input type="text" id="target" placeholder="Target keyword (optional — leave blank for auto-analysis)">
<button onclick="analyze()">Analyze</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Keyword analysis will appear here...</div>
\`;
function analyze() {
  const text = document.getElementById('input').value.trim();
  const target = document.getElementById('target').value.trim().toLowerCase();
  if (!text) return;
  const words = text.toLowerCase().replace(/[^a-z\\s]/g,'').split(/\\s+/).filter(w => w.length > 2);
  const stopWords = new Set(['the','and','for','are','but','not','you','all','any','can','her','was','one','our','out','had','has','his','how','its','may','new','now','old','see','way','who','did','get','let','say','she','too','use','been','call','come','each','find','from','have','here','high','into','just','know','last','like','long','look','made','make','many','more','most','much','must','name','over','part','some','such','take','than','that','them','then','this','time','very','what','when','will','with','work','year','your','also','back','been','both','city','could','down','even','first','give','good','great','help','keep','large','last','late','life','line','live','long','move','need','next','only','open','play','real','same','seem','show','side','small','still','tell','turn','under','want','well','went','were','what','when','where','which','while','work','world','would','write','about','after','again','being','below','between','could','every','found','going','great','house','large','later','learn','never','other','place','plant','point','right','shall','since','small','sound','still','study','their','there','these','thing','think','those','three','today','under','until','water','where','which','while','whole','would','write','young']);
  const freq = {};
  words.filter(w => !stopWords.has(w)).forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  const totalWords = words.length;
  if (target) {
    const count = (text.toLowerCase().match(new RegExp('\\\\b' + target.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&') + '\\\\b', 'g')) || []).length;
    const density = (count / totalWords * 100).toFixed(2);
    const status = density >= 1 && density <= 3 ? '✅ Optimal' : density < 1 ? '⚠️ Too Low' : '⚠️ Too High (risk of keyword stuffing)';
    document.getElementById('stats').innerHTML = \`
      <div class="stat"><div class="num">\${count}</div><div class="label">Occurrences</div></div>
      <div class="stat"><div class="num">\${density}%</div><div class="label">Density</div></div>
      <div class="stat"><div class="num">\${totalWords}</div><div class="label">Total Words</div></div>
    \`;
    document.getElementById('output').textContent = 'Target: "' + target + '"\\nDensity: ' + density + '% — ' + status + '\\n\\nRecommended: 1-3% for primary keywords, 0.5-1% for secondary keywords.';
  } else {
    const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]).slice(0, 20);
    document.getElementById('stats').innerHTML = \`<div class="stat"><div class="num">\${totalWords}</div><div class="label">Total Words</div></div><div class="stat"><div class="num">\${Object.keys(freq).length}</div><div class="label">Unique Keywords</div></div>\`;
    document.getElementById('output').textContent = 'Top Keywords by Density:\\n\\n' + sorted.map(([w, c]) => w + ': ' + c + ' times (' + (c/totalWords*100).toFixed(2) + '%)').join('\\n');
  }
}`,
    'bio-generator': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<input type="text" id="name" placeholder="Your name">
<input type="text" id="role" placeholder="Your role/profession (e.g., Software Engineer, Photographer)">
<input type="text" id="interests" placeholder="Interests/hobbies (comma separated)">
<div class="options">
<button class="option-btn active" data-platform="instagram">Instagram</button>
<button class="option-btn" data-platform="twitter">Twitter/X</button>
<button class="option-btn" data-platform="linkedin">LinkedIn</button>
<button class="option-btn" data-platform="tiktok">TikTok</button>
</div>
<button onclick="generateBio()">Generate Bios</button>
<button class="btn-secondary" onclick="copyOutput()">Copy All</button>
<div class="output" id="output">Your bios will appear here...</div>
\`;
let platform = 'instagram';
document.querySelectorAll('.option-btn').forEach(b => { b.onclick = () => { document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); platform = b.dataset.platform; }; });
function generateBio() {
  const name = document.getElementById('name').value.trim() || 'Creative';
  const role = document.getElementById('role').value.trim() || 'Creator';
  const interests = document.getElementById('interests').value.trim().split(',').map(i => i.trim()).filter(i => i);
  const emoji1 = ['✨','🚀','💡','🎯','⚡','🔥','💫','🌟'][Math.floor(Math.random()*8)];
  const emoji2 = ['📍','🎨','💪','🌍','❤️','🎵','📸','🖤'][Math.floor(Math.random()*8)];
  const bios = {
    instagram: [
      emoji1 + ' ' + role + '\\n' + (interests[0] ? '❤️ ' + interests[0] : '') + (interests[1] ? ' | ' + interests[1] : '') + '\\n📍 Making things happen\\n👇 Check out my latest',
      role + ' by day ' + emoji1 + '\\n' + interests.slice(0,2).join(' • ') + '\\n' + emoji2 + ' Living life one post at a time\\n🔗 Link below',
      '🌟 ' + name + ' | ' + role + '\\n' + interests.slice(0,3).map(i => '• ' + i).join('\\n') + '\\n📩 DM for collabs',
      emoji1 + ' ' + role + ' | ' + name + '\\n💭 ' + (interests[0] || 'Creating') + ' enthusiast\\n🌍 Based in [Your City]\\n⬇️ Latest project'
    ],
    twitter: [
      role + '. ' + interests.slice(0,2).join(', ') + '. Opinions are mine. ' + emoji1,
      name + ' | ' + role + ' | ' + interests.slice(0,2).join(' & ') + ' | Building in public ' + emoji1,
      role + ' ' + emoji1 + ' | Tweeting about ' + (interests[0] || 'stuff') + ' | ' + (interests[1] || 'life') + ' | DMs open',
      'Just a ' + role.toLowerCase() + ' who loves ' + interests.slice(0,2).join(' and ') + '. ' + emoji1 + ' Let\\'s connect.'
    ],
    linkedin: [
      role + ' with a passion for ' + interests.slice(0,2).join(' and ') + '. Helping organizations achieve their goals through innovative solutions. Let\\'s connect!',
      name + ' | ' + role + '\\n\\n' + emoji1 + ' Passionate about ' + (interests[0] || 'innovation') + '\\n💼 Experienced in ' + (interests[1] || 'leadership') + '\\n🤝 Open to opportunities and collaborations',
      'Experienced ' + role + ' specializing in ' + interests.slice(0,3).join(', ') + '. Committed to driving results and making an impact. Always learning, always growing.',
      role + ' | ' + interests.slice(0,2).join(' | ') + '\\n\\nI help [target audience] achieve [result] through [method]. Let\\'s talk!'
    ],
    tiktok: [
      emoji1 + ' ' + role + '\\n🎬 ' + (interests[0] || 'Content') + ' creator\\n' + emoji2 + ' Follow for daily ' + (interests[1] || 'tips') + '\\n📩 Biz: [email]',
      name + ' ' + emoji1 + '\\n' + role + ' | ' + interests.slice(0,2).join(' | ') + '\\n🎯 New videos every week',
      emoji1 + ' Your favorite ' + role.toLowerCase() + '\\n💫 ' + interests.slice(0,2).join(' + ') + '\\n👆 Watch my latest',
      role + ' ' + emoji1 + ' ' + emoji2 + '\\nMaking ' + (interests[0] || 'content') + ' fun\\n🔔 Turn on notifications!'
    ]
  };
  document.getElementById('output').textContent = bios[platform].map((b, i) => 'Option ' + (i+1) + ':\\n' + b + '\\n(' + b.length + ' characters)').join('\\n\\n---\\n\\n');
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'hashtag-generator': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<input type="text" id="topic" placeholder="Enter your topic or niche...">
<div class="options">
<button class="option-btn active" data-platform="instagram">Instagram</button>
<button class="option-btn" data-platform="twitter">Twitter/X</button>
<button class="option-btn" data-platform="tiktok">TikTok</button>
</div>
<button onclick="generateHashtags()">Generate Hashtags</button>
<button class="btn-secondary" onclick="copyOutput()">Copy All</button>
<div class="stats" id="stats"></div>
<div class="output" id="output">Hashtags will appear here...</div>
\`;
let htPlatform = 'instagram';
document.querySelectorAll('.option-btn').forEach(b => { b.onclick = () => { document.querySelectorAll('.option-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); htPlatform = b.dataset.platform; }; });
function generateHashtags() {
  const topic = document.getElementById('topic').value.trim().toLowerCase();
  if (!topic) return;
  const base = topic.replace(/[^a-z0-9]/g, '');
  const words = topic.split(/\\s+/);
  const tags = new Set();
  tags.add('#' + base);
  tags.add('#' + base + 'tips');
  tags.add('#' + base + '2026');
  tags.add('#' + base + 'life');
  tags.add('#' + base + 'lover');
  tags.add('#' + base + 'daily');
  tags.add('#' + base + 'community');
  tags.add('#' + base + 'goals');
  tags.add('#' + base + 'inspo');
  tags.add('#' + base + 'vibes');
  words.forEach(w => { if (w.length > 2) { tags.add('#' + w); tags.add('#' + w + 's'); }});
  const general = ['#trending','#viral','#explore','#fyp','#foryou','#instagood','#photooftheday','#love','#beautiful','#happy','#instadaily','#picoftheday','#follow','#style','#amazing','#lifestyle','#motivation','#inspiration','#goals','#success'];
  const niche = {
    food: ['#foodie','#foodporn','#instafood','#yummy','#cooking','#recipe','#homemade','#delicious'],
    fitness: ['#fitfam','#workout','#gym','#fitnessmotivation','#healthylifestyle','#training','#bodybuilding'],
    travel: ['#wanderlust','#travelgram','#adventure','#vacation','#travelphotography','#explore','#tourist'],
    fashion: ['#ootd','#fashionista','#streetstyle','#fashionblogger','#outfitoftheday','#stylish'],
    tech: ['#technology','#coding','#programming','#developer','#startup','#innovation','#ai','#software'],
    business: ['#entrepreneur','#hustle','#business','#marketing','#startup','#success','#money','#growth'],
    photography: ['#photography','#photographer','#photo','#camera','#lens','#portrait','#landscape']
  };
  Object.entries(niche).forEach(([key, htags]) => { if (topic.includes(key) || words.includes(key)) htags.forEach(h => tags.add(h)); });
  general.slice(0, 10).forEach(h => tags.add(h));
  const limit = htPlatform === 'instagram' ? 30 : htPlatform === 'tiktok' ? 15 : 5;
  const finalTags = [...tags].slice(0, limit);
  document.getElementById('stats').innerHTML = \`<div class="stat"><div class="num">\${finalTags.length}</div><div class="label">Hashtags</div></div><div class="stat"><div class="num">\${limit}</div><div class="label">Recommended Max</div></div>\`;
  document.getElementById('output').textContent = finalTags.join(' ') + '\\n\\n--- Copy-friendly version ---\\n\\n' + finalTags.join('\\n');
}
function copyOutput() { navigator.clipboard.writeText(document.getElementById('output').textContent); }`,
    'text-compare': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
<div><label style="color:var(--muted);font-size:0.9em">Original Text</label><textarea id="text1" placeholder="Paste original text..." style="min-height:200px"></textarea></div>
<div><label style="color:var(--muted);font-size:0.9em">Modified Text</label><textarea id="text2" placeholder="Paste modified text..." style="min-height:200px"></textarea></div>
</div>
<button onclick="compare()">Compare Texts</button>
<div class="stats" id="stats"></div>
<div class="output" id="output" style="font-family:monospace;white-space:pre-wrap">Differences will be highlighted here...</div>
\`;
function compare() {
  const t1 = document.getElementById('text1').value; const t2 = document.getElementById('text2').value;
  if (!t1 && !t2) return;
  const lines1 = t1.split('\\n'); const lines2 = t2.split('\\n');
  const maxLines = Math.max(lines1.length, lines2.length);
  let added = 0, removed = 0, unchanged = 0;
  let result = '';
  for (let i = 0; i < maxLines; i++) {
    const l1 = lines1[i] !== undefined ? lines1[i] : null;
    const l2 = lines2[i] !== undefined ? lines2[i] : null;
    if (l1 === l2) { result += '  ' + (l1 || '') + '\\n'; unchanged++; }
    else {
      if (l1 !== null) { result += '- ' + l1 + '\\n'; removed++; }
      if (l2 !== null) { result += '+ ' + l2 + '\\n'; added++; }
    }
  }
  document.getElementById('stats').innerHTML = \`
    <div class="stat"><div class="num" style="color:var(--success)">\${added}</div><div class="label">Added</div></div>
    <div class="stat"><div class="num" style="color:#ef4444">\${removed}</div><div class="label">Removed</div></div>
    <div class="stat"><div class="num">\${unchanged}</div><div class="label">Unchanged</div></div>
    <div class="stat"><div class="num">\${maxLines}</div><div class="label">Total Lines</div></div>
  \`;
  document.getElementById('output').textContent = result;
}`,
    'sentence-counter': `
const container = document.getElementById('tool-container');
container.innerHTML = \`
<textarea id="input" placeholder="Type or paste text to count sentences..." oninput="countSentences()"></textarea>
<div class="stats" id="stats">
<div class="stat"><div class="num" id="sentCount">0</div><div class="label">Sentences</div></div>
<div class="stat"><div class="num" id="wordCount">0</div><div class="label">Words</div></div>
<div class="stat"><div class="num" id="avgLen">0</div><div class="label">Avg Words/Sentence</div></div>
<div class="stat"><div class="num" id="longest">0</div><div class="label">Longest Sentence</div></div>
<div class="stat"><div class="num" id="shortest">0</div><div class="label">Shortest Sentence</div></div>
</div>
<div class="output" id="output">Sentence breakdown will appear here...</div>
\`;
function countSentences() {
  const text = document.getElementById('input').value.trim();
  if (!text) { ['sentCount','wordCount','avgLen','longest','shortest'].forEach(id => document.getElementById(id).textContent = '0'); document.getElementById('output').textContent = ''; return; }
  const sentences = text.match(/[^.!?\\n]+[.!?]+/g) || text.split('\\n').filter(s => s.trim());
  const words = text.split(/\\s+/).filter(w => w).length;
  const lengths = sentences.map(s => s.trim().split(/\\s+/).filter(w => w).length);
  document.getElementById('sentCount').textContent = sentences.length;
  document.getElementById('wordCount').textContent = words;
  document.getElementById('avgLen').textContent = (words / sentences.length).toFixed(1);
  document.getElementById('longest').textContent = Math.max(...lengths) + ' words';
  document.getElementById('shortest').textContent = Math.min(...lengths) + ' words';
  document.getElementById('output').textContent = sentences.map((s, i) => 'Sentence ' + (i+1) + ' (' + lengths[i] + ' words): ' + s.trim()).join('\\n\\n');
}`
  };
  return scripts[tool.slug] || `document.getElementById('tool-container').innerHTML = '<p style="color:var(--muted)">Tool coming soon...</p>';`;
}

function generateIndex() {
  const grouped = {};
  tools.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${SITE_NAME} — Free AI Writing Tools Online</title>
<meta name="description" content="Free AI-powered writing tools: paraphraser, grammar checker, summarizer, plagiarism checker, and more. No signup required.">
<meta name="keywords" content="free writing tools, ai writing tools, paraphraser, grammar checker, text summarizer, plagiarism checker">
<link rel="canonical" href="${SITE_URL}/">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}" crossorigin="anonymous"></script>
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"WebSite","name":"${SITE_NAME}","url":"${SITE_URL}","description":"Free AI-powered writing tools online","potentialAction":{"@type":"SearchAction","target":"${SITE_URL}/?q={search_term_string}","query-input":"required name=search_term_string"}}
</script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#0f172a;--surface:#1e293b;--border:#334155;--text:#f1f5f9;--muted:#94a3b8;--accent:#3b82f6;--accent2:#8b5cf6}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
.container{max-width:1100px;margin:0 auto;padding:20px}
header{text-align:center;padding:50px 0 30px}
header h1{font-size:2.5em;margin-bottom:10px;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
header p{color:var(--muted);font-size:1.2em;max-width:600px;margin:0 auto}
.search{max-width:500px;margin:20px auto}
.search input{width:100%;padding:14px 20px;background:var(--surface);border:1px solid var(--border);border-radius:30px;color:var(--text);font-size:16px}
.category{margin:32px 0}
.category h2{color:var(--accent);font-size:1.3em;margin-bottom:16px;padding-left:8px;border-left:3px solid var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px;text-decoration:none;color:var(--text);transition:all .2s}
.card:hover{border-color:var(--accent);transform:translateY(-3px);box-shadow:0 8px 25px rgba(59,130,246,0.15)}
.card h3{font-size:1.1em;margin-bottom:6px}
.card p{color:var(--muted);font-size:0.9em;line-height:1.4}
.ad-slot{margin:20px 0;min-height:90px;text-align:center}
.sites{text-align:center;padding:30px 0;background:var(--surface);border-radius:12px;margin:30px 0}
.sites a{color:var(--accent);text-decoration:none;margin:0 12px;font-size:0.95em}
footer{text-align:center;padding:40px 0;color:var(--muted);border-top:1px solid var(--border);margin-top:40px}
footer a{color:var(--accent);text-decoration:none}
@media(max-width:600px){header h1{font-size:1.8em}.grid{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="container">
<header>
<h1>✍️ ${SITE_NAME}</h1>
<p>Free AI-powered writing tools. No signup, no limits. Just better writing.</p>
</header>
<div class="search"><input type="text" id="search" placeholder="🔍 Search tools..." oninput="filterTools()"></div>
${adSlot('top')}
${Object.entries(grouped).map(([cat, catTools]) => `
<div class="category" data-cat="${cat}">
<h2>${cat}</h2>
<div class="grid">
${catTools.map(t => `<a href="${t.slug}.html" class="card" data-name="${t.title.toLowerCase()}"><h3>${t.title}</h3><p>${t.desc.substring(0, 100)}...</p></a>`).join('\n')}
</div>
</div>`).join('\n')}
${adSlot('mid')}
<div class="sites">
<p style="color:var(--muted);margin-bottom:8px">More Free Tools:</p>
<a href="https://alexchalu.github.io/toolpulse/">🔧 ToolPulse — Dev Tools</a>
<a href="https://alexchalu.github.io/smartcalc/">🧮 SmartCalc — Finance Calculators</a>
</div>
${adSlot('bottom')}
<footer>
<p>${SITE_NAME} — Free AI Writing Tools</p>
<p style="margin-top:8px">© 2026 ${SITE_NAME}. All tools are free to use.</p>
</footer>
</div>
<script>
function filterTools() {
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.card').forEach(c => {
    c.style.display = c.dataset.name.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('.category').forEach(cat => {
    const visible = cat.querySelectorAll('.card[style=""], .card:not([style])');
    cat.style.display = visible.length === 0 && q ? 'none' : '';
  });
}
</script>
</body>
</html>`;
}

function generateSitemap() {
  const urls = [SITE_URL + '/'];
  tools.forEach(t => urls.push(SITE_URL + '/' + t.slug + '.html'));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u.endsWith('/') ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`;
}

// Build everything
console.log('Building ' + SITE_NAME + '...');

fs.writeFileSync('index.html', generateIndex());
console.log('✅ index.html');

tools.forEach(t => {
  fs.writeFileSync(t.slug + '.html', generateToolPage(t));
  console.log('✅ ' + t.slug + '.html');
});

fs.writeFileSync('sitemap.xml', generateSitemap());
console.log('✅ sitemap.xml');

fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml`);
console.log('✅ robots.txt');

console.log('\n🎉 Built ' + tools.length + ' tool pages + index + sitemap');
