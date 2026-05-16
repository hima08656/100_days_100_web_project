/**
 * Project Detail Page Logic
 * Reads project ID from URL and renders project details
 *
 * NOTE: applySavedTheme(), setupThemeToggle(), and initCanvas()
 * are already called by index.js DOMContentLoaded handler.
 * We do NOT call them again here to avoid double-bindings.
 */

document.addEventListener('DOMContentLoaded', () => {

    // Get project ID from URL: project.html?id=5
    var params = new URLSearchParams(window.location.search);
    var projectId = parseInt(params.get('id'));

    // Validate ID
    if (!projectId || isNaN(projectId) || projectId < 1 || projectId > PROJECT_DATA.length) {
        showNotFound();
        return;
    }

    // Find project (array index = projectId - 1)
    var project = PROJECT_DATA[projectId - 1];

    if (!project) {
        showNotFound();
        return;
    }

    // Get data from array
    var day = project[0];
    var name = project[1];
    var link = project[2];
    var tags = project[3];
    var difficulty = project[4];

    // Update page title
    document.title = name + ' | 100 Days 100 Web Projects';

    // Day Badge
    var dayBadge = document.getElementById('dayBadge');
    if (dayBadge) dayBadge.textContent = day + ' of 116';

    // Difficulty Badge
    var diffBadge = document.getElementById('difficultyBadge');
    if (diffBadge) diffBadge.textContent = difficulty;

    // Project Title
    var titleEl = document.getElementById('projectTitle');
    if (titleEl) titleEl.textContent = name;

    // Tech Stack Tags
    var techContainer = document.getElementById('techStack');
    var tagList = tags.split(' ').filter(function(t) { return t.trim() !== ''; });

    if (techContainer) {
        tagList.forEach(function(tag) {
            var span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tag;
            techContainer.appendChild(span);
        });
    }

    // Description
    var descEl = document.getElementById('projectDescription');
    if (descEl) {
        descEl.textContent = name + ' is part of the 100 Days 100 Web Projects challenge. ' +
            'This is a ' + difficulty + ' level project that uses ' + tagList.join(', ') + '. ' +
            'Click the buttons below to explore the live demo or view the source code on GitHub.';
    }

    // Live Demo Button
    var liveBtn = document.getElementById('liveDemoBtn');
    if (liveBtn) {
        liveBtn.href = link.trim();
    }

    // Source Code Button
    var sourceBtn = document.getElementById('sourceCodeBtn');
    if (sourceBtn) {
        if (link.indexOf('github.com') !== -1) {
            sourceBtn.href = link.trim();
        } else {
            var folderPath = link.replace('./', '').replace(/\/[^\/]+\.html$/, '');
            sourceBtn.href = 'https://github.com/dhairyagothi/100_days_100_web_project/tree/Main/' + folderPath;
        }
    }

    // Iframe Preview
    var iframeContainer = document.getElementById('iframeContainer');
    var iframe = document.getElementById('projectIframe');

    if (iframeContainer && iframe) {
        if (link.indexOf('github.com') !== -1) {
            iframeContainer.style.display = 'none';
        } else if (link.indexOf('http') === 0) {
            iframe.src = link.trim();
        } else {
            iframe.src = link.trim();
        }
    }

});

// Show Not Found message
function showNotFound() {
    var card = document.getElementById('projectDetail');
    if (card) {
        card.innerHTML =
            '<div class="not-found">' +
            '<h2>Project Not Found</h2>' +
            '<p>The project you are looking for does not exist.</p>' +
            '<br/>' +
            '<a href="index.html" class="btn btn-primary">Back to All Projects</a>' +
            '</div>';
    }
}