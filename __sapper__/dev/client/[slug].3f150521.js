import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as globals, b as space, e as element, A as create_component, t as text, q as query_selector_all, c as detach_dev, f as claim_space, h as claim_element, j as children, B as claim_component, k as claim_text, l as attr_dev, n as add_location, o as insert_dev, C as mount_component, p as append_dev, r as listen_dev, I as set_data_dev, D as transition_in, E as transition_out, F as destroy_component } from './client.f5a7b89a.js';
import { R as RoomChange, T as Trivias, E as Encuestas, I as Input, a as Iframe, M as Messages } from './Input.992bff45.js';
import { A as Agenda } from './Agenda.233dd2eb.js';

/* src\routes\admin\salas\[slug].svelte generated by Svelte v3.23.0 */

const { document: document_1 } = globals;
const file = "src\\routes\\admin\\salas\\[slug].svelte";

function create_fragment(ctx) {
	let title_value;
	let t0;
	let section;
	let t1;
	let div3;
	let div2;
	let div0;
	let a0;
	let img0;
	let img0_src_value;
	let t2;
	let div1;
	let a1;
	let span0;
	let i0;
	let span1;
	let t3;
	let t4;
	let button;
	let span2;
	let i1;
	let span3;
	let t5;
	let t6;
	let a2;
	let span4;
	let i2;
	let span5;
	let t7;
	let t8;
	let a3;
	let span6;
	let i3;
	let span7;
	let t9;
	let t10;
	let div18;
	let div17;
	let h2;
	let t11;
	let t12_value = /*sala*/ ctx[0].title + "";
	let t12;
	let t13;
	let div7;
	let div4;
	let t14;
	let div5;
	let t15;
	let div6;
	let t16;
	let div16;
	let div9;
	let div8;
	let t17;
	let t18;
	let div12;
	let div11;
	let t19;
	let div10;
	let t20;
	let div15;
	let div14;
	let t21;
	let div13;
	let t22;
	let div19;
	let img1;
	let img1_src_value;
	let current;
	let mounted;
	let dispose;
	document_1.title = title_value = "" + (/*sala*/ ctx[0].title + " - FIMPU");
	const agenda = new Agenda({ $$inline: true });

	const roomchange = new RoomChange({
			props: { room: /*sala*/ ctx[0].slug, admin: true },
			$$inline: true
		});

	const trivias = new Trivias({
			props: { room: /*sala*/ ctx[0].slug, admin: true },
			$$inline: true
		});

	const encuestas = new Encuestas({
			props: { room: /*sala*/ ctx[0].slug, admin: true },
			$$inline: true
		});

	const input0 = new Input({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "streamline"
			},
			$$inline: true
		});

	const iframe = new Iframe({
			props: { sala: /*sala*/ ctx[0] },
			$$inline: true
		});

	const messages0 = new Messages({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "question"
			},
			$$inline: true
		});

	const input1 = new Input({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "question"
			},
			$$inline: true
		});

	const messages1 = new Messages({
			props: {
				approval: true,
				room: /*sala*/ ctx[0].slug,
				event: "message"
			},
			$$inline: true
		});

	const input2 = new Input({
			props: {
				room: /*sala*/ ctx[0].slug,
				event: "message-approved"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = space();
			section = element("section");
			create_component(agenda.$$.fragment);
			t1 = space();
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			a0 = element("a");
			img0 = element("img");
			t2 = space();
			div1 = element("div");
			a1 = element("a");
			span0 = element("span");
			i0 = element("i");
			span1 = element("span");
			t3 = text("Perfil");
			t4 = space();
			button = element("button");
			span2 = element("span");
			i1 = element("i");
			span3 = element("span");
			t5 = text("Agenda");
			t6 = space();
			a2 = element("a");
			span4 = element("span");
			i2 = element("i");
			span5 = element("span");
			t7 = text("Configuración");
			t8 = space();
			a3 = element("a");
			span6 = element("span");
			i3 = element("i");
			span7 = element("span");
			t9 = text("Ayuda");
			t10 = space();
			div18 = element("div");
			div17 = element("div");
			h2 = element("h2");
			t11 = text("Espacio de Administración para ");
			t12 = text(t12_value);
			t13 = space();
			div7 = element("div");
			div4 = element("div");
			create_component(roomchange.$$.fragment);
			t14 = space();
			div5 = element("div");
			create_component(trivias.$$.fragment);
			t15 = space();
			div6 = element("div");
			create_component(encuestas.$$.fragment);
			t16 = space();
			div16 = element("div");
			div9 = element("div");
			div8 = element("div");
			create_component(input0.$$.fragment);
			t17 = space();
			create_component(iframe.$$.fragment);
			t18 = space();
			div12 = element("div");
			div11 = element("div");
			create_component(messages0.$$.fragment);
			t19 = space();
			div10 = element("div");
			create_component(input1.$$.fragment);
			t20 = space();
			div15 = element("div");
			div14 = element("div");
			create_component(messages1.$$.fragment);
			t21 = space();
			div13 = element("div");
			create_component(input2.$$.fragment);
			t22 = space();
			div19 = element("div");
			img1 = element("img");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1ybwfu0\"]", document_1.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			section = claim_element(nodes, "SECTION", { id: true, class: true });
			var section_nodes = children(section);
			claim_component(agenda.$$.fragment, section_nodes);
			t1 = claim_space(section_nodes);
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
			t2 = claim_space(div2_nodes);
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
			t3 = claim_text(span1_nodes, "Perfil");
			span1_nodes.forEach(detach_dev);
			a1_nodes.forEach(detach_dev);
			t4 = claim_space(div1_nodes);
			button = claim_element(div1_nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			span2 = claim_element(button_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			i1 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			span3 = claim_element(button_nodes, "SPAN", {});
			var span3_nodes = children(span3);
			t5 = claim_text(span3_nodes, "Agenda");
			span3_nodes.forEach(detach_dev);
			button_nodes.forEach(detach_dev);
			t6 = claim_space(div1_nodes);
			a2 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			span4 = claim_element(a2_nodes, "SPAN", { class: true });
			var span4_nodes = children(span4);
			i2 = claim_element(span4_nodes, "I", { "data-feather": true });
			children(i2).forEach(detach_dev);
			span4_nodes.forEach(detach_dev);
			span5 = claim_element(a2_nodes, "SPAN", {});
			var span5_nodes = children(span5);
			t7 = claim_text(span5_nodes, "Configuración");
			span5_nodes.forEach(detach_dev);
			a2_nodes.forEach(detach_dev);
			t8 = claim_space(div1_nodes);
			a3 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			span6 = claim_element(a3_nodes, "SPAN", { class: true });
			var span6_nodes = children(span6);
			i3 = claim_element(span6_nodes, "I", { "data-feather": true });
			children(i3).forEach(detach_dev);
			span6_nodes.forEach(detach_dev);
			span7 = claim_element(a3_nodes, "SPAN", {});
			var span7_nodes = children(span7);
			t9 = claim_text(span7_nodes, "Ayuda");
			span7_nodes.forEach(detach_dev);
			a3_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t10 = claim_space(section_nodes);
			div18 = claim_element(section_nodes, "DIV", { class: true });
			var div18_nodes = children(div18);
			div17 = claim_element(div18_nodes, "DIV", { class: true });
			var div17_nodes = children(div17);
			h2 = claim_element(div17_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t11 = claim_text(h2_nodes, "Espacio de Administración para ");
			t12 = claim_text(h2_nodes, t12_value);
			h2_nodes.forEach(detach_dev);
			t13 = claim_space(div17_nodes);
			div7 = claim_element(div17_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			div4 = claim_element(div7_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			claim_component(roomchange.$$.fragment, div4_nodes);
			div4_nodes.forEach(detach_dev);
			t14 = claim_space(div7_nodes);
			div5 = claim_element(div7_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			claim_component(trivias.$$.fragment, div5_nodes);
			div5_nodes.forEach(detach_dev);
			t15 = claim_space(div7_nodes);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			claim_component(encuestas.$$.fragment, div6_nodes);
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			t16 = claim_space(div17_nodes);
			div16 = claim_element(div17_nodes, "DIV", { class: true });
			var div16_nodes = children(div16);
			div9 = claim_element(div16_nodes, "DIV", { class: true });
			var div9_nodes = children(div9);
			div8 = claim_element(div9_nodes, "DIV", { class: true });
			var div8_nodes = children(div8);
			claim_component(input0.$$.fragment, div8_nodes);
			t17 = claim_space(div8_nodes);
			claim_component(iframe.$$.fragment, div8_nodes);
			div8_nodes.forEach(detach_dev);
			div9_nodes.forEach(detach_dev);
			t18 = claim_space(div16_nodes);
			div12 = claim_element(div16_nodes, "DIV", { class: true });
			var div12_nodes = children(div12);
			div11 = claim_element(div12_nodes, "DIV", { class: true });
			var div11_nodes = children(div11);
			claim_component(messages0.$$.fragment, div11_nodes);
			t19 = claim_space(div11_nodes);
			div10 = claim_element(div11_nodes, "DIV", { class: true });
			var div10_nodes = children(div10);
			claim_component(input1.$$.fragment, div10_nodes);
			div10_nodes.forEach(detach_dev);
			div11_nodes.forEach(detach_dev);
			div12_nodes.forEach(detach_dev);
			t20 = claim_space(div16_nodes);
			div15 = claim_element(div16_nodes, "DIV", { class: true });
			var div15_nodes = children(div15);
			div14 = claim_element(div15_nodes, "DIV", { class: true });
			var div14_nodes = children(div14);
			claim_component(messages1.$$.fragment, div14_nodes);
			t21 = claim_space(div14_nodes);
			div13 = claim_element(div14_nodes, "DIV", { class: true });
			var div13_nodes = children(div13);
			claim_component(input2.$$.fragment, div13_nodes);
			div13_nodes.forEach(detach_dev);
			div14_nodes.forEach(detach_dev);
			div15_nodes.forEach(detach_dev);
			div16_nodes.forEach(detach_dev);
			div17_nodes.forEach(detach_dev);
			div18_nodes.forEach(detach_dev);
			t22 = claim_space(section_nodes);
			div19 = claim_element(section_nodes, "DIV", { class: true });
			var div19_nodes = children(div19);
			img1 = claim_element(div19_nodes, "IMG", { class: true, src: true, alt: true });
			div19_nodes.forEach(detach_dev);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(img0, "class", "logo svelte-1nrqa2l");
			if (img0.src !== (img0_src_value = "logo-salas.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "");
			add_location(img0, file, 55, 49, 1709);
			attr_dev(a0, "href", "/");
			add_location(a0, file, 55, 37, 1697);
			attr_dev(div0, "class", "column is-5");
			add_location(div0, file, 55, 12, 1672);
			attr_dev(i0, "data-feather", "user");
			add_location(i0, file, 57, 107, 1925);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 57, 79, 1897);
			add_location(span1, file, 58, 59, 1988);
			attr_dev(a1, "href", "lobby");
			attr_dev(a1, "class", "button is-primary is-small is-outlined");
			add_location(a1, file, 57, 16, 1834);
			attr_dev(i1, "data-feather", "user");
			add_location(i1, file, 60, 46, 2160);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 59, 94, 2107);
			add_location(span3, file, 60, 80, 2194);
			attr_dev(button, "class", "button is-primary is-small is-outlined");
			add_location(button, file, 59, 16, 2029);
			attr_dev(i2, "data-feather", "user");
			add_location(i2, file, 61, 107, 2331);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 61, 79, 2303);
			add_location(span5, file, 62, 59, 2394);
			attr_dev(a2, "href", "lobby");
			attr_dev(a2, "class", "button is-primary is-small is-outlined");
			add_location(a2, file, 61, 16, 2240);
			attr_dev(i3, "data-feather", "user");
			add_location(i3, file, 63, 107, 2533);
			attr_dev(span6, "class", "icon is-small");
			add_location(span6, file, 63, 79, 2505);
			add_location(span7, file, 64, 59, 2596);
			attr_dev(a3, "href", "lobby");
			attr_dev(a3, "class", "button is-primary is-small is-outlined");
			add_location(a3, file, 63, 16, 2442);
			attr_dev(div1, "class", "column is-3 is-offset-4");
			add_location(div1, file, 56, 12, 1779);
			attr_dev(div2, "class", "columns");
			add_location(div2, file, 54, 8, 1637);
			attr_dev(div3, "class", "hero-header has-padding-30");
			add_location(div3, file, 53, 4, 1587);
			attr_dev(h2, "class", "title is-2");
			add_location(h2, file, 70, 12, 2742);
			attr_dev(div4, "class", "column is-3");
			add_location(div4, file, 72, 16, 2866);
			attr_dev(div5, "class", "column is-3");
			add_location(div5, file, 73, 16, 2958);
			attr_dev(div6, "class", "column is-3");
			add_location(div6, file, 74, 16, 3047);
			attr_dev(div7, "class", "columns");
			add_location(div7, file, 71, 12, 2827);
			attr_dev(div8, "class", "iframe-container box");
			add_location(div8, file, 79, 20, 3289);
			attr_dev(div9, "class", "column is-4");
			add_location(div9, file, 77, 16, 3193);
			attr_dev(div10, "class", "card-footer has-background-gradient has-padding-20 svelte-1nrqa2l");
			add_location(div10, file, 88, 24, 3732);
			attr_dev(div11, "class", "comments card");
			add_location(div11, file, 86, 21, 3605);
			attr_dev(div12, "class", "column is-4");
			add_location(div12, file, 84, 16, 3508);
			attr_dev(div13, "class", "card-footer has-background-gradient has-padding-20 svelte-1nrqa2l");
			add_location(div13, file, 98, 24, 4281);
			attr_dev(div14, "class", "comments card");
			add_location(div14, file, 96, 20, 4139);
			attr_dev(div15, "class", "column is-4");
			add_location(div15, file, 94, 16, 4042);
			attr_dev(div16, "class", "columns");
			add_location(div16, file, 76, 12, 3154);
			attr_dev(div17, "class", "container");
			add_location(div17, file, 69, 8, 2705);
			attr_dev(div18, "class", "hero-body");
			add_location(div18, file, 68, 4, 2672);
			attr_dev(img1, "class", "decoration");
			if (img1.src !== (img1_src_value = "decoration.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "");
			add_location(img1, file, 108, 8, 4670);
			attr_dev(div19, "class", "hero-footer");
			add_location(div19, file, 107, 4, 4635);
			attr_dev(section, "id", "lobby-salas");
			attr_dev(section, "class", "hero is-fullheight is-light is-relative is-clipped");
			add_location(section, file, 49, 0, 1476);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, section, anchor);
			mount_component(agenda, section, null);
			append_dev(section, t1);
			append_dev(section, div3);
			append_dev(div3, div2);
			append_dev(div2, div0);
			append_dev(div0, a0);
			append_dev(a0, img0);
			append_dev(div2, t2);
			append_dev(div2, div1);
			append_dev(div1, a1);
			append_dev(a1, span0);
			append_dev(span0, i0);
			append_dev(a1, span1);
			append_dev(span1, t3);
			append_dev(div1, t4);
			append_dev(div1, button);
			append_dev(button, span2);
			append_dev(span2, i1);
			append_dev(button, span3);
			append_dev(span3, t5);
			append_dev(div1, t6);
			append_dev(div1, a2);
			append_dev(a2, span4);
			append_dev(span4, i2);
			append_dev(a2, span5);
			append_dev(span5, t7);
			append_dev(div1, t8);
			append_dev(div1, a3);
			append_dev(a3, span6);
			append_dev(span6, i3);
			append_dev(a3, span7);
			append_dev(span7, t9);
			append_dev(section, t10);
			append_dev(section, div18);
			append_dev(div18, div17);
			append_dev(div17, h2);
			append_dev(h2, t11);
			append_dev(h2, t12);
			append_dev(div17, t13);
			append_dev(div17, div7);
			append_dev(div7, div4);
			mount_component(roomchange, div4, null);
			append_dev(div7, t14);
			append_dev(div7, div5);
			mount_component(trivias, div5, null);
			append_dev(div7, t15);
			append_dev(div7, div6);
			mount_component(encuestas, div6, null);
			append_dev(div17, t16);
			append_dev(div17, div16);
			append_dev(div16, div9);
			append_dev(div9, div8);
			mount_component(input0, div8, null);
			append_dev(div8, t17);
			mount_component(iframe, div8, null);
			append_dev(div16, t18);
			append_dev(div16, div12);
			append_dev(div12, div11);
			mount_component(messages0, div11, null);
			append_dev(div11, t19);
			append_dev(div11, div10);
			mount_component(input1, div10, null);
			append_dev(div16, t20);
			append_dev(div16, div15);
			append_dev(div15, div14);
			mount_component(messages1, div14, null);
			append_dev(div14, t21);
			append_dev(div14, div13);
			mount_component(input2, div13, null);
			append_dev(section, t22);
			append_dev(section, div19);
			append_dev(div19, img1);
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

			if ((!current || dirty & /*sala*/ 1) && t12_value !== (t12_value = /*sala*/ ctx[0].title + "")) set_data_dev(t12, t12_value);
			const roomchange_changes = {};
			if (dirty & /*sala*/ 1) roomchange_changes.room = /*sala*/ ctx[0].slug;
			roomchange.$set(roomchange_changes);
			const trivias_changes = {};
			if (dirty & /*sala*/ 1) trivias_changes.room = /*sala*/ ctx[0].slug;
			trivias.$set(trivias_changes);
			const encuestas_changes = {};
			if (dirty & /*sala*/ 1) encuestas_changes.room = /*sala*/ ctx[0].slug;
			encuestas.$set(encuestas_changes);
			const input0_changes = {};
			if (dirty & /*sala*/ 1) input0_changes.room = /*sala*/ ctx[0].slug;
			input0.$set(input0_changes);
			const iframe_changes = {};
			if (dirty & /*sala*/ 1) iframe_changes.sala = /*sala*/ ctx[0];
			iframe.$set(iframe_changes);
			const messages0_changes = {};
			if (dirty & /*sala*/ 1) messages0_changes.room = /*sala*/ ctx[0].slug;
			messages0.$set(messages0_changes);
			const input1_changes = {};
			if (dirty & /*sala*/ 1) input1_changes.room = /*sala*/ ctx[0].slug;
			input1.$set(input1_changes);
			const messages1_changes = {};
			if (dirty & /*sala*/ 1) messages1_changes.room = /*sala*/ ctx[0].slug;
			messages1.$set(messages1_changes);
			const input2_changes = {};
			if (dirty & /*sala*/ 1) input2_changes.room = /*sala*/ ctx[0].slug;
			input2.$set(input2_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(agenda.$$.fragment, local);
			transition_in(roomchange.$$.fragment, local);
			transition_in(trivias.$$.fragment, local);
			transition_in(encuestas.$$.fragment, local);
			transition_in(input0.$$.fragment, local);
			transition_in(iframe.$$.fragment, local);
			transition_in(messages0.$$.fragment, local);
			transition_in(input1.$$.fragment, local);
			transition_in(messages1.$$.fragment, local);
			transition_in(input2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(agenda.$$.fragment, local);
			transition_out(roomchange.$$.fragment, local);
			transition_out(trivias.$$.fragment, local);
			transition_out(encuestas.$$.fragment, local);
			transition_out(input0.$$.fragment, local);
			transition_out(iframe.$$.fragment, local);
			transition_out(messages0.$$.fragment, local);
			transition_out(input1.$$.fragment, local);
			transition_out(messages1.$$.fragment, local);
			transition_out(input2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(section);
			destroy_component(agenda);
			destroy_component(roomchange);
			destroy_component(trivias);
			destroy_component(encuestas);
			destroy_component(input0);
			destroy_component(iframe);
			destroy_component(messages0);
			destroy_component(input1);
			destroy_component(messages1);
			destroy_component(input2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiW3NsdWddLjNmMTUwNTIxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2FkbWluL3NhbGFzL1tzbHVnXS5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XHJcbiAgICBpbXBvcnQgSW5wdXQgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvSW5wdXQuc3ZlbHRlXCJcclxuICAgIGltcG9ydCBNZXNzYWdlcyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9NZXNzYWdlcy5zdmVsdGVcIlxyXG4gICAgaW1wb3J0IEFnZW5kYSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9BZ2VuZGEuc3ZlbHRlXCJcclxuICAgIGltcG9ydCBJZnJhbWUgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvSWZyYW1lLnN2ZWx0ZVwiXHJcbiAgICBpbXBvcnQgRW5jdWVzdGFzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL0VuY3Vlc3Rhcy5zdmVsdGVcIlxyXG4gICAgaW1wb3J0IFRyaXZpYXMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvVHJpdmlhcy5zdmVsdGVcIlxyXG4gICAgaW1wb3J0IFJvb21DaGFuZ2UgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvUm9vbUNoYW5nZS5zdmVsdGVcIlxyXG5cclxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHtcclxuICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgcXVlcnlcclxuICAgIH0pIHtcclxuICAgICAgICAvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxyXG4gICAgICAgIC8vIHRoaXMgZmlsZSBpcyBjYWxsZWQgW3NsdWddLnN2ZWx0ZVxyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYHNhbGFzLyR7cGFyYW1zLnNsdWd9Lmpzb25gKTtcclxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuXHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc2FsYTogZGF0YVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IocmVzLnN0YXR1cywgZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG48c2NyaXB0PlxyXG4gICAgLyoqXHJcbiAgICAgKiBJbm5lciBzdHVmZlxyXG4gICAgICovXHJcblxyXG4gICAgZXhwb3J0IGxldCBzYWxhXHJcblxyXG4gICAgY29uc3QgYWJyaXJBZ2VuZGEgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FnZW5kYS1pbnRlcmFjdGl2YScpLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXHJcbiAgICB9XHJcbjwvc2NyaXB0PlxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuICAgICRncmFkaWVudDogbGluZWFyLWdyYWRpZW50KDcxZGVnLCByZ2JhKDE2MSwgMCwgMjI0LCAxKSAwJSwgcmdiYSg4MiwgMTEsIDIxNywgMSkgMTAwJSk7XHJcblxyXG4gICAgLmhhcy1iYWNrZ3JvdW5kLWdyYWRpZW50IHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAkZ3JhZGllbnQgIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgICAubG9nbyB7XHJcbiAgICAgICAgbWl4LWJsZW5kLW1vZGU6IG11bHRpcGx5O1xyXG4gICAgfVxyXG48L3N0eWxlPlxyXG5cclxuPHN2ZWx0ZTpoZWFkPlxyXG4gICAgPHRpdGxlPntzYWxhLnRpdGxlfSAtIEZJTVBVPC90aXRsZT5cclxuPC9zdmVsdGU6aGVhZD5cclxuXHJcbjxzZWN0aW9uIGlkPVwibG9iYnktc2FsYXNcIiBjbGFzcz1cImhlcm8gaXMtZnVsbGhlaWdodCBpcy1saWdodCBpcy1yZWxhdGl2ZSBpcy1jbGlwcGVkXCI+XHJcblxyXG4gICAgPEFnZW5kYSAvPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJoZXJvLWhlYWRlciBoYXMtcGFkZGluZy0zMFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW5zXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gaXMtNVwiPjxhIGhyZWY9XCIvXCI+PGltZyBjbGFzcz1cImxvZ29cIiBzcmM9XCJsb2dvLXNhbGFzLnN2Z1wiIGFsdD1cIlwiPjwvYT48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy0zIGlzLW9mZnNldC00XCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwibG9iYnlcIiBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLXNtYWxsIGlzLW91dGxpbmVkXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZmVhdGhlcj1cInVzZXJcIj48L2k+PC9zcGFuPjxzcGFuPlBlcmZpbDwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXthYnJpckFnZW5kYX0gY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeSBpcy1zbWFsbCBpcy1vdXRsaW5lZFwiPjxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJcIj48L2k+PC9zcGFuPjxzcGFuPkFnZW5kYTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJsb2JieVwiIGNsYXNzPVwiYnV0dG9uIGlzLXByaW1hcnkgaXMtc21hbGwgaXMtb3V0bGluZWRcIj48c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1mZWF0aGVyPVwidXNlclwiPjwvaT48L3NwYW4+PHNwYW4+Q29uZmlndXJhY2nDs248L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cImxvYmJ5XCIgY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeSBpcy1zbWFsbCBpcy1vdXRsaW5lZFwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWZlYXRoZXI9XCJ1c2VyXCI+PC9pPjwvc3Bhbj48c3Bhbj5BeXVkYTwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVyby1ib2R5XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8aDIgY2xhc3M9XCJ0aXRsZSBpcy0yXCI+RXNwYWNpbyBkZSBBZG1pbmlzdHJhY2nDs24gcGFyYSB7c2FsYS50aXRsZX08L2gyPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy0zXCI+PFJvb21DaGFuZ2Ugcm9vbT17c2FsYS5zbHVnfSBhZG1pbj17dHJ1ZX0vPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy0zXCI+PFRyaXZpYXMgcm9vbT17c2FsYS5zbHVnfSBhZG1pbj17dHJ1ZX0vPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy0zXCI+PEVuY3Vlc3RhcyByb29tPXtzYWxhLnNsdWd9IGFkbWluPXt0cnVlfS8+PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBTdHJlYW1saW5lIENlbnRyYWwgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlmcmFtZS1jb250YWluZXIgYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCByb29tPXtzYWxhLnNsdWd9IGV2ZW50PXsnc3RyZWFtbGluZSd9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJZnJhbWUge3NhbGF9Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDwhLS0gQ2FqYSBkZSBQcmVndW50YXMgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cyBjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlcyByb29tPXtzYWxhLnNsdWd9IGV2ZW50PXsncXVlc3Rpb24nfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXIgaGFzLWJhY2tncm91bmQtZ3JhZGllbnQgaGFzLXBhZGRpbmctMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQ29tcG9uZW50ZSBkZSBlbnbDrW8gZGUgZXZlbnRvcyAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCByb29tPXtzYWxhLnNsdWd9IGV2ZW50PXsncXVlc3Rpb24nfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtbiBpcy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBDYWphIGRlIENvbWVudGFyaW9zIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cyBjYXJkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlcyBhcHByb3ZhbD17dHJ1ZX0gcm9vbT17c2FsYS5zbHVnfSBldmVudD17J21lc3NhZ2UnfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1mb290ZXIgaGFzLWJhY2tncm91bmQtZ3JhZGllbnQgaGFzLXBhZGRpbmctMjBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gQ29tcG9uZW50ZSBkZSBlbnbDrW8gZGUgZXZlbnRvcyAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dCByb29tPXtzYWxhLnNsdWd9IGV2ZW50PXsnbWVzc2FnZS1hcHByb3ZlZCd9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVyby1mb290ZXJcIj5cclxuICAgICAgICA8aW1nIGNsYXNzPVwiZGVjb3JhdGlvblwiIHNyYz1cImRlY29yYXRpb24uc3ZnXCIgYWx0PVwiXCI+XHJcbiAgICA8L2Rpdj5cclxuPC9zZWN0aW9uPiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFzRW1FLEdBQUksSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lEQXhCakUsR0FBSSxJQUFDLEtBQUs7Ozs7MkJBMEJxQyxHQUFJLElBQUMsSUFBSSxTQUFTLElBQUk7Ozs7OzJCQUN6QixHQUFJLElBQUMsSUFBSSxTQUFTLElBQUk7Ozs7OzJCQUNwQixHQUFJLElBQUMsSUFBSSxTQUFTLElBQUk7Ozs7OzttQkFNM0MsR0FBSSxJQUFDLElBQUk7V0FBUyxZQUFZOzs7Ozs7Ozs7Ozs7bUJBTzNCLEdBQUksSUFBQyxJQUFJO1dBQVMsVUFBVTs7Ozs7OzttQkFHM0IsR0FBSSxJQUFDLElBQUk7V0FBUyxVQUFVOzs7Ozs7O2NBT3pCLElBQUk7bUJBQVEsR0FBSSxJQUFDLElBQUk7V0FBUyxTQUFTOzs7Ozs7O21CQUcxQyxHQUFJLElBQUMsSUFBSTtXQUFTLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBEQXpDM0MsR0FBVzs7Ozs7eUZBYmpDLEdBQUksSUFBQyxLQUFLOzs7OytFQXdCNkMsR0FBSSxJQUFDLEtBQUs7OzhEQUVsQixHQUFJLElBQUMsSUFBSTs7OzJEQUNaLEdBQUksSUFBQyxJQUFJOzs7NkRBQ1AsR0FBSSxJQUFDLElBQUk7OzswREFNOUIsR0FBSSxJQUFDLElBQUk7Ozs7Ozs2REFPTixHQUFJLElBQUMsSUFBSTs7OzBEQUdSLEdBQUksSUFBQyxJQUFJOzs7NkRBT00sR0FBSSxJQUFDLElBQUk7OzswREFHeEIsR0FBSSxJQUFDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBM0Z4QixPQUFPLEdBQ3pCLE1BQU0sRUFDTixLQUFLOzs7T0FJQyxHQUFHLFNBQVMsSUFBSSxDQUFDLEtBQUssVUFBVSxNQUFNLENBQUMsSUFBSTs7T0FDM0MsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJOztLQUV2QixHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUc7V0FFZCxJQUFJLEVBQUUsSUFBSTs7RUFHZCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87Ozs7O09BU2hDLElBQUk7O09BRVQsV0FBVztFQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
