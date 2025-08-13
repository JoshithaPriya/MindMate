import mongoose from "mongoose"

// Schema with types & validation
const UserSchema = new mongoose.Schema({
  name: {
    type: String,          // data type
    required: true,        // must be provided
    unique:true,
    trim: true,        
    minlength: 2,          // min length
    maxlength: 50,         // max length
  },
  password:{
    type:String,
    required:true
  }
});



const User = mongoose.models.Patient || mongoose.model("Patient", UserSchema);

export default User