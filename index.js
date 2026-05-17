// ============================================
// 100 Days · 100 Web Projects
// Main App Logic
// ============================================

// ----- Projects Data -----
// Each project links to project.html?id=X for the detail page
const projects = [{
        id: 1,
        day: "DAY 1",
        title: "To-Do List",
        category: "tool",
        categoryLabel: "TOOL",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/01-todo-list/index.html"
    },
    {
        id: 2,
        day: "DAY 2",
        title: "Digital Clock",
        category: "ui",
        categoryLabel: "UI",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/02-digital-clock/index.html"
    },
    {
        id: 3,
        day: "DAY 3",
        title: "Indian Flag",
        category: "ui",
        categoryLabel: "UI",
        tech: ["HTML", "CSS"],
        demoUrl: "projects/03-indian-flag/index.html"
    },
    {
        id: 4,
        day: "DAY 4",
        title: "Dropdown Navbar",
        category: "ui",
        categoryLabel: "UI",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/04-dropdown-navbar/index.html"
    },
    {
        id: 5,
        day: "DAY 5",
        title: "Animated Cursor",
        category: "ui",
        categoryLabel: "UI",
        tech: ["CSS", "JS"],
        demoUrl: "projects/05-animated-cursor/index.html"
    },
    {
        id: 6,
        day: "DAY 6",
        title: "Auto Background Slider",
        category: "ui",
        categoryLabel: "UI",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/06-bg-slider/index.html"
    },
    {
        id: 7,
        day: "DAY 7",
        title: "Calculator",
        category: "tool",
        categoryLabel: "TOOL",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/07-calculator/index.html"
    },
    {
        id: 8,
        day: "DAY 8",
        title: "Weather App",
        category: "api",
        categoryLabel: "API",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/08-weather-app/index.html"
    },
    {
        id: 9,
        day: "DAY 9",
        title: "Quiz App",
        category: "game",
        categoryLabel: "GAME",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/09-quiz-app/index.html"
    },
    {
        id: 10,
        day: "DAY 10",
        title: "Image Slider",
        category: "ui",
        categoryLabel: "UI",
        tech: ["HTML", "CSS", "JS"],
        demoUrl: "projects/10-image-slider/index.html"
    }
    // 👉 Add remaining projects here following the same structure
];

// ----- DOM Elements -----
const projectsGrid = document.getElementById("projectsGrid");
const searchInput = document.getElementById("searchInput");
const filterTabs = document.getElementById("filterTabs");
const emptyState = document.getElementById("emptyState");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");

// ----- State -----
let activeFilter = "all";
let searchQuery = "";

// ============================================
// Initialization
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    updateProjectCounts();
    renderProjects();
    setupEventListeners();
    setupScrollAnimation();
});

// ============================================
// Render Project Cards
// ============================================
function renderProjects() {
    const filtered = projects.filter((p) => {
        const matchesFilter = activeFilter === "all" || p.category === activeFilter;
        const matchesSearch =
            p.title.toLowerCase().includes(searchQuery) ||
            p.day.toLowerCase().includes(searchQuery) ||
            p.tech.some((t) => t.toLowerCase().includes(searchQuery));
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        projectsGrid.innerHTML = "";
        emptyState.style.display = "block";
        return;
    }
    emptyState.style.display = "none";

    projectsGrid.innerHTML = filtered
        .map(
            (p) => `
      <article class="project-card" data-id="${p.id}">
        <div class="card-header">
          <span class="card-day">${p.day}</span>
          <span class="card-category category-${p.category}">${p.categoryLabel}</span>
        </div>

        <h3 class="card-title">${p.title}</h3>

        <div class="card-tech">
          ${p.tech.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
        </div>

        <a href="project.html?id=${p.id}" class="card-link">
          View Demo <i class="fa-solid fa-arrow-right"></i>
        </a>
      </article>
    `
    )
    .join("");

  // Animate cards in
  requestAnimationFrame(() => {
    document.querySelectorAll(".project-card").forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), i * 30);
    });
  });
}

// ============================================
// Update Counts
// ============================================
function updateProjectCounts() {
  document.getElementById("countAll").textContent = projects.length;

  // Update placeholder dynamically
  searchInput.placeholder = `Search ${projects.length} projects...`;

  // Update tab text
  filterTabs.querySelectorAll(".filter-tab").forEach((tab) => {
    const filter = tab.dataset.filter;
    if (filter === "all") return;
    const count = projects.filter((p) => p.category === filter).length;
    const baseText = tab.textContent.trim();
    if (!tab.querySelector(".tab-count")) {
      tab.innerHTML = `${baseText} <span class="tab-count">${count}</span>`;
    }
  });
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
  // Search
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProjects();
  });

  // Filter tabs
  filterTabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".filter-tab");
    if (!tab) return;

    filterTabs.querySelectorAll(".filter-tab").forEach((t) =>
      t.classList.remove("active")
    );
    tab.classList.add("active");

    activeFilter = tab.dataset.filter;
    renderProjects();
  });

  // Mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      document.querySelector(".nav-links").classList.toggle("open");
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Keyboard search shortcut (Press '/' to focus search)
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

// ============================================
// Scroll Animations
// ============================================
function setupScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".project-card, .section-title, .hero-line").forEach((el) => {
    observer.observe(el);
  });
}