const commandsData = {
  setup: { 
    icon: "🛠️", 
    title: "Setup & Configuration", 
    commands: [
      {name: "/setup", description: "Interactive setup wizard for initial configuration", permission: "Admin"},
      {name: "/setchannel", description: "Set channel for diary posts", permission: "Admin"},
      {name: "/setcolor", description: "Set custom embed color for this server", permission: "Admin"},
      {name: "/admininfo", description: "View server configuration and settings overview", permission: "Admin"}
    ]
  },
  settings_menu: { 
    icon: "⚙️", 
    title: "Settings Menu Options", 
    commands: [
      {name: "/settings", description: "Interactive settings menu - Configure diary, group diary, channels, and customization", permission: "Admin"},
      {name: "/diaryfields", description: "Toggle which fields show in diary entries & configure watch filter", permission: "Admin"},
      {name: "/diaryformat", description: "Configure thumbnail, timestamp, author format, and role ping", permission: "Admin"},
      {name: "/thumbnail", description: "Set thumbnail priority: default, season_show, show_only, serializd_only", permission: "Admin"},
      {name: "/timestampformat", description: "Change how the logged date appears in entries", permission: "Admin"},
      {name: "/authorformat", description: "Change author line format in diary embeds", permission: "Admin"},
      {name: "/watchfilter", description: "Filter which entries to post (first watches, rewatches, etc)", permission: "Admin"},
      {name: "/pingrole", description: "Set role to ping on new diary entries", permission: "Admin"},
      {name: "/groupdiary", description: "Configure group diary mode and timing for binge sessions", permission: "Admin"},
      {name: "/groupfields", description: "Toggle which fields show in group diary embeds", permission: "Admin"},
      {name: "/groupformat", description: "Configure group diary title, author, thumbnail, and review links", permission: "Admin"},
      {name: "/setanonymous", description: "Hide your guild from /stats global rankings", permission: "Admin"},
      {name: "/setdiscordlink", description: "Set Discord invite link to display in global stats", permission: "Admin"}
    ]
  },
  tracking: { 
    icon: "👥", 
    title: "User Tracking", 
    commands: [
      {name: "/adduser", description: "Add one or more Serializd users to track", permission: "Admin"},
      {name: "/removeuser", description: "Remove a tracked Serializd user", permission: "Admin"},
      {name: "/listusers", description: "Show all tracked users in this server", permission: "Admin"},
      {name: "/testuser", description: "Test if API can fetch a user's diary", permission: "Admin"},
      {name: "/clearallusers", description: "Remove ALL tracked users from this server", permission: "Admin"}
    ]
  },
  browsing_community: { 
    icon: "🔍", 
    title: "Browsing, Stats & Community", 
    commands: [
      {name: "/profile", description: "View a user's Serializd profile with interactive navigation", permission: "All"},
      {name: "/stats", description: "View server and global statistics with Top 20 leaderboards", permission: "All"},
      {name: "/username", description: "Connect your Discord account to your Serializd username", permission: "All"},
      {name: "/sharelink", description: "Submit your Serializd and Letterboxd profile links", permission: "All"},
      {name: "/upcoming", description: "View upcoming episodes for tracked shows", permission: "All"},
      {name: "/serializd", description: "Learn about Serializd - TV tracking platform", permission: "All"}
    ]
  },
  usermgmt: { 
    icon: "⚙️", 
    title: "Username Management", 
    commands: [
      {name: "/viewusernames", description: "View all Discord-to-Serializd username connections", permission: "Admin"},
      {name: "/setusername", description: "Force set a user's Serializd username", permission: "Admin"},
      {name: "/clearusername", description: "Clear a user's Serializd username connection", permission: "Admin"},
      {name: "/banusername", description: "Ban/unban a user from using /username command", permission: "Admin"},
      {name: "/clearsharelink", description: "Clear a user's sharelink so they can resubmit", permission: "Admin"}
    ]
  },
  permissions: { 
    icon: "🔒", 
    title: "Permissions", 
    commands: [
      {name: "/toggleroles", description: "Toggle role-based command restrictions on/off", permission: "Admin"},
      {name: "/addrole", description: "Add a role that can use bot commands", permission: "Admin"},
      {name: "/removerole", description: "Remove a role from allowed list", permission: "Admin"},
      {name: "/viewroles", description: "View role restriction settings", permission: "Admin"}
    ]
  },
  info: { 
    icon: "❓", 
    title: "Information", 
    commands: [
      {name: "/help", description: "Get help with the bot", permission: "All"},
      {name: "/commands", description: "List all available commands", permission: "All"},
      {name: "/botstatus", description: "View bot status, version, and statistics", permission: "All"},
      {name: "/version", description: "View bot version information", permission: "All"},
      {name: "/changelog", description: "View the most recent bot update", permission: "All"},
      {name: "/privacy", description: "View privacy policy and data collection information", permission: "All"},
      {name: "/donate", description: "Support the bot and view supporters - now with tier slots info!", permission: "All"},
      {name: "/patreon", description: "Support the bot and view supporters - now with tier slots info!", permission: "All"}
    ]
  }
};

