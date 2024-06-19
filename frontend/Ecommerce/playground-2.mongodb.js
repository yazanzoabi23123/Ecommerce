// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('E_commerce');

// Create a new document in the collection.
db.getCollection('Users').insertOne({
    Id:"21312331",
  Name:{
    First:"Yazan",
   Last:"Zoabi",
    Middle:"Awni"
  },
  Email:"yzn145023@gmail.com",
  Password:"ABC123",
  Phone:"0523363425",
  Image:{
    Url:"http://example.com/image.jpg",
    Alt:" user image",
  },
  Address:{
    State:"Miami",
    Country:"USA",
    Street:"LosSantos",
    HouseNumber:21312,
    Zip:21312534,
  },
  IsAdmin:true,
  IsBusiness:true

});

