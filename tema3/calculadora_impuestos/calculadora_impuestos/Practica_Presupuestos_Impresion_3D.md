# Práctica JavaScript — Calculadora de presupuestos de impresión 3D

## Contexto

Una empresa de impresión 3D necesita una aplicación web para calcular el precio de fabricación de una pieza.

El usuario introducirá las características de la pieza y la aplicación calculará automáticamente el presupuesto.

---

# Datos de entrada

La interfaz tendrá:

```text
Peso de la pieza (gramos)
Material
Calidad de impresión
Número de unidades
¿Entrega urgente?
```

---

# Materiales

Habrá tres materiales:

```text
PLA
PETG
ABS
```

El precio por gramo será:

```text
PLA  → 0.08 €/g
PETG → 0.10 €/g
ABS  → 0.12 €/g
```

Estas cantidades deberán estar definidas como constantes.

Por ejemplo, en:

```text
constanjkses.js
```

podría haber:

```javascript
export const PRECIO_PLA = 0.08;
export const PRECIO_PETG = 0.10;
export const PRECIO_ABS = 0.12;
```

---

# Calidad de impresión

El usuario podrá elegir:

```text
Básica
Normal
Alta
```

La calidad modifica el precio:

```text
Básica → sin incremento
Normal → +15 %
Alta   → +30 %
```

---

# Cálculo del precio

Primero se calcula:

```text
peso × precio por gramo
```

Por ejemplo:

```text
200 gramos de PLA

200 × 0.08 = 16 €
```

Después se aplica la calidad.

Si es calidad Normal:

```text
16 + 15 %

16 × 1.15 = 18.40 €
```

Después se multiplica por el número de unidades.

Si queremos 3 unidades:

```text
18.40 × 3 = 55.20 €
```

---

# Entrega urgente

Habrá un checkbox:

```html
<input type="checkbox" id="urgente">
```

Si está marcado, se añadirá un:

```text
20 %
```

al precio.

Por ejemplo:

```text
55.20 × 1.20 = 66.24 €
```

---

# Descuento por cantidad

Además:

```text
1 - 4 unidades  → sin descuento
5 - 9 unidades  → 5 % de descuento
10 o más        → 10 % de descuento
```

El descuento se aplicará **después de calcular todas las unidades y antes de aplicar la entrega urgente**.

---

# Ejemplo completo

Entrada:

```text
Peso: 200 gramos
Material: PLA
Calidad: Normal
Unidades: 5
Urgente: Sí
```

Primero:

```text
200 × 0.08 = 16 €
```

Calidad Normal:

```text
16 × 1.15 = 18.40 €
```

Cinco unidades:

```text
18.40 × 5 = 92 €
```

Descuento del 5 %:

```text
92 × 0.95 = 87.40 €
```

Entrega urgente:

```text
87.40 × 1.20 = 104.88 €
```

Resultado:

```text
Precio final: 104.88 €
```

---

# Histórico

Cada vez que se pulse:

```text
Calcular presupuesto
```

debe añadirse una nueva línea al histórico.

Por ejemplo:

```text
08/11/2026, 10:30
200 g PLA - Normal - 5 unidades - 104.88 €

08/11/2026, 10:35
350 g PETG - Alta - 2 unidades - 91.00 €
```

El histórico deberá guardarse en:

```javascript
sessionStorage
```

Por tanto:

- si recargas la página → sigue estando;
- si cierras la pestaña → desaparece.

---

# HTML aproximado

La aplicación podría tener:

```html
<label for="peso">Peso</label>
<input type="number" id="peso">

<label for="material">Material</label>
<select id="material">
    <option value="PLA">PLA</option>
    <option value="PETG">PETG</option>
    <option value="ABS">ABS</option>
</select>

<label for="calidad">Calidad</label>
<select id="calidad">
    <option value="basica">Básica</option>
    <option value="normal">Normal</option>
    <option value="alta">Alta</option>
</select>

<label for="unidades">Unidades</label>
<input type="number" id="unidades">

<label for="urgente">Entrega urgente</label>
<input type="checkbox" id="urgente">

<input
    type="button"
    id="calcular"
    value="Calcular presupuesto"
>

<p id="resultado"></p>

<h2>Histórico</h2>

<div id="historico"></div>
```

---

# Funciones recomendadas

Se recomienda dividir la lógica en funciones como:

```javascript
calcularPrecioMaterial()
aplicarCalidad()
aplicarDescuento()
aplicarUrgencia()
calcularPresupuesto()
guardarHistorico()
obtenerHistorico()
mostrarHistorico()
```

---

# Flujo lógico

```text
leer formulario
      ↓
precio por gramos
      ↓
calidad
      ↓
número de unidades
      ↓
descuento por cantidad
      ↓
urgencia
      ↓
redondear a 2 decimales
      ↓
mostrar resultado
      ↓
guardar histórico
```

---

# Objetivos de aprendizaje

Con esta práctica se trabajará:

- Operaciones matemáticas.
- Porcentajes.
- Condiciones.
- Formularios.
- `select`.
- Checkbox.
- DOM.
- Eventos.
- Funciones.
- Constantes.
- `sessionStorage`.
- `JSON.stringify()`.
- `JSON.parse()`.
- Histórico de operaciones.
- Separación de responsabilidades.
