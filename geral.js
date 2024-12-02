// ---ALERT - SIMULAÇÃO DE AVANÇO---
function avançarCriar() {
    alert("Avançando para o próximo passo!");
}



// ---SCRIPT PARA COTAÇÃO DE CARACTERES ---
function updateCounter(fieldId) {
    const input = document.getElementById(fieldId);
    const counter = document.getElementById(`char-counter-${fieldId}`);
    counter.textContent = `${input.value.length} / ${input.maxLength}`;
}

//  ---TESTE PARA MOSTRAR UMA DIV---
