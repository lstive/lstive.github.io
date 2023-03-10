class Bool{
	constructor(...param){
		this._bits = null;
		this._expression = null;
		// stacks
		this._values = new Stack();
		this._signs = new Stack();
		this._operators = new Stack();
		this._final = new Stack();
		this._variables = new String();
		this.res = '';
		
		if(param.length == 2){
			this._expression = Array.from(param[0]);
			this._bits = param[1];
			this._changeValues();
			this._makeNotation();
			this._eval();
			// evaluar si se proporciona la expresion con los bits
		}else if(param.length == 1){
			this._expression = Array.from(param[0]);
		}
	}

	_makeNotation(){
		let op = null;
		for(let i = 0; i < this._expression.length; i++){
			if(this._expression[i] == '+'){
				if(this._operators.getTop() == '.'){
					this._values.push(this._operators.pop());
					this._operators.push(this._expression[i]);
				}else{
					this._operators.push(this._expression[i]);
				}
			}else if(this._expression[i] == '.'){
				if(this._operators.getTop() == '.'){
					this._values.push(this._operators.pop());
					this._operators.push(this._expression[i]);
				}else{
					this._operators.push(this._expression[i]);
				}
			}else if(this._expression[i] == '('){
				this._operators.push(this._expression[i]);
			}else if(this._expression[i] == ')'){
				while(this._operators.getTop() != '('){
					this._values.push(this._operators.pop());
				}
				this._operators.pop();

				if(this._operators.getTop() == '!'){
					this._values.push(this._operators.pop());
				}
			}else if(this._expression[i] == '!'){
				this._operators.push(this._expression[i]);
			}else{
				if(this._operators.getTop() == '!'){
					this._values.push(this._expression[i]);
					this._values.push(this._operators.pop());
				}else{
					this._values.push(this._expression[i]);
				}
			}
		}
	}

	getNVariables(){
		let setValues = new Set(this._expression);
		let count = 0;
		setValues = Array.from(setValues);
		
		for(let i = 0; i < setValues.length; i++){
			if(setValues[i] != '(' & setValues[i] != ')' & setValues[i] != '+' & setValues[i] != '.' & setValues[i] !='!'){
				count++;
			}
		}
		
		return count;
	}

	_changeValues(){
		let setValues = new Set(this._expression);
		setValues = Array.from(setValues);
		setValues.sort();
		//this._variables = String.toString(setValues);
		
		for(let i = 0; i < setValues.length; i++){
			if(setValues[i] != '(' & setValues[i] != ')' & setValues[i] != '+' & setValues[i] != '.' & setValues[i] !='!'){
				this._variables = this._variables + setValues[i];
			}
		}

		for(let i = 0; i < this._expression.length; i++){
			for(let j = 0; j < this._variables.length; j++){
				if(this._expression[i] == this._variables[j]){
					this._expression[i] = this._bits[j];
				}
			}
		}
	}

	_eval(){
		let temp = null;
		let calc = new Stack();
		let reverse = new Stack();
		let op = '';

		// evaluacion de las expresiones de algebra booleana
		while(this._values.getTop() != null){
			reverse.push(this._values.pop());
		}

		while(reverse.counter != 0){
			temp = reverse.pop();
			
			if(temp == '+'){
				reverse.push((calc.pop() | calc.pop())? '1':'0');
				temp = reverse.getTop();
			}else if(temp == '.'){
				reverse.push((calc.pop() & calc.pop())? '1':'0');
				temp = reverse.getTop();
			}else{
				calc.push(temp);

				if(reverse.getTop() == '!'){
					calc.push((calc.pop() == '1')? '0':'1');
					reverse.pop();
				}
			}
		}

		this.res = temp;
		return temp;
	}

	redefine(expression){
		this._expression = expression;
	}

	reeval(bits){
		let res = (new Bool(this._expression, bits)).res;
		this.res = res;
		this._variables = (new Bool(this._expression, bits))._variables;
		return res;
	}

	full(expression, bits){
		this.redefine(expression);
		this.res = this.reeval(bits);
		return this.res;
	}
}

// let eval = new Bool();
// let truthTable = new BoolTable(3);
// let values = truthTable._createTable();
// eval.redefine('(a+b.c)');

// for(let i = 0; i < Math.pow(2, truthTable.order); i++){
// 	console.log(values[i] + ' = ' + eval.reeval(values[i]));
// }
// console.log(eval.getNVariables());

document.getElementById("evaluar").addEventListener("click", event => {
    let expresion = document.getElementById("expresion").value;
    let valores = document.getElementById("valores").value;

    console.log(expresion);
    console.log(valores);

	let eval = new Bool(expresion, valores);
    document.getElementById("respuesta").value = eval.res;
});

document.getElementById("evaluar-tabla").addEventListener("click", event => {
    let expresion = document.getElementById("expresion").value;
    let eval = new Bool();
    eval.redefine(expresion);
    let truthTable = new BoolTable(eval.getNVariables());
    let values = truthTable._createTable();

    for (let i = 0; i < Math.pow(2, truthTable.order); i++){
        console.log(values[i] + " = " + eval.reeval(values[i]));
    }

	let nodo = document.getElementById("contenido");
	nodo.textContent = "";
    let table = document.createElement("table");
	nodo.append(table);

	let tb = null;
    
	// imprimir tabla combinacional
	for (let i = 0; i < Math.pow(2, truthTable.order) + 1; i++){
		table.append(document.createElement("tr"));

		if (i % 2 == 0) {
			table.childNodes[i].style.backgroundColor = "#f0f0f0";
		}

		if (i == 0) {
			for (let j = 0; j < truthTable.order; j++){
				tb = document.createElement("th");
				tb.append(document.createTextNode(eval._variables[j]));
				table.childNodes[0].append(tb);
			}

			tb = document.createElement("th");
			tb.append(document.createTextNode("x"));
			table.childNodes[0].append(tb);
		} else {
			for (let j = 0; j < truthTable.order; j++){
				tb = document.createElement("td");
				tb.append(document.createTextNode(values[i - 1][j]));
				table.childNodes[i].append(tb);	
			}

			tb = document.createElement("td");
			tb.append(document.createTextNode(eval.reeval(values[i - 1])));
			table.childNodes[i].append(tb);
		}
	}
});
