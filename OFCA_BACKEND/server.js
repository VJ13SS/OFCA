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
    res.send(process.env.STRIPE_SECRET_KEY)
})

app.get('/home', (req,res) => {
    res.send('Hello world VJ 13 SS')
})

app.post('/payment', async (req,res) => {
    const {products, token} = req.body;
    let total_price = 0
    let subscribed_plans = []

    for(let product of products){
        if(product.plan == 'Full Payment Upfront'){
            total_price = total_price + (product.amount * product.quantity) 
        }
        else{
            total_price = total_price + product.amount
            subscribed_plans.push({level:product.level,plan:product.plan,quantity:product.quantity,amount:product.amount})
        }
    }

    const idempotencyKey = uuid();
    //create a customer
    try{
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
    
        //create a charge
        const charge = await stripe.charges.create({
            amount:total_price * 100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:'Product Purchased'
        },{idempotencyKey})

        if(charge.status == 'succeeded'){
            //payment succeeded
            console.log('Payment Succeeded')
            //res.status(200).json({success:true,charge})
        }else{
            //payment failed or require further action
            res.status(400).json({
                success:false,
                error:'Payment was not successfull'
            })
        }

        for(const plan of subscribed_plans){
            const totalMonths = plan.quantity * 3;
            const idempotencyKeySchedule = uuid();
            const startDate = Math.floor(Date.now()/1000) + 30 * 24 * 60 * 60;

            const subscriptionSchedule = await stripe.subscriptionSchedules.create({
                customer:customer.id,
                start_date:startDate,
                end_behaviour:'cancel',
                subscription_data:{
                    collection_method:'send_invoice',
                    days_until_due:30
                },
                phases:[{
                    items:[{
                        price:plan.amount,
                        quantity:plan.quantity
                    }],
                    iterations:totalMonths - 1
                }]
            },{idempotencyKey:idempotencyKeySchedule})

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
