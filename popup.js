const toggle = document.querySelector("#speedToggle");
const speedRange = document.querySelector("#speedRange");
const speedValue = document.querySelector("#speedValue");
const statusText = document.querySelector("#statusText");

function render(enabled, speedRate) {
  toggle.checked = enabled;
  speedRange.value = speedRate;
  speedValue.textContent = `${speedRate}x`;
  statusText.textContent = enabled ? `已开启：${speedRate} 倍速` : "已关闭";
}

chrome.storage.local.get({ enabled: false, speedRate: 4 }, ({ enabled, speedRate }) => {
  render(enabled, speedRate);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  const speedRate = Number(speedRange.value);

  chrome.storage.local.set({ enabled, speedRate }, () => {
    render(enabled, speedRate);
  });
});

speedRange.addEventListener("input", () => {
  const enabled = toggle.checked;
  const speedRate = Number(speedRange.value);

  chrome.storage.local.set({ speedRate }, () => {
    render(enabled, speedRate);
  });
});
