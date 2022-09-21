import AsyncStorage from '@react-native-async-storage/async-storage';

import { Settings } from './interface';

export class Store {
  static SETTINGS_STORE_KEY = 'PlotTwist';
  private _settings: Settings = {
    currentPlotId: '',
  };

  constructor() {
    this.init();
  }

  get settings(): Settings {
    return this._settings;
  }

  async setCurrentPlot(newValue: string): Promise<void> {
    this._settings = {
      ...this._settings,
      currentPlotId: newValue,
    };
    await AsyncStorage.setItem(Store.SETTINGS_STORE_KEY, JSON.stringify(this._settings));
  }

  private async init(): Promise<void> {
    const value = await AsyncStorage.getItem(Store.SETTINGS_STORE_KEY);

    if (value) {
      this._settings = JSON.parse(value);
    }
  }
}

const asyncLocalStorage = new Store();

export default asyncLocalStorage;
