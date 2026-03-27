import Customer from "../models/Customer.js"

export const identifyCustomer = async (phone, message) => {
  let customer = await Customer.findOne({ phone })

  if (!customer) {
    customer = await Customer.create({
      phone,
      lastMessage: message
    })
    return { type: "new", customer }
  }

  customer.visits += 1
  customer.lastMessage = message
  await customer.save()

  return { type: "repeat", customer }
}
