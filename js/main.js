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
  // 共享按钮点击事件
  document.getElementById('share-btn').addEventListener('click', function () {
    window.location.href = 'share.html';
  });

  initDevId();
  initTheme();

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
  renderFavorites();
  renderTools()

  initSettings();
  updateSloganShow();

  let TOTAL_CATEGORY = [];
  // 从本地存储获取工具数据，如果不存在则使用默认数据
  function getToolsData(resolve) {
    cacheGetToolsData().then(tools => {
      autoUpdateCategory(tools);
      resolve(tools)
    })
  }

  // 自动更新分类信息
  function autoUpdateCategory(tools) {
    const categories = new Set();
    tools.forEach(tool => categories.add(tool.category));
    let hasChange;
    categories.forEach(category => {
      if (!TOTAL_CATEGORY.includes(category)) {
        hasChange = true;
      }
    });

    if (TOTAL_CATEGORY.length !== categories.size || hasChange) {
      TOTAL_CATEGORY = Array.from(categories);
      renderCategoryTabs();
      console.log('当前的分类信息:', TOTAL_CATEGORY)
    }
  }

  // 当前的分类
  function getCategories() {
    return TOTAL_CATEGORY;
  }

  function renderCategoryTabs() {
    const categories = getCategories();
    console.log('Rendering category tabs...', categories);
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

  // 处理分类选择
  function handleCategorySelect() {
    const categorySelect = document.getElementById('category');
    if (!categorySelect) {
      console.warn('Category select element not found');
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

  // ---------------------------------------------------------- 单个卡片编辑代码开始 ---------------------------------------------
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
          <input type="text" id="icon" name="icon" value="public/placeholder.svg">
        </div>
        <div class="form-group">
          <label for="sort">排序(值越大，越排在前面)</label>
          <input type="number" id="sort" name="sort" value="0" required>
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

  // 编辑卡片事件 - 使用事件委托
  document.getElementById("tools-container").addEventListener('click', (e) => {
    e.preventDefault();
    const editBtn = e.target.closest('.edit-tool-btn');
    if (editBtn) {
      const toolId = editBtn.getAttribute('data-tool-id');
      openAddToolModal(toolId);
    }
  });

  // 打开添加工具模态框
  function openAddToolModal(toolId = null) {
    const modal = document.getElementById('add-tool-modal');
    const form = document.getElementById('add-tool-form');
    const submitBtn = document.getElementById('submit-tool-btn');
    const modalTitle = modal.querySelector('h2');

    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';
    getCategories().forEach(c => {
      const option = document.createElement('option');
      option.value = c;
      option.textContent = c;
      categorySelect.appendChild(option);
    });

    // 重置表单
    form.reset();
    form['tool-id'].value = '';
    submitBtn.textContent = '添加';
    modalTitle.textContent = '添加新导航';

    // 如果是编辑现有工具
    if (toolId) {
      getToolsData(currentTools => {
        const tool = currentTools.find(t => t.id === toolId);
        console.log('准备编辑的工具:', tool);
        if (tool) {
          form['tool-id'].value = tool.id;
          form.title.value = tool.title;
          form.description.value = tool.description;
          form.url.value = tool.url;
          form.icon.value = tool.icon;
          form.category.value = tool.category;
          form.sort.value = tool.sort || 0;
          submitBtn.textContent = '保存';
          modalTitle.textContent = '编辑导航';
        }
      })
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
  document.getElementById('add-tool-modal').addEventListener('click', function (e) {
    if (e.target === this) {
      closeAddToolModal();
    }
  });

  // 处理添加工具表单提交
  function handleAddToolSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const url = form.url.value;
    const toolId = form['tool-id'].value;
    getToolsData(currentTools => {
      if (toolId) {
        // 如果是编辑现有工具
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
            sort: form.sort.value || 0,
            description: form.description.value,
            url: url,
            category: form.category.value === 'new' ? '未分类' : form.category.value
          };
          console.log('更新后的工具:', currentTools[toolIndex]);
          cacheSaveToolsData(currentTools).then(() => {
            renderTools();
            closeAddToolModal();
            form.reset();
          });
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
        sort: form.sort.value || 0,
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
      cacheSaveToolsData(currentTools).then(() => {
        renderTools();
        closeAddToolModal();
        form.reset();
      });
    })
  }

  // 添加表单提交事件监听
  const addToolForm = document.getElementById('add-tool-form');
  if (addToolForm) {
    addToolForm.addEventListener('submit', handleAddToolSubmit);
  }
  // ---------------------------------------------------------- 单个卡片编辑代码结束 ---------------------------------------------


  // ---------------------------------------------------------- 分享相关代码 ---------------------------------------------

  // 分享导航卡片的模态框HTML
  const shareToolModal = `
  <div id="share-tool-modal" class="modal">
    <div class="modal-content">
      <h2>分享导航卡片</h2>
      <div class="share-tool-info">
        <div class="share-tool-header">
          <img id="share-tool-icon" src="" alt="工具图标" class="share-tool-icon">
          <h3 id="share-tool-title"></h3>
        </div>
        <p id="share-tool-description" class="share-tool-description"></p>
        <div class="share-tool-meta">
          <span id="share-tool-category"></span>
          <span id="share-tool-url"></span>
        </div>
        <div>
          <span id="share-num">分享卡片数：</span>
        </div>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-ghost" id="close-share-tool-modal-btn">取消</button>
        <button type="button" class="btn btn-primary" id="confirm-share-tool-btn">确认分享</button>
      </div>
    </div>
  </div>
  `;
  // 将分享模态框添加到body
  document.body.insertAdjacentHTML('beforeend', shareToolModal);

  // 打开分享工具模态框
  function openShareToolModal(toolId, category) {
    const modal = document.getElementById('share-tool-modal');
    getToolsData(currentTools => {
      if (toolId) {
        const tool = currentTools.find(t => t.id === toolId);
        if (tool) {
          document.querySelector('.share-tool-info').setAttribute('data-tool-id', toolId);
          document.getElementById('share-tool-icon').src = tool.icon;
          document.getElementById('share-tool-icon').style.display = 'inline-block';
          document.getElementById('share-tool-title').textContent = tool.title;
          document.getElementById('share-tool-description').textContent = tool.description;
          document.getElementById('share-tool-category').textContent = tool.category;
          document.getElementById('share-tool-url').textContent = tool.url;
          document.getElementById('share-num').style.display = 'none';
          modal.classList.add('active');
        }
      } else {
        document.getElementById('share-tool-title').textContent = ''
        document.getElementById('share-tool-description').textContent = ''
        document.querySelector('.share-tool-info').removeAttribute('data-tool-id');
        const categoryDiv = document.getElementById('share-tool-category');
        categoryDiv.textContent = '共享分组:' + category;
        categoryDiv.setAttribute('data-category', category);
        document.getElementById('share-tool-icon').style.display = 'none';
        const shareNum = document.getElementById('share-num')
        shareNum.style.display = 'block';
        shareNum.textContent = '预计分享导航：' + currentTools.filter(t => t.category === category).length + '个到共享大厅~';
        modal.classList.add('active');
      }
    });
  }

  // 关闭分享工具模态框
  function closeShareToolModal() {
    document.getElementById('share-tool-modal').classList.remove('active');
  }

  // 添加关闭按钮事件监听
  const closeShareBtn = document.getElementById('close-share-tool-modal-btn');
  if (closeShareBtn) {
    closeShareBtn.addEventListener('click', closeShareToolModal);
  }

  document.getElementById('share-tool-modal').addEventListener('click', function (e) {
    if (e.target === this) {
      closeShareToolModal();
    }
  });

  // 添加确认分享按钮事件监听
  const confirmShareBtn = document.getElementById('confirm-share-tool-btn');
  if (confirmShareBtn) {
    confirmShareBtn.addEventListener('click', () => {
      getToolsData(async currentTools => {
        const toolId = document.querySelector('.share-tool-info').getAttribute('data-tool-id');
        if (toolId) {
          const tool = currentTools.find(t => t.id === toolId);
          console.log('准备分享的工具:', toolId, tool); // 打印工具的详细信息，包括icon、title、description、category、url等
          if (!tool) {
            toast.warning('未找到需要分享的卡片!');
            closeShareToolModal();
            return;
          }
          try {
            const ans = await postJson('/api/nav/submit', {
              title: tool.title.length >= 125 ? tool.title.substring(0, 120) + '...' : tool.title,
              icon: tool.icon,
              intro: tool.description.length >= 500 ? tool.description.substring(0, 500) + '...' : tool.description,
              category: tool.category.length > 60 ? tool.category.substring(0, 60) + '...' : tool.category,
              url: tool.url,
              author: 'HuHui',
            })
            if (ans) {
              toast.success('分享成功');
              closeShareToolModal();
            } else {
              toast.error('分享失败，请稍后再试');
            }
          } catch (e) {
            console.error('分享失败:', e);
            toast.error('分享失败:' + e.message);
            closeShareToolModal();
          }
        } else {
          // 分类的方式进行分享
          const category = document.getElementById('share-tool-category').getAttribute('data-category');
          // 从 currentTools 中过滤出分组对应的导航数据
          const params = []
          for (var tool of currentTools) {
            if (tool.category == category) {
              params.push({
                title: tool.title.length >= 125? tool.title.substring(0, 120) + '...' : tool.title,
                icon: tool.icon,
                intro: tool.description.length >= 500? tool.description.substring(0, 500) + '...' : tool.description,
                category: tool.category.length > 60? tool.category.substring(0, 60) + '...' : tool.category,
                url: tool.url,
                author: 'HuHui',
              })
            }
          }

          try {
            const ans = await postJson('/api/nav/batchSubmit', params);
            if (ans) {
              toast.success('分享成功');
              closeShareToolModal();
            } else {
              toast.error('分享失败，请稍后再试');
            }
          } catch (e) {
            console.error('分享失败:', e);
            toast.error('分享失败:' + e.message);
            closeShareToolModal();
          }
        }
      });
    });
  }

  // 为所有分享按钮添加点击事件
  document.addEventListener('click', function (e) {
    if (e.target.closest('.share-btn')) {
      const toolId = e.target.closest('.share-btn').getAttribute('data-id');
      openShareToolModal(toolId, null);
    }
  });

  // ---------------------------------------------------------- 分享相关代码 - 结束 ---------------------------------------------


  function renderTools() {
    const toolsContainer = document.getElementById("tools-container")
    toolsContainer.innerHTML = ""

    // 如果当前选中了分类
    const currentCategory = document.querySelector('.category-tab.active').textContent;
    if (currentCategory && currentCategory != '全部') {
      filterToolsByCategory(currentCategory)
    } else {
      getToolsData(currentToolsData => renderFilteredTools(currentToolsData))
    }
  }

  // 获取收藏的工具列表
  function getFavorites() {
    return new Promise((resolve) => {
      getToolsData(currentTools => {
        const favoriteTools = currentTools.filter(tool => tool.likes > 0);
        // 按照sort字段进行排序
        favoriteTools.sort((a, b) => b.sort - a.sort);
        resolve(favoriteTools);
      });
    });
  }

  // 检查工具是否已收藏
  function isFavorited(tool) {
    if (!tool) return false;
    return (tool.likes || 0) > 0;
  }

  // 渲染收藏区域
  function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');

    getFavorites().then(favoriteTools => {
      // 如果没有收藏工具，则隐藏 “favorites-section”
      if (favoriteTools.length === 0) {
        console.log('没有收藏工具，隐藏 “favorites-section”');
        document.getElementById('favorites-section').style.display = 'none';
        setupEventListeners();
        return;
      } else {
        document.getElementById('favorites-section').style.display = 'block';
      }

      // 收藏区域，只显示头像和标题
      favoritesContainer.innerHTML = '';
      favoritesContainer.innerHTML = favoriteTools.map(tool => {
        const cardElement = document.createElement('div');
        cardElement.className = 'fav-tool-card';
        cardElement.innerHTML = `
              <a href="${tool.url}" target="_blank" data-mark-link-tool-id="${tool.id}" data-tool-url="${tool.url}" class="fav-tool-card-content">
                <img src="${tool.icon}" alt="${tool.title}" class="fav-tool-icon-img">
                ${tool.title}
              </a>
        `;
        return cardElement.outerHTML;
      }).join('');

      // 重新绑定事件监听器
      setupEventListeners();
      // 绑定访问按钮点击事件,执行访问次数+1
      document.querySelectorAll('[data-mark-link-tool-id]').forEach(btn => {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          const toolId = this.dataset.markLinkToolId;
          const url = this.dataset.toolUrl;
          getToolsData(tools => {
            const tool = tools.find(t => t.id === toolId);
            if (tool) {
              tool.views++;
              // 保存卡片数据
              cacheSaveToolsData(tools).then(() => {
                renderTools();
              });
            }
            window.open(url, '_blank');
          });
        });
      });
    });
  }

  function showViewNum(num) {
    if (num > 1000_000) {
      return (num / 1000_000).toFixed(2) + 'm';
    }  else if (num > 1000) {
      return (num / 1000).toFixed(1) +'k';
    } else {
      return num;
    }
  }

  function buildCardContent(tool) {
    // 极简模式下，只展示文字
    let simpleMode = getViewmode() == ViewMode.TEXT;
    if (simpleMode) {
      return `
      <a class="tool-header" href="${tool.url}" target="_blank" data-link-tool-id="${tool.id}" data-tool-url="${tool.url}">
              <h3 class="tool-title">${tool.title}</h3>
            </a>
      `
    }

    const isFavorite = isFavorited(tool.id);
    return `
        <button class="delete-tool-btn" data-tool-id="${tool.id}">×</button>
        <div class="status-indicator ${tool.statusIndicator}"></div>
        <div class="card-top">
          <div class="tool-icon">
            <img src="${tool.icon}" alt="${tool.title}" width="54" height="54" class="tool-icon-img">
          </div>
          <div class="tool-right">
            <a class="tool-header" href="${tool.url}" target="_blank" data-link-tool-id="${tool.id}" data-tool-url="${tool.url}">
              <h3 class="tool-title">${tool.title}</h3>
            </a>
            <div class="tool-status green">${tool.category}</div>
          </div>
          <div class="compact-tools-view">
            <div class="compact-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${showViewNum(tool.views)}</span>
            </div>
          </div>
          <div class="tool-like">
           <button class="btn btn-ghost like-btn ${isFavorite ? 'active' : ''}" data-id="${tool.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
            </button>
          </div>
          <div class="tool-share">
            <button class="btn btn-ghost share-btn" data-id="${tool.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
            </button>
          </div>
        </div>
        <div class="tool-content" style="display:${tool.description ? 'block' : 'none'}">
          <p class="tool-description">${tool.description}</p>
        </div>
        <div class="tool-footer">
          <div class="tool-stats">
            <div class="stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>${tool.views}</span>
            </div>
            <div class="stat">
              <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3144"><path d="M256 207.616a42.688 42.688 0 0 1-56.768-60.672l6.912-9.6c3.968-5.248 9.792-12.48 16.64-19.712 6.592-6.848 15.808-15.424 26.688-21.888 9.792-5.824 29.312-14.912 52.032-7.808a53.12 53.12 0 0 1 27.904 20.224 62.08 62.08 0 0 1 9.984 24.448c1.92 10.56 1.92 23.488 1.92 33.6v196.48c0 7.936 0 11.968 1.728 14.912a12.8 12.8 0 0 0 4.672 4.672C350.72 384 354.752 384 362.688 384a42.688 42.688 0 1 1 0 85.312h-128a42.688 42.688 0 1 1 0-85.312c7.936 0 11.968 0 14.912-1.728a12.8 12.8 0 0 0 4.672-4.672C256 374.656 256 370.624 256 362.688V207.616zM296.512 554.688H300.8c18.24 0 35.52 0 49.664 1.6 15.36 1.856 33.536 6.208 49.152 19.84 16.384 14.4 22.528 32.384 24.96 48.448 2.112 13.44 2.112 29.504 2.112 45.056v117.12c0 24 0 46.656-2.88 65.152-3.2 21.12-10.88 42.688-30.464 59.776-18.688 16.384-40.96 22.144-62.08 24.64-19.968 2.304-44.8 2.304-72.896 2.304h-45.056a42.688 42.688 0 0 1 0-85.312H256c31.232 0 50.88-0.064 65.28-1.728 13.44-1.6 15.808-4.032 15.872-4.096l0.064-0.064a31.104 31.104 0 0 0 2.24-8.448 190.72 190.72 0 0 0 1.664-24.064c0.256-11.904 0.384-17.92-3.392-21.76-3.712-3.84-9.856-3.84-22.016-3.84h-19.328c-18.176 0-35.392 0-49.536-1.664-15.36-1.792-33.536-6.144-49.088-19.84-16.448-14.336-22.592-32.32-25.024-48.384a313.28 313.28 0 0 1-2.048-45.056v-4.736c0-15.552 0-31.616 2.048-45.056 2.432-16.064 8.576-34.048 24.96-48.448 15.616-13.632 33.792-17.984 49.152-19.84 14.144-1.664 31.424-1.664 49.664-1.6z m19.2 149.312c12.096 0 18.112 0 21.888-3.776 3.712-3.712 3.712-9.792 3.712-21.824v-6.4c0-8.96 0-16-0.128-22.08a154.688 154.688 0 0 0-0.512-8.64 0.256 0.256 0 0 0-0.192-0.192A417.28 417.28 0 0 0 298.688 640c-21.184 0-33.28 0-41.856 1.088a0.256 0.256 0 0 0-0.192 0.192c-0.192 2.24-0.384 5.056-0.448 8.64C256 656 256 663.04 256 672c0 8.96 0 16 0.192 22.016 0.064 3.648 0.256 6.4 0.448 8.704 0 0.064 0.064 0.192 0.192 0.192 8.576 1.024 20.672 1.088 41.856 1.088h17.024zM714.88 128c23.616 0 42.688 19.072 42.688 42.624V704h24.896c7.488 0 16.64 0 24.192 0.896h0.128c5.44 0.704 30.016 3.84 41.728 27.904 11.712 24.192-1.152 45.44-3.968 50.112l-0.128 0.192a212.48 212.48 0 0 1-14.336 19.84l-1.024 1.28c-12.544 16-28.8 36.672-45.12 53.376a187.52 187.52 0 0 1-27.2 23.68c-8.768 6.016-23.68 14.72-42.048 14.72-18.368 0-33.28-8.704-42.112-14.72a187.648 187.648 0 0 1-27.2-23.68c-16.256-16.64-32.512-37.312-45.12-53.376l-1.024-1.28c-4.672-6.016-10.432-13.312-14.336-19.84l-0.128-0.128c-2.752-4.672-15.616-25.984-3.904-50.176 11.712-24.128 36.224-27.2 41.6-27.84h0.192c7.552-0.96 16.768-0.96 24.256-0.96h25.344V170.624c0-23.552 19.072-42.624 42.688-42.624z" fill="#333333" p-id="3145"></path></svg>
              <span>${tool.sort || 0}</span>
            </div>
          </div>
          <div class="tool-actions">
            <div class="edit-tool-btn" data-tool-id="${tool.id}">
              编辑
              <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2420"><path d="M884.950084 223.992517c2.362814 5.238304 4.217045 11.375072 5.687536 18.343787 1.470491 6.963599 2.172479 14.316054 2.172479 21.85782 0 7.605212-1.470491 15.146978-4.344958 22.751167-2.940982 7.608282-7.54279 14.895245-13.936407 21.862937-6.964622 7.030114-13.230326 13.101389-18.727527 18.343787-5.493108 5.238304-10.289344 9.904581-14.378475 13.994736-4.6673 4.6673-9.013281 8.757454-13.038968 12.272511L665.526629 189.795671c6.967692-6.389524 15.21247-14.126742 24.798802-23.200398 9.586332-9.012258 17.579377-16.171308 23.969924-21.411659 8.116865-6.389524 16.554024-10.929934 25.245987-13.548574 8.694009-2.622734 17.257036-3.770883 25.695219-3.515057 8.435113 0.318248 16.555048 1.594311 24.415063 3.962242 7.861038 2.301416 14.634302 4.985548 20.453844 7.860015 12.205996 6.393617 25.692149 17.641799 40.520879 33.68417C865.326141 189.730179 876.829126 206.541053 884.950084 223.992517zM206.550263 650.944516c3.452635-3.515057 11.634991-11.825326 24.352641-24.927739 12.784164-13.102413 28.761044-29.335119 47.872311-48.575322l63.597457-63.853283 70.562079-70.879304 187.206706-188.103122 162.857135 164.451446L575.790862 607.226828 506.121106 678.107155c-23.200398 22.754237-44.100404 43.591821-62.701041 62.573127-18.599613 18.983353-33.939997 34.579563-46.145993 46.786583-12.209066 12.271488-19.429515 19.240203-21.796422 21.027919-5.815449 5.241374-12.461823 10.80509-20.00359 16.620539-7.54279 5.815449-15.403828 10.478655-23.523763 13.993712-8.115841 4.093225-20.00359 9.012258-35.728736 14.894222-15.658631 5.815449-32.081673 11.502985-49.213865 17.063631-17.129122 5.562692-33.361829 10.354835-48.764634 14.44806-15.403828 4.089132-26.844392 6.707772-34.387181 7.860015-15.658631 1.726318-26.14138-0.574075-31.383778-6.967692-5.241374-6.390547-6.64535-17.191544-4.344958-32.341592 1.14815-8.179286 3.898797-19.938098 8.243755-35.407418 4.345981-15.468296 9.012258-31.510668 13.932314-48.128137 4.923126-16.617469 9.715269-31.957853 14.382569-45.955658 4.6673-13.998829 8.438183-23.647583 11.313673-28.888957 3.515057-8.182356 7.413853-15.59621 11.758812-22.308075C192.170764 666.540725 198.433398 659.126872 206.550263 650.944516zM499.029594 817.250192l77.848019 0 0 77.913511L499.029594 895.163703 499.029594 817.250192zM657.603169 817.250192l77.848019 0 0 77.913511-77.848019 0L657.603169 817.250192zM816.239166 817.250192l77.848019 0 0 77.913511-77.848019 0L816.239166 817.250192z" p-id="2421"></path></svg>
            </div>
            <a class="to_website" data-link-tool-id="${tool.id}" data-tool-url="${tool.url}" href="${tool.url}" target="_blank">
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
      toolsContainer.innerHTML = `<div>&nbsp;</div>
      <div class="no-results">没有找到匹配的工具</div>
      `
      return
    }

    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    const groupByCategory = settings.groupByCategory;

    if (groupByCategory) {
      toolsContainer.classList.add('tool-category-group');

      // 按分类分组展示
      const groupedTools = {};
      filteredTools.forEach(tool => {
        const category = tool.category || '未分类';
        if (!groupedTools[category]) {
          groupedTools[category] = [];
        }
        groupedTools[category].push(tool);
      });

      // 为每个分类创建一个容器
      Object.entries(groupedTools).forEach(([category, tools]) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'category-group';

        const catTitle = document.createElement('div');
        catTitle.className = 'category-title'
        catTitle.innerHTML = `
          <h2 >${category}</h2>
          <button class="btn btn-ghost category-share" data-category="${category}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
          <button class="btn btn-ghost category-edit" data-category="${category}">
            <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2420"><path d="M884.950084 223.992517c2.362814 5.238304 4.217045 11.375072 5.687536 18.343787 1.470491 6.963599 2.172479 14.316054 2.172479 21.85782 0 7.605212-1.470491 15.146978-4.344958 22.751167-2.940982 7.608282-7.54279 14.895245-13.936407 21.862937-6.964622 7.030114-13.230326 13.101389-18.727527 18.343787-5.493108 5.238304-10.289344 9.904581-14.378475 13.994736-4.6673 4.6673-9.013281 8.757454-13.038968 12.272511L665.526629 189.795671c6.967692-6.389524 15.21247-14.126742 24.798802-23.200398 9.586332-9.012258 17.579377-16.171308 23.969924-21.411659 8.116865-6.389524 16.554024-10.929934 25.245987-13.548574 8.694009-2.622734 17.257036-3.770883 25.695219-3.515057 8.435113 0.318248 16.555048 1.594311 24.415063 3.962242 7.861038 2.301416 14.634302 4.985548 20.453844 7.860015 12.205996 6.393617 25.692149 17.641799 40.520879 33.68417C865.326141 189.730179 876.829126 206.541053 884.950084 223.992517zM206.550263 650.944516c3.452635-3.515057 11.634991-11.825326 24.352641-24.927739 12.784164-13.102413 28.761044-29.335119 47.872311-48.575322l63.597457-63.853283 70.562079-70.879304 187.206706-188.103122 162.857135 164.451446L575.790862 607.226828 506.121106 678.107155c-23.200398 22.754237-44.100404 43.591821-62.701041 62.573127-18.599613 18.983353-33.939997 34.579563-46.145993 46.786583-12.209066 12.271488-19.429515 19.240203-21.796422 21.027919-5.815449 5.241374-12.461823 10.80509-20.00359 16.620539-7.54279 5.815449-15.403828 10.478655-23.523763 13.993712-8.115841 4.093225-20.00359 9.012258-35.728736 14.894222-15.658631 5.815449-32.081673 11.502985-49.213865 17.063631-17.129122 5.562692-33.361829 10.354835-48.764634 14.44806-15.403828 4.089132-26.844392 6.707772-34.387181 7.860015-15.658631 1.726318-26.14138-0.574075-31.383778-6.967692-5.241374-6.390547-6.64535-17.191544-4.344958-32.341592 1.14815-8.179286 3.898797-19.938098 8.243755-35.407418 4.345981-15.468296 9.012258-31.510668 13.932314-48.128137 4.923126-16.617469 9.715269-31.957853 14.382569-45.955658 4.6673-13.998829 8.438183-23.647583 11.313673-28.888957 3.515057-8.182356 7.413853-15.59621 11.758812-22.308075C192.170764 666.540725 198.433398 659.126872 206.550263 650.944516zM499.029594 817.250192l77.848019 0 0 77.913511L499.029594 895.163703 499.029594 817.250192zM657.603169 817.250192l77.848019 0 0 77.913511-77.848019 0L657.603169 817.250192zM816.239166 817.250192l77.848019 0 0 77.913511-77.848019 0L816.239166 817.250192z" p-id="2421"></path></svg>
          </button>
          `
        categoryContainer.appendChild(catTitle);


        const toolsWrapper = document.createElement('div');
        toolsWrapper.className = 'category-tools';

        tools.forEach(tool => {
          const toolCard = document.createElement("div");
          toolCard.className = "tool-card";
          toolCard.innerHTML = buildCardContent(tool);
          toolsWrapper.appendChild(toolCard);
        });

        categoryContainer.appendChild(toolsWrapper);
        toolsContainer.appendChild(categoryContainer);
      });

      filteredTools.forEach((tool) => {
        // 判断是否需要标记为喜欢
        markNavCardLikedOrNot(tool);
      })
    } else {
      toolsContainer.classList.remove('tool-category-group');

      // 常规展示方式
      filteredTools.forEach((tool) => {
        const toolCard = document.createElement("div")
        toolCard.className = "tool-card"
        toolCard.innerHTML = buildCardContent(tool);
        toolsContainer.appendChild(toolCard)

        // 判断是否需要标记为喜欢
        markNavCardLikedOrNot(tool);
      })
    }

    bindDeleteBtnListener();
    bindCardClickListener();
    bindLikedClickListener();
    bindCategoryClickListener();
  }

  function bindDeleteBtnListener() {
    // 为每个工具卡片添加删除按钮事件监听
    const toolsContainer = document.getElementById("tools-container")
    toolsContainer.querySelectorAll('.delete-tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('删除按钮被点击'); // Log for debugging purpose
        const toolId = btn.getAttribute('data-tool-id');
        deleteTool(toolId);
      });
    });
  }

  // 删除工具
  function deleteTool(toolId) {
    console.log('准备删除导航信息:', toolId);
    if (confirm('确定要删除这个导航吗？')) {
      getToolsData(currentTools => {
        const updatedTools = currentTools.filter(tool => tool.id != toolId);
        console.log('删除后的工具列表:', updatedTools);
        cacheSaveToolsData(updatedTools).then(() => {
          renderTools();
        })
      })
    }
  }

  function bindCardClickListener() {
    // 绑定访问按钮点击事件,执行访问次数+1
    document.querySelectorAll('[data-link-tool-id]').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('访问按钮被点击'); // Log for debugging purpose
        const toolId = this.dataset.linkToolId;
        const url = this.dataset.toolUrl;
        getToolsData(tools => {
          const tool = tools.find(t => t.id === toolId);
          if (tool) {
            tool.views++;
            // 保存卡片数据
            cacheSaveToolsData(tools).then(() => {
              renderTools();
            });
          }
          window.open(url, '_blank');
        });
      });
    });
  }

  function bindLikedClickListener() {
    // Add event listeners to like buttons
    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        const toolId = btn.getAttribute("data-id")
        toggleLike(toolId)
      })
    })
  }

  function bindCategoryClickListener() {
    document.querySelectorAll(".category-share").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        const category = btn.getAttribute("data-category")
        openShareToolModal(null, category);
      })
    })

    document.querySelectorAll(".category-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        const category = btn.getAttribute("data-category")
        // 打开编辑分类模态框
        openEditCategoryModal(category);
      });
    });
  }

  // ------------------------------------------------------- 分组编辑弹窗 开始 -------------------------

  // 编辑分组的模态框HTML
  const editCategoryModal = `
  <div id="edit-category-modal" class="modal">
    <div class="modal-content category-modal-content">
      <div class="modal-header">
        <h2>编辑分组</h2>
        <button class="close-btn" id="category-edit-close">&times;</button>
      </div>
      <div class="modal-body">
        <form id="edit-category-form">
          <input type="hidden" id="old-category-name">
          <div class="form-group">
            <label for="new-category-name">分组名称</label>
            <input type="text" id="new-category-name" name="new-category-name" required>
          </div>
          <div class="form-actions">
            <button type="button" class="btn  btn-danger" id="delete-category-btn">
              <svg class="icon" fill="none" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1548">
              <path d="M106.666667 213.333333h810.666666v42.666667H106.666667z"></path>
              <path d="M640 128v42.666667h42.666667V128c0-23.573333-19.093333-42.666667-42.538667-42.666667H383.872A42.496 42.496 0 0 0 341.333333 128v42.666667h42.666667V128h256z"></path>
              <path d="M213.333333 896V256H170.666667v639.957333C170.666667 919.552 189.653333 938.666667 213.376 938.666667h597.248C834.218667 938.666667 853.333333 919.68 853.333333 895.957333V256h-42.666666v640H213.333333z"></path>
              <path d="M320 341.333333h42.666667v384h-42.666667zM490.666667 341.333333h42.666666v384h-42.666666zM661.333333 341.333333h42.666667v384h-42.666667z" ></path></svg>
              <span>删除分组</span>
            </button>
            <button class="btn btn-ghost" id="import-category-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4-4 4 4"></path></svg>
              <span>导入分组</span>
            </button>
            <button class="btn btn-ghost" id="export-category-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>导出分组</span>
            </button>
            
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
          <input type="file" id="category-import-file" accept=".json" style="display: none;">
        </form>
      </div>
    </div>
  </div>
  `;

  // 将编辑分组模态框添加到body
  document.body.insertAdjacentHTML('beforeend', editCategoryModal);

  // 打开编辑分组模态框
  function openEditCategoryModal(category) {
    const modal = document.getElementById('edit-category-modal');
    const form = document.getElementById('edit-category-form');
    const oldCategoryNameInput = document.getElementById('old-category-name');
    const newCategoryNameInput = document.getElementById('new-category-name');

    oldCategoryNameInput.value = category;
    newCategoryNameInput.value = category;
    modal.classList.add('active');
  }

  // 关闭编辑分组模态框
  function closeEditCategoryModal() {
    document.getElementById('edit-category-modal').classList.remove('active');
  }
  document.getElementById('category-edit-close').addEventListener('click', function (e) {
    e.preventDefault();
    closeEditCategoryModal();
  });

  // 添加关闭按钮事件监听
  document.getElementById('edit-category-modal').addEventListener('click', function (e) {
    if (e.target === this) {
      closeEditCategoryModal();
    }
  });

  document.getElementById('export-category-btn').addEventListener('click', function (e) {
    // 导出当前分组的所有导航卡片
    e.preventDefault()
    const category = document.getElementById('old-category-name').value;
    exportToolsByCategory(category)
  });

  // 处理编辑分组表单提交
  document.getElementById('edit-category-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const oldCategoryName = document.getElementById('old-category-name').value;
    const newCategoryName = document.getElementById('new-category-name').value;

    if (oldCategoryName === newCategoryName) {
      closeEditCategoryModal();
      return;
    }

    getToolsData(currentTools => {
      const updatedTools = currentTools.map(tool => {
        if (tool.category === oldCategoryName) {
          return { ...tool, category: newCategoryName };
        }
        return tool;
      });

      cacheSaveToolsData(updatedTools).then(() => {
        renderTools();
        closeEditCategoryModal();
        toast.success('分组名称修改成功');
      });
    });
  });

  // 处理删除分组按钮点击
  document.getElementById('delete-category-btn').addEventListener('click', function () {
    const category = document.getElementById('old-category-name').value;
    if (confirm(`确定要删除分组 "${category}"？该分组下的所有导航卡片也将被删除！`)) {
      getToolsData(currentTools => {
        const filteredTools = currentTools.filter(tool => tool.category !== category);
        cacheSaveToolsData(filteredTools).then(() => {
          renderTools();
          closeEditCategoryModal();
          toast.success('分组删除成功');
        });
      })
    }
  })

  document.getElementById('import-category-btn').addEventListener('click', function () {
    const category = document.getElementById('old-category-name').value;
    const fileInput = document.getElementById('category-import-file');
    fileInput.click();
    fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          doImportData(category, e);
        }
        reader.readAsText(file);
      }
      fileInput.value = '';
    })
  });

  // ------------------------------------------------------- 分组编辑弹窗 结束 -------------------------

  function toggleLike(toolId) {
    getToolsData(currentToolsData => {
      const tool = currentToolsData.find((t) => t.id === toolId)
      if (tool) {
        const likeNum = parseInt(tool.likes)
        if (likeNum > 0) {
          // 取消收藏
          tool.likes = 0
        } else {
          // 收藏
          tool.likes = 1
        }
        cacheSaveToolsData(currentToolsData).then(() => {
          markNavCardLikedOrNot(tool);
          // 更新收藏区域内容
          renderFavorites()
        })
      }
    })
  }

  function markNavCardLikedOrNot(tool) {
    if (!tool) {
      return;
    }
    const likeBtn = document.querySelector(`.like-btn[data-id="${tool.id}"]`)
    if (likeBtn) {
      if (tool.likes > 0) {
        likeBtn.classList.add("liked")
        likeBtn.querySelector("svg").setAttribute("fill", "currentColor")
        likeBtn.style.color = "#ef4444"
      } else {
        likeBtn.classList.remove("liked")
        likeBtn.querySelector("svg").setAttribute("fill", "none")
        likeBtn.style.color = ""
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
    // const bookmarksBtn = document.getElementById("bookmarks-btn");
    const historyBtn = document.getElementById("history-btn");

    // bookmarksBtn.addEventListener("click", () => {
    //   chrome.tabs.create({ url: "chrome://bookmarks/" });
    // });

    historyBtn.addEventListener("click", () => {
      console.log('打开历史记录')
      chrome.tabs.create({ url: "chrome://history/" });
    });

    // Settings modal
    const settingsBtn = document.getElementById("settings-btn")
    const settingsModal = document.getElementById("settings-modal")
    const closeBtn = document.querySelector(".close-btn")
    const saveSettingsBtn = document.getElementById("save-settings")
    const addNavBtn = document.getElementById("add-nav-btn")

    settingsBtn.addEventListener("click", () => {
      console.log('打开设置')
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

    // 分类标签切换
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
      { name: "联网", url: 'network' },
      // { name: "百度", url: "https://www.baidu.com/s?wd=" },
      // { name: "谷歌", url: "https://www.google.com/search?q=" },
      // { name: "必应", url: "https://www.bing.com/search?q=" },
      // { name: "搜狗", url: "https://www.sogou.com/web?query=" },
      // { name: "360", url: "https://www.so.com/s?q=" }
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
        if (currentSearchEngine.url === 'network') {
          // 检查chrome API是否可用
          if (typeof chrome !== 'undefined' && chrome.search && chrome.search.query) {
            try {
              chrome.search.query({
                text: query,
                disposition: 'NEW_TAB'
              });
            } catch (e) {
              console.error('Chrome搜索API调用失败:', e);
              // 降级到默认搜索方式
              filterToolsBySearch(query);
            }
          } else {
            // Chrome API不可用时降级到默认搜索
            console.warn('Chrome搜索API不可用，使用默认搜索方式');
            filterToolsBySearch(query);
          }
        }  else {
          filterToolsBySearch(query)
        }
      }
    }
  }

  function filterToolsByCategory(category) {
    getToolsData(currentToolsData => {
      if (category === "全部") {
        renderTools()
      } else {
        const filteredTools = currentToolsData.filter(tool => tool.category === category)
        renderFilteredTools(filteredTools)
      }
    })

  }

  function filterToolsBySearch(query) {
    if (!query) {
      renderTools()
      return
    }

    getToolsData(currentToolsData => {
      const filteredTools = currentToolsData.filter(
        (tool) => tool.title.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query),
      )
      renderFilteredTools(filteredTools);
    })
  }


  // ------------------------------ 设置相关逻辑 

  function initSettings() {
    // 从本地存储加载设置
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    function calculateGridSize(grid) {
      console.log('当前的grid内容是:', grid); 
      if (grid == 2) {
        return '450'
      } else if (grid == 3) {
        return '350'
      } else if (grid == 4) {
        return '300'
      } else if (grid == 5) {
        return '250'
      } else if (grid == 6) {
        return '200'
      } else if (grid == 7) {
        return '170'
      } else if (grid == 8) {
        return '150'
      }
    }
    // 监听网格列数滑块变化
    document.getElementById("grid-columns").addEventListener("input", (e) => {
      console.log('当前的滑块内容是:', e.target.value);
      document.documentElement.style.setProperty('--grid-columns', `${calculateGridSize(e.target.value)}px`);
    });
    document.getElementById("show-clock").checked = settings.showClock !== undefined ? settings.showClock : true;
    document.getElementById("show-bookmarks").checked = settings.showBookmarks !== undefined ? settings.showBookmarks : true;
    document.getElementById("particle-density").value = settings.particleDensity || 50;
    document.getElementById("group-by-category").checked = settings.groupByCategory !== undefined ? settings.groupByCategory : false;
    document.getElementById("hide-slogan").checked = settings.hideSlogan !== undefined ? settings.hideSlogan : false;
    document.getElementById("grid-columns").value = settings.gridColumns || 4;
    document.documentElement.style.setProperty('--grid-columns', `${calculateGridSize(settings.gridColumns || 4)}px`);
  }

  function saveSettings() {
    const showClock = document.getElementById("show-clock").checked;
    const showBookmarks = document.getElementById("show-bookmarks").checked;
    const particleDensity = document.getElementById("particle-density").value;
    // 卡片的设置，统一在下面的逻辑中维护
    const viewMode = getViewmode();
    const groupByCategory = document.getElementById("group-by-category").checked;
    const hideSlogan = document.getElementById("hide-slogan").checked;

    const settings = {
      showClock,
      showBookmarks,
      particleDensity,
      gridColumns: document.getElementById("grid-columns").value,
      viewMode,
      groupByCategory,
      hideSlogan
    };

    localStorage.setItem('settings', JSON.stringify(settings));
    // Update particle density
    particles.updateDensity(particleDensity);
    updateSloganShow();
    // 更新设置，重新渲染卡片列表
    renderTools();
  }

  function updateSloganShow() {
    if (document.getElementById("hide-slogan").checked) {
      document.getElementById("hero-section").style.display = "none";
    } else {
      document.getElementById("hero-section").style.display = "block";
    }
  }


  // 视图模式类型
  const ViewMode = {
    CARD: 'card',
    COMPACT: 'compact',
    TEXT: 'text'
  };

  let cvMode = getViewmode();
  function getViewmode() {
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    return settings.viewMode || ViewMode.CARD;
  }

  // 初始化视图模式
  function initViewMode() {
    const viewToggleBtn = document.getElementById('view-toggle-btn');
    const cardViewBtn = document.getElementById('card-view-btn');
    const compactViewBtn = document.getElementById('compact-view-btn');
    const textViewBtn = document.getElementById('text-view-btn');

    // 从本地存储加载视图模式设置
    const currentViewMode = getViewmode();

    // 应用当前视图模式
    applyViewMode(currentViewMode);

    // 添加视图切换按钮点击事件
    viewToggleBtn.addEventListener('click', cycleViewMode);

    // 添加设置面板中视图模式按钮的点击事件
    cardViewBtn.addEventListener('click', () => setViewMode(ViewMode.CARD));
    compactViewBtn.addEventListener('click', () => setViewMode(ViewMode.COMPACT));
    textViewBtn.addEventListener('click', () => setViewMode(ViewMode.TEXT));
  }

  // 设置视图模式
  function setViewMode(mode) {
    // 更新本地存储
    const settings = JSON.parse(localStorage.getItem('settings') || '{}');
    settings.viewMode = mode;
    localStorage.setItem('settings', JSON.stringify(settings));

    // 应用视图模式
    applyViewMode(mode);
  }

  // 循环切换视图模式
  function cycleViewMode() {
    const currentMode = getViewmode();
    
    // 定义视图模式循环顺序
    const modes = [ViewMode.CARD, ViewMode.COMPACT, ViewMode.TEXT];
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setViewMode(modes[nextIndex]);
  }

  // 应用视图模式
  function applyViewMode(mode) {
    const mainContainer = document.querySelector('.main');
    const cardViewBtn = document.getElementById('card-view-btn');
    const compactViewBtn = document.getElementById('compact-view-btn');
    const textViewBtn = document.getElementById('text-view-btn');

    // 移除所有视图模式类
    mainContainer.classList.remove('card-view', 'compact-view', 'text-view');
    
    // 移除所有按钮的激活状态
    [cardViewBtn, compactViewBtn, textViewBtn].forEach(btn => {
      if (btn) btn.classList.remove('active');
    });

    // 应用新的视图模式
    switch (mode) {
      case ViewMode.CARD:
        mainContainer.classList.add('card-view');
        if (cardViewBtn) cardViewBtn.classList.add('active');
        updateToggleIcon('grid');
        break;
      case ViewMode.COMPACT:
        mainContainer.classList.add('compact-view');
        if (compactViewBtn) compactViewBtn.classList.add('active');
        updateToggleIcon('list');
        break;
      case ViewMode.TEXT:
        mainContainer.classList.add('text-view');
        if (textViewBtn) textViewBtn.classList.add('active');
        updateToggleIcon('text');
        break;
    }
    cvMode = mode;
    renderTools();
  }

  // 更新悬浮切换按钮图标
  function updateToggleIcon(type) {
    const viewToggleBtn = document.getElementById('view-toggle-btn');
    if (!viewToggleBtn) return;

    const icons = {
      grid: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>',
      list: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect><path d="M14 4h7"></path><path d="M14 9h7"></path><path d="M14 15h7"></path><path d="M14 20h7"></path></svg>',
      text: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-text"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
    };

    viewToggleBtn.innerHTML = icons[type];
  }

  initViewMode();

  // 分组全部导出
  function exportToolsByCategory(category) {
    cacheGetToolsData().then(tools => {
      const filteredTools = tools.filter(tool => tool.category === category);
      if (filteredTools.length > 0) {
        const blob = new Blob([JSON.stringify(filteredTools, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quicknav-${category}-data.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('导出成功！');
      } else {
        toast.error('没有找到该分类的导航数据！');
      }
    })
  }

  // 导出事件
  function exportTools() {
    // 导出数据功能
    document.getElementById('export-data').addEventListener('click', async () => {
      try {
        // 获取所有导航卡片数据
        const tools = await cacheGetToolsData();
        console.log('需要到处的数据是:', tools);

        // 创建Blob对象
        const blob = new Blob([JSON.stringify(tools, null, 2)], { type: 'application/json' });

        // 创建下载链接
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quicknav-data.json';

        // 触发下载
        document.body.appendChild(a);
        a.click();

        // 清理
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success('数据导出成功！');
      } catch (error) {
        console.error('导出数据失败:', error);
        toast.error('导出数据失败，请重试');
      }
    });
  }
  exportTools();

  async function doImportData(category, e) {
    // 验证每个工具的必要字段
    const isValidTool = (tool) => {
      return tool.title && tool.url && (category || tool.category);
    };
    try {
      const importedData = JSON.parse(e.target.result);
      // 验证导入的数据格式
      if (!Array.isArray(importedData)) {
        throw new Error('导入的数据格式不正确');
      }
  
      if (!importedData.every(isValidTool)) {
        throw new Error('导入的数据缺少必要字段');
      }
  
      // 获取当前的工具数据
      const currentTools = await cacheGetToolsData();
  
      // 合并数据，根据url去重
      const mergedTools = [...currentTools];
      let addedCount = 0;
  
      for (const tool of importedData) {
        if (!currentTools.some(t => t.url === tool.url)) {
          if (category) {
            // 如果有指定分类，将导入的数据的分类设置为指定的分类
            tool.category = category;
          }
  
          mergedTools.push(tool);
          addedCount++;
        }
      }
  
      // 保存合并后的数据
      await cacheSaveToolsData(mergedTools);
  
      // 重新渲染工具列表
      renderTools();
  
      // 显示成功消息
      toast.success(`成功导入 ${addedCount} 个导航卡片！`);
    } catch (error) {
      console.error('导入数据失败:', error);
      toast.error('导入数据失败，请重试');
    }
  }

  // 导入事件
  function importTools() {
    const importBtn = document.getElementById('import-data');
    const fileInput = document.getElementById('import-file');

    importBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          doImportData(null, e);
        };

        reader.readAsText(file);
      } catch (error) {
        console.error('读取文件失败:', error);
        toast.error('读取文件失败，请重试');
      }

      // 清空文件输入框，允许重复导入同一个文件
      fileInput.value = '';
    });
  }
  importTools();


  // -------------------------------  设置相关结束

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
    getToolsData(currentTools => {
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
    });
  }



  // 监听书签modal的状态变更，如果style.display === 'none'，则清空表单数据
  const bookmarksInput = document.getElementById('bookmarks-input');
  bookmarksInput.addEventListener('change', function () {
    console.log('bookmarks-input的状态变更了');
    renderTools();
  })
})
