export function piniaPersistPlugin(context) {
    let storedState = localStorage.getItem(`pinia-${context.store.$id}`)

    if (storedState) {
        context.store.$patch(JSON.parse(storedState))
    }

    context.store.$subscribe((mutation, state) => {
        localStorage.setItem(
            `pinia-${context.store.$id}`,
            JSON.stringify(state)
        )
    })
}