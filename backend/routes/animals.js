const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * GET /api/animals
 * Query: type, minPrice, maxPrice, page, limit
 * Public — anyone can browse listings
 */
router.get('/', async (req, res) => {
  try {
    const { type, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const filter = { isActive: true };

    if (type && type !== 'all') filter.type = type;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [animals, total] = await Promise.all([
      Animal.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Animal.countDocuments(filter),
    ]);

    res.json({ animals, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/animals/my/listings
 * IMPORTANT: must be before /:id so Express doesn't treat "my" as an id
 * Auth required — returns the logged-in user's listings
 */
router.get('/my/listings', protect, async (req, res) => {
  try {
    const animals = await Animal.find({ sellerId: req.user._id }).sort({ createdAt: -1 });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET /api/animals/:id
 * Public — get single listing
 */
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Not found' });
    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/animals
 * Auth required — create a new listing
 * Multipart: images[] + form fields
 */
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const { type, price, age, ageUnit, location, description, breed, calving, milkPerDay } = req.body;

    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);

    const animal = await Animal.create({
      type,
      images,
      price: Number(price),
      age: Number(age) || 2,
      ageUnit: ageUnit || 'years',
      location,
      description,
      breed: breed || '',
      calving: calving || '',
      milkPerDay: milkPerDay || '',
      sellerId: req.user._id,
      sellerPhone: req.user.phone,
      sellerName: req.user.name || '',
    });

    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * DELETE /api/animals/:id
 * Auth required — soft delete (only seller can delete their own)
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Not found' });
    if (animal.sellerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    animal.isActive = false;
    await animal.save();
    res.json({ message: 'Listing removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
