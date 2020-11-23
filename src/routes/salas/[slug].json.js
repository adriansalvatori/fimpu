import salas from './_salas.js';

const lookup = new Map();
salas.forEach(stand => {
	lookup.set(stand.slug, JSON.stringify(stand));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Esta ruta no se ha podido encontrar`
		}));
	}
}
