

type Props = {
    sidebarData: []
}

export const sidebarListConverter = <T>({sidebarData: data}: Props) => {

    const result = data.map(item => {
        return item as T
    })

    return result
}