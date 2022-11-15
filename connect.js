const {MongoClient} = require ("mongodb");

module.exports = {
    selectedDB : {},
    async connect (){
        try{
        const client = await  MongoClient.connect("mongodb://localhost:27017");
        this.selectedDB = client.db("hallbooking");
        console.log(this.selectedDB)
        }catch(err){
            console.log(err);

        }
    }
}