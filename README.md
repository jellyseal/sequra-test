
  

## Iniciar el test

Para inciar el test debéis clonar el repo https://github.com/jellyseal/sequra-test.git

Luego:
```js
cd sequra-payments
yarn install
yarn build o yarn build-dev
```
Y por supuesto, arrancar vuestra API.

## Comentarios generales
¡Hola! Primero de todo agradecer esta oportunidad. La verdad es que ha supuesto un buen reto para mí, especialmente a nivel de arquitectura (véase más adelante).
He tardado más de tres horas (especialmente por problemas con la exportación de webpack), y me he dejado cosas en el tintero que os comentaré en la sección "Que hubiera hecho de tener más tiempo".

## Arquitectura y otros comentarios


Una de las mayores dificultades que he encontrado al realizar este test ha sido a nivel de arquitectura. He dudado bastante sobre cómo plantear el componente, seguramente debido a que estoy a trabajar para un cliente único, y no a pensar en programar un módulo universal.

A este componente le he llamado "sequra-payments".  Me he decidido a escribir un módulo en javascript vanilla ES6 por lo siguiente:

* Desconozco el ecosistema de Sequra al 100%, y no sé si los pros/contras de escribirlo en React merecían la pena. Contras de estribirlo en React eran que el cliente debía incorporar la libreria UMD en sus scripts del header, lo que no sé si están dispuestos, ya que al final es hacer una llamada extra a un recurso externo. Como beneficio, veía que se podía incorporar/aprovechar de vuestro explorador de componentes y a un stack tecnológico unificado.
* He preferido **realizar el módulo en ES6** y no en ES5 por temas de comodidad de desarrollo y porque supongo que casi todos vuestros componentes están escritos así.
* He usado Webpack para transpilar este código y formar un UMD. Esto hace que se pueda incorporar al cliente **vía tag script en el HTML o bien importándolo también con Webpack o Require**.
* Veréis que el código **está bastante dividido en archivos distintos**. Por ejemplo, hay un archivo por cada llamada a la API, aunque en este caso no era necesario. En general, he querido reflejar que la aplicación podía crecer, por ejemplo, si hubiesen más de una llamada en CreditCalls, iría en ese archivo.
* Los import/exports de los index.js, por ejemplo en /src/SecuraPayments, van en ésta línea de dejar una puerta abierta a que el módulo crezca (podría darse el caso que SecuraPayments tiene más de una funcionalidad exportable). En general se considera una buena práctica y espero que no lo veáis como sobreingenieria.
* Para **evitar la colisión de estilos** he optado por meter estilos inline. Soy consciente de las limitaciones de esto, pero no he tenido tiempo como para montar una arquitectura de transpilación de estilos decente.
* He optado por usar **async/await** en GET de credit_agreements, ya que no creo que el cliente quiera que le aparezcan las opciones "de repente". Otra cosa sería que llamara a la librería SequraPayments de manera asíncrona. No ha sido así con la llamada a los eventos.
* Veréis que el código no está especialmente documentado. Intento ser muy semántico en la declaración de variables y funciones, por lo que creo que es suficientemente legible. No es que tenga una postura muy fuerte respecto al tema, pero creo que los comentarios deben estar muy justificados.

## Que hubiera hecho de tener más tiempo

* **Más y mejor testing**. Sé que es un  poco limitado, y no he hecho exactamente TDD. Esto en parte ha sido debido por el agobio del tiempo y a que iba teniendo problemas al exportar la librería con webpack. Supongo que con una arquitectura previamente asentada lo hubiese hecho mejor.
* **Blindar la colisión de estilos**. Estuve a punto de poner CSS Modules o alguna alternativa similar, pero se me comía el tiempo en cuanto al montaje de la arquitectura.
* **Parametrizar los estilos**. Un poco debido al punto anterior, quise que hubiese algunos estilos customizables por el cliente (pensé, por ejemplo, en el z-index de la modal).
* No he podido terminar que se actualizaran los instalmentTotal al cambiar el precio.
* En general le daría una vuelta al módulo en si, soy consciente que hay margen para el refactor.