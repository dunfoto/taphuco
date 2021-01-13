import { combineReducers } from 'redux'

import auth from "./auth"
import config from "./config"
import solution from './solution'
import category from "./category"
import banner from "./banner"
import product from './product'
import customerExperience from "./customerExperience"
import power from "./power"
import history from './history'
import boardDirector from "./boardDirector"
import permission from "./permission"
import admin from "./admin"

export default combineReducers({
    auth,
    config,
    solution,
    category,
    banner,
    product,
    customerExperience,
    power,
    history,
    boardDirector,
    permission,
    admin
})