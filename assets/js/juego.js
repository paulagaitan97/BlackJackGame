/**
 * 2C = Two of Clubs ( Tréboles)
 * 2D = Two of Diamonds ( Diamantes )
 * 2H = Two of Hearts ( Corazon )
 * 2S = Two of Spades ( Espada )
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0, puntosComputadora = 0;
// Referencias del HTML
const btnPedirCarta = document.querySelector('#btnPedirCarta');
const btnDetenerJuego = document.querySelector ('#btnDetenerJuego');
const btnNuevoJuego = document.querySelector ('#btnNuevoJuego');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosJugadores = document.querySelectorAll('small');

/*
Metodo que crea la baraja de cartas al juego actual
**/
const crearDeck = () => {
    for ( let i = 2; i <= 10; i++ ){
        for ( let tipo of tipos ){
            deck.push( i + tipo );
        } 
    }
    for ( let tipo of tipos ){
        for ( let esp of especiales ){
            deck.push( esp + tipo );
        }
    }
    deck = _.shuffle( deck );
    console.log ( deck );
    return deck;
}
// Llamado a la funcion de crear deck
crearDeck();

// Esta funcion permite tomar un carta
const pedirCarta = () => {
    if ( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}


// Esta funcion obtiene el valor de la carta
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length-1);
    return ( isNaN ( valor ) ) ? ( valor === 'A' ) ? 11 : 10 : valor * 1;
}


// Turno de la compuradora
const turnoComputadora = ( puntosMinimos ) => {
    do {
    const cartaActual = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(cartaActual);
    puntosJugadores[1].innerText = puntosComputadora;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ cartaActual }.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);
    if ( puntosMinimos > 21 ){
        break;
    }
    } while ( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ));
    
    setTimeout ( () => {
    ( ( puntosJugador > 21  && puntosComputadora <= 21) 
    ? alert('La computadora ha ganado') 
    : ( ( puntosJugador <= 21 && puntosJugador < puntosComputadora) 
    ? alert('El Jugador ha ganado') 
    : alert ('Nadie Gana :( ') ) )
    },15);
    
}

// Eventos
// permite al jugador pedir una carta del deck
btnPedirCarta.addEventListener('click', function () {
    const cartaActual = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(cartaActual);
    puntosJugadores[0].innerText = puntosJugador;
    //<img class="carta" src="assets/cartas/10C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ cartaActual }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento, perdiste');
        btnPedirCarta.disabled = true;
        btnDetenerJuego.disabled = true;
        turnoComputadora ( puntosJugador );
    } else if ( puntosJugador === 21 ) {
        console.warn('Que la fuerza te acompañe, Ganaste');
        btnPedirCarta.disabled = true;
        btnDetenerJuego.disabled = true;
        turnoComputadora ( puntosJugador );
    }
    
});

btnDetenerJuego.addEventListener('click', function () {
    btnPedirCarta.disabled = true;
    btnDetenerJuego.disabled = true;
    turnoComputadora ( puntosJugador );
});

btnNuevoJuego.addEventListener('click', function(){
    console.clear();
    
    deck = [];

    deck = crearDeck();
    puntosJugador      = 0;
    puntosComputadora  = 0;

    puntosJugadores[0].innerText = 0;
    puntosJugadores[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedirCarta.disabled = false;
    btnDetenerJuego.disabled = false;
});


