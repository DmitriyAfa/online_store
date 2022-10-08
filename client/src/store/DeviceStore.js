import { makeAutoObservable } from "mobx";
export class DeviceStore {
  constructor() {
    this._types = [
      { id: 1, name: "Холодильники" },
      { id: 2, name: "Смартфоны" },
    ];
    this._brands = [
      { id: 1, name: "Samsung" },
      { id: 2, name: "Apple" },
    ];
    this._devices = [
      { id: 1, name: "12 pro", price: 100000, rating: 0, img: "" },
      { id: 2, name: "a515", price: 100000, rating: 0, img: "" },
      { id: 3, name: "note pro", price: 100000, rating: 0, img: "" },
      { id: 4, name: "Atlant", price: 100000, rating: 0, img: "" },
    ];
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  /**
   computed functions are called only if the variable used inside has been changed
   вызываются только в том случае, если переменная которая используется внутри была изменена
   */
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
}
