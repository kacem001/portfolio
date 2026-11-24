# Kacem El Amine Latrach — AI Engineer & Developer Portfolio 🚀

Personal portfolio website for **Kacem El Amine Latrach** — AI Engineering student at Badji-Mokhtar Annaba University (Annaba, Algeria), specializing in Artificial Intelligence, Machine Learning, Biomedical NLP, Computer Vision, Web Development, and Telegram Automation Bots.

![Status](https://img.shields.io/badge/Status-Active-success)
![AI](https://img.shields.io/badge/Specialization-Artificial%20Intelligence-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)

## ✨ Featured Projects
- **Biomedical Named Entity Recognition**: Comparative NLP study on BC5CDR benchmark evaluating PubMedBERT (82.45% F1), BioLinkBERT, BiLSTM-CRF, and Mistral-7B, plus NeuroMed NER Flask app with Gemini Flash & OCR.
- **Facial Recognition**: Model comparison and benchmarking of deep neural network architectures with an interactive local testing app (`app.py` + web UI).
- **UniGrade**: Student grade calculator for Algerian universities with customizable TD/TP/Exam weights, JSON export/import, and localStorage. [Live Demo](https://unigrade-beta.vercel.app/)
- **Morsely**: Trilingual (EN, AR, FR) Telegram bot for bidirectional Morse code conversion and crypto donations.
- **Telegram Weather Bot**: Multilingual weather assistant powered by Open-Meteo, Nominatim, and SQLite preference persistence.
- **VibeLink**: Modern Linktree-style website hub. [Live Demo](https://vibelink.ai.studio/)

## ✨ Features

### 🎨 Core Sections

#### 1. **Homepage with 3D Hero Section**
- Interactive 3D particle system using Three.js
- Particles respond to mouse movement with smooth easing
- Dynamic particle connections creating a network effect
- Animated typing effect showcasing multiple roles
- Floating card elements with smooth animations
- Responsive scroll indicator

#### 2. **Projects Section**
- Advanced filtering system (All, Web Apps, Mobile, Design, 3D Graphics)
- Smooth filter transitions with staggered animations
- Hover effects revealing project details
- Modal windows with comprehensive project information
- Project cards with thumbnails, categories, and technology tags
- Detailed project descriptions and feature lists

#### 3. **Skills Section**
- Animated progress bars showing proficiency levels
- Smooth scroll-triggered animations
- Interactive technology cards
- Hover effects with tooltips
- Visual skill representation with modern design
- Technology icons with professional styling

#### 4. **About Page**
- Professional biography with animated content
- Animated timeline showcasing career journey
- Educational qualifications with icon cards
- Statistics counter (Projects, Clients, Experience)
- Professional profile image with decorative elements
- Scroll-triggered timeline animations

#### 5. **Contact Page**
- Fully functional contact form with real-time validation
- User-friendly error messages
- Success/error status feedback
- Social media integration buttons with tooltips
- Interactive Google Maps embed
- Contact information cards
- Professional email, phone, and location details

### 🎯 Advanced Features

#### Navigation
- Fixed navigation bar with scroll effects
- Smooth scroll behavior throughout the site
- Active section highlighting
- Responsive hamburger menu for mobile devices
- Glass-morphism effect with backdrop blur

#### Animations & Effects
- **Custom Cursor**: Interactive cursor following mouse movement
- **Loading Screen**: Smooth loading animation with fade-out effect
- **Page Transitions**: Fade-in effects for sections
- **Scroll Animations**: Elements animate as they enter viewport
- **Hover Effects**: Sophisticated hover states on interactive elements
- **Particle System**: 3D particle network in hero section
- **Progress Bars**: Animated skill progress indicators
- **Timeline Animation**: Scroll-triggered career timeline

#### Performance Optimizations
- Debounced and throttled event handlers
- Lazy loading for scroll animations
- Efficient particle rendering
- Optimized CSS animations
- Minimal DOM manipulations
- IntersectionObserver for scroll detection

#### Responsive Design
- Mobile-first approach
- Breakpoints: 1200px, 992px, 768px, 480px
- CSS Grid for flexible layouts
- Flexbox for component alignment
- Responsive typography
- Optimized for all screen sizes

## 🛠️ Technologies Used

### Core Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Advanced styling with variables, Grid, Flexbox
- **JavaScript (ES6+)**: Modern JavaScript with modules

### Libraries & Frameworks
- **Three.js (r128)**: 3D graphics and particle system
- **Font Awesome 6.4.0**: Icon library
- **Google Fonts**: Poppins & Playfair Display

### CSS Features
- CSS Grid & Flexbox
- CSS Variables (Custom Properties)
- CSS Animations & Transitions
- Backdrop Filter (Glass-morphism)
- CSS Gradients
- Media Queries

### JavaScript Features
- ES6+ Syntax
- Intersection Observer API
- Custom Event Handlers
- Form Validation
- DOM Manipulation
- Animation Frame API

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML file with all sections
├── css/
│   └── style.css          # Comprehensive styles with animations
├── js/
│   ├── particles.js       # 3D particle system (Three.js)
│   └── main.js           # Main JavaScript functionality
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required
- Works with local file system or any web server

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Open the Website**
   
   **Option A: Direct File Access**
   - Simply open `index.html` in your web browser
   
   **Option B: Local Server (Recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   
   Then navigate to `http://localhost:8000`

### Customization

#### 1. **Personal Information**
Edit `index.html` to update:
- Name and title in hero section
- Project details and images
- Skills and proficiency levels
- Career timeline
- Education information
- Contact details

#### 2. **Color Scheme**
Modify CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --accent-color: #14b8a6;
    /* ... more colors */
}
```

#### 3. **Content**
- Update project images with your own
- Modify project descriptions
- Add your social media links
- Update contact form submission endpoint

#### 4. **Particle Effects**
Adjust particle settings in `js/particles.js`:
```javascript
const CONFIG = {
    particleCount: 100,
    particleSize: 2,
    particleColor: 0x6366f1,
    // ... more settings
};
```

## 🎨 Design Features

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Secondary**: Pink (#ec4899)
- **Accent**: Teal (#14b8a6)
- **Dark Background**: Navy (#0f172a, #020617)
- **Text**: Light gray shades for hierarchy

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Poppins (Sans-serif)
- **Weights**: 300, 400, 500, 600, 700

### Spacing System
- XS: 0.5rem (8px)
- SM: 1rem (16px)
- MD: 2rem (32px)
- LG: 4rem (64px)
- XL: 6rem (96px)

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

**Note**: Some features (backdrop-filter, custom cursor) may have limited support in older browsers.

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Reduced motion support via `prefers-reduced-motion`
- Sufficient color contrast ratios
- Alt text for images

## 🔧 Features Breakdown

### Contact Form Validation
- **Name**: 2-50 characters, letters and spaces only
- **Email**: Valid email format
- **Subject**: 5-100 characters
- **Message**: 10-500 characters
- Real-time validation feedback
- Visual error indicators

### Project Filtering
- Smooth transitions between categories
- Staggered animation effects
- All, Web Apps, Mobile, Design, 3D categories
- Maintains responsive grid layout

### Scroll Animations
- Intersection Observer for performance
- Threshold-based triggering
- Staggered animations for lists
- Smooth fade-in and slide-up effects

## 💡 Tips & Best Practices

### Performance
- Particle count can be adjusted for better performance on lower-end devices
- Animations automatically disabled when user prefers reduced motion
- Lazy loading implemented for off-screen elements
- Debounced scroll and resize handlers

### SEO Optimization
- Semantic HTML structure
- Meta descriptions
- Proper heading hierarchy
- Descriptive alt text
- Clean URL structure

### Mobile Optimization
- Touch-friendly interaction areas
- Responsive images
- Mobile-specific navigation
- Optimized viewport settings
- Custom cursor disabled on touch devices

## 🎯 Future Enhancements

Potential features to add:
- [ ] Dark/Light theme toggle
- [ ] Blog section with dynamic content
- [ ] Testimonials carousel
- [ ] Live chat integration
- [ ] Multi-language support
- [ ] Backend integration for contact form
- [ ] Analytics integration
- [ ] Progressive Web App (PWA) features
- [ ] Content Management System (CMS)
- [ ] Advanced SEO optimizations

## 📄 License

This project is available for personal and commercial use. Feel free to customize and deploy for your own portfolio.

## 👤 Author

**Alex Morgan**
- Portfolio: [Your Portfolio Link]
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
- Email: alex.morgan@portfolio.com

## 🙏 Acknowledgments

- **Three.js** for the amazing 3D graphics library
- **Font Awesome** for the comprehensive icon set
- **Google Fonts** for beautiful typography
- **Unsplash** for high-quality placeholder images
- The web development community for inspiration and resources

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure all files are properly linked
3. Verify browser compatibility
4. Check that JavaScript is enabled

For more help, feel free to reach out via the contact form or social media links.

---

**Made with ❤️ and lots of ☕**

*Last Updated: February 2026*
