const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const {v4: uuid} = require('uuid')
const stripe = require('stripe')('gfgcjgchghgvgv')
const axios = require('axios')
const app = express()


const PORT = 3000

//middlewares
app.use(cors())
app.use(express.json())

/*
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'ofcapurchasemail@gmail.com',
        pass:'awmi sdop qxwp mfvi'
    }
})

async function sendPurchaseNotification(items,discount,totalPrice,form){
    const mailOptions = {
        from:'ofcapurchasemail@gmail.com',
        to:'viswajith5749@gmail.com',
        subject:'OFCA Test',
        html:`<h3>New Member On To The Fitness Realm</h3>

        <h3>User Details</h3>

        <h3>User Name: ${form.UserName}</h3>
        <h3>EmailAddress: ${form.EmailAddress}</h3>

        <h3>Products</h3>
        <ul>${items}</ul>
        
        <h3>Price: $${totalPrice - discount} (Total: $${totalPrice} Discount: $${discount})</h3> 

        <h3>User Info</h3>
        <h3>Company Name: ${form.CompanyName}</h3>
        <h3>Country/Region: ${form.Country_or_Region}</h3>
        <h3>State/County: ${form.State_or_County}</h3>
        <h3>Town/City: ${form.Town_or_City}</h3>
        <h3>HouseNumber,Street Name: ${form.HouseNumber_and_Street_Name}</h3>
        <h3>PostCode/PinCode/ZipCode: ${form.PostCode_or_PinCode_or_ZipCode}</h3>
        <h3>Phone: ${form.Phone}</h3>
        
        <p>Additional Information: ${form.
            additional_information
            }</p>`
    }

    try{
        await transporter.sendMail(mailOptions);
        console.log('Mail Send')
    }catch(error){
        console.log(error)
    }
}
*/

//routes
app.get('/', (req,res) => {
    res.send('Hello world VJ 13 SS')
})

/*
app.post('/purchase', async (req,res) => {

    const { cartItems, discount, totalPrice,form } = req.body;

    if(!cartItems || !discount || !totalPrice){
        return res.status(400).json({error:'Invalid Input details'})
    }

    cartItems.sort((item1,item2) => item1.level - item2.level)

    const items = cartItems.map((item) => `<li>
    <h3>OFCA Certification Program Level ${item.level}</h3>
    <h3>Plan : ${item.plan}</h3>
    <h3>Quantity: ${item.quantity} items </h3>
    <h3>Price: $${item.quantity * item.amount}</h3>
    </li><br>`).join('')
    try{
        await sendPurchaseNotification(items,discount,totalPrice,form);
        res.status(200).json({message:'Mail send'})
    }catch(error){
        console.error(error)
    }

        
})
*/
app.post('/payment', async (req,res) => {
    const {product, token} = req.body
    const idempotencyKey = uuid();
    //create a customer
    try{
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
    
        //create a charge
        const charge = await stripe.charges.create({
            amount:product.price * 100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:'Product Purchased'
        },{idempotencyKey})

        if(charge.status == 'succeeded'){
            //payment succeeded
            res.status(200).json({success:true,charge})
        }else{
            //payment failed or require further action
            res.status(400).json({
                success:false,
                error:'Payment was not successfull'
            })
        }
    }catch(error){
        //handle errors
        console.error('Payment Error: ',error.message)
        res.status(400).json({uccess:false,
            error:error.message})
    }
    

})

app.listen(PORT,() => {
    console.log('http://localhost:3000')
})
