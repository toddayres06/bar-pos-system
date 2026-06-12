import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createCheckoutSession(event) {
  return stripe.checkout.sessions.create({
    mode: 'payment',

    payment_method_types: ['card'],

    line_items: [
      {
        price_data: {
          currency: 'usd',

          product_data: {
            name: `${event.package.name} Package - ${event.clientName}`,
            description: event.notes || 'Event booking',
          },

          unit_amount: Math.round(event.package.price * 100),
        },

        quantity: 1,
      },
    ],

    metadata: {
      eventId: event.id,
    },

    success_url: `${process.env.CLIENT_URL}/events/${event.id}?payment=success`,
    cancel_url: `${process.env.CLIENT_URL}/events/${event.id}?payment=cancel`,
  })
}