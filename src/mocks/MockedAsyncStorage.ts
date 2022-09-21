import Storage from '@react-native-async-storage/async-storage';

export class MockedAsyncStorage {
  storage: Record<string, unknown> = {};
  getItem: jest.SpyInstance;
  setItem: jest.SpyInstance;

  constructor() {
    this.getItem = jest.spyOn(Storage, 'getItem');
    this.setItem = jest.spyOn(Storage, 'setItem');

    this.reset();
  }

  reset(): void {
    this.getItem.mockImplementation((label: string) => {
      return this.storage[label];
    });

    this.setItem.mockImplementation((label: string, data: unknown) => {
      this.storage[label] = data;
    });
  }

  setStorageData(storage: Record<string, unknown>) {
    this.storage = storage;
  }
}
