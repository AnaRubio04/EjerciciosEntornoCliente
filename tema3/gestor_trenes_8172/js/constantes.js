"use strict";

export const CLAVE_TRENES = "trenes";

export const TIPOS_TREN = [
    "Vapor",
    "Diésel",
    "Eléctrico",
    "Maglev"
];

export const ESTACIONES = [
    "Sodor Central",
    "Knapford",
    "Vicarstown",
    "Tidmouth Sheds"
];

export const MATRIZ_DISTANCIAS = [
    [0, 25, 15, null],
    [25, 0, 10, null],
    [15, 10, 0, 12],
    [null, null, 12, 0]
];

export const EVENTOS = [
    {
        texto: "Retraso por ovejas en la vía",
        retraso: 10
    },
    {
        texto: "Avería en el motor",
        retraso: 15
    },
    {
        texto: "Viaje sin incidentes",
        retraso: 0
    }
];
