import { ParallelCircuit, SeriesCircuit, VoltageSource, CurrentSource, Resistor } from "./circuit";

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
