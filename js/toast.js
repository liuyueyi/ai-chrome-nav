class Toast {
    constructor() {
        this.container = null;
        this.createContainer();
    }

    createContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);

            // 添加样式
            const style = document.createElement('style');
            style.textContent = `
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
        }

        .toast {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 24px;
          border-radius: 4px;
          margin-bottom: 10px;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .toast.show {
          opacity: 1;
          transform: translateY(0);
        }

        .toast.success {
          background-color: rgba(40, 167, 69, 0.9);
        }

        .toast.error {
          background-color: rgba(220, 53, 69, 0.9);
        }

        .toast.warning  {
          background-color: rgba(96, 46, 235, 0.9);
        }
      `;
            document.head.appendChild(style);
        }
    }

    show(message, type = 'default', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        this.container.appendChild(toast);

        // 触发重绘以启动动画
        setTimeout(() => toast.classList.add('show'), 10);

        // 自动移除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => this.container.removeChild(toast), 300);
        }, duration);
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }
}

// 创建全局实例
window.toast = new Toast();