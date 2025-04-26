document.addEventListener('DOMContentLoaded', function() {
    // Create butterflies
    createButterflies(3);

    // Animation on page load
    const icons = document.querySelectorAll('.social-icons-3d li');

    icons.forEach((icon, index) => {
        icon.style.transitionDelay = `${index * 0.1}s`;
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';

        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 500 + (index * 100));
    });

    // Click/touch event for each icon
    icons.forEach(icon => {
        icon.addEventListener('click', handleSocialClick);
        icon.addEventListener('touchend', handleSocialClick);
    });

    function handleSocialClick(e) {
        e.preventDefault();
        const link = this.querySelector('a');
        const socialClass = link.className;
        const socialNetwork = socialClass.split(' ')[0];

        // Vibrate on mobile devices if supported
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // You can replace these with actual links
        const socialLinks = {
            'facebook': 'https://facebook.com',
            'twitter': 'https://twitter.com',
            'google-plus': 'https://plus.google.com',
            'instagram': 'https://instagram.com',
            'whatsapp': 'https://wa.me/',
            'github': 'https://github.com'
        };

        if (socialLinks[socialNetwork]) {
            window.open(socialLinks[socialNetwork], '_blank');
        }
    }

    function createButterflies(count) {
        const colors = [
            'https://www.freeiconspng.com/uploads/blue-butterfly-png-2.png',
            'https://www.freeiconspng.com/uploads/orange-butterfly-png-1.png',
            'https://www.freeiconspng.com/uploads/pink-butterfly-png-2.png',
            'https://www.freeiconspng.com/uploads/purple-butterfly-png-1.png',
            'https://www.freeiconspng.com/uploads/yellow-butterfly-png-3.png'
        ];

        for (let i = 0; i < count; i++) {
            const butterfly = document.createElement('div');
            butterfly.className = `butterfly butterfly-${i+1}`;
            butterfly.style.backgroundImage = `url('${colors[i % colors.length]}')`;
            butterfly.style.top = `${Math.random() * 80 + 10}%`;
            butterfly.style.left = `${Math.random() * 80 + 10}%`;
            butterfly.style.animationDuration = `${Math.random() * 10 + 15}s`;
            butterfly.style.animationDelay = `${Math.random() * 5}s`;
            butterfly.style.transform = `scale(${Math.random() * 0.4 + 0.6}) rotate(${Math.random() * 20 - 10}deg)`;

            document.body.appendChild(butterfly);

            // Make butterflies move randomly
            setInterval(() => {
                animateButterfly(butterfly);
            }, 15000);
        }
    }

    function animateButterfly(butterfly) {
        const newX = Math.random() * 80 + 10;
        const newY = Math.random() * 80 + 10;
        const duration = Math.random() * 10 + 15;

        butterfly.style.animation = 'none';
        butterfly.offsetHeight; // Trigger reflow
        butterfly.style.top = `${newY}%`;
        butterfly.style.left = `${newX}%`;
        butterfly.style.animation = `float ${duration}s infinite linear`;
    }
});