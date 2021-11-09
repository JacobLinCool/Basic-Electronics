const name_generator = (function* () {
    let i = 0;
    while (true) yield `Component.${i++}`;
})();

export class Component {
    protected _resistance: number = 0;

    public get resistance(): number {
        return this._resistance;
    }

    public set resistance(value: number) {
        this._resistance = value;
    }

    constructor(public name: string = name_generator.next().value) {}
}

export class Resistor extends Component {
    constructor(public name: string, protected _resistance: number) {
        super(name || name_generator.next().value);
    }
}

export class VoltageSource extends Component {
    protected _resistance = 0;

    constructor(public name: string, protected _voltage: number) {
        super(name || name_generator.next().value);
    }

    public get voltage(): number {
        return this._voltage;
    }

    public set voltage(value: number) {
        this._voltage = value;
    }
}

export class CurrentSource extends Component {
    protected _resistance = Infinity;

    constructor(public name: string, protected _current: number) {
        super(name || name_generator.next().value);
    }

    public get current(): number {
        return this._current;
    }

    public set current(value: number) {
        this._current = value;
    }
}

export class SeriesCircuit extends Component {
    public components: Component[] = [];
    protected _resistance = 0;

    constructor(public name: string) {
        super(name || name_generator.next().value);
    }

    public get resistance() {
        return this.components.reduce((acc, cur) => acc + cur.resistance, 0);
    }

    public add(component: Component | Component[]): this {
        if (component instanceof Component) this.components.push(component);
        else this.components.push(...component);
        return this;
    }

    public has(component: Component) {
        return this.components.includes(component);
    }

    public remove(component: Component) {
        this.components = this.components.filter((c) => c !== component);
        return this;
    }

    public get children(): Component[] {
        let children: Component[] = [];

        for (let component of this.components) {
            if (component instanceof ParallelCircuit || component instanceof SeriesCircuit) children.push(...component.children);
            else children.push(component);
        }

        return children;
    }

    public voltageDivider(component: Component): number {
        if (this.has(component)) {
            this.remove(component);
            this.add(new Resistor(`${this.name}_${component.name}`, this.resistance));
        }
        return this.resistance;
    }
}

export class ParallelCircuit extends Component {
    public components: Component[] = [];
    protected _resistance = 0;

    constructor(public name: string) {
        super(name || name_generator.next().value);
    }

    public get resistance() {
        return 1 / this.components.reduce((acc, cur) => acc + 1 / cur.resistance, 0);
    }

    public add(component: Component | Component[]) {
        if (component instanceof Component) this.components.push(component);
        else this.components.push(...component);
        return this;
    }

    public has(component: Component) {
        return this.components.includes(component);
    }

    public remove(component: Component) {
        this.components = this.components.filter((c) => c !== component);
        return this;
    }

    public get children(): Component[] {
        let children: Component[] = [];

        for (let component of this.components) {
            if (component instanceof ParallelCircuit || component instanceof SeriesCircuit) children.push(...component.children);
            else children.push(component);
        }

        return children;
    }

    public voltage(): number {
        let voltage = 0;

        for (let component of this.components) {
            if (component instanceof VoltageSource) voltage += component.voltage;
        }

        return voltage;
    }
}
