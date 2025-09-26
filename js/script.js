// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Dark Mode Toggle
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle').textContent = '☀️';
    }
});

// Project Filter
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(category) || 
            (category === 'all' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'block';
            project.style.animation = 'fadeIn 0.5s ease';
        } else {
            project.style.display = 'none';
        }
    });
}

// Modal Functions
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Project data (in a real application, this would come from a database)
    // const projectData = {
    //     project1: {
    //         title: 'Parcelamento SELIC API',
    //         description: 'Simulador de parcelamento com juros calculados com base na taxa SELIC. Esta API expõe um endpoint para simular compras parceladas, aplicando juros compostos em casos com mais de 6 parcelas.'
    //     },
    //     project2: {
    //         title: 'App de Gestão Financeira',
    //         description: 'Aplicativo mobile inovador que utiliza inteligência artificial para ' +
    //                     'categorizar automaticamente despesas e fornecer insights personalizados ' +
    //                     'sobre hábitos de consumo. Inclui previsões de gastos e sugestões de economia.'
    //     },
    //     project3: {
    //         title: 'Dashboard Analytics',
    //         description: 'Dashboard interativo para visualização de dados complexos em tempo real. ' +
    //                     'Utiliza D3.js para criar gráficos dinâmicos e Vue.js para uma interface ' +
    //                     'responsiva. Processa mais de 1 milhão de dados por dia.'
    //     },
    //     project4: {
    //         title: 'Redesign UI/UX',
    //         description: 'Redesign completo da interface de uma startup de tecnologia, resultando ' +
    //                     'em aumento de 200% na conversão e redução de 60% na taxa de abandono. ' +
    //                     'Projeto incluiu pesquisa com usuários e testes A/B.'
    //     },
    //     project5: {
    //         title: 'Sistema de Reservas',
    //         description: 'Sistema robusto de reservas online para rede de restaurantes, com ' +
    //                     'integração com sistemas de ponto de venda, gestão de mesas em tempo real ' +
    //                     'e sistema de notificações automatizadas.'
    //     },
    //     project6: {
    //         title: 'Social Network App',
    //         description: 'Rede social focada em compartilhamento de conhecimento técnico, com ' +
    //                     'features como code sharing, live coding sessions e sistema de mentoria. ' +
    //                     'Mais de 50.000 desenvolvedores cadastrados.'
    //     }
    // };
    
    const data = projectData[projectId];
    if (data) {
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Show notification
    showNotification('Mensagem enviada com sucesso! Retornarei em breve.', 'success');
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form data:', data);
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    notificationMessage.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Back to Top Button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.timeline-item, .info-item, .skill-item');
    elements.forEach(el => observer.observe(el));
});

// Form Validation
const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('.form-control');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
        input.style.borderColor = 'var(--accent-color)';
        return false;
    }
    
    if (input.type === 'email' && !isValidEmail(input.value)) {
        input.style.borderColor = 'var(--accent-color)';
        return false;
    }
    
    input.style.borderColor = 'var(--bg-color)';
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing Effect for Hero Title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 100);
    }
});