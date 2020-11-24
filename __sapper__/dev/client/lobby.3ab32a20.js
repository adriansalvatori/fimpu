import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, x as onMount, v as validate_slots, b as space, e as element, t as text, A as create_component, q as query_selector_all, c as detach_dev, f as claim_space, h as claim_element, j as children, k as claim_text, B as claim_component, l as attr_dev, n as add_location, m as set_style, o as insert_dev, p as append_dev, C as mount_component, r as listen_dev, u as noop, D as transition_in, E as transition_out, F as destroy_component, z as run_all, a as globals } from './client.dea07c1c.js';
import { A as Agenda, P as Player } from './Agenda.e9b7ab76.js';

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
	let iframe0;
	let iframe0_src_value;
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
	let button0;
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
	let t25;
	let div10;
	let div8;
	let t26;
	let div9;
	let iframe1;
	let iframe1_src_value;
	let t27;
	let button1;
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
			iframe0 = element("iframe");
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
			button0 = element("button");
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
			t15 = text("Salón de Medios\r\n                        Públicos");
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
			t25 = space();
			div10 = element("div");
			div8 = element("div");
			t26 = space();
			div9 = element("div");
			iframe1 = element("iframe");
			t27 = space();
			button1 = element("button");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-14nkrbk\"]", document_1.head);
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

			iframe0 = claim_element(div0_nodes, "IFRAME", {
				id: true,
				title: true,
				width: true,
				height: true,
				src: true,
				frameborder: true,
				allow: true,
				allowfullscreen: true,
				class: true
			});

			children(iframe0).forEach(detach_dev);
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
			button0 = claim_element(div3_nodes, "BUTTON", { class: true });
			var button0_nodes = children(button0);
			span0 = claim_element(button0_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			i0 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			span1 = claim_element(button0_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t7 = claim_text(span1_nodes, "Agenda");
			span1_nodes.forEach(detach_dev);
			button0_nodes.forEach(detach_dev);
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
			t15 = claim_text(span9_nodes, "Salón de Medios\r\n                        Públicos");
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
			t25 = claim_space(nodes);
			div10 = claim_element(nodes, "DIV", { id: true, class: true });
			var div10_nodes = children(div10);
			div8 = claim_element(div10_nodes, "DIV", { class: true });
			children(div8).forEach(detach_dev);
			t26 = claim_space(div10_nodes);
			div9 = claim_element(div10_nodes, "DIV", { class: true });
			var div9_nodes = children(div9);

			iframe1 = claim_element(div9_nodes, "IFRAME", {
				title: true,
				style: true,
				src: true,
				frameborder: true,
				allow: true,
				allowfullscreen: true
			});

			children(iframe1).forEach(detach_dev);
			div9_nodes.forEach(detach_dev);
			t27 = claim_space(div10_nodes);
			button1 = claim_element(div10_nodes, "BUTTON", { class: true, "aria-label": true });
			children(button1).forEach(detach_dev);
			div10_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document_1.title = "FIMPU 2020";
			if (img0.src !== (img0_src_value = "screen.png")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "alt", "");
			attr_dev(img0, "class", "svelte-3ddgui");
			add_location(img0, file, 115, 12, 2921);
			attr_dev(iframe0, "id", "lobby-loop");
			attr_dev(iframe0, "title", "streamline");
			attr_dev(iframe0, "width", "1280");
			attr_dev(iframe0, "height", "720");
			if (iframe0.src !== (iframe0_src_value = "https://player.vimeo.com/video/482797612")) attr_dev(iframe0, "src", iframe0_src_value);
			attr_dev(iframe0, "frameborder", "0");
			attr_dev(iframe0, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			iframe0.allowFullscreen = true;
			attr_dev(iframe0, "class", "svelte-3ddgui");
			add_location(iframe0, file, 117, 16, 3010);
			attr_dev(div0, "class", "screen-content svelte-3ddgui");
			add_location(div0, file, 116, 12, 2964);
			attr_dev(div1, "class", "screen-container hover-glow svelte-3ddgui");
			add_location(div1, file, 114, 8, 2866);
			if (img1.src !== (img1_src_value = "pedestal.png")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "alt", "");
			add_location(img1, file, 125, 12, 3454);
			attr_dev(div2, "class", "pedestal-container hover-glow svelte-3ddgui");
			add_location(div2, file, 124, 8, 3397);
			if (img2.src !== (img2_src_value = "menu.png")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "alt", "");
			attr_dev(img2, "class", "svelte-3ddgui");
			add_location(img2, file, 129, 12, 3587);
			attr_dev(h3, "class", "title is-3 has-text-primary svelte-3ddgui");
			add_location(h3, file, 131, 16, 3690);
			attr_dev(i0, "data-feather", "calendar");
			add_location(i0, file, 134, 46, 3941);
			attr_dev(span0, "class", "icon is-small");
			add_location(span0, file, 133, 92, 3888);
			add_location(span1, file, 134, 84, 3979);
			attr_dev(button0, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(button0, file, 132, 16, 3764);
			attr_dev(i1, "data-feather", "users");
			add_location(i1, file, 136, 46, 4177);
			attr_dev(span2, "class", "icon is-small");
			add_location(span2, file, 135, 115, 4124);
			add_location(span3, file, 136, 81, 4212);
			attr_dev(a0, "href", "/salas/auditorio");
			attr_dev(a0, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a0, file, 135, 16, 4025);
			attr_dev(i2, "data-feather", "users");
			add_location(i2, file, 138, 46, 4416);
			attr_dev(span4, "class", "icon is-small");
			add_location(span4, file, 137, 113, 4363);
			add_location(span5, file, 138, 81, 4451);
			attr_dev(a1, "href", "/memorias/2019");
			attr_dev(a1, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a1, file, 137, 16, 4266);
			attr_dev(i3, "data-feather", "users");
			add_location(i3, file, 140, 46, 4649);
			attr_dev(span6, "class", "icon is-small");
			add_location(span6, file, 139, 113, 4596);
			add_location(span7, file, 140, 81, 4684);
			attr_dev(a2, "href", "/memorias/2020");
			attr_dev(a2, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a2, file, 139, 16, 4499);
			attr_dev(i4, "data-feather", "share-2");
			add_location(i4, file, 142, 46, 4875);
			attr_dev(span8, "class", "icon is-small");
			add_location(span8, file, 141, 106, 4822);
			add_location(span9, file, 142, 83, 4912);
			attr_dev(a3, "href", "/medios");
			attr_dev(a3, "class", "button has-text-weight-bold is-primary is-outlined is-uppercase svelte-3ddgui");
			add_location(a3, file, 141, 16, 4732);
			attr_dev(div3, "class", "menu-content has-text-centered svelte-3ddgui");
			add_location(div3, file, 130, 12, 3628);
			attr_dev(div4, "class", "menu-container hover-glow svelte-3ddgui");
			add_location(div4, file, 128, 8, 3534);
			attr_dev(i5, "data-feather", "share-2");
			add_location(i5, file, 149, 42, 5264);
			attr_dev(span10, "class", "icon is-small");
			add_location(span10, file, 148, 126, 5215);
			add_location(span11, file, 149, 79, 5301);
			attr_dev(a4, "href", "/medios");
			attr_dev(a4, "class", "button is-rounded is-small is-primary is-outlined is-uppercase has-text-weight-bold is-control stands svelte-3ddgui");
			add_location(a4, file, 147, 12, 5070);
			attr_dev(i6, "data-feather", "users");
			add_location(i6, file, 152, 42, 5563);
			attr_dev(span12, "class", "icon is-small");
			add_location(span12, file, 151, 130, 5514);
			add_location(span13, file, 152, 77, 5598);
			attr_dev(a5, "href", "/salas/auditorio");
			attr_dev(a5, "class", "button is-rounded is-small is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio1 svelte-3ddgui");
			add_location(a5, file, 150, 12, 5356);
			attr_dev(i7, "data-feather", "users");
			add_location(i7, file, 155, 42, 5838);
			attr_dev(span14, "class", "icon is-small");
			add_location(span14, file, 154, 121, 5789);
			add_location(span15, file, 155, 77, 5873);
			attr_dev(a6, "href", "/salas/1");
			attr_dev(a6, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio2 svelte-3ddgui");
			add_location(a6, file, 153, 12, 5648);
			attr_dev(i8, "data-feather", "users");
			add_location(i8, file, 158, 42, 6100);
			attr_dev(span16, "class", "icon is-small");
			add_location(span16, file, 157, 121, 6051);
			add_location(span17, file, 158, 77, 6135);
			attr_dev(a7, "href", "/salas/2");
			attr_dev(a7, "class", "button is-rounded is-primary is-outlined is-uppercase has-text-weight-bold is-control auditorio3 svelte-3ddgui");
			add_location(a7, file, 156, 12, 5910);
			attr_dev(div5, "class", "controls-container");
			add_location(div5, file, 146, 8, 5024);
			attr_dev(div6, "class", "hero-body");
			add_location(div6, file, 112, 4, 2806);
			attr_dev(div7, "id", "lobby");
			set_style(div7, "background", "url('lobby.jpg')");
			attr_dev(div7, "class", "hero is-fullheight is-relative is-primary is-clipped svelte-3ddgui");
			add_location(div7, file, 111, 0, 2685);
			attr_dev(div8, "class", "modal-background");
			add_location(div8, file, 165, 4, 6261);
			attr_dev(iframe1, "title", "streamline");
			set_style(iframe1, "width", "100%");
			set_style(iframe1, "height", "50vh");
			if (iframe1.src !== (iframe1_src_value = "https://player.vimeo.com/video/482797612")) attr_dev(iframe1, "src", iframe1_src_value);
			attr_dev(iframe1, "frameborder", "0");
			attr_dev(iframe1, "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
			iframe1.allowFullscreen = true;
			add_location(iframe1, file, 167, 8, 6340);
			attr_dev(div9, "class", "modal-content");
			add_location(div9, file, 166, 4, 6303);
			attr_dev(button1, "class", "modal-close is-large");
			attr_dev(button1, "aria-label", "close");
			add_location(button1, file, 171, 4, 6629);
			attr_dev(div10, "id", "inicio");
			attr_dev(div10, "class", "modal is-active");
			add_location(div10, file, 164, 0, 6214);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div7, anchor);
			append_dev(div7, div6);
			append_dev(div6, div1);
			append_dev(div1, img0);
			append_dev(div1, t1);
			append_dev(div1, div0);
			append_dev(div0, iframe0);
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
			append_dev(div3, button0);
			append_dev(button0, span0);
			append_dev(span0, i0);
			append_dev(button0, span1);
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
			insert_dev(target, t25, anchor);
			insert_dev(target, div10, anchor);
			append_dev(div10, div8);
			append_dev(div10, t26);
			append_dev(div10, div9);
			append_dev(div9, iframe1);
			append_dev(div10, t27);
			append_dev(div10, button1);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(button0, "click", /*abrirAgenda*/ ctx[0], false, false, false),
					listen_dev(button1, "click", /*hideModal*/ ctx[1], false, false, false)
				];

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
			if (detaching) detach_dev(t25);
			if (detaching) detach_dev(div10);
			mounted = false;
			run_all(dispose);
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

	const hideModal = () => {
		document.querySelector("#inicio").classList.remove("is-active");
	};

	onMount(() => {
		const iframe = document.querySelector("#lobby-loop");
		const lobbyloop = new Player(iframe);
		lobbyloop.setMuted(true);
		lobbyloop.setLoop(true);
		lobbyloop.play();
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Lobby> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Lobby", $$slots, []);

	$$self.$capture_state = () => ({
		Agenda,
		onMount,
		Player,
		abrirAgenda,
		hideModal
	});

	return [abrirAgenda, hideModal];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9iYnkuM2FiMzJhMjAuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvbG9iYnkuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxyXG4gICAgI2xvYmJ5IHtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b20gIWltcG9ydGFudDtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgIC5ob3Zlci1nbG93IHtcclxuICAgICAgICB0cmFuc2l0aW9uOiBlYXNlLW91dCAwLjRzO1xyXG5cclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgICAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDAgMTVweCAjNTMwQkRCKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAkc2NyZWVuLXdpZHRoOiA1NXZoOyAvL1RoZSBzY3JlZW4gd2lkdGggaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIGlmcmFtZSBhc3BlY3QgcmF0aW9cclxuXHJcbiAgICAuc2NyZWVuLWNvbnRhaW5lciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IDE3JTtcclxuICAgICAgICB0b3A6IC0xOHZoO1xyXG4gICAgICAgIHdpZHRoOiAkc2NyZWVuLXdpZHRoO1xyXG5cclxuICAgICAgICBpbWcge1xyXG4gICAgICAgICAgICB3aWR0aDogJHNjcmVlbi13aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5zY3JlZW4tY29udGVudCB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgYm90dG9tOiAwO1xyXG4gICAgICAgICAgICB3aWR0aDogJHNjcmVlbi13aWR0aDtcclxuICAgICAgICAgICAgaGVpZ2h0OiAkc2NyZWVuLXdpZHRoO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDIuNjV2aDtcclxuXHJcbiAgICAgICAgICAgIGlmcmFtZSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MC4yNSUgIWltcG9ydGFudDsgLy9Mb2NraW5nIGFzcGVjdCByYXRpbyBhcyAxNjo5XHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDAxMjFmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5tZW51LWNvbnRhaW5lciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGxlZnQ6IDclO1xyXG4gICAgICAgIGJvdHRvbTogLTV2aDtcclxuICAgICAgICB3aWR0aDogMzB2aDtcclxuICAgICAgICBwZXJzcGVjdGl2ZTogMTAwMHB4O1xyXG4gICAgICAgIHBlcnNwZWN0aXZlLW9yaWdpbjogNTAlIDM4JTtcclxuXHJcbiAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgd2lkdGg6IDMwdmg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAubWVudS1jb250ZW50IHtcclxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgICB0b3A6IDUwJTtcclxuICAgICAgICAgICAgbGVmdDogNTAlO1xyXG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC00MyUsIC02OSUpIHNjYWxlKDAuNykgcm90YXRlM2QoMCwgMSwgMCwgMThkZWcpO1xyXG5cclxuICAgICAgICAgICAgLmJ1dHRvbiB7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEuOHZoO1xyXG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IHVuc2V0O1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIydmg7XHJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDF2aDtcclxuICAgICAgICAgICAgICAgIC8vZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLnRpdGxlIHtcclxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMi42dmg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLnBlZGVzdGFsLWNvbnRhaW5lciB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHJpZ2h0OiAxMCU7XHJcbiAgICAgICAgYm90dG9tOiAtNXZoO1xyXG4gICAgICAgIG1heC13aWR0aDogMzB2aDtcclxuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNDUlKVxyXG4gICAgfVxyXG5cclxuICAgIC5idXR0b24uaXMtY29udHJvbCB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG5cclxuICAgICAgICAmLnN0YW5kcyB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDIyJTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01dmgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5hdWRpdG9yaW8xIHtcclxuICAgICAgICAgICAgcmlnaHQ6IDEyJTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHZoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuYXVkaXRvcmlvMiB7XHJcbiAgICAgICAgICAgIGxlZnQ6IDU0JTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTE1dmgsIC01dmgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5hdWRpdG9yaW8zIHtcclxuICAgICAgICAgICAgbGVmdDogNDAlO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTV2aCwgMnZoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG48L3N0eWxlPlxyXG5cclxuPHNjcmlwdD5cclxuICAgIGltcG9ydCBBZ2VuZGEgZnJvbSAnLi4vY29tcG9uZW50cy9BZ2VuZGEuc3ZlbHRlJ1xyXG4gICAgaW1wb3J0IHtvbk1vdW50fSBmcm9tICdzdmVsdGUnXHJcbiAgICBpbXBvcnQgUGxheWVyIGZyb20gJ0B2aW1lby9wbGF5ZXInXHJcblxyXG4gICAgXHJcblxyXG4gICAgY29uc3QgYWJyaXJBZ2VuZGEgPSAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FnZW5kYS1pbnRlcmFjdGl2YScpLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGlkZU1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbmljaW8nKS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91bnQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2JieS1sb29wJylcclxuICAgICAgICBjb25zdCBsb2JieWxvb3AgPSBuZXcgUGxheWVyKGlmcmFtZSlcclxuICAgICAgICBsb2JieWxvb3Auc2V0TXV0ZWQodHJ1ZSlcclxuICAgICAgICBsb2JieWxvb3Auc2V0TG9vcCh0cnVlKVxyXG4gICAgICAgIGxvYmJ5bG9vcC5wbGF5KClcclxuICAgIH0pXHJcbiAgICBcclxuPC9zY3JpcHQ+XHJcblxyXG48c3ZlbHRlOmhlYWQ+XHJcbiAgICA8dGl0bGU+RklNUFUgMjAyMDwvdGl0bGU+XHJcbjwvc3ZlbHRlOmhlYWQ+XHJcblxyXG5cclxuXHJcbjxkaXYgaWQ9XCJsb2JieVwiIHN0eWxlPVwiYmFja2dyb3VuZDogdXJsKCdsb2JieS5qcGcnKTtcIiBjbGFzcz1cImhlcm8gaXMtZnVsbGhlaWdodCBpcy1yZWxhdGl2ZSBpcy1wcmltYXJ5IGlzLWNsaXBwZWRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cclxuICAgICAgICA8IS0tIFBhbnRhbGxhIC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzY3JlZW4tY29udGFpbmVyIGhvdmVyLWdsb3dcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJzY3JlZW4ucG5nXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzY3JlZW4tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGlmcmFtZSBpZD1cImxvYmJ5LWxvb3BcIiAgdGl0bGU9XCJzdHJlYW1saW5lXCIgd2lkdGg9XCIxMjgwXCIgaGVpZ2h0PVwiNzIwXCIgc3JjPVwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLzQ4Mjc5NzYxMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVib3JkZXI9XCIwXCJcclxuICAgICAgICAgICAgICAgICAgICBhbGxvdz1cImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBjbGlwYm9hcmQtd3JpdGU7IGVuY3J5cHRlZC1tZWRpYTsgZ3lyb3Njb3BlOyBwaWN0dXJlLWluLXBpY3R1cmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPCEtLSBJbmZvIC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwZWRlc3RhbC1jb250YWluZXIgaG92ZXItZ2xvd1wiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cInBlZGVzdGFsLnBuZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwhLS0gTWVuw7ogLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtY29udGFpbmVyIGhvdmVyLWdsb3dcIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJtZW51LnBuZ1wiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudS1jb250ZW50IGhhcy10ZXh0LWNlbnRlcmVkXCI+XHJcbiAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJ0aXRsZSBpcy0zIGhhcy10ZXh0LXByaW1hcnlcIj5CaWVudmVuaWRvczwvaDM+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uOmNsaWNrPXthYnJpckFnZW5kYX1cclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZVwiPjxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cImNhbGVuZGFyXCI+PC9pPjwvc3Bhbj48c3Bhbj5BZ2VuZGE8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3NhbGFzL2F1ZGl0b3Jpb1wiIGNsYXNzPVwiYnV0dG9uIGhhcy10ZXh0LXdlaWdodC1ib2xkIGlzLXByaW1hcnkgaXMtb3V0bGluZWQgaXMtdXBwZXJjYXNlXCI+PHNwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwidXNlcnNcIj48L2k+PC9zcGFuPjxzcGFuPkF1ZGl0b3JpbyBQcmluY2lwYWw8L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9tZW1vcmlhcy8yMDE5XCIgY2xhc3M9XCJidXR0b24gaGFzLXRleHQtd2VpZ2h0LWJvbGQgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZCBpcy11cHBlcmNhc2VcIj48c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJ1c2Vyc1wiPjwvaT48L3NwYW4+PHNwYW4+TWVtb3JpYXMgMjAxOTwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL21lbW9yaWFzLzIwMjBcIiBjbGFzcz1cImJ1dHRvbiBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZVwiPjxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJzXCI+PC9pPjwvc3Bhbj48c3Bhbj5NZW1vcmlhcyAyMDIwPC9zcGFuPjwvYT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbWVkaW9zXCIgY2xhc3M9XCJidXR0b24gaGFzLXRleHQtd2VpZ2h0LWJvbGQgaXMtcHJpbWFyeSBpcy1vdXRsaW5lZCBpcy11cHBlcmNhc2VcIj48c3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImljb24gaXMtc21hbGxcIj48aSBkYXRhLWZlYXRoZXI9XCJzaGFyZS0yXCI+PC9pPjwvc3Bhbj48c3Bhbj5TYWzDs24gZGUgTWVkaW9zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFDDumJsaWNvczwvc3Bhbj48L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9scy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIi9tZWRpb3NcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtcm91bmRlZCBpcy1zbWFsbCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZSBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1jb250cm9sIHN0YW5kc1wiPjxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwic2hhcmUtMlwiPjwvaT48L3NwYW4+PHNwYW4+U2Fsw7NuIGRlIE1lZGlvcyBQw7pibGljb3M8L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL3NhbGFzL2F1ZGl0b3Jpb1wiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImJ1dHRvbiBpcy1yb3VuZGVkIGlzLXNtYWxsIGlzLXByaW1hcnkgaXMtb3V0bGluZWQgaXMtdXBwZXJjYXNlIGhhcy10ZXh0LXdlaWdodC1ib2xkIGlzLWNvbnRyb2wgYXVkaXRvcmlvMVwiPjxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpY29uIGlzLXNtYWxsXCI+PGkgZGF0YS1mZWF0aGVyPVwidXNlcnNcIj48L2k+PC9zcGFuPjxzcGFuPkF1ZGl0b3JpbyBQcmluY2lwYWw8L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL3NhbGFzLzFcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtcm91bmRlZCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZSBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1jb250cm9sIGF1ZGl0b3JpbzJcIj48c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJzXCI+PC9pPjwvc3Bhbj48c3Bhbj5TYWxhIDE8L3NwYW4+PC9hPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiL3NhbGFzLzJcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24gaXMtcm91bmRlZCBpcy1wcmltYXJ5IGlzLW91dGxpbmVkIGlzLXVwcGVyY2FzZSBoYXMtdGV4dC13ZWlnaHQtYm9sZCBpcy1jb250cm9sIGF1ZGl0b3JpbzNcIj48c3BhblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaWNvbiBpcy1zbWFsbFwiPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJzXCI+PC9pPjwvc3Bhbj48c3Bhbj5TYWxhIDI8L3NwYW4+PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8QWdlbmRhIC8+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBpZD1cImluaWNpb1wiIGNsYXNzPVwibW9kYWwgaXMtYWN0aXZlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYmFja2dyb3VuZFwiPjwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cclxuICAgICAgICA8aWZyYW1lIHRpdGxlPVwic3RyZWFtbGluZVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDo1MHZoXCIgc3JjPVwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLzQ4Mjc5NzYxMlwiXHJcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93PVwiYWNjZWxlcm9tZXRlcjsgYXV0b3BsYXk7IGNsaXBib2FyZC13cml0ZTsgZW5jcnlwdGVkLW1lZGlhOyBneXJvc2NvcGU7IHBpY3R1cmUtaW4tcGljdHVyZVwiXHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cclxuICAgIDwvZGl2PlxyXG4gICAgPGJ1dHRvbiBvbjpjbGljaz17aGlkZU1vZGFsfSBjbGFzcz1cIm1vZGFsLWNsb3NlIGlzLWxhcmdlXCIgYXJpYS1sYWJlbD1cImNsb3NlXCI+PC9idXR0b24+XHJcbjwvZGl2PiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tEQW9Ja0MsR0FBVztnREF1Q3ZCLEdBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXBGckIsV0FBVztFQUNiLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXOzs7T0FHeEUsU0FBUztFQUNYLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVzs7O0NBR2xFLE9BQU87UUFDRyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhO1FBQzdDLFNBQVMsT0FBTyxNQUFNLENBQUMsTUFBTTtFQUNuQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUk7RUFDdkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJO0VBQ3RCLFNBQVMsQ0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
