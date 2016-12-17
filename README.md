# web-gui

Notes/research log on web GUI best practices.

## Install

``` bash
git clone git@github.com:delucis/web-gui.git
cd web-gui
npm install
```

## Scripts

```sh
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build & run from a simple Express server at localhost:8888
npm start
```

## API Notes

- [Supriya JSON examples](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be)

### Data types

#### Synth definitions

- `synthdef` (Object) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-synthdef-json-L2)
  - `hash` (String)
  - `name` (String)
  - `parameters` (Object)
    - `_parameter` (Object) [`amplitude`, `frequency`, `gate`, `out`, `pan` …]
      - `range` (Array) [``[_min, _max]``, `null` …]
      - `rate` (String) [`control`, `scalar` …]
      - `unit` (String) [`linear`, `decibels`, `hertz`, `boolean`, `bus_id` …]
      - `value` (Number)

  Defines the model that a node in the `server-tree` will be based on. Can have an arbitrary number of `parameters` and is referred to via its unique `hash`.

---

#### Server

##### Server tree

- `server-tree` (Object) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-tree-nested-json)

  The `server-tree` consists of a network of nested `children`:

  - `children` (Array)
    - (Object)
      - `node_id` (Number)
      - `synthdef` (String)
      - `controls` (Object)
        - `_parameter` (Number)
      - `children` (Array) _recursive_

    Nodes are implicitly either a `group` or a `synth`. A `group`-type node allows structural hierarchy and may have additional meaning in Supriya. It is represented by the following subset:

    - (Object)
      - `node_id` (Number)
      - `children` (Array) _recursive_

    A `synth`-type node represents an instantiation of a `synthdef` is the following subset:

    - (Object)
      - `node_id` (Number)
      - `synthdef` (String)
      - `controls` (Object)
        - `_parameter` (Number)

   For example, this `children` node contains the values for a specific instance of the `synthdef` [defined here](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-synthdef-json) (referenced via its unique hash) and is implicitly of type `synth`:
  ```json
  {
      "controls": {
          "amplitude": 0.846831738948822,
          "frequency": 1522.9603271484375,
          "gate": 0.0,
          "out": 16.0,
          "pan": 0.733410477638245
      },
      "node_id": 1010,
      "synthdef": "da0982184cc8fa54cf9d288a0fe1f6ca"
  }
  ```

  ###### Summary of `synth` vs `group` types

             | `group`               | `synth`
  -----------|-----------------------|----------------------
  `node_id`  | &check;               | &check;
  `synthdef` | &cross;               | &check;
  `controls` | &cross;               | &check; (`.size` ≥ 0)
  `children` | &check; (`.size` ≥ 0) | &cross;

  ---

- `server-tree` (Array) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-tree-flat-json)

  The `server-tree` can alternatively be represented as a flat array of nodes. These nodes are identical in structure to the `children` above but they gain a `parent` property referencing their `parent`’s `node_id`, and their `children` property is an array of `node_id` references rather than the full objects:

  - (Object)
    - `node_id` (Number)
    - `synthdef` (String)
    - `controls` (Object)
      - `_parameter` (Number)
    - `children` (Array)
    - `parent` (Number)

---

##### General

  - `server-meters` (Object) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-meters-json-L2)
    - `input_meter_peak_levels` (Array)
    - `input_meter_rms_levels` (Array)
    - `output_meter_peak_levels` (Array)
    - `output_meter_rms_levels` (Array)

    Contains data about global audio input and output levels (peak & RMS). Each array is an array of floats, 8 in [the example JSON](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-meters-json).

    ---

  - `status` (Object) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-status-json-L2)
    - `actual_sample_rate` (Number)
    - `average_cpu_usage` (Number)
    - `group_count` (Number)
    - `peak_cpu_usage` (Number)
    - `synth_count` (Number)
    - `synthdef_count` (Number)
    - `target_sample_rate` (Number)
    - `ugen_count` (Number)

    Various basic data describing the status of the server.

---

## Reading list

<details>
<summary>Show list…</summary>

Sorted chronologically by publication date.

- [x] 2015/02/02, [React.js Conf 2015 - Hype](https://youtu.be/z5e7kWSHWTg?t=2m30s)
  <iframe width="320" height="180" src="https://www.youtube-nocookie.com/embed/z5e7kWSHWTg?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

- [x] 2015/08/05, [Evaluating React.js and Flask](http://aviadas.com/blog/2015/08/05/evaluating-react-dot-js-and-flask/)

- [x] 2015/10/22, [Choosing a Front End Framework: Angular vs. Ember vs. React](https://smashingboxes.com/blog/choosing-a-front-end-framework-angular-ember-react/)

- [x] 2015/11/23, [Forget Angular & Ember, React Has Already Won the Client-Side War](https://www.sitepoint.com/react-has-won-the-client-side-war/)

- [x] 2016/01/03, [Angular 2 versus React: There Will Be Blood](https://medium.freecodecamp.com/angular-2-versus-react-there-will-be-blood-66595faafd51#.r7n5jff50)

- [x] 2016/05/03, [Vue.js vs React.js](https://rlafranchi.github.io/2016/05/03/vue-vs-react/)

- [x] 2016/06/30, [Consider VueJS for Your Next Web Project](https://blog.codeship.com/consider-vuejs-next-web-project/)

- [x] 2016/10/20, [Why We Chose Vue.js](https://about.gitlab.com/2016/10/20/why-we-chose-vue/)

</details>

## Tutorials/guides

### React

- 2015/11/04, [Learn React.js a Little at a Time](https://smashingboxes.com/blog/learn-react-part-1/)
- 2015/12/05, [Universal React](https://24ways.org/2015/universal-react/) (I actually [did this](https://github.com/delucis/24ways-react) back in January…)

#### React + Flask

- 2015/03/09, [The Ultimate Flask Front-End](https://realpython.com/blog/python/the-ultimate-flask-front-end/)

### Vue

- [Official introduction](https://vuejs.org/v2/guide/)
- 2016/07/14, [Create an App in VueJS 2](https://auth0.com/blog/create-an-app-in-vuejs-2/)

### HTML

- [Playing With The HTML5 range Slider Input](http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input)
- [HTML5 `<meter>` CodePen demo](http://codepen.io/pankajparashar/full/GnFpA)
- [CSS radio buttons CodePen](http://codepen.io/triss90/details/XNEdRe)

## Libraries

- [React](https://facebook.github.io/react/) ([repo](https://github.com/facebook/react))

- [Vue](https://vuejs.org/) ([repo](https://github.com/vuejs/vue), [Chrome DevTools extension](https://github.com/vuejs/vue-devtools))
  > Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects.

- [NexusUI](http://nexusosc.com/) ([repo](https://github.com/lsu-emdm/nexusUI))
  > NexusUI is a JavaScript library of HTML5 audio interface components that can control web audio or transmit OSC data to other applications such as Max or SuperCollider.

- [socket.io](http://socket.io/) ([repo](https://github.com/socketio/socket.io))
  - Previous test repo: [socket-test](https://github.com/delucis/socket-test)
