import * as redis from 'redis';

export async function maintainSession(user, device) {
    try {
        const client = await redis.createClient();
        try{
            await client.connect();
        }
        catch(err){
            console.log(err);
        }
        if (user) {
            await client.SET(user.id, JSON.stringify({
                'user_id': user._id,
                'device_id': device,
                'status': true
            }));
            const redisSession = await client.GET(user.id);
            console.log(redisSession);
        } else {
            console.log('User not found');
        }
    } catch (err) {
        console.log('Redis not set successfully', err);
    }
}

export async function logout_session_redis(user) {
    console.log(user.email);
    try {
        const client = await redis.createClient();
        try{
            await client.connect();
        }
        catch(err){
            console.log(err);
        }
        console.log(user.username);
        await client.del(user.email);
        console.log("delete successfully");
    }
    catch (err) {
        console.log("error in deleting", err);
    }
}

export async function get_otp(email){
        const client = await redis.createClient();
        try{
            await client.connect();
        }
        catch(err){
            console.log(err);
        }
        const otp_details = await client.get(email);
        console.log('----',otp_details);
        
        const userOTP = JSON.parse(otp_details);
        return otp_details
    
}