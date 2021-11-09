# Basic Electronics

This library aims to provide a simple interface to do some calculations with electronic circuits and componants.

## Example

```javascript
import { Resistor, VoltageSource, CurrentSource, SeriesCircuit, ParallelCircuit  } from "basic-electronics";
// const { Resistor, VoltageSource, CurrentSource, SeriesCircuit, ParallelCircuit  } = require("basic-electronics");

const r1 = new Resistor("R1", 2000);
const r2 = new Resistor("R2", 2000);
const r3 = new Resistor("R3", 3000);
const r4 = new Resistor("R4", 6000);
const v_source = new VoltageSource("Voltage Source", 5);
const i_source = new CurrentSource("Current Source", -0.002);

// construct left side
const left = new SeriesCircuit("Left");
const leftParallel = new ParallelCircuit("LeftParallel");
leftParallel.add([r2, i_source]);
left.add([r1, leftParallel]);

// construct right side
const right = new SeriesCircuit("Right");
const rightParallel = new ParallelCircuit("RightParallel");
rightParallel.add([r3, v_source]);
right.add([rightParallel, r4]);

const circuit = new ParallelCircuit("Circuit");
circuit.add([left, right]);

circuit.children.forEach((component) => console.log(component.name, component.resistance));
console.log("---");
console.log(circuit.name, circuit.resistance);
```

## Works To Do

- [ ] Build a stable and extensible electronic component system
  - [x] Basic Component
  - [ ] Linear Resistor
    - [x] resistance
    - [ ] voltage
    - [ ] current
  - [ ] Voltage Source
    - [x] resistance
    - [x] voltage
    - [ ] current
  - [ ] Current Source
    - [x] resistance
    - [ ] voltage
    - [x] current
  - [ ] Series Circuit
    - [x] resistance
    - [ ] voltage
    - [ ] current
  - [ ] Parallel Circuit
    - [x] resistance
    - [ ] voltage
    - [ ] current
  - [ ] Non-linear Resistor
    - [ ] resistance
    - [ ] voltage
    - [ ] current
- [ ] Thevenin Equivalent Circuit
- [ ] Norton Equivalent Circuit
