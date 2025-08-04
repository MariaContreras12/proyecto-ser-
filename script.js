const tusFichas = document.getElementById('tusFichas');
const mesa = document.getElementById('mesa');
const turnoTexto = document.getElementById('turnoTexto');
const resultado = document.getElementById('resultado');

let jugador = [];
let ia = [];
let mesaFichas = [];
let turno = 'jugador';

function generarFichas() {
let todas = [];
for (let i = 0; i <= 6; i++) {
for (let j = i; j <= 6; j++) {
todas.push([i, j]);
}
}
return todas.sort(() => Math.random() - 0.5);
}

function dibujarFicha(valores, contenedor, clickable = false) {
const ficha = document.createElement('div');
ficha.classList.add('ficha');

const arriba = document.createElement('div');
arriba.classList.add('lado');
arriba.textContent = valores[0];

const abajo = document.createElement('div');
abajo.classList.add('lado');
abajo.textContent = valores[1];

ficha.appendChild(arriba);
ficha.appendChild(abajo);

if (clickable) {
ficha.onclick = () => jugarFicha(valores);
}

contenedor.appendChild(ficha);
}

function renderFichas() {
tusFichas.innerHTML = '';
jugador.forEach(f => dibujarFicha(f, tusFichas, true));

mesa.innerHTML = '';
mesaFichas.forEach(f => dibujarFicha(f, mesa, false));
}

function jugarFicha(ficha) {
if (turno !== 'jugador') return;

if (
mesaFichas.length === 0 ||
ficha[0] === mesaFichas[0][0] ||
ficha[1] === mesaFichas[0][0] ||
ficha[0] === mesaFichas[mesaFichas.length - 1][1] ||
ficha[1] === mesaFichas[mesaFichas.length - 1][1]
) {
jugador = jugador.filter(f => f !== ficha);
mesaFichas.push(ficha);
renderFichas();
revisarFin();
turno = 'ia';
turnoTexto.textContent = 'Turno: IA';
setTimeout(jugadaIA, 1000);
}
}

function jugadaIA() {
let fichaJugada = false;

for (let ficha of ia) {
if (
mesaFichas.length === 0 ||
ficha[0] === mesaFichas[0][0] ||
ficha[1] === mesaFichas[0][0] ||
ficha[0] === mesaFichas[mesaFichas.length - 1][1] ||
ficha[1] === mesaFichas[mesaFichas.length - 1][1]
) {
ia = ia.filter(f => f !== ficha);
mesaFichas.push(ficha);
fichaJugada = true;
renderFichas();
revisarFin();
turno = 'jugador';
turnoTexto.textContent = 'Turno: Jugador';
return;
}
}

if (!fichaJugada) {
// Revisa si el jugador también está bloqueado
const jugadorPuede = jugador.some(f => 
mesaFichas.length === 0 ||
f[0] === mesaFichas[0][0] ||
f[1] === mesaFichas[0][0] ||
f[0] === mesaFichas[mesaFichas.length - 1][1] ||
f[1] === mesaFichas[mesaFichas.length - 1][1]
);

if (!jugadorPuede) {
mostrarFinal("Game Over - Nadie puede jugar más");
} else {
// IA pasa turno, pero jugador aún puede jugar
resultado.textContent = "La IA no puede jugar. Tu turno.";
turno = 'jugador';
turnoTexto.textContent = 'Turno: Jugador';
}
}
}

function revisarFin() {
if (jugador.length === 0) {
resultado.textContent = '¡Ganaste!';
} else if (ia.length === 0) {
resultado.textContent = 'Perdiste. Gana la IA.';
}
}

function iniciarJuego() {
const todas = generarFichas();
jugador = todas.slice(0, 10);
ia = todas.slice(10, 20);
mesaFichas = [];
renderFichas();
}
function mostrarFinal(mensaje) {
document.querySelector('.contenido').style.display = 'none';
const panelFinal = document.getElementById('panelFinal');
panelFinal.style.display = 'block';
panelFinal.querySelector('h2').textContent = `Juego Terminado: ${mensaje}`;
}

function reiniciarJuego() {
document.querySelector('.contenido').style.display = 'flex';
document.getElementById('panelFinal').style.display = 'none';
iniciarJuego();
resultado.textContent = '';
turno = 'jugador';
turnoTexto.textContent = 'Turno: Jugador';
}

iniciarJuego();

// Mostrar contenido según selección
function mostrarContenido(tipo) {
  const derechosDeberes = document.getElementById('derechosDeberes');
  const columnas = derechosDeberes.querySelectorAll('.columna');
  
  derechosDeberes.classList.add('visible');
  
  // Ocultar todas las columnas primero
  columnas.forEach(col => col.style.display = 'none');
  
  // Mostrar según la selección
  if (tipo === 'deberes') {
      columnas[0].style.display = 'block';
  } else if (tipo === 'derechos') {
      columnas[1].style.display = 'block';
  } else if (tipo === 'ambos') {
      columnas.forEach(col => col.style.display = 'block');
  }
  
  createConfetti();
}

// Ocultar todo el contenido
function ocultarContenido() {
  const derechosDeberes = document.getElementById('derechosDeberes');
  derechosDeberes.classList.remove('visible');
}

// Función para crear confeti de celebración
function createConfetti() {
  const container = document.getElementById('celebration');
  const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
  
  // Limpiar confeti existente
  container.innerHTML = '';
  
  for (let i = 0; i < 120; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      // Posición aleatoria
      confetti.style.left = Math.random() * 100 + 'vw';
      
      // Tamaño aleatorio
      const size = Math.random() * 10 + 5;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      
      // Color aleatorio
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Animación
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 2) + 's';
      
      container.appendChild(confetti);
  }
}

// Mostrar el panel automáticamente al cargar la página
window.onload = function() {
  document.getElementById('panelFinal').style.display = 'block';
};