class FrequencyCanvas {
    public width: number;
    public height: number;

    public clearColor: string = "white";
    public drawCtxt: CanvasRenderingContext2D;

    public controlNodes: NodeContainer;

    constructor(canvasId: string, low: number = 10, high: number = 25000){

        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById(canvasId);
        if(canvas) {
            this.width = canvas.width;
            this.height = canvas.height;
            this.drawCtxt = canvas.getContext("2d");
        }

        this.controlNodes = new NodeContainer();
        this.controlNodes.addNode([1,1]);
        this.controlNodes.addNode([0,1]);
        this.controlNodes.addNode([0.5,0.9]);

        this.clear();
        this.drawFrequencies();
    }

    public getFrequencies(freqContainer: [Float32Array, Float32Array]): void {
        for(let i = 0; i < freqContainer[0].length; i++) {
            const magnitude: number = this.controlNodes.getValueAt(i/freqContainer[0].length);
            const phase: number = Math.random()*Math.PI*2;

            freqContainer[0][i] = magnitude*Math.sin(phase);
            freqContainer[1][i] = magnitude*Math.cos(phase);
        }
    }

    private clear() {
        this.drawCtxt.fillStyle = this.clearColor;

        this.drawCtxt.fillRect(0, 0, this.width, this.height);
    }

    private drawFrequencies() {
        this.drawCtxt.strokeStyle = "black";
        this.drawCtxt.beginPath();
        this.drawCtxt.moveTo(0, this.height - this.height*this.controlNodes.getValueAt(0));

        for(let i = 0; i < this.width; i++) {
            this.drawCtxt.lineTo(i, this.height - this.height*this.controlNodes.getValueAt(i/this.width));
        }
        this.drawCtxt.stroke();
    }
}