import store from '@/store'
// import axios from 'axios'

store.subscribe((mutations =>{
    switch (mutations.type){
        case 'auth/SET_TOKEN':
            if(mutations.payload){
                localStorage.setItem('token',mutations.payload)
                
            }else{
                localStorage.removeItem('token')

            }
            
        break;

    }

}))