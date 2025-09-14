const celdas = document.querySelectorAll('.celda');
let jugadorActual = "X";
let tablero = ['','','','','','','','',''];
let juego = true;

const formasGanar = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function ganar() {
    for (let forma of formasGanar) {
        const [a, b, c] = forma;
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            juego = false;
            return tablero[a];
        }
    }
    if (!tablero.includes('')) {
        juego = false;
        return 'Empate';
    }
    return null;
}

function resultados(resultado) {
    const contenedorEstado = document.getElementById("contenedor-estado");
    const estado = document.getElementById("estado");
    const progreso = document.getElementById("estado-progreso");
    if (resultado === 'Empate') {
        estado.textContent = 'Es un empate';
        progreso.style.background = 'linear-gradient(to right, #ff6666 50%, #00BFFF 100%)';
    } else if (resultado === 'X') {
        estado.textContent = 'X Gana!';
        progreso.style.background = 'linear-gradient(to right, #ff6666, #ff6666)';
    } else if (resultado === 'O') {
        estado.textContent = 'O Gana!';
        progreso.style.background = 'linear-gradient(to right, #00BFFF, #00BFFF)';
    } 
    
    contenedorEstado.classList.add('mostrar');
    setTimeout(() => {
        contenedorEstado.classList.remove('mostrar');
    }, 3000);
}

function marcarJugador(index) {
    if (juego && tablero[index] === '') {
        tablero[index] = jugadorActual;
        celdas[index].textContent = jugadorActual;
        celdas[index].classList.add(jugadorActual);
        const ganador = ganar();
        if (ganador) {
            resultados(ganador);
        } else {
            jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
        }
    }
}

function reiniciar() {
    tablero = ['','','','','','','','',''];
    jugadorActual = 'X';
    juego = true;
    celdas.forEach(celda => {
        celda.textContent = ''
        celda.classList.remove('X', 'O');
    });
    document.getElementById('estado').textContent = '';
}