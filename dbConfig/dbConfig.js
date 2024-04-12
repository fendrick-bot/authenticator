import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URL);
        const connection = mongoose.connection;

        connection.on('connected' , ()=>{
            console.log("db connected");
        })
        connection.on('error' , (error)=>{
            console.log("db not connecting " + error);
            process.exit();
        })

    } catch (error) {
        console.log("error " + error);
        
    }
}

