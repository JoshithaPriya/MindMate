import User from "./schema"
import bcrypt from "bcryptjs";

async function create(name:string,password:string){
    const passw=await bcrypt.hash(password,10)
    const details=await User.create({name,password})
    return details
}

async function verify(name: string, password: string): Promise<boolean> {
    try {
        // 1. Find user by name
        const user = await User.findOne({ name });
        if (!user) {
            console.log("User not found");
            return false;
        }

        // 2. Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Password does not match");
            return false;
        }

        // 3. If everything is fine, return true
        return true;

    } catch (error) {
        console.error("Error during verification:", error);
        return false;
    }
}
export {create,verify}