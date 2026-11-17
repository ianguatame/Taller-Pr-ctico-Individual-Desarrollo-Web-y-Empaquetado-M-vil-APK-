# Taberna del Maestro

> Tu pantalla de guerra para D&D 5e. Una herramienta interactiva diseñada para asistir a Dungeon Masters durante sus partidas.

##  Enlaces del Proyecto
* **Aplicación Web (Vercel):** [https://taller-pr-ctico-individual-desarrol.vercel.app]
* **Descarga APK (Android):** [https://github.com/ianguatame/Taller-Pr-ctico-Individual-Desarrollo-Web-y-Empaquetado-M-vil-APK-/releases/tag/v1.0.0]


##  Características Principales

1. **Criaturas (Bestiario):**
   * Consulta en tiempo real la API oficial de D&D 5e (`/api/monsters`).
   * Buscador interactivo por nombre.
   * Tarjetas dinámicas con estadísticas clave: Clase de Armadura (AC), Puntos de Golpe (HP) y Nivel de Desafío (CR).
   * Gestión del encuentro actual para añadir o retirar monstruos fácilmente.

2. **Tesoro (Generador de Botín):**
   * Selector dinámico basado en el Nivel de Desafío (CR) de la criatura derrotada.
   * Generación automática y proporcionada de monedas (Cobre, Plata, Oro y Platino) con cálculo de valor total en monedas de oro (po).
   * Generación de objetos mágicos y equipo real consultados desde la API (`/api/equipment` y `/api/magic-items`).

3. **Bandeja de Dados:**
   * Soporte completo para dados estándar de rol: **d4, d6, d8, d10, d12, d20 y d100**.
   * Modificador interactivo de cantidad de dados a lanzar.
   * Animación de resultados y desglose detallado de sumas.
   * Historial de lanzamientos recientes en la parte inferior.


## Tecnologías Utilizadas

* **Frontend:** React, Vite, JavaScript, CSS (Enfoque Mobile-First).
* **Fuente de Datos:** [D&D 5e API](https://www.dnd5eapi.co/).
* **Despliegue Web:** Vercel.
* **Contenedor Móvil:** CapacitorJS (Android).
* **Control de Versiones:** Git & GitHub.



## Ejecución Local del Proyecto

Si deseas clonar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio:
   ``bash
   git clone [https://github.com/ianguatame/Taller-Pr-ctico-Individual-Desarrollo-Web-y-Empaquetado-M-vil-APK-.git]
2. Instala dependencias: npm install
3. Inicia el servidor de desarrollo web: npm run dev
 ``