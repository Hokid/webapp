export default class VuexStoreClient {
  constructor (VuexStore) {
    this.VuexStore = VuexStore;
  }

  commit(path, payload) {
    this.VuexStore.commit(path, payload);
  }

  dispatch(action, payload) {
    this.VuexStore.dispatch(action, payload);
  }

  state() {
    return this.VuexStore.state.user;
  }

  isAuth() {
    return this.VuexStore.getters['user/isAuth'];
  }
}
