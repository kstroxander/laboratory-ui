# laboratoy-ui
Repositorio que contiene el codigo fuente para reto tecnico realizado en el proceso de seleccion con i4digital.

## Stack

* ReactJS 18
* Yup
* Axios
* date-fns
* react-hook-form
* react-icons


## Opciones de la Interfaz Grafica

* **Vista de consulta**: Vista principal, en la cual se encuentra la opción de consulta historica y las opciones para visualizar o registrar examenes de sangre. Dentro de esta interfaz de consulta usted puede:
  * Filtrar mediante el cuadro de texto de la esquina superior derecho, ingresando cualquier nombre de paciente.
  * Visualizar los examenes ya ingresados
  * Dirigirse al dialogo de registro de nuevos resultados de examenes

* **Vista de registro**: Desde la interfaz de consulta, es posible desplegar un dialogo flotante, mediante el cual el sistema permite ingresar resultados de examenes de sangre y determinar a partir de las lecturas ingresadas, los niveles de riesgo de padecer alguna de las enfermedades condiguraadas. El paso a paso para el registro de una nuevo resultado de examen es:
  * Desplegar el dialogo de registro de examenes mediante el bot&oacute; azul ubicado en la parte superior derecha de la pantalla principal
  * Ingresar el nombre del paciente y las mediciones solicitadas por el sistema.
  * Presionar el bot&oacute;n de "Determinar Riesgo".
  * Verificat que el nivel de riesgo devuelto por el sistema est&eacute; acorde a las reglas de negocio definidas.
  * Presionar en el botón Guardar para registrar permanentemente el resultado de examen.
  * 

* **Vista de detalle de un examen**: Desde la vista principal, puede ubicar la tabla que contiene la lista de examenes registrados, y dirigirse a la ultima columna y ubicar el icono con la figura de un **ojo**, hacer click sobbre esta y visualizar la información completa de un examen.