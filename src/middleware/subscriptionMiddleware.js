export const checkSubscription = (req, res, next) => {
  if (req.user.subscription?.status !== "active") {
    return res.status(403).json({ msg: "Subscription required" })
  }
  next()
}
