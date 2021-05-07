// calculator class
class calculator {
    constructor(prev,curr){
        this.previous = prev;
        this.current = curr;
    };

    appendNumber(number){
        if(this.current.innerHTML.includes('.') && number == '.') return
        this.current.innerHTML += number;
    };
    
    operation(operationBtn){
       if(this.current.innerHTML == '') return

       if(operationBtn === '√'){
        this.current.innerHTML = parseFloat(Math.sqrt(this.current.innerHTML))
        this.previous.innerHTML = '';
        return
       }

        if(this.previous.innerHTML !== ''){
            this.result(operationBtn);
        }

        this.previous.innerHTML =parseFloat(this.current.innerHTML);
        this.current.innerHTML = '';
        this.operationSymbol = operationBtn;
    };

    result(){
       const currentNum = parseFloat(this.current.innerHTML);
        const prevNum = parseFloat(this.previous.innerHTML);
        if(isNaN(this.current.innerHTML) || isNaN(this.previous.innerHTML)) return
        let compute;
        switch(this.operationSymbol){
            case '+': compute = prevNum + currentNum;
            break;
            case '-': compute = prevNum - currentNum;
            break;
            case '×': compute = prevNum * currentNum;
            break;
            case '÷': compute = prevNum / currentNum;
            break;
            case '%': compute = prevNum % currentNum;
            break;
            default: return
        }
        this.current.innerHTML = compute.toLocaleString('en');
        this.previous.innerHTML = '';
        

    }
    backspace(){
        this.current.innerHTML = this.current.innerHTML.toString().slice(0,-1);
        
    };
    clearAll(){
        this.current.innerHTML = '';
    };
}
// variables
const operations = document.querySelectorAll('.operation'),
      numbers = document.querySelectorAll('.numbers'),
      backspaceBtn = document.getElementById('backspaceBtn'),
      previousDiv = document.getElementById('previous'),
      currentDiv = document.getElementById('current'),
      resultBtn = document.getElementById('result'),
      clearBtn = document.getElementById('clear'),
      swithBtn = document.getElementById('swithTheme'), // checkbox for switch theme
      calculate = new calculator(previousDiv,currentDiv);

  
      
//switch handlers

      //set dark theme false as default    
      if(localStorage.getItem('isDark') == null){
          localStorage.setItem('isDark',false);
      }

// switch theme
function switchThemeFunc(){
    if(swithBtn.checked){
        localStorage.setItem('isDark',true);
        themeFromLsFunc();
    } else{
        localStorage.setItem('isDark',false);
        themeFromLsFunc();
    }
}
// apply theme from local storage
function themeFromLsFunc(){
    if(localStorage.getItem('isDark') == 'true'){
        swithBtn.checked = true;
        previousDiv.style.color = '#f7f7f7';
        currentDiv.style.color = '#f7f7f7';
        document.body.style.background = '#3c3c3c';
        document.getElementById('calculator').style.background = '#333';
        document.getElementById('calculator').style.boxShadow = '11px 11px 38px #2b2b2b,-11px -11px 38px #3b3b3b';
        document.querySelector('.switchBox').style.color = 'rgba(218, 217, 217, 0.775)';
        document.querySelector('h4').innerHTML = 'switch to light theme'
        document.querySelectorAll('button').forEach(btn =>{
            btn.style.background = '#3e3e3e';
            btn.style.color = '#f4f4f4';
            btn.style.boxShadow = '5px 5px 40px #343434,-5px -5px 40px #060606';
        })
        operations.forEach(op => {
            op.style.background = 'linear-gradient(145deg, #bdcb7b, #e1f193)';
            op.style.color = '#333'
        });
        clearBtn.style.background = ' linear-gradient(145deg, #d35454, #fa6464)';
        resultBtn.style.background = ' linear-gradient(145deg, #80d354, #98fa64)';

    }else if(localStorage.getItem('isDark') == 'false'){
        swithBtn.checked = false;
        previousDiv.style.color = '#333';
        currentDiv.style.color = 'rgb(52, 52, 52)';
        document.body.style.background = '#c9c9c9';
        document.getElementById('calculator').style.background = '#c9c9c9';
        document.getElementById('calculator').style.boxShadow = '11px 11px 38px #ababab,-11px -11px 38px #e7e7e7';
        document.querySelector('.switchBox').style.color = 'rgb(96, 96, 96)';
        document.querySelector('h4').innerHTML = 'switch to dark theme'
        document.querySelectorAll('button').forEach(btn =>{
            btn.style.background = 'linear-gradient(145deg, #b5b5b5, #d7d7d7)';
            btn.style.color = '#333';
            btn.style.boxShadow = '18px 18px 65px #a1a1a1,-18px -18px 65px #f1f1f1';
        })
        operations.forEach(op => {
            op.style.background = 'linear-gradient(145deg, #bdcb7b, #e1f193)';
            op.style.color = '#333'
        });
        clearBtn.style.background = ' linear-gradient(145deg, #d35454, #fa6464)';
        resultBtn.style.background = ' linear-gradient(145deg, #80d354, #98fa64)';
    }
}

// add event listeners

swithBtn.addEventListener('change',switchThemeFunc)
window.addEventListener('load',themeFromLsFunc())
//numbers appending on click
numbers.forEach(number =>{
    number.addEventListener('click',(e) =>{
        calculate.appendNumber(e.target.innerHTML)
    })
});
// backspace listener
backspaceBtn.addEventListener('click',()=>{
    calculate.backspace();
});
//clear listener
clearBtn.addEventListener('click', ()=>calculate.clearAll());
// operations listener
operations.forEach(operation =>{
    operation.addEventListener('click',(e)=>{
        calculate.operation(e.target.innerHTML);
    })
})

resultBtn.addEventListener('click',()=>{
    calculate.result();
    
})
