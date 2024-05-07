const Certificate = require('../models/Certificate');

exports.createCertificate = async (req, res) => {
  try {
    const { name, course, date, email, certificateLink } = req.body;

    const newCertificate = new Certificate({
      name,
      course,
      date,
      email,
      certificateLink
    });

    await newCertificate.save();

    res.status(201).json({ message: 'Certificate generated and saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};