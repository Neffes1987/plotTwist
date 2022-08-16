import AsyncStorage from '@react-native-async-storage/async-storage';

import { Settings } from './interface';

export class Store {
  static SETTINGS_STORE_KEY = 'PlotTwist';
  private _settings: Settings = {
    currentPlotId: '',
  };

  constructor() {
    AsyncStorage.getItem(Store.SETTINGS_STORE_KEY)
      .then((value: Nullable<string>) => {
        if (value) {
          this._settings = JSON.parse(value);
        }
      })
      .catch((e: Error) => {
        console.error(e);
      });
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
}

const asyncLocalStorage = new Store();

export default asyncLocalStorage;
