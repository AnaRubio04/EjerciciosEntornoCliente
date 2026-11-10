
"use strict";

// 1. CONSTANTES GENERALES

export const CLAVE_TRENES = "trenes";


// 2. ESTACIONES

export const ESTACIONES = [
    "Sodor Central",
    "Knapford",
    "Vicarstown",
    "Tidmouth Sheds"
];


// 3. MATRIZ DE DISTANCIAS

// Las distancias se indican en ambos sentidos.
// Las rutas indirectas ya incluyen sus estaciones intermedias.

export const MATRIZ_DISTANCIAS = {
    "Sodor Central": {
        "Sodor Central": 0,
        "Knapford": 25,
        "Vicarstown": 15,
        "Tidmouth Sheds": 27
    },

    "Knapford": {
        "Sodor Central": 25,
        "Knapford": 0,
        "Vicarstown": 10,
        "Tidmouth Sheds": 22
    },

    "Vicarstown": {
        "Sodor Central": 15,
        "Knapford": 10,
        "Vicarstown": 0,
        "Tidmouth Sheds": 12
    },

    "Tidmouth Sheds": {
        "Sodor Central": 27,
        "Knapford": 22,
        "Vicarstown": 12,
        "Tidmouth Sheds": 0
    }
};


// 4. RUTAS INDIRECTAS

export const RUTAS = {
    "Sodor Central": {
        "Tidmouth Sheds":
            "Sodor Central → Vicarstown → Tidmouth Sheds"
    },

    "Tidmouth Sheds": {
        "Sodor Central":
            "Tidmouth Sheds → Vicarstown → Sodor Central"
    },

    "Knapford": {
        "Tidmouth Sheds":
            "Knapford → Vicarstown → Tidmouth Sheds"
    },

    "Tidmouth Sheds": {
        "Knapford":
            "Tidmouth Sheds → Vicarstown → Knapford"
    }
};


// 5. EVENTOS ALEATORIOS

export const EVENTOS = [
    {
        mensaje: "🐑 ¡Retraso por ovejas en la vía!",
        retraso: 10
    },

    {
        mensaje: "🔧 ¡Avería en el motor!",
        retraso: 15
    },

    {
        mensaje: "✅ ¡Viaje sin incidentes!",
        retraso: 0
    }
];
