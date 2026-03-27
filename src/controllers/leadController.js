import Lead from "../models/Lead.js"

export const createLead = async (req, res) => {
  const lead = await Lead.create({
    ...req.body,
    tenantId: req.user.tenantId
  })
  res.json(lead)
}

export const getLeads = async (req, res) => {
  const leads = await Lead.find({
    tenantId: req.user.tenantId
  })
  res.json(leads)
}
