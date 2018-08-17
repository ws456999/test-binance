import axios from 'axios'

import { API_ROOT } from './config'
import { addInterceptor } from './utils'

export const BaseAxios = addInterceptor(axios.create({ baseURL: `${API_ROOT}`, timeout: 5000 }))
// export const BaseAxios = addInterceptor(axios.create({ baseURL: `${API_ROOT}`, timeout: 15000 }))
