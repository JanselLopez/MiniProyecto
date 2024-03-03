import { PERSIST_STORE_NAME } from "@/constants/app.constant"
import deepParseJson from "../deepParseJson"
import store from "@/store"

export const getToken = () => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    const persistData = deepParseJson(rawPersistData)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let accessToken = (persistData as any)?.auth.session.token

    return accessToken
}