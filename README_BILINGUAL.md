# 🌍 AIffinity Bilingual Website

## Language Configuration

### Structure
```
your-project/
├── index.html              ← English version (default)
├── nl/
│   └── index.html         ← Dutch version
├── css/
│   └── style.css          ← Shared styles
├── js/
│   ├── main.js            ← Shared functionality
│   └── language-switcher.js  ← Language toggle logic
└── images/
    └── wouter-bloupot.png
```

### URL Pattern
- **English (default)**: `https://yoursite.com/`
- **Dutch**: `https://yoursite.com/nl/`

### How Language Switching Works

#### 1. **Visual Toggle**
Both pages have a language toggle in the navigation bar:
```
NL | EN
```
- Active language is highlighted with cyan color
- Clicking switches between pages instantly

#### 2. **Smart Redirects**
The language switcher (`js/language-switcher.js`) handles:

**First Visit (No Preference Saved)**
- Detects browser language
- If browser is set to Dutch → redirects to `/nl/`
- If browser is any other language → stays on `/` (English)

**Returning Visit (Preference Saved)**
- Loads your last selected language automatically
- No flash or redirect on page load

**Manual Toggle Click**
- Saves preference to `localStorage`
- Redirects to corresponding language page

#### 3. **SEO Optimization**
Both pages have proper meta tags:

**English (`index.html`)**
```html
<html lang="en">
<meta name="description" content="AIffinity - Moving organizations from AI experimentation to AI infrastructure...">
<title>AIffinity - Intelligence Should Be Engineered</title>
```

**Dutch (`nl/index.html`)**
```html
<html lang="nl">
<meta name="description" content="AIffinity - Organisaties helpen van AI-experimentatie naar echte bedrijfswaarde...">
<title>AIffinity - Intelligentie Moet Worden Ontworpen</title>
```

### Content Translation Reference

#### Navigation
| English | Dutch |
|---------|-------|
| Why AIffinity | Waarom AIffinity |
| Services | Diensten |
| Approach | Aanpak |
| About Us | Over Ons |
| Get in Touch | Neem Contact Op |

#### Services Section
| English | Dutch |
|---------|-------|
| AI Fluency | AI Vaardigheid |
| AI Consulting | AI Consulting |
| AI Implementation | AI Implementatie |
| Building AI Teams | AI-teams Opbouwen |

#### Approach Steps
| English | Dutch |
|---------|-------|
| Diagnose | Diagnose |
| Define Opportunities | Kansen Definiëren |
| Execute Solutions | Oplossingen Uitvoeren |
| Enable & Scale | Enablen & Opschalen |

#### Contact Form
| English | Dutch |
|---------|-------|
| Your Name | Jouw Naam |
| Company | Bedrijf |
| Email Address | E-mailadres |
| Tell us about your AI challenges... | Vertel ons over je AI-uitdagingen... |
| Start the Conversation | Start het Gesprek |

### Deployment Instructions

#### Option 1: Netlify Drag & Drop
1. Go to https://app.netlify.com/drop
2. Drag the **entire project folder** (including `nl/` folder)
3. Netlify will automatically:
   - Deploy both language versions
   - Create URLs for both pages
   - Handle form submissions

#### Option 2: Netlify CLI
```bash
cd your-project
netlify deploy --prod
```

#### Option 3: GitHub + Netlify
1. Push to GitHub:
```bash
git add .
git commit -m "Add bilingual support"
git push
```
2. Connect Netlify to your repo
3. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`

### Testing Locally

**Python (Simple Server)**
```bash
cd your-project
python -m http.server 8000
```
Then visit:
- English: http://localhost:8000/
- Dutch: http://localhost:8000/nl/

**Node.js (http-server)**
```bash
npm install -g http-server
cd your-project
http-server -p 8000
```

### Adding More Languages (Future)

To add German, Spanish, etc.:

1. **Create language folder**
   ```
   mkdir de
   cp nl/index.html de/index.html
   ```

2. **Translate content** in `de/index.html`

3. **Update language switcher HTML** in ALL pages:
   ```html
   <div class="language-toggle">
       <button class="lang-btn" data-lang="nl">NL</button>
       <button class="lang-btn" data-lang="en">EN</button>
       <button class="lang-btn" data-lang="de">DE</button>
   </div>
   ```

4. **Update `js/language-switcher.js`** to handle new language

### Netlify Forms Configuration

Both language versions use the same form name (`contact`), so:
- **One form in Netlify dashboard** receives submissions from both languages
- **Language is NOT automatically tracked** in form data
- **To track language**: Add a hidden field to each version:

**English form:**
```html
<input type="hidden" name="language" value="English">
```

**Dutch form:**
```html
<input type="hidden" name="language" value="Dutch">
```

### Common Issues & Solutions

#### Issue: CSS/JS not loading on Dutch page
**Solution**: Verify relative paths in `nl/index.html`:
```html
<link rel="stylesheet" href="../css/style.css">
<script src="../js/main.js"></script>
<script src="../js/language-switcher.js"></script>
```

#### Issue: Images broken on Dutch page
**Solution**: Use parent directory path:
```html
<img src="../images/wouter-bloupot.png" alt="...">
```

#### Issue: Language doesn't save preference
**Solution**: Check localStorage in browser console:
```javascript
localStorage.getItem('preferred-language')
```

#### Issue: Both buttons show as active
**Solution**: Clear cache and hard refresh (Ctrl+Shift+R)

### Analytics & Tracking

To track language usage in Google Analytics:

**Add to both pages before `</head>`:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Add page language as custom dimension
  gtag('config', 'YOUR-GA-ID', {
    'page_language': 'en'  // Change to 'nl' in Dutch version
  });
</script>
```

### Performance

**Current Setup:**
- ✅ No duplicate CSS/JS files
- ✅ Shared resources (one CSS, one JS library set)
- ✅ Fast redirects (~100ms)
- ✅ No content flash (FOUT/FOIT)
- ✅ Minimal JavaScript overhead

**File Sizes:**
- `index.html`: ~15.9 KB
- `nl/index.html`: ~16.2 KB (slightly larger due to Dutch words)
- `css/style.css`: ~19.5 KB
- `js/main.js`: ~11.6 KB
- `js/language-switcher.js`: ~1.5 KB
- `images/wouter-bloupot.png`: ~2 MB

**Total Initial Load:**
- English: ~2.06 MB
- Dutch: ~2.06 MB (same resources, just different HTML)

### Maintenance Checklist

When updating content:

- [ ] Update both `index.html` AND `nl/index.html`
- [ ] Verify all internal links work on both pages
- [ ] Test language toggle on both pages
- [ ] Check mobile menu on both languages
- [ ] Test form submission on both pages
- [ ] Verify meta descriptions for SEO
- [ ] Test on localhost before deploying

---

## 🚀 Ready to Deploy!

Your bilingual website is fully configured and ready for Netlify deployment. The language switcher works automatically, and users can toggle between English and Dutch with one click.

**Quick Deploy:**
```bash
# Option 1: Drag project folder to netlify.com/drop
# Option 2: Use CLI
netlify deploy --prod
```

**Contact:** contact@aiffinity.nl
