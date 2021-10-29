const Event = require("events").EventEmitter;
const ExplorerFactory = require("jcc_rpc").ExplorerFactory;
const explorerInst = ExplorerFactory.init(["https://swtcscan.jccdex.cn"]);
const getBalance = async (address) => {
  const res = await explorerInst.getBalances(address, address);
  if (!res.result) {
    return null;
  }
  const data = res.data;
  delete data._id;
  delete data.feeflag;
  const balances = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const d = data[key];
      if (key === "SWTC") {
        balances.push(Object.assign(d, { currency: "SWT", issuer: "" }))
      } else {
        balances.push(Object.assign(d, { currency: key.split("_")[0], issuer: key.split("_")[1] }))
      }
    }
  }
  return balances;
};

class PeriodTask extends Event {
  constructor(ms) {
    super();
    this.ms = ms;
    this.task = null;
  }

  async fetchBalance(address) {
    const data = await getBalance(address);
    this.emit("fetchBalance", data);
    this.task = setTimeout(() => {
      this.fetchBalance(address);
    }, this.ms);
  }

  start(address) {
    this.stop();
    this.fetchBalance(address);
    return this;
  }

  stop() {
    if (this.task) {
      clearTimeout(this.task);
      this.task = null;
    }
  }
}


const periodTask = new PeriodTask(30000);


onmessage = function(e) {
  const data = e.data;
  if (data && data.method === "fetchBalance") {
    console.log("start fetch");
    periodTask.start(data.address)
      .on("fetchBalance", (data) => {
        this.postMessage(data);
      })
  } else if (data && data.method === "stopFetch") {
    console.log("stop fetch");
    periodTask.stop();
  }
}