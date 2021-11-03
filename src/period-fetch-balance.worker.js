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

  taskId;
  ms;
  fn;
  task;
  constructor(fn, ms) {
    super();
    this.ms = ms;
    this.fn = fn;
    this.task = null;
    this.taskId = `taskId-${new Date().getTime()}`;
  }

  async startTask(...args) {
    const data = await this.fn(...args);
    this.emit(this.taskId, data);
    this.task = setTimeout(() => {
      this.startTask(...args);
    }, this.ms);
  }

  start(...args) {
    this.stop();
    this.startTask(...args);
    return this;
  }

  stop() {
    if (this.task) {
      clearTimeout(this.task);
      this.task = null;
    }
  }
}


const periodTask = new PeriodTask(getBalance, 30000);

const sendMessage = (data) => {
  postMessage(data);
}

onmessage = function(e) {
  const data = e.data;
  if (data && data.method === "fetchBalance") {
    console.log("start fetch");
    periodTask
      .start(data.address)
      .on(periodTask.taskId, sendMessage);
  } else if (data && data.method === "stopFetch") {
    console.log("stop fetch");
    periodTask.stop();
    periodTask.removeListener(periodTask.taskId, sendMessage);
  }
}