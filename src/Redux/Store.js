import { configureStore } from '@reduxjs/toolkit'
import Accounts from './Accounts'
import BaseInfo from './BaseInfo'
import Contract from './Contract'

export default configureStore({
    reducer: {
        account:Accounts,
        contract:Contract,
        baseInfo: BaseInfo,
    },
})
