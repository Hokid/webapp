export interface Services {
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: Services;
  }
}
