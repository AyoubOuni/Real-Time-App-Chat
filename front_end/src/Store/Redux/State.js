const  init_state ={
  user:[]
}
export default function Reduceru(state = init_state,action){
      switch(action.type){
        case "add" :
          const newArr = [...state.user];
          newArr.unshift(action.payload);
          return{
          user:newArr
          }
        case "supprimer" : 
        const newArr2 = [...state.user];
          newArr2.splice(0,1);
          return{
            user:newArr2
            }
           
            default: return state;
    }
    }
   

    
