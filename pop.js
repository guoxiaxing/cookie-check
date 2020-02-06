function autoAssignSubTasks() {
  const code = `(${function() {
    function hasCookie(sKey) {
      return new RegExp(
        "(?:^|;\\s*)" +
          encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
          "\\s*\\="
      ).test(document.cookie);
    }
    const checkTime = 10 * 1000;
    const toast = message => {
      const dom = document.createElement("div");
      const toast = document.createElement("span");
      toast.innerHTML = message;
      dom.appendChild(toast);

      dom.style.position = "fixed";
      dom.style.left = "6px";
      dom.style.top = "6px";
      dom.style.display = "flex";
      dom.style.justifyContent = "center";
      dom.style.alignItems = "center";
      dom.style.zIndex = "9999";

      toast.style.minWidth = "250px";
      toast.style.padding = "10px";
      toast.style.fontSize = "12px";
      toast.style.fontWeight = "bolder";
      toast.style.color = "#0c5460";
      toast.style.backgroundColor = "rgba(209, 236, 241, 0.8)";
      toast.style.borderRadius = "10px";

      document.body.appendChild(dom);
      const destroy = () => document.body.removeChild(dom);
      return destroy;
    };
    let destroyToast;
    setInterval(() => {
      if (hasCookie("local_debug_ip")) {
        destroyToast = toast("请记得在联调完毕后删除 local_debug_ip cookie");
      } else {
        if (destroyToast) {
          destroyToast();
          destroyToast = undefined;
        }
      }
    }, checkTime);
  }})()`;

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code
    });
  });
}

autoAssignSubTasks();
