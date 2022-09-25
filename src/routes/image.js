import { Router } from 'express';
const router = Router();

import * as imageCtrlr from '../controllers/image';

router.post('/upload', imageCtrlr.upload);
router.delete('/image/:id', imageCtrlr.deleteImage);
// router.get('/images', imageCtrlr.getImages);
router.get('/images/:page?', imageCtrlr.getImages);

module.exports = router;
