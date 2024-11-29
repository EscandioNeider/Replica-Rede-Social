// --- APARECER/SUMIR MINI-DIV PARA CRIAÇÃO DE CONTA ---

  // Função para mostrar a div criarConta
  function janelaCriarConta() {
    const criarContaDiv = document.getElementById("criarConta");
    criarContaDiv.style.display = "block";
}

// Função de contador de caracteres
function updateCounter(id) {
    const input = document.getElementById(id);
    const counter = document.getElementById(`char-counter-${id}`);
    counter.textContent = `${input.value.length} / ${input.maxLength}`;
}

// Função para simular avanço (exemplo apenas)
function avançarCriar() {
    alert("Avançando para o próximo passo!");
}



// ---SCRIPT PARA COTAÇÃO DE CARACTERES ---
function updateCounter(fieldId) {
    const input = document.getElementById(fieldId);
    const counter = document.getElementById(`char-counter-${fieldId}`);
    counter.textContent = `${input.value.length} / ${input.maxLength}`;
}