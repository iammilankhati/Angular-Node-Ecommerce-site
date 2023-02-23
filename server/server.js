const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

app.use(express.static('./public'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')(
	'sk_test_51Mefj5SBzqnFygxH7Oa78pdBW2IUndotxHZyt7fmZyLVoy53YqqNe6eIeEUoFa3BifyZgOQXsp6yIKp8l4c4WjOT00AXMc2wFt'
);

app.post('/checkout', async (req, res, next) => {
	try {
		const session = await stripe.checkout.sessions.create({
			shipping_address_collection: { allowed_countries: ['US', 'CA', 'NP'] },

			line_items: req.body.items.map((item) => ({
				price_data: {
					currency: 'usd',
					product_data: {
						name: item.name,
						images: [item.product],
					},
					unit_amount: item.price * 100,
				},
				quantity: item.quantity,
			})),
			mode: 'payment',
			success_url: 'http://localhost:4242/success.html',
			cancel_url: 'http://localhost:4242/cancel.html',
		});
		res.status(200).json(session);
	} catch (error) {
		next(error);
	}
});

app.listen(4242, () => console.log('app is running on 4242'));
