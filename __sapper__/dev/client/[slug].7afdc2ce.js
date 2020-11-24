import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as globals, b as space, e as element, A as create_component, t as text, q as query_selector_all, c as detach_dev, f as claim_space, h as claim_element, j as children, B as claim_component, k as claim_text, l as attr_dev, n as add_location, o as insert_dev, C as mount_component, p as append_dev, r as listen_dev, D as transition_in, E as transition_out, F as destroy_component } from './client.740b0f87.js';
import { R as RoomChange, a as Iframe, T as Trivias, E as Encuestas, I as Input, M as Messages } from './Input.cbe5b5cf.js';
import { A as Agenda } from './Agenda.bbbe63e5.js';

/* src\routes\salas\[slug].svelte generated by Svelte v3.23.0 */

const { document: document_1 } = globals;
const file = "src\\routes\\salas\\[slug].svelte";

function create_fragment(ctx) {
	let title_value;
	let t0;
	let section;
	let t1;
	let t2;
	let div3;
	let div2;
	let div0;
	let a0;
	let img0;
	let img0_src_value;
	let t3;
	let div1;
	let a1;
	let span0;
	let i0;
	let span1;
	let t4;
	let t5;
	let button;
	let span2;
	let i1;
	let span3;
	let t6;
	let t7;
	let a2;
	let span4;
	let i2;
	let span5;
	let t8;
	let t9;
	let a3;
	let span6;
	let i3;
	let span7;
	let t10;
	let t11;
	let div13;
	let div12;
	let div11;
	let div5;
	let div4;
	let t12;
	let t13;
	let t14;
	let div10;
	let div7;
	let div6;
	let t15;
	let t16;
	let t17;
	let div9;
	let t18;
	let div8;
	let t19;
	let div14;
	let img1;
	let img1_src_value;
	let current;
	let mounted;
	let dispose;
	document_1.title = title_value = "" + (/*sala*/ ctx[0].title + " - FIMPU");
	const agenda = new Agenda({ $$inline: true });

	const roomchange = new RoomChange({
			props: { room: /*sala*/ ctx[0].slug, admin: false },
			$$inline: true
		});

	const iframe = new Iframe({
			props: { sala: /*sala*/ ctx[0] },
			$$inline: true
		});

	const trivias = new Trivias({
			props: { room: /*sala*/ ctx[0].slug, admin: false },
			$$inline: true
		});

	const encuestas = new Encuestas({
			props: { room: /*sala*/ ctx[0].slug, admin: false },
			$$inline: true
		});

	const input0 = new Input({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "question"
			},
			$$inline: true
		});

	const messages = new Messages({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "message-approved"
			},
			$$inline: true
		});

	const input1 = new Input({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "message"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = space();
			section = element("section");
			create_component(agenda.$$.fragment);
			t1 = space();
			create_component(roomchange.$$.fragment);
			t2 = space();
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			a0 = element("a");
			img0 = element("img");
			t3 = space();
			div1 = element("div");
			a1 = element("a");
			span0 = element("span");
			i0 = element("i");
			span1 = element("span");
			t4 = text("Perfil");
			t5 = space();
			button = element("button");
			span2 = element("span");
			i1 = element("i");
			span3 = element("span");
			t6 = text("Agenda");
			t7 = space();
			a2 = element("a");
			span4 = element("span");
			i2 = element("i");
			span5 = element("span");
			t8 = text("Configuración");
			t9 = space();
			a3 = element("a");
			span6 = element("span");
			i3 = element("i");
			span7 = element("span");
			t10 = text("Ayuda");
			t11 = space();
			div13 = element("div");
			div12 = element("div");
			div11 = element("div");
			div5 = element("div");
			div4 = element("div");
			create_component(iframe.$$.fragment);
			t12 = space();
			create_component(trivias.$$.fragment);
			t13 = space();
			create_component(encuestas.$$.fragment);
			t14 = space();
			div10 = element("div");
			div7 = element("div");
			div6 = element("div");
			t15 = text("Preguntas para el Panelísta");
			t16 = space();
			create_component(input0.$$.fragment);
			t17 = space();
			div9 = element("div");
			create_component(messages.$$.fragment);
			t18 = space();
			div8 = element("div");
			create_component(input1.$$.fragment);
			t19 = space();
			div14 = element("div");
			img1 = element("img");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-333vde\"]", document_1.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			section = claim_element(nodes, "SECTION", { id: true, class: true });
			var section_nodes = children(section);
			claim_component(agenda.$$.fragment, section_nodes);
			t1 = claim_space(section_nodes);
			claim_component(roomchange.$$.fragment, section_nodes);
			t2 = claim_space(section_nodes);
			div3 = claim_element(section_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			a0 = claim_element(div0_nodes, "A", { href: true });
			var a0_nodes = children(a0);
			img0 = claim_element(a0_nodes, "IMG", { class: true, src: true, alt: true });
			a0_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			a1 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			span0 = claim_element(a1_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			i0 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			span1 = claim_element(a1_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t4 = claim_text(span1_nodes, "Perfil");
			span1_nodes.forEach(detach_dev);
			a1_nodes.forEach(detach_dev);
			t5 = claim_space(div1_nodes);
			button = claim_element(div1_nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			span2 = claim_element(button_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			i1 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			span3 = claim_element(button_nodes, "SPAN", {});
			var span3_nodes = children(span3);
			t6 = claim_text(span3_nodes, "Agenda");
			span3_nodes.forEach(detach_dev);
			button_nodes.forEach(detach_dev);
			t7 = claim_space(div1_nodes);
			a2 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			span4 = claim_element(a2_nodes, "SPAN", { class: true });
			var span4_nodes = children(span4);
			i2 = claim_element(span4_nodes, "I", { "data-feather": true });
			children(i2).forEach(detach_dev);
			span4_nodes.forEach(detach_dev);
			span5 = claim_element(a2_nodes, "SPAN", {});
			var span5_nodes = children(span5);
			t8 = claim_text(span5_nodes, "Configuración");
			span5_nodes.forEach(detach_dev);
			a2_nodes.forEach(detach_dev);
			t9 = claim_space(div1_nodes);
			a3 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			span6 = claim_element(a3_nodes, "SPAN", { class: true });
			var span6_nodes = children(span6);
			i3 = claim_element(span6_nodes, "I", { "data-feather": true });
			children(i3).forEach(detach_dev);
			span6_nodes.forEach(detach_dev);
			span7 = claim_element(a3_nodes, "SPAN", {});
			var span7_nodes = children(span7);
			t10 = claim_text(span7_nodes, "Ayuda");
			span7_nodes.forEach(detach_dev);
			a3_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t11 = claim_space(section_nodes);
			div13 = claim_element(section_nodes, "DIV", { class: true });
			var div13_nodes = children(div13);
			div12 = claim_element(div13_nodes, "DIV", { class: true });
			var div12_nodes = children(div12);
			div11 = claim_element(div12_nodes, "DIV", { class: true });
			var div11_nodes = children(div11);
			div5 = claim_element(div11_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			div4 = claim_element(div5_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			claim_component(iframe.$$.fragment, div4_nodes);
			div4_nodes.forEach(detach_dev);
			t12 = claim_space(div5_nodes);
			claim_component(trivias.$$.fragment, div5_nodes);
			t13 = claim_space(div5_nodes);
			claim_component(encuestas.$$.fragment, div5_nodes);
			div5_nodes.forEach(detach_dev);
			t14 = claim_space(div11_nodes);
			div10 = claim_element(div11_nodes, "DIV", { class: true });
			var div10_nodes = children(div10);
			div7 = claim_element(div10_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			t15 = claim_text(div6_nodes, "Preguntas para el Panelísta");
			div6_nodes.forEach(detach_dev);
			t16 = claim_space(div7_nodes);
			claim_component(input0.$$.fragment, div7_nodes);
			div7_nodes.forEach(detach_dev);
			t17 = claim_space(div10_nodes);
			div9 = claim_element(div10_nodes, "DIV", { class: true });
			var div9_nodes = children(div9);
			claim_component(messages.$$.fragment, div9_nodes);
			t18 = claim_space(div9_nodes);
			div8 = claim_element(div9_nodes, "DIV", { class: true });
			var div8_nodes = children(div8);
			claim_component(input1.$$.fragment, div8_nodes);
			div8_nodes.forEach(detach_dev);
			div9_nodes.forEach(detach_dev);
			div10_nodes.forEach(detach_dev);
			div11_nodes.forEach(detach_dev);
			div12_nodes.forEach(detach_dev);
			div13_nodes.forEach(detach_dev);
			t19 = claim_space(section_nodes);
			div14 = claim_element(section_nodes, "DIV", { class: true });
			var div14_nodes = children(div14);
			img1 = claim_element(div14_nodes, "IMG", { class: true, src: true, alt: true });
			div14_nodes.forEach(detach_dev);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(img0, "class", "logo");
			if (img0.src !== (img0_src_value = "logo-salas.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "");
			add_location(img0, file, 53, 49, 1638);
			attr_dev(a0, "href", "/");
			add_location(a0, file, 53, 37, 1626);
			attr_dev(div0, "class", "column is-5");
			add_location(div0, file, 53, 12, 1601);
			attr_dev(i0, "data-feather", "user");
			add_location(i0, file, 55, 107, 1852);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 55, 79, 1824);
			add_location(span1, file, 56, 59, 1914);
			attr_dev(a1, "href", "lobby");
			attr_dev(a1, "class", "button is-primary is-small is-outlined");
			add_location(a1, file, 55, 16, 1761);
			attr_dev(i1, "data-feather", "user");
			add_location(i1, file, 58, 46, 2084);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 57, 94, 2032);
			add_location(span3, file, 58, 80, 2118);
			attr_dev(button, "class", "button is-primary is-small is-outlined");
			add_location(button, file, 57, 16, 1954);
			attr_dev(i2, "data-feather", "user");
			add_location(i2, file, 59, 107, 2254);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 59, 79, 2226);
			add_location(span5, file, 60, 59, 2316);
			attr_dev(a2, "href", "lobby");
			attr_dev(a2, "class", "button is-primary is-small is-outlined");
			add_location(a2, file, 59, 16, 2163);
			attr_dev(i3, "data-feather", "user");
			add_location(i3, file, 61, 107, 2454);
			attr_dev(span6, "class", "icon is-small");
			add_location(span6, file, 61, 79, 2426);
			add_location(span7, file, 62, 59, 2516);
			attr_dev(a3, "href", "lobby");
			attr_dev(a3, "class", "button is-primary is-small is-outlined");
			add_location(a3, file, 61, 16, 2363);
			attr_dev(div1, "class", "column is-3 is-offset-4");
			add_location(div1, file, 54, 12, 1707);
			attr_dev(div2, "class", "columns");
			add_location(div2, file, 52, 8, 1567);
			attr_dev(div3, "class", "hero-header has-padding-30");
			add_location(div3, file, 51, 4, 1518);
			attr_dev(div4, "class", "iframe-container box");
			add_location(div4, file, 71, 20, 2788);
			attr_dev(div5, "class", "column is-8");
			add_location(div5, file, 69, 16, 2694);
			attr_dev(div6, "class", "title is-4 has-text-white");
			add_location(div6, file, 80, 24, 3226);
			attr_dev(div7, "class", "questions box  has-background-gradient svelte-13h4v9r");
			add_location(div7, file, 79, 20, 3149);
			attr_dev(div8, "class", "card-footer has-background-gradient has-padding-20 svelte-13h4v9r");
			add_location(div8, file, 87, 24, 3663);
			attr_dev(div9, "class", "comments card");
			add_location(div9, file, 85, 20, 3530);
			attr_dev(div10, "class", "column is-4");
			add_location(div10, file, 77, 16, 3056);
			attr_dev(div11, "class", "columns");
			add_location(div11, file, 68, 12, 2656);
			attr_dev(div12, "class", "container");
			add_location(div12, file, 67, 8, 2620);
			attr_dev(div13, "class", "hero-body");
			add_location(div13, file, 66, 4, 2588);
			attr_dev(img1, "class", "decoration");
			if (img1.src !== (img1_src_value = "decoration.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "");
			add_location(img1, file, 97, 8, 4033);
			attr_dev(div14, "class", "hero-footer");
			add_location(div14, file, 96, 4, 3999);
			attr_dev(section, "id", "lobby-salas");
			attr_dev(section, "class", "hero is-fullheight is-relative is-clipped");
			add_location(section, file, 47, 0, 1371);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, section, anchor);
			mount_component(agenda, section, null);
			append_dev(section, t1);
			mount_component(roomchange, section, null);
			append_dev(section, t2);
			append_dev(section, div3);
			append_dev(div3, div2);
			append_dev(div2, div0);
			append_dev(div0, a0);
			append_dev(a0, img0);
			append_dev(div2, t3);
			append_dev(div2, div1);
			append_dev(div1, a1);
			append_dev(a1, span0);
			append_dev(span0, i0);
			append_dev(a1, span1);
			append_dev(span1, t4);
			append_dev(div1, t5);
			append_dev(div1, button);
			append_dev(button, span2);
			append_dev(span2, i1);
			append_dev(button, span3);
			append_dev(span3, t6);
			append_dev(div1, t7);
			append_dev(div1, a2);
			append_dev(a2, span4);
			append_dev(span4, i2);
			append_dev(a2, span5);
			append_dev(span5, t8);
			append_dev(div1, t9);
			append_dev(div1, a3);
			append_dev(a3, span6);
			append_dev(span6, i3);
			append_dev(a3, span7);
			append_dev(span7, t10);
			append_dev(section, t11);
			append_dev(section, div13);
			append_dev(div13, div12);
			append_dev(div12, div11);
			append_dev(div11, div5);
			append_dev(div5, div4);
			mount_component(iframe, div4, null);
			append_dev(div5, t12);
			mount_component(trivias, div5, null);
			append_dev(div5, t13);
			mount_component(encuestas, div5, null);
			append_dev(div11, t14);
			append_dev(div11, div10);
			append_dev(div10, div7);
			append_dev(div7, div6);
			append_dev(div6, t15);
			append_dev(div7, t16);
			mount_component(input0, div7, null);
			append_dev(div10, t17);
			append_dev(div10, div9);
			mount_component(messages, div9, null);
			append_dev(div9, t18);
			append_dev(div9, div8);
			mount_component(input1, div8, null);
			append_dev(section, t19);
			append_dev(section, div14);
			append_dev(div14, img1);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*abrirAgenda*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*sala*/ 1) && title_value !== (title_value = "" + (/*sala*/ ctx[0].title + " - FIMPU"))) {
				document_1.title = title_value;
			}

			const roomchange_changes = {};
			if (dirty & /*sala*/ 1) roomchange_changes.room = /*sala*/ ctx[0].slug;
			roomchange.$set(roomchange_changes);
			const iframe_changes = {};
			if (dirty & /*sala*/ 1) iframe_changes.sala = /*sala*/ ctx[0];
			iframe.$set(iframe_changes);
			const trivias_changes = {};
			if (dirty & /*sala*/ 1) trivias_changes.room = /*sala*/ ctx[0].slug;
			trivias.$set(trivias_changes);
			const encuestas_changes = {};
			if (dirty & /*sala*/ 1) encuestas_changes.room = /*sala*/ ctx[0].slug;
			encuestas.$set(encuestas_changes);
			const input0_changes = {};
			if (dirty & /*sala*/ 1) input0_changes.room = /*sala*/ ctx[0].slug;
			input0.$set(input0_changes);
			const messages_changes = {};
			if (dirty & /*sala*/ 1) messages_changes.room = /*sala*/ ctx[0].slug;
			messages.$set(messages_changes);
			const input1_changes = {};
			if (dirty & /*sala*/ 1) input1_changes.room = /*sala*/ ctx[0].slug;
			input1.$set(input1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(agenda.$$.fragment, local);
			transition_in(roomchange.$$.fragment, local);
			transition_in(iframe.$$.fragment, local);
			transition_in(trivias.$$.fragment, local);
			transition_in(encuestas.$$.fragment, local);
			transition_in(input0.$$.fragment, local);
			transition_in(messages.$$.fragment, local);
			transition_in(input1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(agenda.$$.fragment, local);
			transition_out(roomchange.$$.fragment, local);
			transition_out(iframe.$$.fragment, local);
			transition_out(trivias.$$.fragment, local);
			transition_out(encuestas.$$.fragment, local);
			transition_out(input0.$$.fragment, local);
			transition_out(messages.$$.fragment, local);
			transition_out(input1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(section);
			destroy_component(agenda);
			destroy_component(roomchange);
			destroy_component(iframe);
			destroy_component(trivias);
			destroy_component(encuestas);
			destroy_component(input0);
			destroy_component(messages);
			destroy_component(input1);
			mounted = false;
			dispose();
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

async function preload({ params, query }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`salas/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { sala: data };
	} else {
		this.error(res.status, data.message);
	}
}

function instance($$self, $$props, $$invalidate) {
	let { sala } = $$props;

	const abrirAgenda = () => {
		document.querySelector("#agenda-interactiva").classList.toggle("is-active");
	};

	const writable_props = ["sala"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<U5Bslugu5D> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("U5Bslugu5D", $$slots, []);

	$$self.$set = $$props => {
		if ("sala" in $$props) $$invalidate(0, sala = $$props.sala);
	};

	$$self.$capture_state = () => ({
		Input,
		Messages,
		Agenda,
		Iframe,
		Encuestas,
		Trivias,
		RoomChange,
		preload,
		sala,
		abrirAgenda
	});

	$$self.$inject_state = $$props => {
		if ("sala" in $$props) $$invalidate(0, sala = $$props.sala);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [sala, abrirAgenda];
}

class U5Bslugu5D extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { sala: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "U5Bslugu5D",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*sala*/ ctx[0] === undefined && !("sala" in props)) {
			console.warn("<U5Bslugu5D> was created without expected prop 'sala'");
		}
	}

	get sala() {
		throw new Error("<U5Bslugu5D>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sala(value) {
		throw new Error("<U5Bslugu5D>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export default U5Bslugu5D;
export { preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3NsdWddLjdhZmRjMmNlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3NhbGFzL1tzbHVnXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG4gICAgaW1wb3J0IElucHV0IGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0lucHV0LnN2ZWx0ZVwiXG4gICAgaW1wb3J0IE1lc3NhZ2VzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL01lc3NhZ2VzLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IEFnZW5kYSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9BZ2VuZGEuc3ZlbHRlXCJcbiAgICBpbXBvcnQgSWZyYW1lIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0lmcmFtZS5zdmVsdGVcIlxuICAgIFxuICAgIGltcG9ydCBFbmN1ZXN0YXMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRW5jdWVzdGFzLnN2ZWx0ZVwiXG4gICAgaW1wb3J0IFRyaXZpYXMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvVHJpdmlhcy5zdmVsdGVcIlxuICAgIGltcG9ydCBSb29tQ2hhbmdlIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL1Jvb21DaGFuZ2Uuc3ZlbHRlXCJcblxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBxdWVyeVxuICAgIH0pIHtcbiAgICAgICAgLy8gdGhlIGBzbHVnYCBwYXJhbWV0ZXIgaXMgYXZhaWxhYmxlIGJlY2F1c2VcbiAgICAgICAgLy8gdGhpcyBmaWxlIGlzIGNhbGxlZCBbc2x1Z10uc3ZlbHRlXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYHNhbGFzLyR7cGFyYW1zLnNsdWd9Lmpzb25gKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG5cbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzYWxhOiBkYXRhXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lcnJvcihyZXMuc3RhdHVzLCBkYXRhLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG48c2NyaXB0PlxuICAgIC8qKlxuICAgICAqIElubmVyIHN0dWZmXG4gICAgICovXG5cbiAgICBleHBvcnQgbGV0IHNhbGFcblxuICAgIGNvbnN0IGFicmlyQWdlbmRhID0gKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWdlbmRhLWludGVyYWN0aXZhJykuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJylcbiAgICB9XG48L3NjcmlwdD5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuICAgICRncmFkaWVudDogbGluZWFyLWdyYWRpZW50KDcxZGVnLCByZ2JhKDE2MSwgMCwgMjI0LCAxKSAwJSwgcmdiYSg4MiwgMTEsIDIxNywgMSkgMTAwJSk7XG5cbiAgICAuaGFzLWJhY2tncm91bmQtZ3JhZGllbnQge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkZ3JhZGllbnQgIWltcG9ydGFudDtcbiAgICB9XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG4gICAgPHRpdGxlPntzYWxhLnRpdGxlfSAtIEZJTVBVPC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxzZWN0aW9uIGlkPVwibG9iYnktc2FsYXNcIiBjbGFzcz1cImhlcm8gaXMtZnVsbGhlaWdodCBpcy1yZWxhdGl2ZSBpcy1jbGlwcGVkXCI+XG5cbiAgICA8QWdlbmRhIC8+XG4gICAgPFJvb21DaGFuZ2Ugcm9vbT17c2FsYS5zbHVnfSAgYWRtaW49e2ZhbHNlfS8+XG4gICAgPGRpdiBjbGFzcz1cImhlcm8taGVhZGVyIGhhcy1wYWRkaW5nLTMwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLTVcIj48YSBocmVmPVwiL1wiPjxpbWcgY2xhc3M9XCJsb2dvXCIgc3JjPVwibG9nby1zYWxhcy5zdmdcIiBhbHQ9XCJcIj48L2E+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLTMgaXMtb2Zmc2V0LTRcIj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwibG9iYnlcIiBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLXNtYWxsIGlzLW91dGxpbmVkXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZlYXRoZXI9XCJ1c2VyXCI+PC9pPjwvc3Bhbj48c3Bhbj5QZXJmaWw8L3NwYW4+PC9hPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb246Y2xpY2s9e2FicmlyQWdlbmRhfSBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLXNtYWxsIGlzLW91dGxpbmVkXCI+PHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJcIj48L2k+PC9zcGFuPjxzcGFuPkFnZW5kYTwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwibG9iYnlcIiBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLXNtYWxsIGlzLW91dGxpbmVkXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZlYXRoZXI9XCJ1c2VyXCI+PC9pPjwvc3Bhbj48c3Bhbj5Db25maWd1cmFjacOzbjwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImxvYmJ5XCIgY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeSBpcy1zbWFsbCBpcy1vdXRsaW5lZFwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1mZWF0aGVyPVwidXNlclwiPjwvaT48L3NwYW4+PHNwYW4+QXl1ZGE8L3NwYW4+PC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLThcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBTdHJlYW1saW5lIENlbnRyYWwgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpZnJhbWUtY29udGFpbmVyIGJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElmcmFtZSB7c2FsYX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPFRyaXZpYXMgcm9vbT17c2FsYS5zbHVnfSBhZG1pbj17ZmFsc2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgPEVuY3Vlc3RhcyByb29tPXtzYWxhLnNsdWd9IGFkbWluPXtmYWxzZX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtNFwiPlxuICAgICAgICAgICAgICAgICAgICA8IS0tIENhamEgZGUgUHJlZ3VudGFzIC0tPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicXVlc3Rpb25zIGJveCAgaGFzLWJhY2tncm91bmQtZ3JhZGllbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZSBpcy00IGhhcy10ZXh0LXdoaXRlXCI+UHJlZ3VudGFzIHBhcmEgZWwgUGFuZWzDrXN0YTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBDb21wb25lbnRlIGRlIGVudsOtbyBkZSBldmVudG9zIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0ICByb29tPXtzYWxhLnNsdWd9IGV2ZW50PXsncXVlc3Rpb24nfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBDYWphIGRlIENvbWVudGFyaW9zIC0tPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMgY2FyZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VzIHJvb209e3NhbGEuc2x1Z30gZXZlbnQ9eydtZXNzYWdlLWFwcHJvdmVkJ30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlciBoYXMtYmFja2dyb3VuZC1ncmFkaWVudCBoYXMtcGFkZGluZy0yMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQ29tcG9uZW50ZSBkZSBlbnbDrW8gZGUgZXZlbnRvcyAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SW5wdXQgcm9vbT17c2FsYS5zbHVnfSBldmVudD17J21lc3NhZ2UnfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJoZXJvLWZvb3RlclwiPlxuICAgICAgICA8aW1nIGNsYXNzPVwiZGVjb3JhdGlvblwiIHNyYz1cImRlY29yYXRpb24uc3ZnXCIgYWx0PVwiXCI+XG4gICAgPC9kaXY+XG48L3NlY3Rpb24+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lEQTRDWSxHQUFJLElBQUMsS0FBSzs7OzsyQkFNQSxHQUFJLElBQUMsSUFBSSxTQUFVLEtBQUs7Ozs7Ozs7Ozs7MkJBd0JYLEdBQUksSUFBQyxJQUFJLFNBQVMsS0FBSzs7Ozs7MkJBQ3JCLEdBQUksSUFBQyxJQUFJLFNBQVMsS0FBSzs7Ozs7O21CQU90QixHQUFJLElBQUMsSUFBSTtXQUFTLFVBQVU7Ozs7Ozs7bUJBSTFCLEdBQUksSUFBQyxJQUFJO1dBQVMsa0JBQWtCOzs7Ozs7O21CQUduQyxHQUFJLElBQUMsSUFBSTtXQUFTLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswREFoQ2xDLEdBQVc7Ozs7O3lGQWJqQyxHQUFJLElBQUMsS0FBSzs7Ozs7OERBTUEsR0FBSSxJQUFDLElBQUk7Ozs7OzsyREF3QkksR0FBSSxJQUFDLElBQUk7Ozs2REFDUCxHQUFJLElBQUMsSUFBSTs7OzBEQU9SLEdBQUksSUFBQyxJQUFJOzs7NERBSVAsR0FBSSxJQUFDLElBQUk7OzswREFHUixHQUFJLElBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUEvRXhCLE9BQU8sR0FDekIsTUFBTSxFQUNOLEtBQUs7OztPQUlDLEdBQUcsU0FBUyxJQUFJLENBQUMsS0FBSyxVQUFVLE1BQU0sQ0FBQyxJQUFJOztPQUMzQyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUk7O0tBRXZCLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRztXQUVkLElBQUksRUFBRSxJQUFJOztFQUdkLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTzs7Ozs7T0FTaEMsSUFBSTs7T0FFVCxXQUFXO0VBQ2IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
