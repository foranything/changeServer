/** @param {String[]} argv */
function run(argv) {

  const query = argv[0];
  return new Changer(query).getLocalAddress();

}

class Changer {

  #address;

  #originAddress;

  /** @param {String} address */
  constructor(address) {
    this.#originAddress = address;
    this.#address = address;
  }

  useHttp() {
    this.#address = this.#address.replace('https://', 'http://')
    return this;
  }

  usePort() {
    this.#address = this.#address.replace('.works/', '.works:4200/');
    return this;
  }

  isLocal() {
    return /.local.cupix.works\//.test(this.#address);
  }

  isStage() {
    return /\.stage\.cupix.works\//.test(this.#address);
  }

  isDev() {
    return /.dev.cupix.works\//.test(this.#address);
  }

  isProd() {
    return !this.isLocal() && !this.isStage() && !this.isDev();
  }

  stageToLocal() {
    this.useHttp();
    this.usePort();
    this.#address = this.#address.replace('.stage.', '.local.');
    return this.#address;
  }

  devToLocal() {
    this.useHttp();
    this.usePort();
    this.#address = this.#address.replace('.dev.', '.local.');
    return this.#address;
  }

  prodToLocal() {
    this.useHttp();
    this.usePort();
    this.#address = this.#address.replace('.cupix.works:4200/', '.local.cupix.works:4200/');
    return this.#address;
  }

  getLocalAddress() {
    if (this.isStage()) return this.stageToLocal();
    else if (this.isDev()) return this.devToLocal();
    else if (this.isProd()) return this.prodToLocal();
    else return this.#address;
  }

}
