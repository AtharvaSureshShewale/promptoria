import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

// Register User
const registerUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Missing Details",
            });
        }

        email = email.toLowerCase();

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "Email already registered",
            });
        }

        // Hash password
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            message: `${user.name} has been registered successfully`
        });

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: err.message
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                success: false,
                message: "Missing Details",
            });
        }

        email = email.toLowerCase();

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            return res.json({
                success: true,
                token,
                message: `${user.name} has successfully logged in`
            });
        } else {
            return res.json({
                success: false,
                message: 'Invalid credentials'
            });
        }

    } catch (err) {
        console.error(err);
        res.json({
            success: false,
            message: err.message
        });
    }
};

const userCredit = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({
        success: false,
        message: "User ID not found in request"
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      credits: user.creditBalance,  // Assuming this field exists
      user: { name: user.name }
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: err.message
    });
  }
};

const razorpayInstance=new razorpay({
    key_id:process.env.PAYMENT_KEY_ID,
    key_secret:process.env.PAYMENT_KEY_SECRET,
});

const paymentRazorpay=async(req,res)=>{
    try {

        const userId = req.userId;
        const { planId } = req.body;

        const userData=await userModel.findById(userId)

        if(!userId || !planId){
            return res.json({
            success:false,
            message:"Missing Detials"
        });
        }

        let credits, plan, amount, date 

        switch (planId) {
            case 'Basic':
                plan='Basic'
                amount=10
                credits=100
                break;
            
            case 'Advanced':
                plan='Advanced'
                amount=50
                credits=500
                break;
            
            case 'Business':
                plan='Business'
                amount=250
                credits=5000
                break;
        
            default:
                return res.json({success:false,message:"Planned not Found"});
        }

        date=Date.now();

        const transactionData={
            userId,plan,amount,credits,date
        }

        const newTransaction=await transactionModel.create(transactionData);

        const options={
            amount:amount*100,
            currency:process.env.CURRENCY,
            receipt:newTransaction._id,
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error.message});
            }

            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

const verifyRazorpay=async(req,res)=>{
    try {
        const {razorpay_order_id}=req.body;

        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id) 

        if(orderInfo.status==='paid'){
            const transactionData=await transactionModel.findById(orderInfo.receipt)

            if(transactionData.payment){
                return res.json({ success:false, message:'Payment Failed'});
            }

            const userData=await userModel.findById(transactionData.userId);

            const creditBalance=userData.creditBalance+transactionData.credits

            await userModel.findByIdAndUpdate(userData._id,{creditBalance});

            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

            res.json({success:true,message:"Credits Added"})
        }else{
            res.json({success:false,message:"Payment Failed"})
        }

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

export { registerUser, loginUser,userCredit, paymentRazorpay, verifyRazorpay }
