# McDonald's Restaurant Web Project

This repository contains a web-based restaurant application for McDonald's, built using HTML, CSS (Bootstrap & Tailwind), and JavaScript. The project is organized into two main sections:

- **Home page**: Main landing, About Us, Contact, Cart, and Menu pages
- **menu page**: Additional Cart page

## Features
- Responsive navigation bar with links to all main pages
- Dynamic menu with add-to-cart functionality
- Cart management using localStorage
- Contact form and About Us information
- Modern UI using Bootstrap, Tailwind, and FontAwesome

## Project Structure
```
Home page/
├── About-Us page/
│   ├── aboutus.html, aboutus.css, aboutus.js
├── Cart Page/
│   ├── Cart.html, Cart.css, Cart.js
├── Contact  page/
│   ├── Contact.html, Contact.css, Contact.js
├── index.html
├── menu.html
├── menu.js
├── menu.css
├── style.css
├── main.js
├── images (various)
menu page/
└── Cart Page/
    └── Cart.html
```

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Open `index.html` in your browser** to view the Home page.
3. **Navigate using the navbar** to explore Menu, Cart, Contact, and About Us pages.

## Technologies Used
- HTML5
- CSS3 (Bootstrap 5, Tailwind CSS)
- JavaScript (ES6)
- FontAwesome for icons

## How the Cart Works
- Products are added to the cart from the menu page.
- Cart data is stored in `localStorage` for persistence.
- Cart contents can be viewed and managed from the Cart page.

## Customization
- Update images and content in the respective HTML files.
- Modify styles in `menu.css`, `style.css`, and component-specific CSS files.

## Deployment
You can deploy this project on GitHub Pages or any static hosting service. Just upload the contents of the project folder.

## License
This project is for educational purposes.

---
Feel free to contribute or open issues for suggestions!