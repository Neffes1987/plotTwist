import { makeAutoObservable, runInAction } from 'mobx';

import { RouteParams } from '../Screens/interface';

export class NavigationStore {
  state: Nullable<RouteParams['params']['state']> = null;

  constructor() {
    makeAutoObservable(this);
  }

  get(): Nullable<RouteParams['params']['state']> {
    return this.state;
  }

  set(state: Nullable<RouteParams['params']['state']>): void {
    runInAction(() => {
      this.state = state;
    });
  }
}

const navigationStore = new NavigationStore();

export default navigationStore;
