class WS {
  init(wsAddr, store) {
    this.connectionToWs(wsAddr);
    this.store = store || null;
    this.timerId = null;
    this.consoleTimer = null;
  }

  connectionToWs(wsAddr) {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.wsInstance = new WebSocket(wsAddr);
    this.wsInstance.onopen = (event) => {
      const url = event.target.url;
      console.log('\x1b[36m%s\x1b[0m', `WebSocket connect on ${url}`);
      this.store.commit('SET_SERVER_CONNECT', true);
    };

    this.wsInstance.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (window.location.hostname === 'localhost') {
        // console.log(data);
        // if (this.consoleTimer) {
        //   clearTimeout(this.consoleTimer);
        // }
        // this.consoleTimer = setTimeout(() => {
        //   console.clear();
        // }, 5000);
      }
    };
    this.wsInstance.onclose = () => {
      this.store.commit('SET_SERVER_CONNECT', false);
      this.timerId = setTimeout(() => {
        this.connectionToWs(wsAddr);
      }, 1000 * 3);
    };
  }

  get(e) {
    const { wsInstance } = this;
    const { type } = e;
    return new Promise((resolve) => {
      wsInstance.send(JSON.stringify(e));
      function handler(res) {
        const data = JSON.parse(res.data);
        if (data.type === type) {
          wsInstance.removeEventListener('message', handler);
          resolve(data);
        }
      }
      wsInstance.addEventListener('message', handler);
    });
  }
  sendMessage(message) {
    const { wsInstance } = this;
    wsInstance.send(JSON.stringify(message));
  }
}

export default WS;
