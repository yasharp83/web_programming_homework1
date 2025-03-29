document.addEventListener('DOMContentLoaded', () => {
    const formulaSections = document.querySelectorAll('.formula_section');
    const regex = /^-?\d*\.?\d*$/;

    formulaSections.forEach(section => {
      const inputs = section.querySelectorAll('input[type="text"]');
      const formulaElement = section.querySelector('formula');
      const evaluator = formulaElement.getAttribute('evaluator');
  
      inputs.forEach(input => {
        input.addEventListener('input', updateFormula);
      });
  
      function updateFormula() {
        let formulaString = evaluator;
        let variables = {};
        let flag = false
        inputs.forEach(input => {
          if (!regex.test(input.value) || input.value == '') {
                flag = true; 
          }
          const id = input.id;
          const value = parseFloat(input.value) || 0;
          console.log(`Input ID: ${id}, Value: ${value}`);
          variables[id] = value;
          formulaString = formulaString.replaceAll(id, `variables.${id}`);
        });
  
        try {
          if (flag) {
            formulaElement.textContent = 'Invalid input';
            formulaElement.style.color = 'red';
            return;
          }
          const result = eval(formulaString); 
          formulaElement.textContent = `Result: ${result.toFixed(2)}`;
          formulaElement.style.color = 'green';
        } catch (error) {
          console.error('Error evaluating formula:', error);
          formulaElement.textContent = 'Error in formula';
          formulaElement.style.color = 'red';
        }
      }
      updateFormula();
    });
  });