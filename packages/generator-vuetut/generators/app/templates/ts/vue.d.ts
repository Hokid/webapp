export interface Services {
}

export interface $style {
  [key: string]: string | void;
}


declare module 'vue/types/vue' {
  interface Vue {
    $services: Services;
    // css modules
    $style: $style;
  }
}

declare module 'vue/types/options' {
  interface RenderContext {
    $style: $style;
  }
}

