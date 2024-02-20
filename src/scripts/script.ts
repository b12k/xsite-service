type Resolver = <T>(value: T | PromiseLike<T>) => void
interface Window {
    resolveUuid?: Resolver
}

if (window.resolveUuid) window.resolveUuid('{{UUID}}');