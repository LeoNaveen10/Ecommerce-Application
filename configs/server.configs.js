if(process.env.NODE_ENV !== 'production'){
   //try to read as environment paramas from .env file
   
   require('dotenv').config();    //config() --> mimics like we are reading fro environment
}

module.exports={
    PORT : process.env.PORT
}