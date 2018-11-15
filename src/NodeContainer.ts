class NodeContainer {
    private nodesArray: [number, number][] = [];

    constructor(){}

    public getNodes(): [number, number][] {
        const out = this.nodesArray.map(
            (v) => {
                return <[number, number]> [v[0], v[1]];
            }
        );
        // Clone the nodes, just to make sure consumers don't make changes to the base nodes

        return out;
    }

    public addNode(newNode: [number, number]) {
        if(!this.nodesArray) {
            this.nodesArray = [];
        }

        this.nodesArray.push([newNode[0], newNode[1]]);
        this.sortNodes();
    }

    //TODO: Remove node?
    //TODO: SetNodes?

    public getValueAt(pos: number, interpolation: string = "linear") {
        //TODO: Maybe use an enum for supported interpolations

        // Assume the node array is already sorted
        if(pos <= this.nodesArray[0][0]) {
            return this.nodesArray[0][1];
        } else if(pos >= this.nodesArray[this.nodesArray.length - 1][0]) {
            return this.nodesArray[this.nodesArray.length - 1][1];
        } else {
            switch(interpolation) {
                case "linear":
                    let a: [number, number];
                    let b: [number, number];
                    for(let i = 1; i < this.nodesArray.length; i++) {
                        if(this.nodesArray[i][0] >= pos) {
                            a = this.nodesArray[i - 1];
                            b = this.nodesArray[i];
                            i = this.nodesArray.length;
                        }
                    }

                    let ab = b[0] - a[0];
                    if(ab > 0) {
                        return a[1]*(1 - (pos - a[0])/ab) + b[1]*(1 - (b[0] - pos)/ab)
                    } else {
                        return -1;
                    }

                    break;
            }
        }

    }

    private sortNodes(): void {
        this.nodesArray = this.nodesArray.sort(
            (a, b) => {
                return a[0] - b[0];
            }
        );
    }


}