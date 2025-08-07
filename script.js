// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeCounters();
    initializeModals();
    initializeScrollEffects();
});

// Initialize all animations
function initializeAnimations() {
    // Add entrance animations to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// Navigation functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Counter animation for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                counter.innerText = '0';
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Modal functionality
function initializeModals() {
    const componentData = {
        'raspberry-pi': {
            title: 'Raspberry Pi 4B - The Brain',
            content: `
                <div class="modal-header">
                    <h2><i class="fas fa-microchip"></i> Raspberry Pi 4B</h2>
                </div>
                <div class="modal-body-content">
                    <h3>Scientific Explanation</h3>
                    <p>The Raspberry Pi 4B serves as the central processing unit of our surveillance robot. This single-board computer contains a System-on-Chip (SoC) architecture that integrates the CPU, GPU, RAM, and various interfaces on a single silicon die.</p>
                    
                    <h3>Technical Specifications</h3>
                    <ul>
                        <li><strong>Processor:</strong> Broadcom BCM2711, Quad-core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz</li>
                        <li><strong>Memory:</strong> 8GB LPDDR4-3200 SDRAM</li>
                        <li><strong>Connectivity:</strong> 2.4 GHz and 5.0 GHz IEEE 802.11ac wireless, Bluetooth 5.0, BLE</li>
                        <li><strong>GPIO:</strong> 40-pin GPIO header for sensor and actuator connections</li>
                        <li><strong>Video:</strong> 2 × micro-HDMI ports supporting up to 4Kp60</li>
                        <li><strong>Camera Interface:</strong> MIPI CSI camera port</li>
                    </ul>

                    <h3>Role in the Robot</h3>
                    <p>The Raspberry Pi processes video feeds from cameras, executes computer vision algorithms for motion detection, controls servo motors through PWM signals, and manages communication with ultrasonic sensors. It runs our custom Python-based control software that coordinates all robot functions.</p>

                    <h3>Power Consumption</h3>
                    <p>Operating at 5V with approximately 3W power consumption under typical load, making it ideal for battery-powered mobile applications.</p>
                </div>
            `
        },
        'camera': {
            title: 'HD Camera Module - The Eyes',
            content: `
                <div class="modal-header">
                    <h2><i class="fas fa-camera"></i> HD Camera Module</h2>
                </div>
                <div class="modal-body-content">
                    <h3>Scientific Explanation</h3>
                    <p>The camera module utilizes a CMOS (Complementary Metal-Oxide-Semiconductor) image sensor that converts light photons into electrical signals. Each pixel contains photodiodes that generate electrical current proportional to light intensity.</p>
                    
                    <h3>Technical Specifications</h3>
                    <ul>
                        <li><strong>Sensor:</strong> Sony IMX219 8-megapixel sensor</li>
                        <li><strong>Resolution:</strong> 3280 × 2464 pixels (still), 1920 × 1080 @ 30fps (video)</li>
                        <li><strong>Lens:</strong> Fixed focus lens with 62.2° diagonal field of view</li>
                        <li><strong>Interface:</strong> MIPI CSI-2 interface to Raspberry Pi</li>
                        <li><strong>Night Vision:</strong> IR-sensitive with external IR LED illumination</li>
                        <li><strong>Focus Range:</strong> 1m to infinity</li>
                    </ul>

                    <h3>Computer Vision Processing</h3>
                    <p>The camera feed is processed using OpenCV library for:</p>
                    <ul>
                        <li>Motion detection using background subtraction algorithms</li>
                        <li>Object recognition using pre-trained neural networks</li>
                        <li>Face detection using Haar cascades</li>
                        <li>Real-time video streaming over network protocols</li>
                    </ul>

                    <h3>Servo-Controlled Pan/Tilt Mechanism</h3>
                    <p>Mounted on a dual-axis servo system allowing 180° horizontal rotation and 90° vertical tilt, providing comprehensive area coverage and target tracking capabilities.</p>
                </div>
            `
        },
        'servo': {
            title: 'Servo Motors - Precision Movement',
            content: `
                <div class="modal-header">
                    <h2><i class="fas fa-cog"></i> Servo Motors</h2>
                </div>
                <div class="modal-body-content">
                    <h3>Scientific Explanation</h3>
                    <p>Servo motors are closed-loop control systems that use feedback to achieve precise position control. They contain a DC motor, reduction gears, potentiometer for position feedback, and control circuitry integrated into a compact package.</p>
                    
                    <h3>Technical Specifications (SG90 Micro Servo)</h3>
                    <ul>
                        <li><strong>Operating Voltage:</strong> 4.8V - 6V</li>
                        <li><strong>Stall Torque:</strong> 2.5 kg⋅cm (4.8V), 3.0 kg⋅cm (6V)</li>
                        <li><strong>Operating Speed:</strong> 0.1 s/60° (4.8V), 0.08 s/60° (6V)</li>
                        <li><strong>Rotation Range:</strong> 180° ± 10°</li>
                        <li><strong>Control Signal:</strong> PWM (Pulse Width Modulation)</li>
                        <li><strong>Deadband Width:</strong> 1μs</li>
                    </ul>

                    <h3>Control Mechanism</h3>
                    <p>Servos are controlled using PWM signals with a 50Hz frequency (20ms period). The pulse width determines position:</p>
                    <ul>
                        <li>1ms pulse width = 0° position</li>
                        <li>1.5ms pulse width = 90° position (center)</li>
                        <li>2ms pulse width = 180° position</li>
                    </ul>

                    <h3>Applications in the Robot</h3>
                    <p><strong>Camera Pan/Tilt System:</strong> Two servos provide precise camera positioning for surveillance coverage.</p>
                    <p><strong>Steering Mechanism:</strong> One servo controls front wheel steering for directional movement.</p>

                    <h3>Control Algorithm</h3>
                    <p>The Raspberry Pi generates PWM signals through its GPIO pins, with software PID control loops ensuring smooth and accurate positioning based on sensor feedback and navigation algorithms.</p>
                </div>
            `
        },
        'ultrasonic': {
            title: 'Ultrasonic Sensors - Echolocation',
            content: `
                <div class="modal-header">
                    <h2><i class="fas fa-wave-square"></i> Ultrasonic Sensors</h2>
                </div>
                <div class="modal-body-content">
                    <h3>Scientific Explanation</h3>
                    <p>Ultrasonic sensors operate on the principle of echolocation, similar to how bats navigate. They emit high-frequency sound waves (40kHz) and measure the time taken for the echo to return after reflecting off objects.</p>
                    
                    <h3>Technical Specifications (HC-SR04)</h3>
                    <ul>
                        <li><strong>Operating Frequency:</strong> 40kHz ultrasonic waves</li>
                        <li><strong>Detection Range:</strong> 2cm to 400cm</li>
                        <li><strong>Accuracy:</strong> ±3mm</li>
                        <li><strong>Measuring Angle:</strong> 15° cone</li>
                        <li><strong>Operating Voltage:</strong> 5V DC</li>
                        <li><strong>Operating Current:</strong> 15mA</li>
                        <li><strong>Trigger Input Signal:</strong> 10μs TTL pulse</li>
                    </ul>

                    <h3>Physics of Operation</h3>
                    <p>The distance calculation uses the formula:</p>
                    <p><strong>Distance = (Time × Speed of Sound) / 2</strong></p>
                    <p>Where speed of sound ≈ 343 m/s at 20°C. The division by 2 accounts for the round-trip time of the sound wave.</p>

                    <h3>Sensor Array Configuration</h3>
                    <p>Four HC-SR04 sensors are strategically mounted:</p>
                    <ul>
                        <li><strong>Front Sensor:</strong> Primary obstacle detection and distance measurement</li>
                        <li><strong>Rear Sensor:</strong> Backup assistance and rear obstacle detection</li>
                        <li><strong>Left/Right Sensors:</strong> Side obstacle detection for navigation</li>
                    </ul>

                    <h3>Signal Processing</h3>
                    <p>The Raspberry Pi processes ultrasonic data using:</p>
                    <ul>
                        <li>Kalman filtering for noise reduction</li>
                        <li>Sensor fusion algorithms combining multiple sensor readings</li>
                        <li>Obstacle mapping for navigation planning</li>
                        <li>Real-time collision avoidance algorithms</li>
                    </ul>

                    <h3>Navigation Algorithm</h3>
                    <p>The sensor data feeds into a navigation algorithm that creates a local obstacle map, plans optimal paths, and executes avoidance maneuvers in real-time.</p>
                </div>
            `
        }
    };

    window.openModal = function(componentId) {
        const modal = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        if (componentData[componentId]) {
            modalBody.innerHTML = componentData[componentId].content;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function() {
        const modal = document.getElementById('modal-overlay');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Scroll effects and parallax
function initializeScrollEffects() {
    const parallaxElements = document.querySelectorAll('.robot-container, .floating-particles');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Component cards hover effects
    const componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glowing effect
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            // Remove glowing effect
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add some interactive particle effects
function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#00ffff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particle effects
setTimeout(createFloatingParticles, 1000);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const robotContainer = document.querySelector('.robot-container');
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        heroDescription.style.opacity = '1';
        heroDescription.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 900);
    
    setTimeout(() => {
        robotContainer.style.opacity = '1';
        robotContainer.style.transform = 'translateY(0)';
    }, 1200);
});

// Add some CSS for loading animations
const loadingStyles = `
    .hero-title,
    .hero-description,
    .hero-buttons,
    .robot-container {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);
