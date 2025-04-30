// 添加必要的样式
const styles = `
  body.light-theme {
    background-color: #f8fafc;
  }

  select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    background-color: var(--card-bg);
    color: var(--foreground);
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  select:hover {
    border-color: var(--gray-300);
  }

  select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-hover);
  }

  .dark-theme select {
    background-color: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .dark-theme select:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .dark-theme select:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
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
    color: rgb(239, 68, 68);
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
document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const toolsData = [
  ]

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
    // 如果已经存在 + 添加新分类，则不需要再加下面的内容
    if (categorySelect.querySelector('option[value="new"]')) {
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
        <input type="hidden" id="tool-id" name="tool-id">
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
          <label for="icon">图标</label>
          <input type="text" id="icon" name="icon" value="public/placeholder.svg" required>
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" name="category" data-custom="allow">
            ${getCategories().map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" id="close-add-tool-modal-btn">取消</button>
          <button type="submit" class="btn btn-primary" id="submit-tool-btn">添加</button>
        </div>
      </form>
    </div>
  </div>
`;

  // 将模态框添加到body
  document.body.insertAdjacentHTML('beforeend', addToolModal);

  // 打开添加工具模态框
  function openAddToolModal(toolId = null) {
    const modal = document.getElementById('add-tool-modal');
    const form = document.getElementById('add-tool-form');
    const submitBtn = document.getElementById('submit-tool-btn');
    const modalTitle = modal.querySelector('h2');

    // 重置表单
    form.reset();
    form['tool-id'].value = '';
    submitBtn.textContent = '添加';
    modalTitle.textContent = '添加新导航';

    // 如果是编辑现有工具
    if (toolId) {
      const currentTools = getToolsData();
      const tool = currentTools.find(t => t.id === toolId);
      if (tool) {
        form['tool-id'].value = tool.id;
        form.title.value = tool.title;
        form.description.value = tool.description;
        form.url.value = tool.url;
        form.icon.value = tool.icon;
        form.category.value = tool.category;
        submitBtn.textContent = '保存';
        modalTitle.textContent = '编辑导航';
      }
    }

    modal.classList.add('active');
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
    e.preventDefault();
    const form = e.target;
    const url = form.url.value;
    const toolId = form['tool-id'].value;
    const currentTools = getToolsData();

    // 如果是编辑现有工具
    if (toolId) {
      const toolIndex = currentTools.findIndex(tool => tool.id === toolId);
      if (toolIndex !== -1) {
        // 检查URL是否与其他工具重复（排除当前工具）
        const duplicateUrl = currentTools.find(tool => tool.url === url && tool.id !== toolId);
        if (duplicateUrl) {
          alert('该网址已存在，请使用其他网址！');
          return;
        }

        currentTools[toolIndex] = {
          ...currentTools[toolIndex],
          title: form.title.value,
          icon: form.icon.value || 'public/placeholder.svg',
          description: form.description.value,
          url: url,
          category: form.category.value === 'new' ? '未分类' : form.category.value
        };
        saveToolsData(currentTools);
        renderTools();
        closeAddToolModal();
        form.reset();
        return;
      }
    }

    // 添加新工具
    const duplicateUrl = currentTools.find(tool => tool.url === url);
    if (duplicateUrl) {
      alert('该网址已存在，请勿重复添加！');
      return;
    }

    const newTool = {
      id: 'tool' + Date.now(),
      title: form.title.value,
      icon: form.icon.value || 'public/placeholder.svg',
      status: '稳定运行',
      statusColor: 'green',
      statusIndicator: 'online',
      description: form.description.value,
      views: 0,
      likes: 0,
      url: url,
      category: form.category.value === 'new' ? '未分类' : form.category.value
    };

    currentTools.unshift(newTool);
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

  function buildCardContent(tool) {
    return `
        <button class="delete-tool-btn" data-tool-id="${tool.id}">×</button>
        <div class="status-indicator ${tool.statusIndicator}"></div>
        <div class="card-top">
          <div class="tool-icon">
            <img src="${tool.icon}" alt="${tool.title}" width="54" height="54" class="tool-icon-img">
          </div>
          <div class="tool-right">
            <a class="tool-header" href="${tool.url}" target="_blank">
              <h3 class="tool-title">${tool.title}</h3>
            </a>
            <div class="tool-status green">${tool.category}</div>
          </div>
          <div class="compact-tools">
            <div class="compact-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${tool.views}</span>
            </div>
          </div>
          <div class="tool-like">
           <button class="btn btn-ghost like-btn" data-id="${tool.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </button>
          </div>
        </div>
        <div class="tool-content">
          <p class="tool-description">${tool.description}</p>
        </div>
        <div class="tool-footer">
          <div class="tool-stats">
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${tool.views}</span>
            </div>
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              <span>${tool.likes}</span>
            </div>
          </div>
          <div class="tool-actions">
            <div class="to_website edit-tool-btn" data-tool-id="${tool.id}">
              编辑
              <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2420"><path d="M884.950084 223.992517c2.362814 5.238304 4.217045 11.375072 5.687536 18.343787 1.470491 6.963599 2.172479 14.316054 2.172479 21.85782 0 7.605212-1.470491 15.146978-4.344958 22.751167-2.940982 7.608282-7.54279 14.895245-13.936407 21.862937-6.964622 7.030114-13.230326 13.101389-18.727527 18.343787-5.493108 5.238304-10.289344 9.904581-14.378475 13.994736-4.6673 4.6673-9.013281 8.757454-13.038968 12.272511L665.526629 189.795671c6.967692-6.389524 15.21247-14.126742 24.798802-23.200398 9.586332-9.012258 17.579377-16.171308 23.969924-21.411659 8.116865-6.389524 16.554024-10.929934 25.245987-13.548574 8.694009-2.622734 17.257036-3.770883 25.695219-3.515057 8.435113 0.318248 16.555048 1.594311 24.415063 3.962242 7.861038 2.301416 14.634302 4.985548 20.453844 7.860015 12.205996 6.393617 25.692149 17.641799 40.520879 33.68417C865.326141 189.730179 876.829126 206.541053 884.950084 223.992517zM206.550263 650.944516c3.452635-3.515057 11.634991-11.825326 24.352641-24.927739 12.784164-13.102413 28.761044-29.335119 47.872311-48.575322l63.597457-63.853283 70.562079-70.879304 187.206706-188.103122 162.857135 164.451446L575.790862 607.226828 506.121106 678.107155c-23.200398 22.754237-44.100404 43.591821-62.701041 62.573127-18.599613 18.983353-33.939997 34.579563-46.145993 46.786583-12.209066 12.271488-19.429515 19.240203-21.796422 21.027919-5.815449 5.241374-12.461823 10.80509-20.00359 16.620539-7.54279 5.815449-15.403828 10.478655-23.523763 13.993712-8.115841 4.093225-20.00359 9.012258-35.728736 14.894222-15.658631 5.815449-32.081673 11.502985-49.213865 17.063631-17.129122 5.562692-33.361829 10.354835-48.764634 14.44806-15.403828 4.089132-26.844392 6.707772-34.387181 7.860015-15.658631 1.726318-26.14138-0.574075-31.383778-6.967692-5.241374-6.390547-6.64535-17.191544-4.344958-32.341592 1.14815-8.179286 3.898797-19.938098 8.243755-35.407418 4.345981-15.468296 9.012258-31.510668 13.932314-48.128137 4.923126-16.617469 9.715269-31.957853 14.382569-45.955658 4.6673-13.998829 8.438183-23.647583 11.313673-28.888957 3.515057-8.182356 7.413853-15.59621 11.758812-22.308075C192.170764 666.540725 198.433398 659.126872 206.550263 650.944516zM499.029594 817.250192l77.848019 0 0 77.913511L499.029594 895.163703 499.029594 817.250192zM657.603169 817.250192l77.848019 0 0 77.913511-77.848019 0L657.603169 817.250192zM816.239166 817.250192l77.848019 0 0 77.913511-77.848019 0L816.239166 817.250192z" p-id="2421"></path></svg>
            </div>
            <a class="to_website" data-tool-id="${tool.id}" data-tool-url="${tool.url}" href="${tool.url}" target="_blank">
              访问网站
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </a>
          </div>
        </div>
      `
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
      toolCard.innerHTML = buildCardContent(tool);
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

    // 绑定访问按钮点击事件
    document.querySelectorAll('[data-tool-id]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const toolId = this.dataset.toolId;
        const url = this.dataset.toolUrl;
        const tools = JSON.parse(localStorage.getItem('toolsData'));
        const tool = tools.find(t => t.id === toolId);
        if (tool) {
          tool.views++;
          localStorage.setItem('toolsData', JSON.stringify(tools));
          renderTools();
        }
        window.open(url, '_blank');
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
    searchInput.addEventListener("input", (e) => {
      if (!currentSearchEngine.url) {
        // 对于检索本地卡片时，根据输入内容进行过滤
        const query = searchInput.value.toLowerCase()
        filterToolsBySearch(query)
      }
    })
    searchInput.onkeypress = function (e) {
      // 回车，执行搜索逻辑
      if (e.key === 'Enter') {
        e.preventDefault()
        const query = searchInput.value
        doSearch(query)
      }
    }

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

    // 从本地存储加载搜索引擎配置
    let currentSearchEngine = searchEngines[0]
    const savedSearchEngine = localStorage.getItem('searchEngine')
    if (savedSearchEngine) {
      const savedEngine = searchEngines.find(engine => engine.name === savedSearchEngine)
      if (savedEngine) {
        currentSearchEngine = savedEngine
      }
    }

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
        // 保存搜索引擎选择到本地存储
        localStorage.setItem('searchEngine', engine.name)
      })
      dropdown.appendChild(option)
    })
    searchTypeBtn.parentNode.appendChild(dropdown)

    // 初始化搜索引擎按钮文本
    searchTypeBtn.firstChild.textContent = currentSearchEngine.name + " "

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
      doSearch(searchInput.value);
    })

    function doSearch(query) {
      query = query.trim()
      if (query) {
        if (currentSearchEngine.url) {
          window.open(currentSearchEngine.url + encodeURIComponent(query), "_blank")
        } else {
          filterToolsBySearch(query)
        }
      }
    }
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
      const toolCard = document.createElement("div")
      toolCard.className = "tool-card"
      toolCard.innerHTML = buildCardContent(tool);
      toolsContainer.appendChild(toolCard)
    });
  }

  function initSettings() {
    // 从本地存储加载设置
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    document.getElementById("show-clock").checked = settings.showClock !== undefined ? settings.showClock : true;
    document.getElementById("show-bookmarks").checked = settings.showBookmarks !== undefined ? settings.showBookmarks : true;
    document.getElementById("particle-density").value = settings.particleDensity || 50;
    document.getElementById("compact-view").checked = settings.compactView !== undefined ? settings.compactView : false;
    
    // 应用卡片视图模式
    const mainContainer = document.querySelector('.main');
    if (settings.compactView) {
      mainContainer.classList.add('compact-view');
    } else {
      mainContainer.classList.remove('compact-view');
    }
  }

  function saveSettings() {
    const showClock = document.getElementById("show-clock").checked;
    const showBookmarks = document.getElementById("show-bookmarks").checked;
    const particleDensity = document.getElementById("particle-density").value;
    const compactView = document.getElementById("compact-view").checked;

    const settings = {
      showClock,
      showBookmarks,
      particleDensity,
      compactView
    };
    
    // 应用卡片视图模式
    const mainContainer = document.querySelector('.main');
    if (compactView) {
      mainContainer.classList.add('compact-view');
    } else {
      mainContainer.classList.remove('compact-view');
    }

    localStorage.setItem('settings', JSON.stringify(settings));
    // Update particle density
    particles.updateDensity(particleDensity);
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

  // 从其他页面过来的，用于自动添加导航
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('action') === 'add') {
    console.log('添加工具的URL参数:', urlParams);
    const url = urlParams.get('url');
    // 检查URL是否重复
    const currentTools = getToolsData();
    const duplicateUrl = currentTools.find(tool => tool.url === url);
    if (!duplicateUrl) {
      // 打开添加工具的模态框
      openAddToolModal();

      // 预填充表单数据
      const form = document.getElementById('add-tool-form');
      if (form) {
        form.title.value = urlParams.get('title') || '';
        form.url.value = urlParams.get('url') || '';
        form.icon.value = urlParams.get('icon') || 'public/placeholder.svg';
      }
    }
  }


  // 编辑卡片事件
  document.getElementById("tools-container").querySelectorAll('.edit-tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('按钮点击了')
      const toolId = btn.getAttribute('data-tool-id');
      openAddToolModal(toolId);
    });
  });
})
