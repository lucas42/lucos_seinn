const router = require('express').Router();
const fetch = require('node-fetch');

const mediaManager = process.env.MEDIA_MANAGER || "https://ceol.l42.eu/";
const receiverApplicationId = process.env.DEV ? "5D5F55DE" : "34252B55";

router.get('/', async (req, res) => {
	const data = await fetch(mediaManager+"poll").then(resp => resp.json());
	res.render("index", {
		clientVariables: JSON.stringify({
			mediaManager,
			receiverApplicationId,
		}),
		now: data.now.metadata,
		isPlaying: data.isPlaying,
	});
});

router.post('/play', async (req,res) => {
	await fetch(mediaManager+"play", {method: 'POST'});
	res.redirect(`${req.protocol}://${req.headers.host}/v3`);
});
router.post('/pause', async (req,res) => {
	await fetch(mediaManager+"pause", {method: 'POST'});
	res.redirect(`${req.protocol}://${req.headers.host}/v3`);
});
router.post('/next', async (req,res) => {
	await fetch(mediaManager+"next", {method: 'POST'});
	res.redirect(`${req.protocol}://${req.headers.host}/v3`);
});

module.exports = router;