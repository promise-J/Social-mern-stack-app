import ACTIONS from '../actions'

const token = ''

const tokenReducer = (state=token, actions)=>{
   switch(actions.type){
       case ACTIONS.GET_TOKEN:
           return {
               token: actions.payload
           }
        default:
            return state
   }
}

export default tokenReducer