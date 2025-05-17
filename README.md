# Modern 3D Corporate Website

A modern, responsive corporate website with dark theme, 3D elements, and loading animations built using HTML, CSS, and JavaScript.

## Features

- Modern dark theme design with 3D elements
- Responsive layout for all device sizes
- Interactive 3D particle backgrounds using Three.js
- Smooth animations and transitions using GSAP
- Loading screen with 3D cube animation
- Multiple pages with consistent design
- Portfolio with filtering functionality
- Interactive testimonial slider
- Contact form with validation
- FAQ accordions
- Parallax effects

## Pages

1. **Home** - Main landing page with hero section, features, about preview, testimonials, and CTA
2. **About** - Company information, team members, vision/mission, values, and timeline
3. **Services** - Detailed service offerings with descriptions and process information
4. **Portfolio** - Project showcase with filtering and modal details
5. **Contact** - Contact form, information, and office locations

## Technologies Used

- HTML5
- CSS3 (with custom variables and animations)
- JavaScript (ES6+)
- Three.js (for 3D backgrounds)
- GSAP (for animations)
- Font Awesome (for icons)
- Google Fonts

## How to Run

1. Clone or download this repository
2. Open the project folder in your code editor
3. Open `index.html` in your browser to view the website

Alternatively, you can use a local development server:

```bash
# Using Python
python -m http.server

# Using Node.js (with http-server package)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## Customization

- Colors: Edit the CSS variables in the `:root` selector in `assets/css/style.css`
- Content: Modify the HTML files to update text and images
- 3D Effects: Adjust parameters in the `init3DBackgrounds()` function in `assets/js/main.js`
- Animations: Modify the animation settings in the various initialization functions in `assets/js/main.js`

## Browser Support

This website works best in modern browsers that support CSS variables, modern JavaScript, and WebGL:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The contact form is set up for demonstration purposes only and doesn't actually send emails. You'll need to implement server-side functionality to make it work.
- For production use, you should optimize images and minify CSS/JS files.
- Add your own images to the `assets/images` directory before deploying.

## License

This project is available for personal and commercial use.
