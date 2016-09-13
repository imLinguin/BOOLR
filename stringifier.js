function stringify() {
    let result = {
      components: [],
      connections: []
    }
    
    for(let i of components) {
        let component = [
            i.constructor.name
        ]
        
        // Params
        component[1] = Object.assign({}, i);
        delete component[1].input;
        delete component[1].output;
        delete component[1].from;
        delete component[1].to;
        
        // Connections
        if(i.input) {
          for(let input of i.input) {
            result.connections.push([
                components.indexOf(input.from), // From
                components.indexOf(input.to), // To
                components.indexOf(input) // Wire
            ]);
          }
        }
        
        result.components.push(component);
    }
    
    return JSON.stringify(result);
}

function parse(string) {
    string = JSON.parse(string);
    for(let i of string.components) {
        let component = eval("new " + i[0]);
        Object.assign(component,i[1]);
    }
    
    for(let i of string.connections) {
        const from = components[i[0]];
        const to = components[i[1]];
        const wire = components[i[2]];
        console.log(i);
        
        wire.from = from;
        wire.to = to;
        from.connect(to,wire);
    }
}
