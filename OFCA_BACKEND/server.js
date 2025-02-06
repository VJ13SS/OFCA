const express = require('express')
const cors = require('cors')
const {v4: uuid} = require('uuid')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()

const PORT = 3000

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.get('/', (req,res) => {
    
    res.send(`Hello world ${process.env.BACKEND_CHECK}`)
})

app.get('/home', (req,res) => {
    res.send('Hello world VJ 13 SS')
})

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
