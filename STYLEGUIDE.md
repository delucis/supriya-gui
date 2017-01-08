# Styleguide

These guidelines aim to keep track of some conventions in coding style across
the various languages used in different parts of Supriya GUI.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Styleguide](#styleguide)
	- [Components](#components)
		- [`<template>`](#template)
		- [`<script>`](#script)
		- [`<style>`](#style)
	- [Style](#style)
	- [Vuex](#vuex)

<!-- /TOC -->



## Components

Each custom component is defined by its `.vue` template, which consists of
three sections:

```vue
<template lang="html">
  <!-- HTML template -->
</template>

<script>
  // component configuration in Javascript
</script>

<style lang="sass">
  // component styling in SASS
</style>
```



### `<template>`

- Indent elements using two spaces per nesting level

- For elements with more than two attributes, list these on separate lines:

  ```html
  <a class="internal-link"
     href="#"
     download>
    <!-- nested content -->
  </a>
  ```

- Use shorthand for `v-bind` and `on`:

  ```html
  <button :class="customClass"
          @click="customMethod">
  </button>
  ```

### `<script>`

- If the component has a multi-word name, use hyphens (also in the filename):

  ```js
  export default {
    name: 'custom-component'
    // ...
  }
  ```

- If importing a multi-word component, use camel case variables:

  ```js
  import customComponent from './custom-component.vue'
  export default {
    // ...
    components: {
      customComponent
    }
  }
  ```



### `<style>`

- CSS rulesets should aim for minimum specificity. Nest rulesets sparingly.

- Style classes not elements.

  ```sass
  .link {
    /* DO */
  }

  a {
    /* DON’T! */
  }
  ```

- Name classes according to BEM-like principles.

  - Each component’s root element should be styled with a class that matches
  that component’s name, ensuring conflict-free CSS. For example, in a
  `card.vue` template:

    ```vue
    <template lang="html">
      <div class="card"></div>
    </template>

    <script>
    export default {
      name: 'card'
    }
    </script>

    <style lang="sass">
    .card {
      background-color: white;
    }
    </style>
    ```

  - Classes for elements within a component should be named using the
  component’s name and the element’s name separated by two underscores:

    ```sass
    .card {
      background-color: white;
    }

      .card__title {
        font-size: 1.625rem;
      }
    ```

  - Classes that modify elements can be indicated using two hyphens to separate
  a modification’s name from the name of what it is modifying:

    ```sass
    .card {
      background-color: white;
    }

      .card__title {
        font-size: 1.625rem;
      }

      .card__title--uppercase {
        text-transform: uppercase;
      }

    .card--dark {
      background-color: black;
      color: white;
    }
    ```

  - For elements within modified classes, use descendant selectors rather than
  a new class name. For example, to style `.card__title` when it’s in
  `.card--dark`, don’t use `.card--dark__title`, instead:

    ```sass
    .card__title {
      font-size: 1.625rem;

      .card--dark & {
        color: yellow;
      }

    }
    ```

    This makes use of SASS’s parent selector `&` to generate a
    `.card--dark .card__title` selector.

- Indent rulesets meaningfully (2 spaces per level) and separate them with a
line of whitespace:

  ```sass
  .component {
    color: red;
  }

    .component__title {
      font-size: 2rem;
    }
  ```

- Import global variables using the following Webpack alias to avoid fragility:

  ```sass
  @import '~styles/vars';
  ```

[CSS Guidelines](http://cssguidelin.es/) expands on many of the above points and
is a helpful resource when thinking about how best to declare styling.





## Style

`style/global.scss` sets global styling rules and `style/_vars.scss` includes
variables for use across Supriya GUI components.

The `style` directory is aliased in the Webpack configuration as `styles` for
more robust importing in components, e.g. `@import '~styles/vars'`.

- Keep `global.scss` to a minimum. Only include styling that *cannot* be
  declared at the component level, such as `@font-face` declarations.

- Never include rulesets directly in `_vars.scss`. It must strictly only include
  variables and mixins that will not render any CSS when imported in components.





## Vuex

The Supriya GUI [Vuex](https://vuex.vuejs.org/en/) store is broken into modules
in `vuex/modules/`, which are then assembled in `vuex/store.js`. Helper
functions can be placed in `vuex/helpers/`.

- Mutations should be named using all uppercase and snake case:

  ```js
  CHANGE_STATE (state, payload) {}
  ```

- Actions should be named using all lowercase and snake case:

  ```js
  change_state (context) {}
  ```

- Actions that simply wrap a mutation should have matching names:

  ```js
  {
    mutations: {
      INCREMENT_COUNT (state) {
        state.count ++
      }
    },
    actions: {
      increment_count (context) {
        context.commit('increment_count')
      }
    }
  }
  ```

- Components should never commit mutations, only dispatch actions.

- Getters should be named using camel case:

  ```js
  halfCount: state => {
    return state.count / 2
  }
  ```
