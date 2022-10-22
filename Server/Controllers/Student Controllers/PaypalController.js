import paypal from 'paypal-rest-sdk';




// ssh-keygen -t rsa -C "arslananjum1515@gmail.com" -f ~/.ssh/id_rsa_gitlab
// ssh-keygen -t rsa -C "arslananjum1515@gmail.com" -f ~/.ssh/id_rsa_github
export const PayWithPaypal = async (req, res) => {

    req.body.Products = req.body.Products.map((value) => {
        value = { name: "value.name", sku: "value.name", price: value.TotalFee, currency: req.body.Currency, quantity: value.Quantity || 1 }
        return value;
    })
    req.body.Total = 0
    req.body.Products.map((value) => {


        req.body.Total = +value.price
    })

    
    
    try {

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `${req.protocol}://${req.hostname}:3000/success`,
                "cancel_url": `${req.protocol}://${req.hostname}:3000/failure`,
            },
            "transactions": [{
                "item_list": {
                    "items": req.body.Products
                },
                "amount": {
                    "currency": "USD",
                    "total": `${req.body.Total}`
                },
                "description": "This is the payment description."
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (payment) {
                for (let i = 0; i < payment.links.length; i++) {

                    if (payment.links[i].rel === "approval_url") {
                        res.redirect(payment.links[i].href)
                    }
                }
            }

            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");

            }
        });
        res.status(200)
        // .json()
    } catch (error) {
        res.status(500).json(error)
        console.log(`Error occurred while creating payment with paypal ${error}`);
    }
}