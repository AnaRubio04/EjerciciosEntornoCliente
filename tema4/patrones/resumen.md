| Patrón | Idea clave | Cuándo usarlo | Frase para recordarlo |
|---|---|---|---|
| **Singleton** | Solo existe **una instancia** de una clase | Cuando toda la aplicación debe compartir un único gestor, configuración, registro, etc. | **“Solo quiero uno.”** |
| **Factory Method** | Centraliza **qué objeto crear** | Cuando hay varios tipos de objetos y no quieres crear cada clase directamente por todas partes | **“La fábrica decide qué crear.”** |
| **Builder** | Construye un objeto **paso a paso** | Cuando tiene muchas opciones o partes opcionales | **“Lo voy montando poco a poco.”** |
| **Prototype** | Crea objetos a partir de una **copia de otro** | Cuando necesitas muchos objetos similares o una plantilla base | **“Copio y modifico.”** |
| **Adapter** | Hace compatibles **dos interfaces distintas** | Cuando una API o clase habla “otro idioma” que tu programa | **“Traduce.”** |
| **Decorator** | Añade comportamiento envolviendo un objeto | Cuando quieres agregar cosas dinámicamente sin modificar la clase original | **“Envuelve y añade.”** |
| **Proxy** | Controla el acceso a un objeto real | Para permisos, seguridad, caché, logs, limitaciones, etc. | **“Controla antes de dejar pasar.”** |
| **Facade** | Simplifica un sistema complejo | Cuando una operación requiere coordinar muchas clases o servicios | **“Te doy una puerta sencilla.”** |