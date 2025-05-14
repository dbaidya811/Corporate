# Corporate Website

A modern, responsive corporate website template built with HTML, CSS, and JavaScript. This template is designed for businesses looking to establish a professional online presence.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean and professional design with smooth animations
- **Multiple Pages**: Complete website with Home, About, Services, Portfolio, and Contact pages
- **Interactive Elements**: Testimonial sliders, portfolio filters, and contact form
- **Cross-Browser Compatible**: Works on all modern browsers
- **Fast Loading**: Optimized for performance
- **SEO Friendly**: Structured with proper HTML5 semantics

## Pages

1. **Home**: Main landing page with company overview, services, features, and call-to-action sections
2. **About**: Company history, mission, values, and team members
3. **Services**: Detailed information about the services offered
4. **Portfolio**: Showcase of projects with filtering and modal details
5. **Contact**: Contact form, company information, and location map

## Usage

1. Clone or download this repository
2. Open any of the HTML files in a web browser to view the pages
3. Customize the content, images, and styling to match your brand
4. Replace placeholder images in the `img` folder with your own images
5. Update contact information and form submission endpoint

## Customization

### Changing Colors

The main colors of the website can be easily changed by modifying the CSS variables in the `styles.css` file:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --light-color: #ecf0f1;
    --dark-color: #2c3e50;
    --text-color: #333;
    --text-light: #7f8c8d;
}
```

### Adding New Pages

To add a new page:

1. Create a new HTML file based on the existing page structure
2. Link to the new page in the navigation menu in all HTML files
3. Update the footer links to include the new page

### Replacing Images

Replace the placeholder images in the `img` folder with your own images. Make sure to maintain the same file names or update the references in the HTML files.

## File Structure

```
corporate-website/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── portfolio.html      # Portfolio page
├── contact.html        # Contact page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
└── img/                # Image directory
    ├── hero-bg.jpg
    ├── about-company.jpg
    ├── service1.jpg
    └── ...
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This template is free to use for both personal and commercial projects.

## Credits

- Font Awesome for icons
- Google Fonts for typography
- Google Maps for the location map

## Contact

For any questions or customization requests, please contact:
- Email: info@corporatename.com
- Phone: +1 (555) 123-4567
