import Stripe from 'stripe'
import prisma from '../config/prisma.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function stripeWebhookHandler(req, res) {
  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const eventId = session.metadata.eventId

    await prisma.event.update({
      where: { id: eventId },
      data: {
        paymentStatus: 'PAID',
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent,
      },
    })
  }

  res.json({ received: true })
}