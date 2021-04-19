const getTimestamp = (): string => {
    return new Date().toISOString()
}

export default (
    namespace: string,
    type: 'INFO' | 'WARN' | 'ERROR',
    message: string
): void => {
    let logText = `${getTimestamp()} - [${namespace}] [${type}] ${message}`

    if (type === 'INFO') console.info(logText)
    else if (type === 'WARN') console.warn(logText)
    else if (type === 'ERROR') console.error(logText)
}
