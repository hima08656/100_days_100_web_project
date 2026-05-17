// Project Data Structure - Add all 117 projects here or fetch from JSON
const projectsData = [{
        id: 1,
        day: "DAY 1",
        title: "To-Do List",
        category: "TOOL",
        description: "A clean and functional task management application with local storage persistence. Add, complete, and delete tasks with a smooth user experience.",
        image: "projects/01-todo-list/preview.jpg", // Update paths as per your structure
        liveUrl: "projects/01-todo-list/index.html",
        repoUrl: "https://github.com/dhairyagothi/100_days_100_web_project/tree/main/projects/01-todo-list",
        tech: ["HTML", "CSS", "JavaScript"],
        features: [
            { icon: "fa-check-circle", title: "Task Management", desc: "Add, edit, and delete tasks effortlessly" },
            { icon: "fa-database", title: "Local Storage", desc: "Tasks persist between browser sessions" },
            { icon: "fa-filter", title: "Filtering", desc: "View all, active, or completed tasks" },
            { icon: "fa-mobile-alt", title: "Responsive", desc: "Works seamlessly on all devices" }
        ],
        contributor: {
            name: "Dhairya Gothi",
            github: "dhairyagothi",
            avatar: "https://github.com/dhairyagothi.png"
        }
    },
    {
        id: 2,
        day: "DAY 2",
        title: "Digital Clock",
        category: "UI",
        description: "A sleek digital clock with real-time updates, date display, and smooth animations.",
        image: "projects/02-digital-clock/preview.jpg",
        liveUrl: "projects/02-digital-clock/index.html",
        repoUrl: "https://github.com/dhairyagothi/100_days_100_web_project/tree/main/projects/02-digital-clock",
        tech: ["HTML", "CSS", "JavaScript"],
        features: [
            { icon: "fa-clock", title: "Real-time", desc: "Live updating every second" },
            { icon: "fa-calendar", title: "Date Display", desc: "Shows current date and day" },
            { icon: "fa-palette", title: "Themes", desc: "Multiple color themes available" }
        ],
        contributor: {
            name: "Dhairya Gothi",
            github: "dhairyagothi",
            avatar: "https://github.com/dhairyagothi.png"
        }
    }
    // Add remaining projects...
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));

    if (!projectId) {
        showError();
        return;
    }

    loadProject(projectId);
});

function loadProject(id) {
    const project = projectsData.find(p => p.id === id);

    if (!project) {
        showError();
        return;
    }

    // Populate content
    document.getElementById('projectDay').textContent = project.day;
    document.getElementById('projectCategory').textContent = project.category;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').textContent = project.description;
    document.getElementById('breadcrumbDay').textContent = project.day;
    document.title = `${project.title} | 100 Days 100 Web Projects`;

    // Tech stack
    const techStack = document.getElementById('techStack');
    techStack.innerHTML = project.tech.map(t =>
        `<span class="tech-tag">${t}</span>`
    ).join('');

    // Tech list (detailed)
    document.getElementById('techList').innerHTML = project.tech.map(t =>
        `<li>${t}</li>`
    ).join('');

    // Links
    document.getElementById('liveDemoBtn').href = project.liveUrl;
    document.getElementById('sourceCodeBtn').href = project.repoUrl;
    document.getElementById('previewFrame').src = project.liveUrl;
    document.getElementById('urlBar').textContent = project.liveUrl;

    // Image
    document.getElementById('projectImage').src = project.image;

    // Features
    const featuresGrid = document.getElementById('featuresGrid');
    featuresGrid.innerHTML = project.features.map(f => `
    <div class="feature-card">
      <i class="fa-solid ${f.icon}"></i>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');

    // Contributor
    document.getElementById('contribName').textContent = project.contributor.name;
    document.getElementById('contribGithub').href = `https://github.com/${project.contributor.github}`;
    document.getElementById('contribAvatar').src = project.contributor.avatar;

    // Navigation
    setupNavigation(id);

    // Hide loader
    document.getElementById('loader').style.display = 'none';
    document.getElementById('detailContainer').style.display = 'block';

    // Share button
    setupShare(project);
}

function setupNavigation(currentId) {
    const prev = projectsData.find(p => p.id === currentId - 1);
    const next = projectsData.find(p => p.id === currentId + 1);

    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');

    if (prev) {
        prevBtn.href = `project.html?id=${prev.id}`;
        document.getElementById('prevTitle').textContent = prev.title;
    } else {
        prevBtn.style.visibility = 'hidden';
    }

    if (next) {
        nextBtn.href = `project.html?id=${next.id}`;
        document.getElementById('nextTitle').textContent = next.title;
    } else {
        nextBtn.style.visibility = 'hidden';
    }
}

function setupShare(project) {
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', async() => {
        const shareData = {
            title: `${project.title} - 100 Days 100 Web Projects`,
            text: `Check out ${project.title} by ${project.contributor.name}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                const originalHTML = shareBtn.innerHTML;
                shareBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    shareBtn.innerHTML = originalHTML;
                }, 2000);
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
    });

    // Play button overlay
    document.getElementById('playDemoBtn').addEventListener('click', () => {
        document.getElementById('previewFrame').scrollIntoView({ behavior: 'smooth' });
    });

    // Fullscreen
    document.getElementById('fullscreenBtn').addEventListener('click', () => {
        const iframe = document.getElementById('previewFrame');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        }
    });
}

function showError() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('errorBox').style.display = 'block';
}