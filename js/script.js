
let display=document.getElementById("userinput")
let output=document.getElementById("useroutput")
let basevalue=0
let orgvalue=0
let taxbase1=0
let taxbase2=0
let applyplustax=false
let applyminustax=false
let applypercent=false
let applypercentminus=false
let applymu=false
let applysettax=false
let last_Answer=null
let grandTotal=0
let tax=18
function plusTax(){
    taxbase1=Number(display.value)
    applyplustax=true
    calculate()
}
function minusTax(){
    taxbase2=Number(display.value)
    applyminustax=true
    calculate()
}
function setTax(){
    applysettax=true;
    display.value=""
}
function muMode(){
    basevalue=Number(display.value);
    applymu=true;
    display.value="";
}
function plusPercentmode(){
    orgvalue=Number(display.value);
    applypercent=true;
    display.value="";
}
function minusPercentmode() {
    orgvalue=Number(display.value);
    applypercentminus=true;
    display.value="";
}
function fact(n){
    if (n===0 || n===1){
        return 1
    }
    else if(n>1){
        return n*fact(n-1)
    }
    else{
        throw new Error("Factorial not defined for negative numbers");
    }
}
function appendValue(val) {
    display.value+=val
}
function deleteValue() {
    v=display.value
    if(v.endsWith("log(")){
        display.value=v.slice(0,-4)
    }
    else if (v.endsWith("sin")) {
        display.value=v.slice(0,-3)
    } 
    else if (v.endsWith("cos")) {
        display.value=v.slice(0,-3)
    } 
    else if (v.endsWith("tan")) {
        display.value=v.slice(0,-3)
    } 
    else{
        display.value=v.slice(0,-1)
    }
    
}
function clearValue() {
    display.value=" "
    grandTotal=0
    output.textContent=""
}
function prevValue(){
    output.textContent=last_Answer;
    display.value+=last_Answer;
}
function showGT(){
    output.textContent=grandTotal;
    return;
}
function calculate() {
    try{
        let expression=display.value
        if (applyplustax){
            let finalvalue1=taxbase1*(1+(tax/100))
            output.textContent=finalvalue1
            applyplustax=false
            return;
        }
        if (applyminustax){
            let finalvalue2=taxbase2/(1+(tax/100))
            output.textContent=finalvalue2
            applyminustax=false
            return;
        }
        if (applysettax) {
            let taxvalue=Number(display.value);
            tax=taxvalue
            output.textContent=" "
            applysettax=false
            return;
        }
        if (applypercentminus){
            let percent=Number(display.value)
            let total=orgvalue*(1-(percent/100))
            output.textContent=total
            applypercentminus=false
            last_Answer=total
            orgvalue=0
            return;
        }
        if (applypercent){
            let percent=Number(display.value)
            let total=orgvalue*(1+(percent/100))
            output.textContent=total
            applypercent=false
            last_Answer=total
            orgvalue=0
            return;
        }
        if (applymu){
            let percent=Number(display.value)
            let sellingprice=basevalue*(1+(percent/100))
            output.textContent=sellingprice
            applymu=false
            last_Answer=sellingprice
            basevalue=0
            return;
        }
        if (expression.includes('√')){
            expression=expression.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");
        }
        if (expression.includes('%')){
            expression=expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
        }
        if (expression.includes('²')){
            expression=expression.replace(/(\d+(\.\d+)?)²/g, "($1**2)");
        }
        if (expression.includes('π')){
            expression=expression.replace(/(\d+(\.\d+)?)π/g, "($1*Math.PI)");
            expression=expression.replace(/π/g, "Math.PI");
        }
        if (expression.includes('log(')){
            expression=expression.replace(/log\(/g,'Math.log10(')
        }
        if (expression.includes('ln(')){
            expression=expression.replace(/ln\(/g,'Math.log(')
        }
        if (expression.includes('sin')){
            expression=expression.replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)")
        }
        if (expression.includes('cos')){
            expression=expression.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)")
        }
        if (expression.includes('tan')){
            expression=expression.replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)")
        }
        if (expression.includes('e')){
            expression=expression.replace(/e/g,"Math.E")
        }
        if(expression.includes('^')){
            expression=expression.replace(/\^/g,'**')
        }
        if(expression.includes('!')){
            expression=expression.replace(/(.+)!/g,function(_,exp){
                let value=eval(exp)
                if(!Number.isInteger(value)||value<0){
                    throw new Error("Factorial not defined for negative numbers");
                }
                return fact(value);
            })

        }
        
        let result=eval(expression)
        output.textContent=result;
        grandTotal+=result

    }
    catch(e){
        output.textContent="Error"
    }
    last_Answer=output.textContent
}