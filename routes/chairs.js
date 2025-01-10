var express = require('express');
var router = express.Router();
const { prisma } = require('../prisma/prisma-client');

router.get('/', async (req, res) => {
  const { number_show } = req.query;
  
  try {
    const chairs = await prisma.chair.findMany(
      {
        where: {
          number_show: +number_show,
        }
      }
    );
    res.json(chairs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chairs' });
  }
});





router.put('/:id', async (req, res) => {
  try {
    const chairId = req.params.id;
    const chair = await prisma.chair.update({
      where: { id: chairId },
      data: req.body,
    });
    res.json(chair);
  } catch (error) {
    res.status(500).json({ message: 'Error updating chair' });
  }
});






router.patch('/:id', async (req, res) => {
  try {
    const chairId = req.params.id;
    const { status, client } = req.body;

    const updatedChair = await prisma.chair.update({
      where: { id: chairId },
      data: { status, client },
    });

    res.json(updatedChair);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating chair' });
  }
});






module.exports = router;