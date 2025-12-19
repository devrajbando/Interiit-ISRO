import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";
import sendOTP  from "../utils/Mailer.js";
import jwt from 'jsonwebtoken'
import { mongoose } from "mongoose";
import { OAuth2Client } from "google-auth-library";

export const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);


const generateAccessAndRefreshToken=async(userId)=>
    {
        try {
            const user=await User.findById(userId)
            const accessToken=user.generateAccessToken()
            const refreshToken=user.generateRefreshToken()
            user.refreshToken=refreshToken
            await user.save({validateBeforeSave:false})
            // console.log("reached user.controller.js ",accessToken)
            return {accessToken,refreshToken}
        } catch (error) {
            console.log(error.message)
            throw new ApiError(500,"something went wrong on our side")
        }
    }

const registerUser=asyncHandler(async(req,res)=>{
    try {
        const {
            name,
            email,
            password,
            score
        }=req.body;
            
    
    
            const existedUser=await User.findOne({
                $or:[{email}]
            })
            if(existedUser){
                return res.status(409)
                .json({

                    
                    status: 409,
                    message: "User with email or username already exists",
                }
                )
            }
            console.log(existedUser)

            const newPassword = await bcrypt.hash(password, 10)
            console.log(newPassword)
            console.log(password,"while signing up")
            const user=await User.create({
                name:req.body.name,
                email:req.body.email,
                password:newPassword,
                score:req.body.score,
                stocks:stockData,
                mutualFunds:mfData,
            })
    
            const createdUser=await User.findById(user._id).select(
                "-password -refreshToken"
            )
    
            if(!createdUser){
                throw new ApiError(500 ,"something went wrong on our side")
            }
        
            
            return res.status(201).json(
                new ApiResponse(201,createdUser,"User created Successfully")
            )
    } catch (error) {
        // throw new ApiError(500,"something went wrong")
        console.log(error)
    }
})
const checkAuth=asyncHandler(async(req,res)=>{
    res.status(200)
})
const LoginUser=asyncHandler(async(req,res)=>{
    
    
    const {email,password }=req.body
    if(!email)
        throw new ApiError(400,"email is required")

    const user=await User.findOne({email})
    
    console.log(user)
    if(!user)
        throw new ApiError(404,"user does  not exist")

    

    // const isPasswordValid=password === user.password ? true:false

    const isPasswordValid=await bcrypt.compare(
		password,
		user.password)
    
        
        console.log(isPasswordValid)
    if(!isPasswordValid)
        throw new ApiError(401,"INCORRECT password")
 
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)


    const loggedInUser=await User.findById(user._id).select("-password -refreshToken") 

    const options={
        httpOnly:true,//for local its false, later set true
        secure:false,
        sameSite: "Lax",
    }
    console.log("reached final point ")
    return res   
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser,accessToken,refreshToken
        },
        "User Logged In Succesfully"
    ))



})

const LogoutUser=asyncHandler(async(req,res)=>{

    // const {password}=req.body
   

    // const isPasswordValid=await user.isPasswordCorrect(password)
    
    // const isPasswordValid=await bcrypt.compare(
    //     password,
	// 	user.password)
        // console.log(isPasswordValid)
       
    // const isPasswordValid=password === user.password ? true:false
        // if(!isPasswordValid)
        //     throw new ApiError(401,"INCORRECT password")
        
        
    await User.findByIdAndUpdate (req.user._id,{
        $unset:{
            refreshToken:1
        }
    },{
        new:true
    })
        

        const options={
            httpOnly:true,
            secure:false
//turn to true during production       
 }
 console.log("reached logout")

        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged Out"))
    })

const CurrentUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    const email=user.email
    const username=user.username
    return res
    .status(200)
    .json(new ApiResponse(200,{email,username},"User data"))
    
})

const sendOtp=asyncHandler(async(req,res)=>{
     try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, otp, otpExpiry });
    } else {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
    }
    await user.save();

    const sent = await sendOTP(email, otp);
    if (!sent) return res.status(500).json({ message: 'Failed to send OTP' });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

const verifyOTP=asyncHandler(async(req,res)=>{
    try {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (new Date() > user.otpExpiry) return res.status(400).json({ message: 'OTP expired' });

    user.password = password;
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

const googleLogin=asyncHandler(async(req,res)=>{
   
    const { credential } = req.body;
    console.log("reached google login controller")
    
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
 
    const { email, sub: googleId, name } = payload;
    console.log("Google Payload:", payload);
    
    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    
    if (!user) {
      // User doesn't exist - create new user
      user = await User.create({
        name,
        email,
        googleId,
        isVerified: true
      });
     
    } else {
      // User already exists - update googleId if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      
    }
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
    if (!loggedInUser) {
      throw new ApiError(500, "something went wrong on our side");
    }
    
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };
    
    console.log("reached final point google login");
    
    return res   
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User Logged In Successfully"
      ));
})

export {generateAccessAndRefreshToken,
    registerUser,
    LoginUser,
    LogoutUser
    ,checkAuth,
    CurrentUser,
    sendOtp,
    verifyOTP,
    googleLogin
    
}