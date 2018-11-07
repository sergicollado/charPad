export class InputList {
    zoom = 1
    // screen DPI / PDF DPI
    readonly dpiRatio = 96 / 72;
    inputs = [];

    public zoomIn(): void {
        this.inputs.forEach(i => {
            i.left *= (.25 / this.zoom) + 1;
            i.top *= (.25 / this.zoom) + 1;
            i.width *= (.25 / this.zoom) + 1;
            i.height *= (.25 / this.zoom) + 1;
            return i;
            });
        this.zoom += .25;
    }

    public zoomOut(): void {
        this.inputs.forEach(i => {
            i.left *= 1 - (.25 / this.zoom);
            i.top *= 1 - (.25 / this.zoom);
            i.width *= 1 - (.25 / this.zoom);
            i.height *= 1 - (.25 / this.zoom);
            return i;
        });
        this.zoom -= .25;
    }

    push (input) {
        this.inputs.push(input);
    }

}