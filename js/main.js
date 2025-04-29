// 添加必要的样式
const styles = `
  body.light-theme {
    background-color: #f8fafc;
  }
  
  .light-theme .tool-card {
    background-color: #ffffff;
    border-color: #e5e7eb;
    color: #1f2937;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .light-theme .tool-title {
    color: #1f2937;
  }

  .light-theme .tool-description {
    color: #6b7280;
  }

  .light-theme .tool-status {
    color: #1f2937;
  }

  .light-theme .tool-stats {
    color: #6b7280;
  }

  .light-theme .tool-category {
    color: #6b7280;
  }

  .light-theme .delete-tool-btn {
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.6);
  }

  .light-theme .delete-tool-btn:hover {
    background-color: rgba(239, 68, 68, 0.1);
    color: rgb(239, 68, 68);
  }
  
  .light-theme .hero-title {
    color: #1e293b;
  }
  
  .light-theme .hero-subtitle {
    color: #64748b;
  }
  .add-tool-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: transparent;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .add-tool-btn:hover {
    border-color: rgba(255, 255, 255, 0.4);
    color: rgba(255, 255, 255, 0.8);
  }
  
  .light-theme .add-tool-btn {
    border: 2px dashed rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
  }

  .light-theme .add-tool-btn:hover {
    border-color: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.7);
  }
  
  body.dark-theme {
    background-color: #0f172a;
    background-image: linear-gradient(to bottom, #0f172a, #1e293b);
  }
  
  .dark-theme .tool-card {
    background-color: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .dark-theme .tool-card:hover {
    background-color: rgba(15, 23, 42, 0.8);
  }

  .delete-tool-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.6);
    font-size: 18px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .light-theme .btn-outline {
    border-color: rgba(0, 0, 0, 0.1);
    color: #1e293b;
  }
  
  .light-theme .btn-outline:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .light-theme .btn-ghost {
    color: #64748b;
  }
  
  .light-theme .btn-ghost:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #1e293b;
  }
  
  .light-theme .particle-background {
    opacity: 0.3;
  }
  
  .dark-theme .particle-background {
    opacity: 0.6;
  }
  
  .light-theme .search-box {
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .light-theme .search-input {
    color: #1e293b;
  }
  
  .light-theme .search-input::placeholder {
    color: #94a3b8;
  }
  
  .light-theme .search-btn {
    background-color: #3b82f6;
    color: #ffffff;
  }
  
  .light-theme .search-type-btn {
    color: #64748b;
  }
  
  .light-theme .category-tab {
    background-color: rgba(0, 0, 0, 0.05);
    color: #64748b;
  }
  
  .light-theme .category-tab.active {
    background-color: #3b82f6;
    color: #ffffff;
  }

  .tool-card:hover .delete-tool-btn {
    display: flex;
  }

  .delete-tool-btn:hover {
    background: rgba(239, 68, 68, 0.2);
    color: rgb(239, 68, 68);
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
  }

  .modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background: rgb(17, 24, 39);
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .light-theme .modal-content {
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .light-theme .modal h2 {
    color: #1e293b;
  }
  
  .light-theme .form-group label {
    color: #64748b;
  }
  
  .light-theme .form-group input,
  .light-theme .form-group textarea {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.02);
    color: #1e293b;
  }

  .modal h2 {
    margin: 0 0 20px;
    color: rgba(255, 255, 255, 0.9);
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.6);
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }

  .tool-card {
    position: relative;
  }
`;

// 将样式添加到head
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// 添加主题切换监听
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  });
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

// 页面加载时初始化主题
document.addEventListener('DOMContentLoaded', initTheme);

