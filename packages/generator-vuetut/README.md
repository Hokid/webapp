# @hokid/generator-vuetut

Yoman generator. Setup another configuration based on vue template.


# Install

```bash
$ npm i -g @hokid/generator-vuetut
```

# Warning

It is recommended to Install only on top of the unmodified structure provided by the vue template

# TODO

```
"presets": [
  [
    "@vue/app",
    {
      "polyfills": [
        "es6.promise",
        "es6.array.iterator"
      ],
      "targets": {
        "browsers": [
          "last 2 versions",
          "not ie <= 10",
          "Safari > 9"
        ]
      }
    }
  ]
]
```