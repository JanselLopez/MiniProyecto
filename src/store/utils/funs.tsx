export const deleteCacheItem = async (
    id: number,
    statusCode: any,
    endpoint: string,
    dispatch: any,
    queryFulfilled: any,
    updateQueryData: any
) => {
    try {
        const { data } = await queryFulfilled
        dispatch(
            updateQueryData(endpoint, statusCode, (draft: any) => {
                const i = draft.findIndex((it: { id: number }) => it.id === id)
                console.log({ draft, i, id })
                draft.splice(i, 1)
            })
        )
    } catch (e) {
        console.log({ e })
    }
}

export const updateCacheItem = async (
    id: number | undefined,
    statusCode: any,
    endpoint: string,
    dispatch: any,
    queryFulfilled: any,
    updateQueryData: any,
    onData?: (data: any) => any
) => {
    try {
        const { data } = await queryFulfilled
        dispatch(
            updateQueryData(endpoint, statusCode, (draft: any) => {
                const i = draft.findIndex((it: { id: number }) => it.id === id)
                draft[i] = onData ? onData(data) : data
            })
        )
    } catch (e) {
        console.error("ERROR_UPDATING_CACHE",{ e })
    }
}

export const createCacheItem = async (
    statusCode: any,
    endpoint: string,
    dispatch: any,
    queryFulfilled: any,
    updateQueryData: any,
    onData?: (data: any) => any
) => {
    try {
        const { data } = await queryFulfilled
        const patchResult = dispatch(
            updateQueryData(endpoint, statusCode, (draft: any) => {
                draft.unshift(onData ? onData(data) : data)
            })
        )
    } catch (e) {
        console.log({ e })
    }
}
