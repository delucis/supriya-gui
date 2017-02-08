# supriya-gui

Web GUI for [Supriya](http://supriya.mbrsi.org/).

## Install

``` bash
git clone git@github.com:delucis/supriya-gui.git
cd supriya-gui
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

## Contributing

- Please take a look at [the current roadmap](https://github.com/delucis/supriya-gui/projects/1).
- Some notes on coding style are in [the `STYLEGUIDE`](/STYLEGUIDE.md).
- Always work in a [feature branch](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow).

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

  Defines the model that a node in the `server_tree` will be based on. Can have an arbitrary number of `parameters` and is referred to via its unique `hash`.

---

#### Server

##### Server tree

- `server_tree` (Object) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-tree-nested-json)

  The `server_tree` consists of a network of nested `children`:

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

    A `synth`-type node, representing an instantiation of a `synthdef`, is the following subset:

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
  ---------------------|-----------------------|----------------------
  `node_id`            | &check;               | &check;
  `parent`<sup>†</sup> | &check;               | &check;
  `synthdef`           | &cross;               | &check;
  `controls`           | &cross;               | &check; (`.size` ≥ 0)
  `children`           | &check; (`.size` ≥ 0) | &cross;

  <sup>†</sup> only explicitly in `server_tree` when provided as an Array (see below)

  ---

- `server_tree` (Array) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-tree-flat-json)

  The `server_tree` can alternatively be represented as a flat array of nodes. These nodes are identical in structure to the `children` above but they gain a `parent` property referencing their `parent`’s `node_id`, and their `children` property is an array of `node_id` references rather than the full objects:

  - (Object)
    - `node_id` (Number)
    - `synthdef` (String)
    - `controls` (Object)
      - `_parameter` (Number)
    - `children` (Array)
    - `parent` (Number)

  The node with a `node_id` of `0` can be considered the “root” of the graph.

---

##### General

  - `server_meters` (Object) [&rarr;](https://gist.github.com/josiah-wolf-oberholtzer/2bb611ffbd1fe0a1f2e8c44dd64666be#file-server-meters-json-L2)
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

## Links for reference

### Vue

- [Dynamic Components](https://vuejs.org/v2/guide/components.html#Dynamic-Components) in official documentation

### HTML

- [Playing With The HTML5 range Slider Input](http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input)
- [CSS radio buttons CodePen](http://codepen.io/triss90/details/XNEdRe)

## Libraries

- [Vue](https://vuejs.org/) ([repo](https://github.com/vuejs/vue), [Chrome DevTools extension](https://github.com/vuejs/vue-devtools))
  > Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is very easy to pick up and integrate with other libraries or existing projects.

- [NexusUI](http://nexusosc.com/) ([repo](https://github.com/lsu-emdm/nexusUI))
  > NexusUI is a JavaScript library of HTML5 audio interface components that can control web audio or transmit OSC data to other applications such as Max or SuperCollider.

- [socket.io](http://socket.io/) ([repo](https://github.com/socketio/socket.io))
  - Previous test repo: [socket-test](https://github.com/delucis/socket-test)
  - Vue plugin: [vue-websocket](https://github.com/icebob/vue-websocket)
