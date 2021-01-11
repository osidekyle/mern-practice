const express=require("express")
const router=express.Router()

//Auth with google
//GET /auth/google
router.get("/google",passport.authenticate('google',{scope}))


//Dashboard
//GET /dashboard
router.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})



module.exports=router