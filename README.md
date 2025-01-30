# react-observer-context

Este proyecto proporciona una forma flexible y escalable de gestionar el estado global y los estados individuales de los reducers en una aplicación. Utiliza el patrón de reducers junto con la inmutabilidad para manejar las actualizaciones de estado de manera segura y eficiente.

### `createReducer`

El propósito de `createReducer` es manejar el estado y las acciones de un reducer específico de manera aislada. Cada acción debe retornar una **nueva referencia del estado** para garantizar la inmutabilidad. Esta capa es responsable de crear nuevas referencias del estado sin modificar el estado existente.

### `createStore`

`createStore` es el encargado de gestionar el estado global, manteniendo un objeto global donde se almacenan las referencias actualizadas de cada estado después de ejecutar las acciones correspondientes.
Aca es donde se combinan los reducers y sus estados, y se extienden las funcionalidades de las acciones para que cada acción pueda actualizar el estado global sin mutar el estado de los reducers individuales.

### Flujo de datos

1. **Cada reducer**: Maneja su propio estado y las acciones asociadas.
2. **Al ejecutar una acción**: El reducer devuelve un nuevo estado, siguiendo el principio de inmutabilidad.
3. **`createStore`**: Se encarga de almacenar el estado global y coordinar la ejecución de las acciones, actualizando las referencias devueltas por las acciones al estado global.

## Ejemplo de un reducer.

```typescript

interface State {
  count: number;
}
interface Actions {
  incrementar: number;
  decrementar: number;
}

const actions = {
  incrementar: (state, payload) => {
    return {
      ...state,
      payload: state.count + payload,
    };
  },
  decrementar: (state, payload) => {
    return {
      ...state,
      payload: state.count + payload,
    };
  },
  restart: (state) => {
    return {
      ...state,
      count: 0,
    };
  },
};

const counterReducer = createReducer<State, Actions>({
  state: { count: 0 },
  actions: actions,
})

```
