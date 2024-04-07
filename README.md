En este repositorio centralizaremos toda la información relativa a los **Proyectos de Desarrollo de Aplicaciones Web del I.E.S Alixar**.
Al continuación encontraremos los **apellidos y nombre** del alumno/a junto al **título de su proyecto**. El enlace nos dará acceso al repositorio del proyecto (no a la página GitHub del usuario).

En este repositorio se debe incluir la documentación especificada en [Requerimientos y criterios a seguir en el desarrollo de los proyectos](https://github.com/iesalixar/plantilla_proyecto_iesalixar/wiki/a.---Criterios-comunes-para-todos-los-proyectos), así como las indicaciones que el tutor haya podido ir a realizando a lo largo del desarrollo del mismo.

El desarrollo de toda Aplicación Web requiere seguir un [proceso estructurado](https://github.com/iesalixar/plantilla_proyecto_iesalixar/wiki/w1.--PROCESO-ESTRUCTURADO-PARA-DESARROLLO-DE-APLICACIONES-WEB), este  de contenido de la wiki te puede ayudar.


---

**Los párrafos anteriores son informativos y no deben aparecer en el reposotirio de los alumnos.**

---

# SoccerSocialHub

#### Curso Escolar 2023-2024
#### Autor: [Abel Garcia Sanchez]([Enlace a su cuenta de gitHub](https://github.com/Abelgs716))
#### Tutor: [Nombre del profesor tutor](Enlace a su cuenta de gitHub)
#### Fecha de Inicio: 1-04-2024
#### Fecha de Finalización: DD-MM-YYYY

## Breve descripción del proyecto

Si ya tienes una idea para tu aplicación, explícala brevemente. Si no es así, lo que realmente necesitas es **buscar un problema o necesidad a la que darle solución**, y estos **están por todas partes**. Así que trata de buscar problemas o necesidades en tu vida diaria y realiza una lista. Una vez que tengas una lista exhaustiva, ya puedes empezar a pensar en **cómo puedes resolverlos**.

En este apartado el alumno debe hacer una breve descripción del proyecto que vaya a realizar. Esta descripción no será ua descripción detallada, será una presentación general con no más de 10 líneas.

## Definir el objetivo de la aplicación
**Tener una gran idea** o encontrar un punto del mercado al que no se esté dando un producto o servicio es el punto de partida en cada nuevo proyecto. Antes de comenzar debes **definir claramente el propósito y la misión de la aplicación web**:

- **¿Qué va a hacer la aplicación?**
- **¿Cuál es su atractivo principal?** 
- **¿Qué problema concreto va a resolver?** 
- **¿Qué necesidad va a cubrir?**

## Estructura del Proyecto

En este apartado el alumno explicará el contenido del repositorio y de todas las carpetas relevantes del mismo. Para facilitar la gestión de la entrega, todo el código y documentación debe estar en este repositorio.

Por lo anterior, un proyecto que contenga un Frontend en una tecnología o framework (por ejemplo Angular) y una API REST en otra tecnología o framework (Springboot, Express) deberá tener la siguiente estructura de directorios en el repositorio de entrega:

- src-api
- src-frontend
- docs
- README.md

En el caso anterior, si se quiere desplegar de forma automatizada a partir del control de versiones, lo habitual es que estén los dos proyectos en repositorios separados. Por lo que se deberá configurar el despliegue automático para indicarle la raíz del código fuente de cada proyecto (si es posible) o hacer dos folks del repositorio principal uno para la API y otro para el frontend y adaptar los directorios para poder realizar el despliegue automático.

En un proyecto monolítico (tecnología servidor: Springboot, Django, Express, PHP,... con un sistema de templates propio para el frontend: Thymeleaf, jinja, ejs,...) deberá tener la siguiente estructura en el repositorio de entrega:

- src
- docs
- README.md
