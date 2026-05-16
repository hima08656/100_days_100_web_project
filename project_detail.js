/**
 * Project Detail Page Logic
 * Reads project ID from URL and renders project details
 */

document.addEventListener('DOMContentLoaded', () => {

    // Apply saved theme
    applySavedTheme();
    setupThemeToggle();
    initCanvas();

    // Get project ID from URL: project.html?id=5
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('id'));

    // Validate ID
    if (!projectId || isNaN(projectId) || projectId < 1 || projectId > PROJECT_DATA.length) {
        showNotFound();
        return;
    }

    // Find project (array index = projectId - 1)
    const project = PROJECT_DATA[projectId - 1];

    if (!project) {
        showNotFound();
        return;
    }

    // Get data from array
    const day = project[0];
    const name = project[1];
    const link = project[2];
    const tags = project[3];
    const difficulty = project[4];

    // Update page title
    document.title = name + ' | 100 Days 100 Web Projects';

    // Day Badge
    document.getElementById('dayBadge').textContent = day + ' of 116';

    // Difficulty Badge
    document.getElementById('difficultyBadge').textContent = difficulty;

    // Project Title
    document.getElementById('projectTitle').textContent = name;

    // Tech Stack Tags
    var techContainer = document.getElementById('techStack');
    var tagList = tags.split(' ').filter(function(t) { return t.trim() !== ''; });
    tagList.forEach(function(tag) {
        var span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tag;
        techContainer.appendChild(span);
    });

    // Description
    var descEl = document.getElementById('projectDescription');
    descEl.textContent = name + ' is part of the 100 Days 100 Web Projects challenge. ' +
        'This is a ' + difficulty + ' level project that uses ' + tagList.join(', ') + '. ' +
        'Click the buttons below to explore the live demo or view the source code on GitHub.';

    // Live Demo Button
    var liveBtn = document.getElementById('liveDemoBtn');
    liveBtn.href = link.trim();

    // Source Code Button
    var sourceBtn = document.getElementById('sourceCodeBtn');
    if (link.indexOf('github.com') !== -1) {
        // Already a GitHub link
        sourceBtn.href = link.trim();
    } else {
        // Build GitHub link from local path
        var folderPath = link.replace('./', '').replace(/\/[^\/]+\.html$/, '');
        sourceBtn.href = 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/' + folderPath;
    }

    // Iframe Preview
    var iframeContainer = document.getElementById('iframeContainer');
    var iframe = document.getElementById('projectIframe');

    if (link.indexOf('github.com') !== -1) {
        // GitHub links cannot be shown in iframe
        iframeContainer.style.display = 'none';
    } else if (link.indexOf('http') === 0) {
        // External URLs like onrender.com
        iframe.src = link.trim();
    } else {
        // Local project files
        iframe.src = link.trim();
    }

});

// Show Not Found message
function showNotFound() {
    var card = document.getElementById('projectDetail');
    card.innerHTML =
        '<div class="not-found">' +
        '<h2>Project Not Found</h2>' +
        '<p>The project you are looking for does not exist.</p>' +
        '<br/>' +
        '<a href="index.html" class="btn btn-primary">Back to All Projects</a>' +
        '</div>';
}