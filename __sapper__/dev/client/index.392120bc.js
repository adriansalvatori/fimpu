import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, e as element, b as space, t as text, h as claim_element, j as children, c as detach_dev, f as claim_space, k as claim_text, l as attr_dev, n as add_location, o as insert_dev, p as append_dev, u as noop } from './client.b82d62db.js';

/* src\routes\salas\index.svelte generated by Svelte v3.23.0 */

const file = "src\\routes\\salas\\index.svelte";

function create_fragment(ctx) {
	let div16;
	let div3;
	let div2;
	let div0;
	let img0;
	let img0_src_value;
	let t0;
	let div1;
	let a0;
	let span0;
	let i0;
	let span1;
	let t1;
	let t2;
	let a1;
	let span2;
	let i1;
	let span3;
	let t3;
	let t4;
	let a2;
	let span4;
	let i2;
	let span5;
	let t5;
	let t6;
	let a3;
	let span6;
	let i3;
	let span7;
	let t7;
	let t8;
	let div14;
	let div13;
	let div12;
	let div5;
	let div4;
	let iframe;
	let iframe_src_value;
	let t9;
	let div11;
	let div7;
	let div6;
	let t10;
	let t11;
	let div10;
	let div8;
	let t12;
	let div9;
	let t13;
	let div15;
	let img1;
	let img1_src_value;

	const block = {
		c: function create() {
			div16 = element("div");
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			img0 = element("img");
			t0 = space();
			div1 = element("div");
			a0 = element("a");
			span0 = element("span");
			i0 = element("i");
			span1 = element("span");
			t1 = text("Perfil");
			t2 = space();
			a1 = element("a");
			span2 = element("span");
			i1 = element("i");
			span3 = element("span");
			t3 = text("Agenda");
			t4 = space();
			a2 = element("a");
			span4 = element("span");
			i2 = element("i");
			span5 = element("span");
			t5 = text("Configuración");
			t6 = space();
			a3 = element("a");
			span6 = element("span");
			i3 = element("i");
			span7 = element("span");
			t7 = text("Ayuda");
			t8 = space();
			div14 = element("div");
			div13 = element("div");
			div12 = element("div");
			div5 = element("div");
			div4 = element("div");
			iframe = element("iframe");
			t9 = space();
			div11 = element("div");
			div7 = element("div");
			div6 = element("div");
			t10 = text("Preguntas para el Panelísta");
			t11 = space();
			div10 = element("div");
			div8 = element("div");
			t12 = space();
			div9 = element("div");
			t13 = space();
			div15 = element("div");
			img1 = element("img");
			this.h();
		},
		l: function claim(nodes) {
			div16 = claim_element(nodes, "DIV", { id: true, class: true });
			var div16_nodes = children(div16);
			div3 = claim_element(div16_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			img0 = claim_element(div0_nodes, "IMG", { src: true, alt: true });
			div0_nodes.forEach(detach_dev);
			t0 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			a0 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			span0 = claim_element(a0_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			i0 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			span1 = claim_element(a0_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t1 = claim_text(span1_nodes, "Perfil");
			span1_nodes.forEach(detach_dev);
			a0_nodes.forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			a1 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			span2 = claim_element(a1_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			i1 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			span3 = claim_element(a1_nodes, "SPAN", {});
			var span3_nodes = children(span3);
			t3 = claim_text(span3_nodes, "Agenda");
			span3_nodes.forEach(detach_dev);
			a1_nodes.forEach(detach_dev);
			t4 = claim_space(div1_nodes);
			a2 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			span4 = claim_element(a2_nodes, "SPAN", { class: true });
			var span4_nodes = children(span4);
			i2 = claim_element(span4_nodes, "I", { "data-feather": true });
			children(i2).forEach(detach_dev);
			span4_nodes.forEach(detach_dev);
			span5 = claim_element(a2_nodes, "SPAN", {});
			var span5_nodes = children(span5);
			t5 = claim_text(span5_nodes, "Configuración");
			span5_nodes.forEach(detach_dev);
			a2_nodes.forEach(detach_dev);
			t6 = claim_space(div1_nodes);
			a3 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			span6 = claim_element(a3_nodes, "SPAN", { class: true });
			var span6_nodes = children(span6);
			i3 = claim_element(span6_nodes, "I", { "data-feather": true });
			children(i3).forEach(detach_dev);
			span6_nodes.forEach(detach_dev);
			span7 = claim_element(a3_nodes, "SPAN", {});
			var span7_nodes = children(span7);
			t7 = claim_text(span7_nodes, "Ayuda");
			span7_nodes.forEach(detach_dev);
			a3_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t8 = claim_space(div16_nodes);
			div14 = claim_element(div16_nodes, "DIV", { class: true });
			var div14_nodes = children(div14);
			div13 = claim_element(div14_nodes, "DIV", { class: true });
			var div13_nodes = children(div13);
			div12 = claim_element(div13_nodes, "DIV", { class: true });
			var div12_nodes = children(div12);
			div5 = claim_element(div12_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			div4 = claim_element(div5_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);

			iframe = claim_element(div4_nodes, "IFRAME", {
				title: true,
				src: true,
				frameborder: true,
				allow: true,
				allowfullscreen: true,
				class: true
			});

			children(iframe).forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			t9 = claim_space(div12_nodes);
			div11 = claim_element(div12_nodes, "DIV", { class: true });
			var div11_nodes = children(div11);
			div7 = claim_element(div11_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			t10 = claim_text(div6_nodes, "Preguntas para el Panelísta");
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			t11 = claim_space(div11_nodes);
			div10 = claim_element(div11_nodes, "DIV", { class: true });
			var div10_nodes = children(div10);
			div8 = claim_element(div10_nodes, "DIV", { class: true });
			children(div8).forEach(detach_dev);
			t12 = claim_space(div10_nodes);
			div9 = claim_element(div10_nodes, "DIV", { class: true });
			var div9_nodes = children(div9);
			div9_nodes.forEach(detach_dev);
			div10_nodes.forEach(detach_dev);
			div11_nodes.forEach(detach_dev);
			div12_nodes.forEach(detach_dev);
			div13_nodes.forEach(detach_dev);
			div14_nodes.forEach(detach_dev);
			t13 = claim_space(div16_nodes);
			div15 = claim_element(div16_nodes, "DIV", { class: true });
			var div15_nodes = children(div15);
			img1 = claim_element(div15_nodes, "IMG", { class: true, src: true, alt: true });
			div15_nodes.forEach(detach_dev);
			div16_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (img0.src !== (img0_src_value = "logo-salas.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "");
			add_location(img0, file, 8, 37, 320);
			attr_dev(div0, "class", "column is-5");
			add_location(div0, file, 8, 12, 295);
			attr_dev(i0, "data-feather", "user");
			add_location(i0, file, 10, 107, 519);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 10, 79, 491);
			add_location(span1, file, 10, 141, 553);
			attr_dev(a0, "href", "lobby");
			attr_dev(a0, "class", "button is-primary is-small is-outlined");
			add_location(a0, file, 10, 16, 428);
			attr_dev(i1, "data-feather", "user");
			add_location(i1, file, 11, 107, 685);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 11, 79, 657);
			add_location(span3, file, 11, 141, 719);
			attr_dev(a1, "href", "lobby");
			attr_dev(a1, "class", "button is-primary is-small is-outlined");
			add_location(a1, file, 11, 16, 594);
			attr_dev(i2, "data-feather", "user");
			add_location(i2, file, 12, 107, 851);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 12, 79, 823);
			add_location(span5, file, 12, 141, 885);
			attr_dev(a2, "href", "lobby");
			attr_dev(a2, "class", "button is-primary is-small is-outlined");
			add_location(a2, file, 12, 16, 760);
			attr_dev(i3, "data-feather", "user");
			add_location(i3, file, 13, 107, 1024);
			attr_dev(span6, "class", "icon is-small");
			add_location(span6, file, 13, 79, 996);
			add_location(span7, file, 13, 141, 1058);
			attr_dev(a3, "href", "lobby");
			attr_dev(a3, "class", "button is-primary is-small is-outlined");
			add_location(a3, file, 13, 16, 933);
			attr_dev(div1, "class", "column is-3 is-offset-4");
			add_location(div1, file, 9, 12, 373);
			attr_dev(div2, "class", "columns");
			add_location(div2, file, 7, 8, 260);
			attr_dev(div3, "class", "hero-header has-padding-30");
			add_location(div3, file, 6, 4, 210);
			attr_dev(iframe, "title", "");
			if (iframe.src !== (iframe_src_value = "https://www.youtube.com/embed/onaXveWIqhA")) attr_dev(iframe, "src", iframe_src_value);
			attr_dev(iframe, "frameborder", "0");
			attr_dev(iframe, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			iframe.allowFullscreen = true;
			attr_dev(iframe, "class", "svelte-1y5lqdg");
			add_location(iframe, file, 23, 24, 1396);
			attr_dev(div4, "class", "iframe-container box");
			add_location(div4, file, 22, 20, 1336);
			attr_dev(div5, "class", "column is-8");
			add_location(div5, file, 20, 16, 1240);
			attr_dev(div6, "class", "title is-4 has-text-white");
			add_location(div6, file, 29, 24, 1841);
			attr_dev(div7, "class", "questions box  has-background-primary");
			add_location(div7, file, 28, 20, 1764);
			attr_dev(div8, "class", "card-content");
			add_location(div8, file, 34, 24, 2131);
			attr_dev(div9, "class", "card-footer");
			add_location(div9, file, 35, 24, 2189);
			attr_dev(div10, "class", "comments card");
			add_location(div10, file, 33, 20, 2078);
			attr_dev(div11, "class", "column is-4");
			add_location(div11, file, 26, 16, 1669);
			attr_dev(div12, "class", "columns");
			add_location(div12, file, 19, 12, 1201);
			attr_dev(div13, "class", "container");
			add_location(div13, file, 18, 8, 1164);
			attr_dev(div14, "class", "hero-body");
			add_location(div14, file, 17, 1, 1131);
			attr_dev(img1, "class", "decoration");
			if (img1.src !== (img1_src_value = "decoration.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "");
			add_location(img1, file, 44, 8, 2457);
			attr_dev(div15, "class", "hero-footer");
			add_location(div15, file, 43, 4, 2422);
			attr_dev(div16, "id", "lobby-salas");
			attr_dev(div16, "class", "hero is-fullheight is-relative0 is-clipped");
			add_location(div16, file, 5, 0, 131);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div16, anchor);
			append_dev(div16, div3);
			append_dev(div3, div2);
			append_dev(div2, div0);
			append_dev(div0, img0);
			append_dev(div2, t0);
			append_dev(div2, div1);
			append_dev(div1, a0);
			append_dev(a0, span0);
			append_dev(span0, i0);
			append_dev(a0, span1);
			append_dev(span1, t1);
			append_dev(div1, t2);
			append_dev(div1, a1);
			append_dev(a1, span2);
			append_dev(span2, i1);
			append_dev(a1, span3);
			append_dev(span3, t3);
			append_dev(div1, t4);
			append_dev(div1, a2);
			append_dev(a2, span4);
			append_dev(span4, i2);
			append_dev(a2, span5);
			append_dev(span5, t5);
			append_dev(div1, t6);
			append_dev(div1, a3);
			append_dev(a3, span6);
			append_dev(span6, i3);
			append_dev(a3, span7);
			append_dev(span7, t7);
			append_dev(div16, t8);
			append_dev(div16, div14);
			append_dev(div14, div13);
			append_dev(div13, div12);
			append_dev(div12, div5);
			append_dev(div5, div4);
			append_dev(div4, iframe);
			append_dev(div12, t9);
			append_dev(div12, div11);
			append_dev(div11, div7);
			append_dev(div7, div6);
			append_dev(div6, t10);
			append_dev(div11, t11);
			append_dev(div11, div10);
			append_dev(div10, div8);
			append_dev(div10, t12);
			append_dev(div10, div9);
			append_dev(div16, t13);
			append_dev(div16, div15);
			append_dev(div15, img1);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div16);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Salas> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Salas", $$slots, []);
	return [];
}

class Salas extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Salas",
			options,
			id: create_fragment.name
		});
	}
}

export default Salas;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMzkyMTIwYmMuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
