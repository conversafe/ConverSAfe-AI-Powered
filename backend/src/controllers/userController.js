export const userProfile = async (req, res, next) => {
  try {
    const { password, ...userData } = req.user;
    return res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};
