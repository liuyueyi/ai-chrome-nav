// 初始化粒子背景
document.addEventListener('DOMContentLoaded', function () {
    //   initParticles();
    loadSharedTools();
});

// 加载共享导航卡片
async function loadSharedTools() {
    const container = document.getElementById('share-tools-container');
    const sharedTools = await getSharedTools();

    sharedTools.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}

// 创建导航卡片
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';

    card.innerHTML = `
    <div class="tool-icon">
      <img src="${tool.icon}" alt="${tool.name}" width="54" height="54" class="tool-icon-img">
    </div>
    <div class="tool-info">
      <h3 class="tool-name">${tool.name}</h3>
      <p class="tool-desc">${tool.description}</p>
    </div>
        <div class="share-tool-category green">${tool.category}</div>
      <div class="tool-like">
        <button class="btn btn-primary import-btn" data-tool-id="${tool.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>
        导入
      </button>
    </div>
     <div class="tool-footer">
        <div class="tool-stats">
        <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            <span>${tool.views || 0}</span>
        </div>
        <div class="stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3"/></svg>
            <span>${tool.like || 0}</span>
        </div>
        </div>
        <div class="tool-actions">
            <a class="to_website" data-link-tool-id="${tool.id}" data-tool-url="${tool.url}" href="${tool.url}" target="_blank">
            访问网站
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        </a>
        </div>
    </div>
  `;

    // 添加导入按钮点击事件
    const importBtn = card.querySelector('.import-btn');
    importBtn.addEventListener('click', () => importTool(tool));

    return card;
}

// 获取共享导航数据
async function getSharedTools() {
    // 这里可以替换为实际的API调用
    return [
        {
            id: 'shared-1',
            name: 'AI智能体',
            description: '多模态AI智能体，支持图像、文本等多种输入。',
            icon: 'public/placeholder.svg',
            category: 'ai',
            views: 1000,
            like: 0,
        },
        {
            id: 'shared-2',
            name: 'Video Sora',
            description: 'OpenAI开发的AI视频生成工具。',
            icon: 'public/placeholder.svg',
            category: 'ai',
            views: 12,
            like: 1,
        },
        // 更多示例数据...
    ];
}

let TOTAL_CATEGORY = [];
// 从本地存储获取工具数据，如果不存在则使用默认数据
function initCategory() {
    getToolsCategory().then(tools => {
        TOTAL_CATEGORY = tools;
    });
}
initCategory();

// 添加导航卡片的模态框HTML
const importToolModal = `
  <div id="import-tool-modal" class="modal">
    <div class="modal-content">
      <h2>导入导航</h2>
      <form id="import-tool-form">
        <div class="form-group">
          <label for="title">标题</label>
          <input type="text" id="title" name="title" readonly>
        </div>
        <div class="form-group">
          <label for="description">描述</label>
          <textarea id="description" name="description" readonly></textarea>
        </div>
        <div class="form-group">
          <label for="url">网址</label>
          <input type="url" id="url" name="url" readonly>
        </div>
        <div class="form-group">
            <label for="icon">图标</label>
            <input type="text" id="icon" name="icon" required>
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" name="category" data-custom="allow">
            ${getCategories().map(c => `<option value="${c}">${c}</option>`).join('')}
          </select>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-ghost" id="close-import-tool-modal-btn">取消</button>
          <button type="submit" class="btn btn-primary" id="submit-import-btn">确认导入</button>
        </div>
      </form>
    </div>
  </div>
`;

// 将模态框添加到body
document.body.insertAdjacentHTML('beforeend', importToolModal);



// 当前的分类
function getCategories() {
    return TOTAL_CATEGORY;
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

// 关闭导入工具模态框
function closeImportToolModal() {
    document.getElementById('import-tool-modal').classList.remove('active');
}

// 添加关闭按钮事件监听
const closeImportBtn = document.getElementById('close-import-tool-modal-btn');
if (closeImportBtn) {
    closeImportBtn.addEventListener('click', closeImportToolModal);
}

// 处理导入工具表单提交
function handleImportToolSubmit(e, tool) {
    e.preventDefault();
    try {
        // 获取本地存储的工具列表
        const localTools = JSON.parse(localStorage.getItem('tools') || '[]');

        // 检查工具是否已经存在
        if (localTools.some(t => t.id === tool.id)) {
            alert('该工具已经在您的导航中');
            return;
        }

        // 添加到本地存储
        localTools.push(tool);
        localStorage.setItem('tools', JSON.stringify(localTools));

        alert('导入成功！');
        closeImportToolModal();
    } catch (error) {
        console.error('导入失败:', error);
        alert('导入失败，请稍后重试');
    }
}

// 打开导入工具模态框
function openImportToolModal(tool) {
    const modal = document.getElementById('import-tool-modal');
    const form = document.getElementById('import-tool-form');

    // 填充表单数据
    form.title.value = tool.name;
    form.description.value = tool.description;
    form.url.value = tool.url;


    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';
    let hasThisCategory = false;
    getCategories().forEach(c => {
        const option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        categorySelect.appendChild(option);
        if (c === tool.category) {
            hasThisCategory = true;
        }
    });
    if (!hasThisCategory) {
        // 没有当前分组时，默认添加当前分组
        const option = document.createElement('option');
        option.value = tool.category;
        option.textContent = tool.category;
        categorySelect.appendChild(option);
    }
    // 切换为当前推荐的分组
    form.category.value = tool.category;

    // 添加表单提交事件
    form.onsubmit = (e) => handleImportToolSubmit(e, tool);

    modal.classList.add('active');

    // 重新初始化分类选择
    handleCategorySelect();
}

async function importTool(tool) {
    openImportToolModal(tool);
}

// 分类切换
document.addEventListener('DOMContentLoaded', () => {
    const categoryLinks = document.querySelectorAll('.category-link');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // 移除其他分类的active类
            categoryLinks.forEach(l => {
                l.parentElement.classList.remove('active');
            });

            // 添加当前分类的active类
            link.parentElement.classList.add('active');

            // 获取分类ID并过滤工具
            const category = link.getAttribute('href').substring(1);
            filterToolsByCategory(category);
        });
    });
});

// 根据分类过滤工具
async function filterToolsByCategory(category) {
    const container = document.getElementById('share-tools-container');
    const tools = await getSharedTools();

    container.innerHTML = '';

    const filteredTools = category === 'all'
        ? tools
        : tools.filter(tool => tool.category === category);

    filteredTools.forEach(tool => {
        const card = createToolCard(tool);
        container.appendChild(card);
    });
}