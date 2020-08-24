export const UserSchema = {
  name: 'signup',
  primaryKey: 'email',
  properties:
  {
    name: 'string',
    email: 'string',
    mobile: 'string',
    password: 'string',
  }
}


export const Schema={
  name:'Signup',
  primaryKey:'email_id',
  properties:{
      username:'string',
      email_id:'string',
      phone_no:'string',
      password:'string',
      confirm_password:'string'
  }
};


