const router = require('express').Router();
const { Project } = require('../../models');

//Get all Projects ROuter

router.get('/', async (req, res) => {
  try {
    const allProject = await Project.getAll({});
    let project = allProject.map((ele) => {
      ele.get({ plain: true });
    });
    //I need to make a "homepage view" and send our sthing to the homepage.
    res.render('homepage', project);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/', async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
