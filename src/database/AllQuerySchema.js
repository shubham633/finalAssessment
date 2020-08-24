import {Schema} from './Schema'
const Realm=require('realm');

export const addUser=async(myData)=>{
    Realm.open({schema:[Schema]})
    .then(realm=>{
        realm.write(()=>{
            realm.create(
                'Signup',{
                    username:myData.username,
                    email_id:myData.email_id,
                    password:myData.password,
                    phone_no:myData.phone_no,
                    confirm_password:myData.confirm_password
                }
            )
        }
        )
    }).catch(error=>{console.log(error)})
  console.log('done') 
}


