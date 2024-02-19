const iframe = document.createElement('iframe');
iframe.src = '{{SERVICE_URL}}';
iframe.style.display = 'none';

function once<T = unknown>(callback: (event: MessageEvent<T>) => unknown) {
  const handler = (event: MessageEvent) => {
    window.removeEventListener('message', handler);
    return callback(event);
  };

  window.addEventListener('message', handler);
}

class IframeStorage {
  private iframe: HTMLIFrameElement;
  private isInitialized = false;
  constructor(src: string) {
    this.iframe = document.createElement('iframe');
    this.iframe.src = src;
    this.iframe.style.display = 'none';
  }
    init() {
    return new Promise((resolve, reject) => {

    })
  }
  destroy() {
    this.iframe.remove();
  }
}

window.addEventListener('message', (event) => {
  if (!iframe.src.includes(event.origin)) return;
  console.log('Injector:', event.data);
  iframe.contentWindow?.postMessage('foobar', '*')
  // iframe.remove();
})

document.body.appendChild(iframe);
