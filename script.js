const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const titleElement = document.getElementById("dynamic-title");
const profileImage = document.getElementById('profileImage');
const imagePlaceholder = document.getElementById('imagePlaceholder');

const titles = [
    "Odoo Developer",
    "Odoo ERP Specialist",
    "Odoo Module Creator",
    "Odoo Reporting Expert",
    "Odoo Automation & Workflow"
];

document.addEventListener('DOMContentLoaded', function() {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    themeToggle.addEventListener('click', toggleDarkMode);
    
    loadThemePreference();
    
    checkSystemThemePreference();
    
    startTitleAnimation();
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    setupSmoothScrolling();
    
    window.addEventListener('scroll', handleScroll);
    
    handleProfileImage();
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
}

function checkSystemThemePreference() {
    if (!localStorage.getItem('theme') && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

let currentIndex = 0;

function changeTitle() {
    titleElement.style.opacity = 0;
    titleElement.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % titles.length;
        titleElement.textContent = titles[currentIndex];
        titleElement.style.opacity = 1;
        titleElement.style.transform = 'translateY(0)';
    }, 300);
}

function startTitleAnimation() {
    if (titleElement) {
        setInterval(changeTitle, 3000);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    alert(`Thank you ${name}! Your message has been sent. I'll contact you at ${email} soon.`);
    
    this.reset();
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function handleScroll() {
    const header = document.querySelector('header');
    if(window.scrollY > 100) {
        header.style.backgroundColor = document.body.classList.contains('dark-mode') 
            ? 'rgba(15, 23, 42, 0.98)' 
            : 'rgba(26, 54, 93, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = document.body.classList.contains('dark-mode')
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(26, 54, 93, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
}

function handleProfileImage() {
    if (profileImage) {
        profileImage.onload = function() {
            imagePlaceholder.style.display = 'none';
            profileImage.style.display = 'block';
        };
        
        profileImage.onerror = function() {
            profileImage.style.display = 'none';
            imagePlaceholder.style.display = 'flex';
            console.log('Image not found at "image.jpeg". Using placeholder instead.');
        };
        
        if (profileImage.complete) {
            if (profileImage.naturalHeight === 0) {
                profileImage.style.display = 'none';
                imagePlaceholder.style.display = 'flex';
            } else {
                imagePlaceholder.style.display = 'none';
                profileImage.style.display = 'block';
            }
        }
    }
}