function createCategoryButton(key, category) {
  return `<div class="bg-white/5 rounded-2xl border border-white/10" id="${key}-container"><button class="w-full px-8 py-6 flex justify-between items-center text-2xl font-semibold" onclick="toggleCategory('${key}')"><div class="flex items-center gap-4"><div class="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">${category.icon}</div><span>${category.title}</span></div><svg class="w-6 h-6 transform transition-transform" id="${key}-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="hidden px-8 pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="${key}-commands"></div></div>`;
}

function createCommandHTML(cmd) {
  return `<div class="command-card bg-white/5 p-6 rounded-xl border border-white/10"><div class="flex justify-between items-start"><div><h4 class="text-xl font-semibold mb-2">${cmd.name}</h4><p class="text-white/70">${cmd.description}</p></div><span class="px-3 py-1 bg-[#14e8e8]/20 text-[#14e8e8] rounded-lg text-sm">${cmd.permission}</span></div></div>`;
}

const loadedCategories = new Set();

// Page Loader
document.addEventListener("DOMContentLoaded", () => { 
  setTimeout(() => { 
    const loader = document.getElementById("loader"); 
    if (loader) { 
      loader.style.opacity = "0"; 
      setTimeout(() => loader.remove(), 500); 
    } 
  }, 1000); 
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

function initHeroAnimations() { 
  const timeline = gsap.timeline({ defaults: { ease: "power2.out" } }); 
  timeline
    .from("#hero h1", { opacity: 0, y: 20, duration: 0.3 })
    .from("#hero p", { opacity: 0, y: 15, duration: 0.25 }, "-=0.2")
    .from("#hero button", { opacity: 0, y: 15, duration: 0.25, stagger: 0.05 }, "-=0.15")
    .from("#hero img", { opacity: 0, scale: 0.95, duration: 0.3 }, "-=0.2"); 
}

function initFeaturesAnimations() { 
  const cards = gsap.utils.toArray(".feature-card"); 
  cards.forEach(card => gsap.from(card, { 
    opacity: 0, 
    y: 15, 
    duration: 0.25, 
    ease: "power2.out", 
    scrollTrigger: { 
      trigger: card, 
      start: "top bottom-=20", 
      toggleActions: "play none none none" 
    } 
  })); 
}

function initScrollAnimations() { 
  gsap.to("nav", { 
    scrollTrigger: { 
      trigger: "body", 
      start: "top top", 
      end: "+=100", 
      toggleClass: "nav-blur", 
      scrub: true 
    } 
  }); 
}

function initSmoothScroll() { 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => { 
    anchor.addEventListener("click", e => { 
      e.preventDefault(); 
      const target = document.querySelector(anchor.getAttribute("href")); 
      if (target) { 
        const navHeight = document.querySelector("nav").offsetHeight; 
        window.scrollTo({ 
          top: target.getBoundingClientRect().top + window.pageYOffset - navHeight, 
          behavior: "smooth" 
        }); 
      } 
    }); 
  }); 
}

function initializeWebsite() { 
  initHeroAnimations(); 
  initFeaturesAnimations(); 
  initScrollAnimations(); 
  initSmoothScroll(); 
  document.querySelectorAll(".gradient-bg").forEach(b => b.classList.add("pulse-on-hover")); 
  document.querySelectorAll(".feature-card").forEach(c => c.classList.add("shine-effect")); 
}

// Toggle Functions
function toggleCategory(category) { 
  const commandsDiv = document.getElementById(`${category}-commands`); 
  const arrow = document.getElementById(`${category}-arrow`); 
  if (!loadedCategories.has(category)) { 
    commandsDiv.innerHTML = commandsData[category].commands.map(createCommandHTML).join(''); 
    loadedCategories.add(category); 
  } 
  commandsDiv.classList.toggle("hidden"); 
  arrow.classList.toggle("rotate-180"); 
}

function toggleFAQ(faqId) { 
  const content = document.getElementById(`${faqId}-content`); 
  const arrow = document.getElementById(`${faqId}-arrow`); 
  content.classList.toggle("hidden"); 
  arrow.classList.toggle("rotate-180"); 
}

function toggleMobileMenu() { 
  const mobileMenu = document.getElementById("mobileMenu"); 
  const menuIcon = document.querySelector(".menu-icon"); 
  if (mobileMenu.classList.contains("hidden")) { 
    mobileMenu.classList.remove("hidden"); 
    mobileMenu.classList.add("animate-fade-in"); 
    menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12"); 
  } else { 
    mobileMenu.classList.add("hidden"); 
    mobileMenu.classList.remove("animate-fade-in"); 
    menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16"); 
  } 
}

// Stats Updates
async function updateGitHubStats() { 
  try { 
    const res = await fetch("https://api.github.com/repos/Kjerne/Serializd-Discord-Bot"); 
    const data = await res.json(); 
    document.getElementById("stars-count").textContent = `${data.stargazers_count} Stars`; 
    document.getElementById("forks-count").textContent = `${data.forks_count} Forks`; 
  } catch {} 
}

async function updateDiscordStats() { 
  try { 
    const res = await fetch('https://discord.com/api/invites/hmrHbWCpcP?with_counts=true'); 
    const data = await res.json(); 
    document.getElementById('online-count').textContent = `${data.approximate_presence_count} Online`; 
    document.getElementById('member-count').textContent = `${data.approximate_member_count} Members`; 
  } catch {} 
}

function scrollToTop() { 
  window.scrollTo({ top: 0, behavior: "smooth" }); 
}

// Gallery Slideshow
let currentSlide = 0;

function createGallery() {
  const slides = document.getElementById('slides');
  const dots = document.getElementById('dots');
  slides.innerHTML = ''; 
  dots.innerHTML = '';
  
  for (let i = 1; i <= 10; i++) {
    slides.innerHTML += `<div class="flex-shrink-0 w-1/3 h-full flex items-center justify-center px-4"><img src="images/image${i}.png" alt="Screenshot ${i}" class="max-h-[480px] w-auto object-contain rounded-3xl"></div>`;
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all ${i===1 ? 'bg-[#14e8e8]' : 'bg-white/30'}`;
    dot.onclick = () => { currentSlide = i-1; updateCarousel(); };
    dots.appendChild(dot);
  }
  updateCarousel();
}

function updateCarousel() {
  const max = 7;
  if (currentSlide > max) currentSlide = max;
  document.getElementById('slides').style.transform = `translateX(-${currentSlide * (100 / 3)}%)`;
  Array.from(document.getElementById('dots').children).forEach((d,i) => d.className = `w-3 h-3 rounded-full transition-all ${i===currentSlide ? 'bg-[#14e8e8]' : 'bg-white/30'}`);
}

function nextSlide() { 
  currentSlide = Math.min(currentSlide + 1, 7); 
  updateCarousel(); 
}

function prevSlide() { 
  currentSlide = Math.max(currentSlide - 1, 0); 
  updateCarousel(); 
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
darkModeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

darkModeToggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  body.classList.remove('dark-mode', 'light-mode');
  body.classList.add(isDark ? 'light-mode' : 'dark-mode');
  darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Event Listeners
document.addEventListener("DOMContentLoaded", initializeWebsite);
document.addEventListener("DOMContentLoaded", () => { 
  const container = document.getElementById("commands-container"); 
  container.innerHTML = Object.entries(commandsData).map(([k, c]) => createCategoryButton(k, c)).join(''); 
});
document.addEventListener("DOMContentLoaded", updateDiscordStats);
document.addEventListener("DOMContentLoaded", createGallery);

// Mobile Menu Close on Outside Click
document.addEventListener("click", e => { 
  const mobileMenu = document.getElementById("mobileMenu"); 
  const menuButton = document.querySelector(".md\\:hidden button"); 
  if (!mobileMenu.classList.contains("hidden") && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) { 
    mobileMenu.classList.add("hidden"); 
    mobileMenu.classList.remove("animate-fade-in"); 
    document.querySelector(".menu-icon").setAttribute("d", "M4 6h16M4 12h16M4 18h16"); 
  } 
});

// GitHub Stats Auto-Update
updateGitHubStats(); 
setInterval(updateGitHubStats, 300000);