document.addEventListener("DOMContentLoaded", () => {
  // Declare toolsData (replace with actual data or import)
  const toolsData = [
    {
      id: "tool1",
      title: "AI Tool 1",
      icon: "img/icon.svg",
      status: "稳定运行",
      statusColor: "green",
      statusIndicator: "online",
      description: "This is a description of AI Tool 1.",
      views: 1234,
      likes: 56,
      url: "https://example.com/tool1",
      category: "AI 聊天",
    },
    {
      id: "tool2",
      title: "AI Tool 2",
      icon: "img/icon.svg",
      status: "维护中",
      statusColor: "orange",
      statusIndicator: "maintenance",
      description: "This is a description of AI Tool 2.",
      views: 5678,
      likes: 78,
      url: "https://example.com/tool2",
      category: "AI 聊天",
    },
  ]

  // Declare ParticleSystem (replace with actual class definition or import)
  class ParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId)
      this.ctx = this.canvas.getContext("2d")
      this.particles = []
      this.density = 50 // Default density
      this.init()
    }

    init() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.createParticles()
      this.animate()
    }

    createParticles() {
      this.particles = []
      const numParticles = (this.canvas.width * this.canvas.height) / (2000 - this.density * 20) // Adjust divisor for density
      for (let i = 0; i < numParticles; i++) {
        this.particles.push(new Particle(this.canvas.width, this.canvas.height))
      }
    }

    updateDensity(density) {
      this.density = density
      this.createParticles() // Re-create particles with new density
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.particles.forEach((particle) => {
        particle.update()
        particle.draw(this.ctx)
      })
      requestAnimationFrame(() => this.animate())
    }
  }

  class Particle {
    constructor(width, height) {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.size = Math.random() * 2 + 1
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > window.innerWidth) {
        this.speedX = -this.speedX
      }
      if (this.y < 0 || this.y > window.innerHeight) {
        this.speedY = -this.speedY
      }
    }

    draw(ctx) {
      // 根据主题设置不同的粒子颜色和透明度
      const isLightTheme = document.body.classList.contains('light-theme')
      if (isLightTheme) {
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)" // 浅蓝色粒子用于白天模式
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)" // 白色粒子用于夜间模式
      }
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }
  }

  // Initialize particle system with starlight effect
  const particles = new ParticleSystem("particle-canvas", {
    particleDensity: 20000,
    particleSize: { min: 0.1, max: 2 },
    particleSpeed: { min: -0.05, max: 0.05 },
    particleOpacity: { min: 0.2, max: 0.8 },
    connectionDistance: 150,
    mouseInfluenceDistance: 200,
    mouseForce: 0.01,
    twinkleSpeed: 0.05
  })

  // Render tools
  renderTools()

  // Setup event listeners
  setupEventListeners()

  // Initialize settings from storage
  initSettings()

  // 从本地存储获取工具数据，如果不存在则使用默认数据
  function getToolsData() {
    const storedData = localStorage.getItem('toolsData')
    return storedData ? JSON.parse(storedData) : toolsData
  }

  function getCategories() {
    const tools = getToolsData();
    const categories = new Set();
    tools.forEach(tool => categories.add(tool.category));
    return Array.from(categories);
  }

  function renderCategoryTabs() {
    const categories = getCategories();
    const tabsContainer = document.querySelector('.category-tabs');
    tabsContainer.innerHTML = '';

    // 添加'全部'分类
    const allTab = document.createElement('button');
    allTab.className = 'category-tab active';
    allTab.textContent = '全部';
    tabsContainer.appendChild(allTab);

    // 动态生成其他分类标签
    categories.forEach(category => {
      const tab = document.createElement('button');
      tab.className = 'category-tab';
      tab.textContent = category;
      tabsContainer.appendChild(tab);
    });
    console.log('Category tabs rendered successfully');
    initCategoryFilterListener()
  }

  // 渲染工具
  renderCategoryTabs();

  // 处理分类选择
  function handleCategorySelect() {
    const categorySelect = document.getElementById('category');
    if (!categorySelect) {
      console.error('Category select element not found');
      return;
    }
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = '+ 添加新分类';
    categorySelect.appendChild(newOption);
    categorySelect.addEventListener('change', (e) => {
      if (e.target.value === 'new') {
        const newCategory = prompt('请输入新分类名称：');
        if (newCategory) {
          const option = document.createElement('option');
          option.value = newCategory;
          option.textContent = newCategory;
          categorySelect.insertBefore(option, categorySelect.lastChild);
          categorySelect.value = newCategory;
        }
      }
    });
  }

  // 初始化分类选择事件
  handleCategorySelect();

  // 保存工具数据到本地存储
  function saveToolsData(data) {
    localStorage.setItem('toolsData', JSON.stringify(data))
  }

  // 添加导航卡片的模态框HTML
  const addToolModal = `
  <div id="add-tool-modal" class="modal">
    <div class="modal-content">
      <h2>添加新导航</h2>
      <form id="add-tool-form">
        <div class="form-group">
          <label for="title">标题</label>
          <input type="text" id="title" name="title" required>
        </div>
        <div class="form-group">
          <label for="description">描述</label>
          <textarea id="description" name="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="url">网址</label>
          <input type="url" id="url" name="url" required>
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" name="category" data-custom="allow">
            ${getCategories().map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" id="close-add-tool-modal-btn">取消</button>
          <button type="submit" class="btn btn-primary">添加</button>
        </div>
      </form>
    </div>
  </div>
`;

  // 将模态框添加到body
  document.body.insertAdjacentHTML('beforeend', addToolModal);

  // 打开添加工具模态框
  function openAddToolModal() {
    document.getElementById('add-tool-modal').classList.add('active');
    handleCategorySelect();
  }

  // 关闭添加工具模态框
  function closeAddToolModal() {
    console.log('关闭添加工具模态框')
    document.getElementById('add-tool-modal').classList.remove('active');
  }

  // 添加关闭按钮事件监听
  const closeBtn = document.getElementById('close-add-tool-modal-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAddToolModal);
  }

  // 处理添加工具表单提交
  function handleAddToolSubmit(e) {
    console.log('添加到导航卡片中')
    e.preventDefault();
    const form = e.target;
    const newTool = {
      id: 'tool' + Date.now(),
      title: form.title.value,
      icon: 'img/icon.svg',
      status: '稳定运行',
      statusColor: 'green',
      statusIndicator: 'online',
      description: form.description.value,
      views: 0,
      likes: 0,
      url: form.url.value,
      category: form.category.value
    };

    const currentTools = getToolsData();
    currentTools.unshift(newTool); // 将新工具添加到数组开头
    saveToolsData(currentTools);
    renderTools();
    closeAddToolModal();
    form.reset();
  }

  // 添加表单提交事件监听
  const addToolForm = document.getElementById('add-tool-form');
  if (addToolForm) {
    addToolForm.addEventListener('submit', handleAddToolSubmit);
  }

  // 删除工具
  function deleteTool(toolId) {
    console.log('准备删除导航信息:', toolId);
    if (confirm('确定要删除这个导航吗？')) {
      const currentTools = getToolsData();
      const updatedTools = currentTools.filter(tool => tool.id !== toolId);
      saveToolsData(updatedTools);
      renderTools();
    }
  }

  function renderTools() {
    const toolsContainer = document.getElementById("tools-container")
    toolsContainer.innerHTML = ""

    const currentToolsData = getToolsData()
    renderFilteredTools(currentToolsData)
  }

  function renderFilteredTools(filteredTools) {
    const toolsContainer = document.getElementById("tools-container")
    toolsContainer.innerHTML = ""
    if (filteredTools.length === 0) {
      toolsContainer.innerHTML = '<div class="no-results">没有找到匹配的工具</div>'
      return
    }


    filteredTools.forEach((tool) => {
      const toolCard = document.createElement("div")
      toolCard.className = "tool-card"
      toolCard.innerHTML = `
        <button class="delete-tool-btn" data-tool-id="${tool.id}">×</button>
        <div class="status-indicator ${tool.statusIndicator}"></div>
        <div class="tool-header">
          <div class="tool-icon">
            <img src="${tool.icon}" alt="${tool.title}" width="20" height="20">
          </div>
          <h3 class="tool-title">${tool.title}</h3>
        </div>
        <div class="tool-status green">${tool.category}</div>
        <button class="btn btn-ghost like-btn" data-id="${tool.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
        </button>
        <p class="tool-description">${tool.description}</p>
        <div class="tool-footer">
          <div class="tool-stats">
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${tool.views} 次访问</span>
            </div>
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              <span>${tool.likes}</span>
            </div>
          </div>
          <div class="tool-actions">
            <a class="btn btn-ghost" onclick="window.open('${tool.url}', '_blank')" href="${tool.url}" target="_blank">
              访问网站
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          </div>
        </div>
      `
      toolsContainer.appendChild(toolCard)
    })


    // 为每个工具卡片添加删除按钮事件监听
    toolsContainer.querySelectorAll('.delete-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        console.log('删除按钮被点击'); // Log for debugging purpose
        const toolId = btn.getAttribute('data-tool-id');
        deleteTool(toolId);
      });
    });

    // Add event listeners to like buttons
    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        const toolId = btn.getAttribute("data-id")
        toggleLike(toolId)
      })
    })
  }

  function toggleLike(toolId) {
    const currentToolsData = getToolsData()
    const tool = currentToolsData.find((t) => t.id === toolId)
    if (tool) {
      tool.likes = parseInt(tool.likes) + 1
      saveToolsData(currentToolsData)
      renderTools()
    }

    // Toggle button style
    const btn = document.querySelector(`.like-btn[data-id="${toolId}"]`)
    if (btn) {
      btn.classList.toggle("liked")
      if (btn.classList.contains("liked")) {
        btn.querySelector("svg").setAttribute("fill", "currentColor")
        btn.style.color = "#ef4444"
      } else {
        btn.querySelector("svg").setAttribute("fill", "none")
        btn.style.color = ""
      }
    }
  }

  function initCategoryFilterListener() {
    // Category tabs
    document.querySelectorAll(".category-tab").forEach((tab) => {
      console.log('添加点击:', tab)
      tab.addEventListener("click", () => {
        document.querySelectorAll(".category-tab").forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
        filterToolsByCategory(tab.textContent.trim())
      })
    })
  }

  function setupEventListeners() {
    // Bookmarks and History buttons
    const bookmarksBtn = document.getElementById("bookmarks-btn");
    const historyBtn = document.getElementById("history-btn");

    bookmarksBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "chrome://bookmarks/" });
    });

    historyBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "chrome://history/" });
    });

    // Settings modal
    const settingsBtn = document.getElementById("settings-btn")
    const settingsModal = document.getElementById("settings-modal")
    const closeBtn = document.querySelector(".close-btn")
    const saveSettingsBtn = document.getElementById("save-settings")
    const addNavBtn = document.getElementById("add-nav-btn")

    settingsBtn.addEventListener("click", () => {
      settingsModal.classList.add("active")
    })

    closeBtn.addEventListener("click", () => {
      settingsModal.classList.remove("active")
    })

    // Close modal when clicking outside
    settingsModal.addEventListener("click", (e) => {
      if (e.target === settingsModal) {
        settingsModal.classList.remove("active")
      }
    })

    // Save settings
    saveSettingsBtn.addEventListener("click", () => {
      saveSettings()
      settingsModal.classList.remove("active")
    })

    addNavBtn.addEventListener("click", () => {
      openAddToolModal()
    })

    // Particle density slider
    const densitySlider = document.getElementById("particle-density")
    densitySlider.addEventListener("input", () => {
      particles.updateDensity(densitySlider.value)
    })

    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle")
    themeToggle.addEventListener("click", () => {
      toggleTheme()
    })

    initCategoryFilterListener();

    // Search functionality
    const searchInput = document.querySelector(".search-input")
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase()
      filterToolsBySearch(query)
    })

    // Search engine dropdown
    const searchTypeBtn = document.querySelector(".search-type-btn")
    const searchEngines = [
      { name: "站内", url: null },
      { name: "百度", url: "https://www.baidu.com/s?wd=" },
      { name: "谷歌", url: "https://www.google.com/search?q=" },
      { name: "必应", url: "https://www.bing.com/search?q=" },
      { name: "搜狗", url: "https://www.sogou.com/web?query=" },
      { name: "360", url: "https://www.so.com/s?q=" }
    ]
    let currentSearchEngine = searchEngines[0]

    // Create dropdown menu
    const dropdown = document.createElement("div")
    dropdown.className = "search-type-dropdown"
    searchEngines.forEach(engine => {
      const option = document.createElement("div")
      option.className = "search-type-option"
      option.textContent = engine.name
      option.addEventListener("click", () => {
        currentSearchEngine = engine
        searchTypeBtn.firstChild.textContent = engine.name + " "
        dropdown.classList.remove("active")
      })
      dropdown.appendChild(option)
    })
    searchTypeBtn.parentNode.appendChild(dropdown)

    searchTypeBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      dropdown.classList.toggle("active")
    })

    document.addEventListener("click", () => {
      dropdown.classList.remove("active")
    })

    // Search button
    const searchBtn = document.querySelector(".search-btn")
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim()
      if (query) {
        if (currentSearchEngine.url) {
          window.open(currentSearchEngine.url + encodeURIComponent(query), "_blank")
        } else {
          filterToolsBySearch(query)
        }
      }
    })
  }

  function filterToolsByCategory(category) {
    const currentToolsData = getToolsData()
    if (category === "全部") {
      renderTools()
    } else {
      const filteredTools = currentToolsData.filter(tool => tool.category === category)
      renderFilteredTools(filteredTools)
    }
  }

  function filterToolsBySearch(query) {
    if (!query) {
      renderTools()
      return
    }

    const currentToolsData = getToolsData()
    const filteredTools = currentToolsData.filter(
      (tool) => tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query),
    )

    const toolsContainer = document.getElementById("tools-container")
    toolsContainer.innerHTML = ""

    if (filteredTools.length === 0) {
      toolsContainer.innerHTML = '<div class="no-results">没有找到匹配的工具</div>'
      return
    }

    filteredTools.forEach((tool) => {
      // Same rendering logic as in renderTools()
      const toolCard = document.createElement("div")
      toolCard.className = "tool-card"

      // Same HTML structure as in renderTools()
      toolCard.innerHTML = `
        <button class="delete-tool-btn" data-tool-id="${tool.id}">×</button>
        <div class="status-indicator ${tool.statusIndicator}"></div>
        <div class="tool-header">
          <div class="tool-icon">
            <img src="${tool.icon}" alt="${tool.title}" width="20" height="20">
          </div>
          <h3 class="tool-title">${tool.title}</h3>
        </div>
        <div class="tool-status ${tool.statusColor}">${tool.status}</div>
        <p class="tool-description">${tool.description}</p>
        <div class="tool-footer">
          <div class="tool-stats">
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${tool.views} 次访问</span>
            </div>
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              <span>${tool.likes}</span>
            </div>
          </div>
          <div class="tool-actions">
            <button class="btn btn-ghost" onclick="window.open('${tool.url}', '_blank')">
              访问网站
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </button>
            <button class="btn btn-ghost like-btn" data-id="${tool.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </button>
          </div>
        </div>
        <div class="tool-category">${tool.category}</div>
      `

      toolsContainer.appendChild(toolCard)
    })
  }

  function initSettings() {
    // In a real extension, this would load from chrome.storage
    // For demo, we'll use default values
    document.getElementById("show-clock").checked = true
    document.getElementById("show-bookmarks").checked = true
    document.getElementById("particle-density").value = 50
  }

  function saveSettings() {
    // In a real extension, this would save to chrome.storage
    const showClock = document.getElementById("show-clock").checked
    const showBookmarks = document.getElementById("show-bookmarks").checked
    const particleDensity = document.getElementById("particle-density").value

    console.log("Settings saved:", { showClock, showBookmarks, particleDensity })

    // Update particle density
    particles.updateDensity(particleDensity)
  }

  function toggleTheme() {
    document.body.classList.toggle('dark-theme')
    const isDark = document.body.classList.contains('dark-theme')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    // Update theme toggle button icon
    const themeToggleIcon = document.querySelector('#theme-toggle svg')
    if (themeToggleIcon) {
      themeToggleIcon.style.fill = isDark ? 'currentColor' : 'none'
    }
  }

  // Initialize theme
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme')
  }
})
