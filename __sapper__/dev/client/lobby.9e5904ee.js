import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, b as space, e as element, t as text, C as create_component, q as query_selector_all, f as detach_dev, h as claim_space, j as claim_element, k as children, l as claim_text, D as claim_component, m as attr_dev, o as add_location, n as set_style, p as insert_dev, r as append_dev, E as mount_component, w as listen_dev, x as noop, F as transition_in, G as transition_out, H as destroy_component, a as globals } from './client.dc7f12dd.js';
import { A as Agenda } from './Agenda.61ec03c6.js';

/* src\routes\lobby.svelte generated by Svelte v3.23.0 */

const { document: document_1 } = globals;
const file = "src\\routes\\lobby.svelte";

function create_fragment(ctx) {
	let t0;
	let div7;
	let div6;
	let div1;
	let img0;
	let img0_src_value;
	let t1;
	let div0;
	let iframe;
	let iframe_src_value;
	let t2;
	let div2;
	let img1;
	let img1_src_value;
	let t3;
	let div4;
	let img2;
	let img2_src_value;
	let t4;
	let div3;
	let h3;
	let t5;
	let t6;
	let button;
	let span0;
	let i0;
	let span1;
	let t7;
	let t8;
	let a0;
	let span2;
	let i1;
	let span3;
	let t9;
	let t10;
	let a1;
	let span4;
	let i2;
	let span5;
	let t11;
	let t12;
	let a2;
	let span6;
	let i3;
	let span7;
	let t13;
	let t14;
	let a3;
	let span8;
	let i4;
	let span9;
	let t15;
	let t16;
	let div5;
	let a4;
	let span10;
	let i5;
	let span11;
	let t17;
	let t18;
	let a5;
	let span12;
	let i6;
	let span13;
	let t19;
	let t20;
	let a6;
	let span14;
	let i7;
	let span15;
	let t21;
	let t22;
	let a7;
	let span16;
	let i8;
	let span17;
	let t23;
	let t24;
	let current;
	let mounted;
	let dispose;
	const agenda = new Agenda({ $$inline: true });

	const block = {
		c: function create() {
			t0 = space();
			div7 = element("div");
			div6 = element("div");
			div1 = element("div");
			img0 = element("img");
			t1 = space();
			div0 = element("div");
			iframe = element("iframe");
			t2 = space();
			div2 = element("div");
			img1 = element("img");
			t3 = space();
			div4 = element("div");
			img2 = element("img");
			t4 = space();
			div3 = element("div");
			h3 = element("h3");
			t5 = text("Bienvenidos");
			t6 = space();
			button = element("button");
			span0 = element("span");
			i0 = element("i");
			span1 = element("span");
			t7 = text("Agenda");
			t8 = space();
			a0 = element("a");
			span2 = element("span");
			i1 = element("i");
			span3 = element("span");
			t9 = text("Auditorio Principal");
			t10 = space();
			a1 = element("a");
			span4 = element("span");
			i2 = element("i");
			span5 = element("span");
			t11 = text("Memorias 2019");
			t12 = space();
			a2 = element("a");
			span6 = element("span");
			i3 = element("i");
			span7 = element("span");
			t13 = text("Memorias 2020");
			t14 = space();
			a3 = element("a");
			span8 = element("span");
			i4 = element("i");
			span9 = element("span");
			t15 = text("Salón de Medios Públicos");
			t16 = space();
			div5 = element("div");
			a4 = element("a");
			span10 = element("span");
			i5 = element("i");
			span11 = element("span");
			t17 = text("Salón de Medios Públicos");
			t18 = space();
			a5 = element("a");
			span12 = element("span");
			i6 = element("i");
			span13 = element("span");
			t19 = text("Auditorio Principal");
			t20 = space();
			a6 = element("a");
			span14 = element("span");
			i7 = element("i");
			span15 = element("span");
			t21 = text("Sala 1");
			t22 = space();
			a7 = element("a");
			span16 = element("span");
			i8 = element("i");
			span17 = element("span");
			t23 = text("Sala 2");
			t24 = space();
			create_component(agenda.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-5y5973\"]", document_1.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div7 = claim_element(nodes, "DIV", { id: true, style: true, class: true });
			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			div1 = claim_element(div6_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			img0 = claim_element(div1_nodes, "IMG", { src: true, alt: true, class: true });
			t1 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);

			iframe = claim_element(div0_nodes, "IFRAME", {
				title: true,
				width: true,
				height: true,
				src: true,
				frameborder: true,
				allow: true,
				allowfullscreen: true,
				class: true
			});

			children(iframe).forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t2 = claim_space(div6_nodes);
			div2 = claim_element(div6_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			img1 = claim_element(div2_nodes, "IMG", { src: true, alt: true });
			div2_nodes.forEach(detach_dev);
			t3 = claim_space(div6_nodes);
			div4 = claim_element(div6_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			img2 = claim_element(div4_nodes, "IMG", { src: true, alt: true, class: true });
			t4 = claim_space(div4_nodes);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			h3 = claim_element(div3_nodes, "H3", { class: true });
			var h3_nodes = children(h3);
			t5 = claim_text(h3_nodes, "Bienvenidos");
			h3_nodes.forEach(detach_dev);
			t6 = claim_space(div3_nodes);
			button = claim_element(div3_nodes, "BUTTON", { class: true });
			var button_nodes = children(button);
			span0 = claim_element(button_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			i0 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			span1 = claim_element(button_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t7 = claim_text(span1_nodes, "Agenda");
			span1_nodes.forEach(detach_dev);
			button_nodes.forEach(detach_dev);
			t8 = claim_space(div3_nodes);
			a0 = claim_element(div3_nodes, "A", { href: true, class: true });
			var a0_nodes = children(a0);
			span2 = claim_element(a0_nodes, "SPAN", { class: true });
			var span2_nodes = children(span2);
			i1 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			span3 = claim_element(a0_nodes, "SPAN", {});
			var span3_nodes = children(span3);
			t9 = claim_text(span3_nodes, "Auditorio Principal");
			span3_nodes.forEach(detach_dev);
			a0_nodes.forEach(detach_dev);
			t10 = claim_space(div3_nodes);
			a1 = claim_element(div3_nodes, "A", { href: true, class: true });
			var a1_nodes = children(a1);
			span4 = claim_element(a1_nodes, "SPAN", { class: true });
			var span4_nodes = children(span4);
			i2 = claim_element(span4_nodes, "I", { "data-feather": true });
			children(i2).forEach(detach_dev);
			span4_nodes.forEach(detach_dev);
			span5 = claim_element(a1_nodes, "SPAN", {});
			var span5_nodes = children(span5);
			t11 = claim_text(span5_nodes, "Memorias 2019");
			span5_nodes.forEach(detach_dev);
			a1_nodes.forEach(detach_dev);
			t12 = claim_space(div3_nodes);
			a2 = claim_element(div3_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			span6 = claim_element(a2_nodes, "SPAN", { class: true });
			var span6_nodes = children(span6);
			i3 = claim_element(span6_nodes, "I", { "data-feather": true });
			children(i3).forEach(detach_dev);
			span6_nodes.forEach(detach_dev);
			span7 = claim_element(a2_nodes, "SPAN", {});
			var span7_nodes = children(span7);
			t13 = claim_text(span7_nodes, "Memorias 2020");
			span7_nodes.forEach(detach_dev);
			a2_nodes.forEach(detach_dev);
			t14 = claim_space(div3_nodes);
			a3 = claim_element(div3_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			span8 = claim_element(a3_nodes, "SPAN", { class: true });
			var span8_nodes = children(span8);
			i4 = claim_element(span8_nodes, "I", { "data-feather": true });
			children(i4).forEach(detach_dev);
			span8_nodes.forEach(detach_dev);
			span9 = claim_element(a3_nodes, "SPAN", {});
			var span9_nodes = children(span9);
			t15 = claim_text(span9_nodes, "Salón de Medios Públicos");
			span9_nodes.forEach(detach_dev);
			a3_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t16 = claim_space(div6_nodes);
			div5 = claim_element(div6_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			a4 = claim_element(div5_nodes, "A", { href: true, class: true });
			var a4_nodes = children(a4);
			span10 = claim_element(a4_nodes, "SPAN", { class: true });
			var span10_nodes = children(span10);
			i5 = claim_element(span10_nodes, "I", { "data-feather": true });
			children(i5).forEach(detach_dev);
			span10_nodes.forEach(detach_dev);
			span11 = claim_element(a4_nodes, "SPAN", {});
			var span11_nodes = children(span11);
			t17 = claim_text(span11_nodes, "Salón de Medios Públicos");
			span11_nodes.forEach(detach_dev);
			a4_nodes.forEach(detach_dev);
			t18 = claim_space(div5_nodes);
			a5 = claim_element(div5_nodes, "A", { href: true, class: true });
			var a5_nodes = children(a5);
			span12 = claim_element(a5_nodes, "SPAN", { class: true });
			var span12_nodes = children(span12);
			i6 = claim_element(span12_nodes, "I", { "data-feather": true });
			children(i6).forEach(detach_dev);
			span12_nodes.forEach(detach_dev);
			span13 = claim_element(a5_nodes, "SPAN", {});
			var span13_nodes = children(span13);
			t19 = claim_text(span13_nodes, "Auditorio Principal");
			span13_nodes.forEach(detach_dev);
			a5_nodes.forEach(detach_dev);
			t20 = claim_space(div5_nodes);
			a6 = claim_element(div5_nodes, "A", { href: true, class: true });
			var a6_nodes = children(a6);
			span14 = claim_element(a6_nodes, "SPAN", { class: true });
			var span14_nodes = children(span14);
			i7 = claim_element(span14_nodes, "I", { "data-feather": true });
			children(i7).forEach(detach_dev);
			span14_nodes.forEach(detach_dev);
			span15 = claim_element(a6_nodes, "SPAN", {});
			var span15_nodes = children(span15);
			t21 = claim_text(span15_nodes, "Sala 1");
			span15_nodes.forEach(detach_dev);
			a6_nodes.forEach(detach_dev);
			t22 = claim_space(div5_nodes);
			a7 = claim_element(div5_nodes, "A", { href: true, class: true });
			var a7_nodes = children(a7);
			span16 = claim_element(a7_nodes, "SPAN", { class: true });
			var span16_nodes = children(span16);
			i8 = claim_element(span16_nodes, "I", { "data-feather": true });
			children(i8).forEach(detach_dev);
			span16_nodes.forEach(detach_dev);
			span17 = claim_element(a7_nodes, "SPAN", {});
			var span17_nodes = children(span17);
			t23 = claim_text(span17_nodes, "Sala 2");
			span17_nodes.forEach(detach_dev);
			a7_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			div6_nodes.forEach(detach_dev);
			t24 = claim_space(div7_nodes);
			claim_component(agenda.$$.fragment, div7_nodes);
			div7_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document_1.title = "FIMPU 2020";
			if (img0.src !== (img0_src_value = "screen.png")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "");
			attr_dev(img0, "class", "svelte-3ddgui");
			add_location(img0, file, 98, 12, 2472);
			attr_dev(iframe, "title", "streamline");
			attr_dev(iframe, "width", "1280");
			attr_dev(iframe, "height", "720");
			if (iframe.src !== (iframe_src_value = "https://player.vimeo.com/video/481770682")) attr_dev(iframe, "src", iframe_src_value);
			attr_dev(iframe, "frameborder", "0");
			attr_dev(iframe, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			iframe.allowFullscreen = true;
			attr_dev(iframe, "class", "svelte-3ddgui");
			add_location(iframe, file, 100, 16, 2561);
			attr_dev(div0, "class", "screen-content svelte-3ddgui");
			add_location(div0, file, 99, 12, 2515);
			attr_dev(div1, "class", "screen-container hover-glow svelte-3ddgui");
			add_location(div1, file, 97, 2, 2417);
			if (img1.src !== (img1_src_value = "pedestal.png")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "");
			add_location(img1, file, 105, 3, 2898);
			attr_dev(div2, "class", "pedestal-container hover-glow svelte-3ddgui");
			add_location(div2, file, 104, 2, 2850);
			if (img2.src !== (img2_src_value = "menu.png")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "");
			attr_dev(img2, "class", "svelte-3ddgui");
			add_location(img2, file, 109, 12, 3013);
			attr_dev(h3, "class", "title is-3 has-text-primary svelte-3ddgui");
			add_location(h3, file, 111, 16, 3116);
			attr_dev(i0, "data-feather", "calendar");
			add_location(i0, file, 112, 147, 3321);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 112, 119, 3293);
			add_location(span1, file, 112, 185, 3359);
			attr_dev(button, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(button, file, 112, 16, 3190);
			attr_dev(i1, "data-feather", "users");
			add_location(i1, file, 113, 143, 3532);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 113, 115, 3504);
			add_location(span3, file, 113, 178, 3567);
			attr_dev(a0, "href", "/salas/auditorio");
			attr_dev(a0, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a0, file, 113, 16, 3405);
			attr_dev(i2, "data-feather", "users");
			add_location(i2, file, 114, 141, 3746);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 114, 113, 3718);
			add_location(span5, file, 114, 176, 3781);
			attr_dev(a1, "href", "/memorias/2019");
			attr_dev(a1, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a1, file, 114, 16, 3621);
			attr_dev(i3, "data-feather", "users");
			add_location(i3, file, 115, 141, 3954);
			attr_dev(span6, "class", "icon is-small");
			add_location(span6, file, 115, 113, 3926);
			add_location(span7, file, 115, 176, 3989);
			attr_dev(a2, "href", "/memorias/2020");
			attr_dev(a2, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a2, file, 115, 16, 3829);
			attr_dev(i4, "data-feather", "share-2");
			add_location(i4, file, 116, 134, 4155);
			attr_dev(span8, "class", "icon is-small");
			add_location(span8, file, 116, 106, 4127);
			add_location(span9, file, 116, 171, 4192);
			attr_dev(a3, "href", "/medios");
			attr_dev(a3, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a3, file, 116, 16, 4037);
			attr_dev(div3, "class", "menu-content has-text-centered svelte-3ddgui");
			add_location(div3, file, 110, 12, 3054);
			attr_dev(div4, "class", "menu-container hover-glow svelte-3ddgui");
			add_location(div4, file, 108, 2, 2960);
			attr_dev(i5, "data-feather", "share-2");
			add_location(i5, file, 120, 168, 4481);
			attr_dev(span10, "class", "icon is-small");
			add_location(span10, file, 120, 140, 4453);
			add_location(span11, file, 120, 205, 4518);
			attr_dev(a4, "href", "/medios");
			attr_dev(a4, "class", "button is-rounded is-small is-primary is-outlined is-uppercase has-text-weight-bold is-control stands svelte-3ddgui");
			add_location(a4, file, 120, 12, 4325);
			attr_dev(i6, "data-feather", "users");
			add_location(i6, file, 121, 181, 4742);
			attr_dev(span12, "class", "icon is-small");
			add_location(span12, file, 121, 153, 4714);
			add_location(span13, file, 121, 216, 4777);
			attr_dev(a5, "href", "/salas/auditorio");
			attr_dev(a5, "class", "button is-rounded is-small is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio1 svelte-3ddgui");
			add_location(a5, file, 121, 12, 4573);
			attr_dev(i7, "data-feather", "users");
			add_location(i7, file, 122, 164, 4979);
			attr_dev(span14, "class", "icon is-small");
			add_location(span14, file, 122, 136, 4951);
			add_location(span15, file, 122, 199, 5014);
			attr_dev(a6, "href", "/salas/1");
			attr_dev(a6, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio2 svelte-3ddgui");
			add_location(a6, file, 122, 12, 4827);
			attr_dev(i8, "data-feather", "users");
			add_location(i8, file, 123, 164, 5203);
			attr_dev(span16, "class", "icon is-small");
			add_location(span16, file, 123, 136, 5175);
			add_location(span17, file, 123, 199, 5238);
			attr_dev(a7, "href", "/salas/2");
			attr_dev(a7, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio3 svelte-3ddgui");
			add_location(a7, file, 123, 12, 5051);
			attr_dev(div5, "class", "controls-container");
			add_location(div5, file, 119, 8, 4279);
			attr_dev(div6, "class", "hero-body");
			add_location(div6, file, 95, 1, 2369);
			attr_dev(div7, "id", "lobby");
			set_style(div7, "background", "url('lobby.jpg')");
			attr_dev(div7, "class", "hero is-fullheight is-relative is-primary is-clipped svelte-3ddgui");
			add_location(div7, file, 94, 0, 2251);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div7, anchor);
			append_dev(div7, div6);
			append_dev(div6, div1);
			append_dev(div1, img0);
			append_dev(div1, t1);
			append_dev(div1, div0);
			append_dev(div0, iframe);
			append_dev(div6, t2);
			append_dev(div6, div2);
			append_dev(div2, img1);
			append_dev(div6, t3);
			append_dev(div6, div4);
			append_dev(div4, img2);
			append_dev(div4, t4);
			append_dev(div4, div3);
			append_dev(div3, h3);
			append_dev(h3, t5);
			append_dev(div3, t6);
			append_dev(div3, button);
			append_dev(button, span0);
			append_dev(span0, i0);
			append_dev(button, span1);
			append_dev(span1, t7);
			append_dev(div3, t8);
			append_dev(div3, a0);
			append_dev(a0, span2);
			append_dev(span2, i1);
			append_dev(a0, span3);
			append_dev(span3, t9);
			append_dev(div3, t10);
			append_dev(div3, a1);
			append_dev(a1, span4);
			append_dev(span4, i2);
			append_dev(a1, span5);
			append_dev(span5, t11);
			append_dev(div3, t12);
			append_dev(div3, a2);
			append_dev(a2, span6);
			append_dev(span6, i3);
			append_dev(a2, span7);
			append_dev(span7, t13);
			append_dev(div3, t14);
			append_dev(div3, a3);
			append_dev(a3, span8);
			append_dev(span8, i4);
			append_dev(a3, span9);
			append_dev(span9, t15);
			append_dev(div6, t16);
			append_dev(div6, div5);
			append_dev(div5, a4);
			append_dev(a4, span10);
			append_dev(span10, i5);
			append_dev(a4, span11);
			append_dev(span11, t17);
			append_dev(div5, t18);
			append_dev(div5, a5);
			append_dev(a5, span12);
			append_dev(span12, i6);
			append_dev(a5, span13);
			append_dev(span13, t19);
			append_dev(div5, t20);
			append_dev(div5, a6);
			append_dev(a6, span14);
			append_dev(span14, i7);
			append_dev(a6, span15);
			append_dev(span15, t21);
			append_dev(div5, t22);
			append_dev(div5, a7);
			append_dev(a7, span16);
			append_dev(span16, i8);
			append_dev(a7, span17);
			append_dev(span17, t23);
			append_dev(div7, t24);
			mount_component(agenda, div7, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*abrirAgenda*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(agenda.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(agenda.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div7);
			destroy_component(agenda);
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

function instance($$self, $$props, $$invalidate) {
	const abrirAgenda = () => {
		document.querySelector("#agenda-interactiva").classList.toggle("is-active");
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Lobby> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Lobby", $$slots, []);
	$$self.$capture_state = () => ({ Agenda, abrirAgenda });
	return [abrirAgenda];
}

class Lobby extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Lobby",
			options,
			id: create_fragment.name
		});
	}
}

export default Lobby;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9iYnkuOWU1OTA0ZWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvbG9iYnkuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG5cclxuXHQjbG9iYnkge1xyXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbSAhaW1wb3J0YW50O1xyXG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXIgIWltcG9ydGFudDtcclxuICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLmhvdmVyLWdsb3d7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogZWFzZS1vdXQgMC40cztcclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMTVweCAjNTMwQkRCKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgJHNjcmVlbi13aWR0aDogNTV2aDsgLy9UaGUgc2NyZWVuIHdpZHRoIGlzIHVzZWQgdG8gY2FsY3VsYXRlIHRoZSBpZnJhbWUgYXNwZWN0IHJhdGlvXHJcblxyXG5cdC5zY3JlZW4tY29udGFpbmVyIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdGxlZnQ6IDE3JTtcclxuXHRcdHRvcDogLTE4dmg7XHJcbiAgICAgICAgd2lkdGg6ICRzY3JlZW4td2lkdGg7XHJcblxyXG4gICAgICAgIGltZyB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAkc2NyZWVuLXdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnNjcmVlbi1jb250ZW50IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICBib3R0b206IDA7XHJcbiAgICAgICAgICAgIHdpZHRoOiAkc2NyZWVuLXdpZHRoO1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICRzY3JlZW4td2lkdGg7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ZmxleDtcclxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiAyLjY1dmg7XHJcbiAgICAgICAgICAgIGlmcmFtZSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MC4yNSUgIWltcG9ydGFudDsgLy9Mb2NraW5nIGFzcGVjdCByYXRpbyBhcyAxNjo5XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDAxMjFmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0Lm1lbnUtY29udGFpbmVyIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdGxlZnQ6IDclO1xyXG5cdFx0Ym90dG9tOiAtNXZoO1xyXG4gICAgICAgIHdpZHRoOiAzMHZoO1xyXG4gICAgICAgIHBlcnNwZWN0aXZlOiAxMDAwcHg7XHJcbiAgICAgICAgcGVyc3BlY3RpdmUtb3JpZ2luOiA1MCUgMzglO1xyXG5cclxuICAgICAgICBpbWcge1xyXG4gICAgICAgICAgICB3aWR0aDogMzB2aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLm1lbnUtY29udGVudCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXHJcbiAgICAgICAgICAgIHRvcDogNTAlO1xyXG4gICAgICAgICAgICBsZWZ0OiA1MCU7XHJcbiAgICAgICAgICAgIG1heC13aWR0aDogMTAwJTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTQzJSwgLTY5JSkgc2NhbGUoMC43KSByb3RhdGUzZCgwLCAxLCAwLCAxOGRlZyk7XHJcblxyXG4gICAgICAgICAgICAuYnV0dG9uIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMS44dmg7XHJcbiAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogdW5zZXQ7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjJ2aDtcclxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMXZoO1xyXG4gICAgICAgICAgICAgICAgLy9mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC50aXRsZSB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDIuNnZoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0LnBlZGVzdGFsLWNvbnRhaW5lciB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRyaWdodDogMTAlO1xyXG5cdFx0Ym90dG9tOiAtNXZoO1xyXG5cdFx0bWF4LXdpZHRoOiAzMHZoO1xyXG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKDQ1JSlcclxuICAgIH1cclxuICAgIC5idXR0b24uaXMtY29udHJvbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG5cclxuICAgICAgICAmLnN0YW5kcyB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDIyJTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01dmgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAmLmF1ZGl0b3JpbzF7XHJcbiAgICAgICAgICAgIHJpZ2h0OiAxMiU7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTB2aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICYuYXVkaXRvcmlvMntcclxuICAgICAgICAgICAgbGVmdDogNTQlO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTV2aCwgLTV2aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICYuYXVkaXRvcmlvM3tcclxuICAgICAgICAgICAgbGVmdDogNDAlO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTV2aCwgMnZoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbjwvc3R5bGU+XHJcblxyXG48c2NyaXB0PlxyXG4gICAgaW1wb3J0IEFnZW5kYSBmcm9tICcuLi9jb21wb25lbnRzL0FnZW5kYS5zdmVsdGUnXHJcbiAgICBcclxuICAgIGNvbnN0IGFicmlyQWdlbmRhID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZ2VuZGEtaW50ZXJhY3RpdmEnKS5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKVxyXG4gICAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdmVsdGU6aGVhZD5cclxuXHQ8dGl0bGU+RklNUFUgMjAyMDwvdGl0bGU+XHJcbjwvc3ZlbHRlOmhlYWQ+XHJcblxyXG5cclxuXHJcbjxkaXYgaWQ9XCJsb2JieVwiIHN0eWxlPVwiYmFja2dyb3VuZDogdXJsKCdsb2JieS5qcGcnKTtcIiBjbGFzcz1cImhlcm8gaXMtZnVsbGhlaWdodCBpcy1yZWxhdGl2ZSBpcy1wcmltYXJ5IGlzLWNsaXBwZWRcIj5cclxuXHQ8ZGl2IGNsYXNzPVwiaGVyby1ib2R5XCI+XHJcblx0XHQ8IS0tIFBhbnRhbGxhIC0tPlxyXG5cdFx0PGRpdiBjbGFzcz1cInNjcmVlbi1jb250YWluZXIgaG92ZXItZ2xvd1wiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cInNjcmVlbi5wbmdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNjcmVlbi1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8aWZyYW1lIHRpdGxlPVwic3RyZWFtbGluZVwiIHdpZHRoPVwiMTI4MFwiIGhlaWdodD1cIjcyMFwiIHNyYz1cImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby80ODE3NzA2ODJcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvdz1cImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmVcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQ8IS0tIEluZm8gLS0+XHJcblx0XHQ8ZGl2IGNsYXNzPVwicGVkZXN0YWwtY29udGFpbmVyIGhvdmVyLWdsb3dcIj5cclxuXHRcdFx0PGltZyBzcmM9XCJwZWRlc3RhbC5wbmdcIiBhbHQ9XCJcIj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PCEtLSBNZW7DuiAtLT5cclxuXHRcdDxkaXYgY2xhc3M9XCJtZW51LWNvbnRhaW5lciBob3Zlci1nbG93XCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwibWVudS5wbmdcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtY29udGVudCBoYXMtdGV4dC1jZW50ZXJlZFwiPlxyXG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwidGl0bGUgaXMtMyBoYXMtdGV4dC1wcmltYXJ5XCI+QmllbnZlbmlkb3M8L2gzPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbjpjbGljaz17YWJyaXJBZ2VuZGF9IGNsYXNzPVwiYnV0dG9uIGhhcy10ZXh0LXdlaWdodC1ib2xkIGlzLXByaW1hcnkgaXMtb3V0bGluZWQgaXMtdXBwZXJjYXNlXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwiY2FsZW5kYXJcIj48L2k+PC9zcGFuPjxzcGFuPkFnZW5kYTwvc3Bhbj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvc2FsYXMvYXVkaXRvcmlvXCIgY2xhc3M9XCJidXR0b24gaGFzLXRleHQtd2VpZ2h0LWJvbGQgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZCBpcy11cHBlcmNhc2VcIj48c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJ1c2Vyc1wiPjwvaT48L3NwYW4+PHNwYW4+QXVkaXRvcmlvIFByaW5jaXBhbDwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL21lbW9yaWFzLzIwMTlcIiBjbGFzcz1cImJ1dHRvbiBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZVwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJzXCI+PC9pPjwvc3Bhbj48c3Bhbj5NZW1vcmlhcyAyMDE5PC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbWVtb3JpYXMvMjAyMFwiIGNsYXNzPVwiYnV0dG9uIGhhcy10ZXh0LXdlaWdodC1ib2xkIGlzLXByaW1hcnkgaXMtb3V0bGluZWQgaXMtdXBwZXJjYXNlXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwidXNlcnNcIj48L2k+PC9zcGFuPjxzcGFuPk1lbW9yaWFzIDIwMjA8L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9tZWRpb3NcIiBjbGFzcz1cImJ1dHRvbiBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZVwiPjxzcGFuIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInNoYXJlLTJcIj48L2k+PC9zcGFuPjxzcGFuPlNhbMOzbiBkZSBNZWRpb3MgUMO6YmxpY29zPC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL21lZGlvc1wiIGNsYXNzPVwiYnV0dG9uIGlzLXJvdW5kZWQgaXMtc21hbGwgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZCBpcy11cHBlcmNhc2UgaGFzLXRleHQtd2VpZ2h0LWJvbGQgaXMtY29udHJvbCBzdGFuZHNcIj48c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJzaGFyZS0yXCI+PC9pPjwvc3Bhbj48c3Bhbj5TYWzDs24gZGUgTWVkaW9zIFDDumJsaWNvczwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIvc2FsYXMvYXVkaXRvcmlvXCIgY2xhc3M9XCJidXR0b24gaXMtcm91bmRlZCBpcy1zbWFsbCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZSBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1jb250cm9sIGF1ZGl0b3JpbzFcIj48c3BhbiBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJ1c2Vyc1wiPjwvaT48L3NwYW4+PHNwYW4+QXVkaXRvcmlvIFByaW5jaXBhbDwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIvc2FsYXMvMVwiIGNsYXNzPVwiYnV0dG9uIGlzLXJvdW5kZWQgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZCBpcy11cHBlcmNhc2UgaGFzLXRleHQtd2VpZ2h0LWJvbGQgaXMtY29udHJvbCBhdWRpdG9yaW8yXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwidXNlcnNcIj48L2k+PC9zcGFuPjxzcGFuPlNhbGEgMTwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIvc2FsYXMvMlwiIGNsYXNzPVwiYnV0dG9uIGlzLXJvdW5kZWQgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZCBpcy11cHBlcmNhc2UgaGFzLXRleHQtd2VpZ2h0LWJvbGQgaXMtY29udHJvbCBhdWRpdG9yaW8zXCI+PHNwYW4gY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwidXNlcnNcIj48L2k+PC9zcGFuPjxzcGFuPlNhbGEgMjwvc3Bhbj48L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxBZ2VuZGEvPlxyXG48L2Rpdj5cclxuXHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MERBZ0hrQyxHQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTdCbkMsV0FBVztFQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
