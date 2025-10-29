// Quill Delta Preview JavaScript

let quill = null;
let currentDelta = null;

/**
 * 初始化预览
 */
function initializePreview(delta) {
  try {
    // 检查容器是否存在
    const container = document.getElementById("quill-container");
    if (!container) {
      throw new Error("找不到 quill-container 元素");
    }

    // 创建Quill实例
    quill = new Quill("#quill-container", {
      readOnly: true,
      theme: "snow",
      modules: {
        toolbar: false,
      },
    });

    // 设置Delta内容
    if (delta && Array.isArray(delta)) {
      quill.setContents(delta);
      currentDelta = delta;
    } else {
      showError("无效的Delta数据格式");
    }

    // 绑定事件
    bindEvents();
  } catch (error) {
    console.error("初始化预览失败:", error);
    showError("初始化预览失败: " + error.message);
  }
}

/**
 * 绑定事件处理器
 */
function bindEvents() {
  // 监听VSCode消息
  window.addEventListener("message", (event) => {
    const message = event.data;
    switch (message.type) {
      case "updateDelta":
        updateDelta(message.delta);
        break;
      case "error":
        showError(message.message);
        break;
    }
  });
}

/**
 * 更新Delta内容
 */
function updateDelta(delta) {
  try {
    if (quill && delta) {
      quill.setContents(delta);
      currentDelta = delta;
      showSuccess("内容已更新");
    }
  } catch (error) {
    console.error("更新Delta失败:", error);
    showError("更新内容失败: " + error.message);
  }
}

/**
 * 显示错误消息
 */
function showError(message) {
  showMessage(message, "error");
}

/**
 * 显示成功消息
 */
function showSuccess(message) {
  showMessage(message, "success");
}

/**
 * 显示消息
 */
function showMessage(message, type) {
  // 移除现有消息
  const existingMessage = document.querySelector(".message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // 创建新消息
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;

  // 添加到页面
  const container = document.querySelector(".preview-content");
  if (container) {
    container.insertBefore(messageDiv, container.firstChild);

    // 3秒后自动移除
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 3000);
  }
}

// 页面加载完成后的初始化
document.addEventListener("DOMContentLoaded", () => {
  const delta = window.deltaData;

  if (delta && Array.isArray(delta)) {
    if (typeof Quill !== "undefined") {
      initializePreview(delta);
    } else {
      document.getElementById("quill-container").innerHTML =
        '<div style="padding: 20px; color: #e74c3c;">Quill.js 加载失败，请检查网络连接</div>';
    }
  } else {
    document.getElementById("quill-container").innerHTML =
      '<div style="padding: 20px; color: #e74c3c;">无效的Delta数据格式</div>';
  }
});

// 全局错误处理
window.addEventListener("error", function (e) {
  console.error("Global error:", e.message);
  const container = document.getElementById("quill-container");
  if (container) {
    container.innerHTML =
      '<div style="padding: 20px; color: #e74c3c;">发生错误: ' +
      e.message +
      "</div>";
  }
});
