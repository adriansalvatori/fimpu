import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, e as element, t as text, b as space, h as claim_element, j as children, c as detach_dev, k as claim_text, f as claim_space, l as attr_dev, n as add_location, m as set_style, o as insert_dev, p as append_dev, u as noop } from './client.c5598dd6.js';

/* src\routes\medios\index.svelte generated by Svelte v3.23.0 */

const file = "src\\routes\\medios\\index.svelte";

function create_fragment(ctx) {
	let div7;
	let div4;
	let div3;
	let div2;
	let div0;
	let a0;
	let span0;
	let i0;
	let span1;
	let t0;
	let t1;
	let a1;
	let span2;
	let i1;
	let span3;
	let t2;
	let t3;
	let div1;
	let a2;
	let span4;
	let i2;
	let span5;
	let t4;
	let t5;
	let a3;
	let span6;
	let i3;
	let span7;
	let t6;
	let t7;
	let a4;
	let span8;
	let i4;
	let span9;
	let t8;
	let t9;
	let a5;
	let span10;
	let i5;
	let span11;
	let t10;
	let t11;
	let a6;
	let span12;
	let i6;
	let span13;
	let t12;
	let t13;
	let div6;
	let div5;
	let a7;
	let span14;
	let i7;
	let span15;
	let t14;

	const block = {
		c: function create() {
			div7 = element("div");
			div4 = element("div");
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			a0 = element("a");
			span0 = element("span");
			i0 = element("i");
			span1 = element("span");
			t0 = text("Espacio MinTIC");
			t1 = space();
			a1 = element("a");
			span2 = element("span");
			i1 = element("i");
			span3 = element("span");
			t2 = text("Espacio RTVC");
			t3 = space();
			div1 = element("div");
			a2 = element("a");
			span4 = element("span");
			i2 = element("i");
			span5 = element("span");
			t4 = text("Espacio Canal Capital");
			t5 = space();
			a3 = element("a");
			span6 = element("span");
			i3 = element("i");
			span7 = element("span");
			t6 = text("Espacio Canal Telecaribe");
			t7 = space();
			a4 = element("a");
			span8 = element("span");
			i4 = element("i");
			span9 = element("span");
			t8 = text("Espacio Canal Trece");
			t9 = space();
			a5 = element("a");
			span10 = element("span");
			i5 = element("i");
			span11 = element("span");
			t10 = text("Espacio Canal TRO");
			t11 = space();
			a6 = element("a");
			span12 = element("span");
			i6 = element("i");
			span13 = element("span");
			t12 = text("Espacio Canal Teleislas");
			t13 = space();
			div6 = element("div");
			div5 = element("div");
			a7 = element("a");
			span14 = element("span");
			i7 = element("i");
			span15 = element("span");
			t14 = text("Volver al Lobby");
			this.h();
		},
		l: function claim(nodes) {
			div7 = claim_element(nodes, "DIV", { id: true, style: true, class: true });
			var div7_nodes = children(div7);
			div4 = claim_element(div7_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			a0 = claim_element(div0_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			span0 = claim_element(a0_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			i0 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			span1 = claim_element(a0_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t0 = claim_text(span1_nodes, "Espacio MinTIC");
			span1_nodes.forEach(detach_dev);
			a0_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);
			a1 = claim_element(div0_nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			span2 = claim_element(a1_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			i1 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			span3 = claim_element(a1_nodes, "SPAN", {});
			var span3_nodes = children(span3);
			t2 = claim_text(span3_nodes, "Espacio RTVC");
			span3_nodes.forEach(detach_dev);
			a1_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			a2 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			span4 = claim_element(a2_nodes, "SPAN", { class: true });
			var span4_nodes = children(span4);
			i2 = claim_element(span4_nodes, "I", { "data-feather": true });
			children(i2).forEach(detach_dev);
			span4_nodes.forEach(detach_dev);
			span5 = claim_element(a2_nodes, "SPAN", {});
			var span5_nodes = children(span5);
			t4 = claim_text(span5_nodes, "Espacio Canal Capital");
			span5_nodes.forEach(detach_dev);
			a2_nodes.forEach(detach_dev);
			t5 = claim_space(div1_nodes);
			a3 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			span6 = claim_element(a3_nodes, "SPAN", { class: true });
			var span6_nodes = children(span6);
			i3 = claim_element(span6_nodes, "I", { "data-feather": true });
			children(i3).forEach(detach_dev);
			span6_nodes.forEach(detach_dev);
			span7 = claim_element(a3_nodes, "SPAN", {});
			var span7_nodes = children(span7);
			t6 = claim_text(span7_nodes, "Espacio Canal Telecaribe");
			span7_nodes.forEach(detach_dev);
			a3_nodes.forEach(detach_dev);
			t7 = claim_space(div1_nodes);
			a4 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a4_nodes = children(a4);
			span8 = claim_element(a4_nodes, "SPAN", { class: true });
			var span8_nodes = children(span8);
			i4 = claim_element(span8_nodes, "I", { "data-feather": true });
			children(i4).forEach(detach_dev);
			span8_nodes.forEach(detach_dev);
			span9 = claim_element(a4_nodes, "SPAN", {});
			var span9_nodes = children(span9);
			t8 = claim_text(span9_nodes, "Espacio Canal Trece");
			span9_nodes.forEach(detach_dev);
			a4_nodes.forEach(detach_dev);
			t9 = claim_space(div1_nodes);
			a5 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a5_nodes = children(a5);
			span10 = claim_element(a5_nodes, "SPAN", { class: true });
			var span10_nodes = children(span10);
			i5 = claim_element(span10_nodes, "I", { "data-feather": true });
			children(i5).forEach(detach_dev);
			span10_nodes.forEach(detach_dev);
			span11 = claim_element(a5_nodes, "SPAN", {});
			var span11_nodes = children(span11);
			t10 = claim_text(span11_nodes, "Espacio Canal TRO");
			span11_nodes.forEach(detach_dev);
			a5_nodes.forEach(detach_dev);
			t11 = claim_space(div1_nodes);
			a6 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a6_nodes = children(a6);
			span12 = claim_element(a6_nodes, "SPAN", { class: true });
			var span12_nodes = children(span12);
			i6 = claim_element(span12_nodes, "I", { "data-feather": true });
			children(i6).forEach(detach_dev);
			span12_nodes.forEach(detach_dev);
			span13 = claim_element(a6_nodes, "SPAN", {});
			var span13_nodes = children(span13);
			t12 = claim_text(span13_nodes, "Espacio Canal Teleislas");
			span13_nodes.forEach(detach_dev);
			a6_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t13 = claim_space(div7_nodes);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			div5 = claim_element(div6_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			a7 = claim_element(div5_nodes, "A", { href: true, id: true, class: true });
			var a7_nodes = children(a7);
			span14 = claim_element(a7_nodes, "SPAN", { class: true });
			var span14_nodes = children(span14);
			i7 = claim_element(span14_nodes, "I", { "data-feather": true });
			children(i7).forEach(detach_dev);
			span14_nodes.forEach(detach_dev);
			span15 = claim_element(a7_nodes, "SPAN", {});
			var span15_nodes = children(span15);
			t14 = claim_text(span15_nodes, "Volver al Lobby");
			span15_nodes.forEach(detach_dev);
			a7_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(i0, "data-feather", "share-2");
			add_location(i0, file, 28, 167, 1040);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 28, 139, 1012);
			add_location(span1, file, 28, 204, 1077);
			attr_dev(a0, "href", "/medios/mintic");
			attr_dev(a0, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a0, file, 28, 20, 893);
			attr_dev(i1, "data-feather", "share-2");
			add_location(i1, file, 29, 165, 1275);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 29, 137, 1247);
			add_location(span3, file, 29, 202, 1312);
			attr_dev(a1, "href", "/medios/rtvc");
			attr_dev(a1, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a1, file, 29, 20, 1130);
			attr_dev(div0, "class", "column is-2");
			add_location(div0, file, 27, 16, 846);
			attr_dev(i2, "data-feather", "share-2");
			add_location(i2, file, 32, 174, 1596);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 32, 146, 1568);
			add_location(span5, file, 32, 211, 1633);
			attr_dev(a2, "href", "/medios/canal-capital");
			attr_dev(a2, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a2, file, 32, 20, 1442);
			attr_dev(i3, "data-feather", "share-2");
			add_location(i3, file, 33, 171, 1844);
			attr_dev(span6, "class", "icon is-small");
			add_location(span6, file, 33, 143, 1816);
			add_location(span7, file, 33, 208, 1881);
			attr_dev(a3, "href", "/medios/telecaribe");
			attr_dev(a3, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a3, file, 33, 20, 1693);
			attr_dev(i4, "data-feather", "share-2");
			add_location(i4, file, 34, 169, 2093);
			attr_dev(span8, "class", "icon is-small");
			add_location(span8, file, 34, 141, 2065);
			add_location(span9, file, 34, 206, 2130);
			attr_dev(a4, "href", "/medios/canal-13");
			attr_dev(a4, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a4, file, 34, 20, 1944);
			attr_dev(i5, "data-feather", "share-2");
			add_location(i5, file, 35, 164, 2332);
			attr_dev(span10, "class", "icon is-small");
			add_location(span10, file, 35, 136, 2304);
			add_location(span11, file, 35, 201, 2369);
			attr_dev(a5, "href", "/medios/tro");
			attr_dev(a5, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a5, file, 35, 20, 2188);
			attr_dev(i6, "data-feather", "share-2");
			add_location(i6, file, 36, 170, 2575);
			attr_dev(span12, "class", "icon is-small");
			add_location(span12, file, 36, 142, 2547);
			add_location(span13, file, 36, 207, 2612);
			attr_dev(a6, "href", "/medios/teleislas");
			attr_dev(a6, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control svelte-z8dm2s");
			add_location(a6, file, 36, 20, 2425);
			attr_dev(div1, "class", "column is-3 is-offset-7");
			add_location(div1, file, 31, 16, 1383);
			attr_dev(div2, "class", "columns controls svelte-z8dm2s");
			add_location(div2, file, 26, 12, 798);
			attr_dev(div3, "class", "container");
			add_location(div3, file, 25, 8, 761);
			attr_dev(div4, "class", "hero-body");
			add_location(div4, file, 24, 1, 728);
			attr_dev(i7, "data-feather", "chevrons-left");
			add_location(i7, file, 43, 116, 2906);
			attr_dev(span14, "class", "icon is-small svelte-z8dm2s");
			add_location(span14, file, 43, 88, 2878);
			add_location(span15, file, 43, 159, 2949);
			attr_dev(a7, "href", "/lobby");
			attr_dev(a7, "id", "volver");
			attr_dev(a7, "class", "button is-primary has-margin-bottom-50 svelte-z8dm2s");
			add_location(a7, file, 43, 12, 2802);
			attr_dev(div5, "class", "container");
			add_location(div5, file, 42, 8, 2765);
			attr_dev(div6, "class", "hero-footer");
			add_location(div6, file, 41, 4, 2730);
			attr_dev(div7, "id", "lobby-medios");
			set_style(div7, "background", "url('lobby-stands.jpg')");
			attr_dev(div7, "class", "hero is-fullheight is-relative is-primary is-clipped svelte-z8dm2s");
			add_location(div7, file, 23, 0, 596);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div7, anchor);
			append_dev(div7, div4);
			append_dev(div4, div3);
			append_dev(div3, div2);
			append_dev(div2, div0);
			append_dev(div0, a0);
			append_dev(a0, span0);
			append_dev(span0, i0);
			append_dev(a0, span1);
			append_dev(span1, t0);
			append_dev(div0, t1);
			append_dev(div0, a1);
			append_dev(a1, span2);
			append_dev(span2, i1);
			append_dev(a1, span3);
			append_dev(span3, t2);
			append_dev(div2, t3);
			append_dev(div2, div1);
			append_dev(div1, a2);
			append_dev(a2, span4);
			append_dev(span4, i2);
			append_dev(a2, span5);
			append_dev(span5, t4);
			append_dev(div1, t5);
			append_dev(div1, a3);
			append_dev(a3, span6);
			append_dev(span6, i3);
			append_dev(a3, span7);
			append_dev(span7, t6);
			append_dev(div1, t7);
			append_dev(div1, a4);
			append_dev(a4, span8);
			append_dev(span8, i4);
			append_dev(a4, span9);
			append_dev(span9, t8);
			append_dev(div1, t9);
			append_dev(div1, a5);
			append_dev(a5, span10);
			append_dev(span10, i5);
			append_dev(a5, span11);
			append_dev(span11, t10);
			append_dev(div1, t11);
			append_dev(div1, a6);
			append_dev(a6, span12);
			append_dev(span12, i6);
			append_dev(a6, span13);
			append_dev(span13, t12);
			append_dev(div7, t13);
			append_dev(div7, div6);
			append_dev(div6, div5);
			append_dev(div5, a7);
			append_dev(a7, span14);
			append_dev(span14, i7);
			append_dev(a7, span15);
			append_dev(span15, t14);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div7);
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
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Medios> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Medios", $$slots, []);
	return [];
}

class Medios extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Medios",
			options,
			id: create_fragment.name
		});
	}
}

export default Medios;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYTBhNzE5ODcuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
