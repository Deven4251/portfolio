// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is visible
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('animate');

                // If it's a section header, animate its children
                if (entry.target.classList.contains('section-header')) {
                    const title = entry.target.querySelector('h1');
                    const subtitle = entry.target.querySelector('h2');
                    const description = entry.target.querySelector('p');

                    if (title) title.classList.add('animate');
                    if (subtitle) subtitle.classList.add('animate');
                    if (description) description.classList.add('animate');
                }

                // If it's a project card, experience card, or award card
                if (entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('experience-card') ||
                    entry.target.classList.contains('award-card')) {
                    entry.target.classList.add('animate');
                }

                // If it's a form group
                if (entry.target.classList.contains('form-group')) {
                    entry.target.classList.add('animate');
                }

                // If it's the submit button
                if (entry.target.classList.contains('submit-btn')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element comes into view
    });

    // Observe all section headers
    document.querySelectorAll('.section-header').forEach(header => {
        observer.observe(header);
    });

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all experience cards
    document.querySelectorAll('.experience-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all award cards
    document.querySelectorAll('.award-card').forEach(card => {
        observer.observe(card);
    });

    // Observe all form groups
    document.querySelectorAll('.form-group').forEach(group => {
        observer.observe(group);
    });

    // Observe the submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        observer.observe(submitBtn);
    }

    // Add a class to the body when the page is loaded
    document.body.classList.add('page-loaded');
});