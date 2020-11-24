import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, g as goto, a as globals, b as space, e as element, t as text, q as query_selector_all, c as detach_dev, f as claim_space, h as claim_element, j as children, k as claim_text, l as attr_dev, m as set_style, n as add_location, o as insert_dev, p as append_dev, r as listen_dev, u as noop } from './client.740b0f87.js';

/* src\routes\index.svelte generated by Svelte v3.23.0 */

const { console: console_1, document: document_1 } = globals;
const file = "src\\routes\\index.svelte";

function create_fragment(ctx) {
	let t0;
	let div12;
	let div1;
	let div0;
	let t1;
	let div11;
	let div10;
	let div9;
	let div8;
	let div7;
	let div6;
	let img0;
	let img0_src_value;
	let t2;
	let form;
	let div2;
	let input0;
	let t3;
	let div3;
	let input1;
	let t4;
	let div4;
	let label;
	let input2;
	let t5;
	let a;
	let t6;
	let t7;
	let div5;
	let button0;
	let span0;
	let i0;
	let t8;
	let span1;
	let t9;
	let t10;
	let button1;
	let span2;
	let i1;
	let t11;
	let span3;
	let t12;
	let t13;
	let img1;
	let img1_src_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			t0 = space();
			div12 = element("div");
			div1 = element("div");
			div0 = element("div");
			t1 = space();
			div11 = element("div");
			div10 = element("div");
			div9 = element("div");
			div8 = element("div");
			div7 = element("div");
			div6 = element("div");
			img0 = element("img");
			t2 = space();
			form = element("form");
			div2 = element("div");
			input0 = element("input");
			t3 = space();
			div3 = element("div");
			input1 = element("input");
			t4 = space();
			div4 = element("div");
			label = element("label");
			input2 = element("input");
			t5 = text("\n\t\t\t\t\t\t\t\t\t\tAcepto los ");
			a = element("a");
			t6 = text("Términos y Condiciones");
			t7 = space();
			div5 = element("div");
			button0 = element("button");
			span0 = element("span");
			i0 = element("i");
			t8 = space();
			span1 = element("span");
			t9 = text("Entrar Ahora");
			t10 = space();
			button1 = element("button");
			span2 = element("span");
			i1 = element("i");
			t11 = space();
			span3 = element("span");
			t12 = text("Regístrate");
			t13 = space();
			img1 = element("img");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1yj4rfx\"]", document_1.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			div12 = claim_element(nodes, "DIV", { id: true, class: true });
			var div12_nodes = children(div12);
			div1 = claim_element(div12_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true, style: true });
			children(div0).forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t1 = claim_space(div12_nodes);
			div11 = claim_element(div12_nodes, "DIV", { class: true });
			var div11_nodes = children(div11);
			div10 = claim_element(div11_nodes, "DIV", { class: true });
			var div10_nodes = children(div10);
			div9 = claim_element(div10_nodes, "DIV", { class: true });
			var div9_nodes = children(div9);
			div8 = claim_element(div9_nodes, "DIV", { class: true });
			var div8_nodes = children(div8);
			div7 = claim_element(div8_nodes, "DIV", { class: true });
			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			img0 = claim_element(div6_nodes, "IMG", { src: true, class: true, alt: true });
			t2 = claim_space(div6_nodes);
			form = claim_element(div6_nodes, "FORM", { action: true, class: true });
			var form_nodes = children(form);
			div2 = claim_element(form_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);

			input0 = claim_element(div2_nodes, "INPUT", {
				id: true,
				required: true,
				type: true,
				placeholder: true,
				class: true
			});

			div2_nodes.forEach(detach_dev);
			t3 = claim_space(form_nodes);
			div3 = claim_element(form_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);

			input1 = claim_element(div3_nodes, "INPUT", {
				id: true,
				required: true,
				type: true,
				placeholder: true,
				class: true
			});

			div3_nodes.forEach(detach_dev);
			t4 = claim_space(form_nodes);
			div4 = claim_element(form_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			label = claim_element(div4_nodes, "LABEL", { class: true });
			var label_nodes = children(label);
			input2 = claim_element(label_nodes, "INPUT", { required: true, type: true });
			t5 = claim_text(label_nodes, "\n\t\t\t\t\t\t\t\t\t\tAcepto los ");
			a = claim_element(label_nodes, "A", { href: true, class: true });
			var a_nodes = children(a);
			t6 = claim_text(a_nodes, "Términos y Condiciones");
			a_nodes.forEach(detach_dev);
			label_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t7 = claim_space(form_nodes);
			div5 = claim_element(form_nodes, "DIV", { class: true });
			var div5_nodes = children(div5);
			button0 = claim_element(div5_nodes, "BUTTON", { type: true, class: true });
			var button0_nodes = children(button0);
			span0 = claim_element(button0_nodes, "SPAN", {});
			var span0_nodes = children(span0);
			i0 = claim_element(span0_nodes, "I", { "data-feather": true });
			children(i0).forEach(detach_dev);
			span0_nodes.forEach(detach_dev);
			t8 = claim_space(button0_nodes);
			span1 = claim_element(button0_nodes, "SPAN", {});
			var span1_nodes = children(span1);
			t9 = claim_text(span1_nodes, "Entrar Ahora");
			span1_nodes.forEach(detach_dev);
			button0_nodes.forEach(detach_dev);
			t10 = claim_space(div5_nodes);
			button1 = claim_element(div5_nodes, "BUTTON", { type: true, class: true });
			var button1_nodes = children(button1);
			span2 = claim_element(button1_nodes, "SPAN", {});
			var span2_nodes = children(span2);
			i1 = claim_element(span2_nodes, "I", { "data-feather": true });
			children(i1).forEach(detach_dev);
			span2_nodes.forEach(detach_dev);
			t11 = claim_space(button1_nodes);
			span3 = claim_element(button1_nodes, "SPAN", {});
			var span3_nodes = children(span3);
			t12 = claim_text(span3_nodes, "Regístrate");
			span3_nodes.forEach(detach_dev);
			button1_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			form_nodes.forEach(detach_dev);
			t13 = claim_space(div6_nodes);
			img1 = claim_element(div6_nodes, "IMG", { src: true, class: true, alt: true });
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			div8_nodes.forEach(detach_dev);
			div9_nodes.forEach(detach_dev);
			div10_nodes.forEach(detach_dev);
			div11_nodes.forEach(detach_dev);
			div12_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document_1.title = "FIMPU 2020";
			attr_dev(div0, "class", "hero is-fullheight");
			set_style(div0, "background", "url('lobby.jpg')");
			add_location(div0, file, 35, 2, 932);
			attr_dev(div1, "class", "is-overlay svelte-mui2g8");
			add_location(div1, file, 34, 1, 905);
			if (img0.src !== (img0_src_value = "logo-header.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "class", "has-margin-bottom-20");
			attr_dev(img0, "alt", "Logo FIMPU");
			add_location(img0, file, 43, 7, 1209);
			attr_dev(input0, "id", "email");
			input0.required = true;
			attr_dev(input0, "type", "email");
			attr_dev(input0, "placeholder", "Su correo electrónico");
			attr_dev(input0, "class", "input is-rounded");
			add_location(input0, file, 46, 9, 1382);
			attr_dev(div2, "class", "field");
			add_location(div2, file, 45, 8, 1353);
			attr_dev(input1, "id", "password");
			input1.required = true;
			attr_dev(input1, "type", "password");
			attr_dev(input1, "placeholder", "Su clave de acceso");
			attr_dev(input1, "class", "input is-rounded");
			add_location(input1, file, 49, 9, 1536);
			attr_dev(div3, "class", "field");
			add_location(div3, file, 48, 8, 1507);
			input2.required = true;
			attr_dev(input2, "type", "checkbox");
			add_location(input2, file, 53, 10, 1728);
			attr_dev(a, "href", "/terms");
			attr_dev(a, "class", "link");
			add_location(a, file, 54, 21, 1782);
			attr_dev(label, "class", "checkbox");
			add_location(label, file, 52, 9, 1693);
			attr_dev(div4, "class", "field");
			add_location(div4, file, 51, 8, 1664);
			attr_dev(i0, "data-feather", "user");
			add_location(i0, file, 59, 16, 1997);
			add_location(span0, file, 59, 10, 1991);
			add_location(span1, file, 60, 10, 2042);
			attr_dev(button0, "type", "submit");
			attr_dev(button0, "class", "button is-primary is-rounded is-outlined");
			add_location(button0, file, 58, 9, 1909);
			attr_dev(i1, "data-feather", "user");
			add_location(i1, file, 63, 16, 2184);
			add_location(span2, file, 63, 10, 2178);
			add_location(span3, file, 64, 10, 2229);
			attr_dev(button1, "type", "submit");
			attr_dev(button1, "class", "button is-primary is-rounded is-outlined");
			add_location(button1, file, 62, 9, 2096);
			attr_dev(div5, "class", "field");
			add_location(div5, file, 57, 8, 1880);
			attr_dev(form, "action", "");
			attr_dev(form, "class", "form");
			add_location(form, file, 44, 7, 1290);
			if (img1.src !== (img1_src_value = "membrete.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "class", "has-margin-top-20");
			attr_dev(img1, "alt", "");
			add_location(img1, file, 68, 7, 2309);
			attr_dev(div6, "class", "card-content has-text-centered");
			add_location(div6, file, 42, 6, 1157);
			attr_dev(div7, "class", "card box");
			add_location(div7, file, 41, 5, 1128);
			attr_dev(div8, "class", "column is-5");
			add_location(div8, file, 40, 4, 1097);
			attr_dev(div9, "class", "columns");
			add_location(div9, file, 39, 3, 1071);
			attr_dev(div10, "class", "container");
			add_location(div10, file, 38, 2, 1044);
			attr_dev(div11, "class", "hero-body");
			add_location(div11, file, 37, 1, 1018);
			attr_dev(div12, "id", "login");
			attr_dev(div12, "class", "hero is-fullheight is-relative is-clipped svelte-mui2g8");
			add_location(div12, file, 33, 0, 837);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, div12, anchor);
			append_dev(div12, div1);
			append_dev(div1, div0);
			append_dev(div12, t1);
			append_dev(div12, div11);
			append_dev(div11, div10);
			append_dev(div10, div9);
			append_dev(div9, div8);
			append_dev(div8, div7);
			append_dev(div7, div6);
			append_dev(div6, img0);
			append_dev(div6, t2);
			append_dev(div6, form);
			append_dev(form, div2);
			append_dev(div2, input0);
			append_dev(form, t3);
			append_dev(form, div3);
			append_dev(div3, input1);
			append_dev(form, t4);
			append_dev(form, div4);
			append_dev(div4, label);
			append_dev(label, input2);
			append_dev(label, t5);
			append_dev(label, a);
			append_dev(a, t6);
			append_dev(form, t7);
			append_dev(form, div5);
			append_dev(div5, button0);
			append_dev(button0, span0);
			append_dev(span0, i0);
			append_dev(button0, t8);
			append_dev(button0, span1);
			append_dev(span1, t9);
			append_dev(div5, t10);
			append_dev(div5, button1);
			append_dev(button1, span2);
			append_dev(span2, i1);
			append_dev(button1, t11);
			append_dev(button1, span3);
			append_dev(span3, t12);
			append_dev(div6, t13);
			append_dev(div6, img1);

			if (!mounted) {
				dispose = listen_dev(form, "submit", /*loginTrigger*/ ctx[0], false, false, false);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div12);
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
	const preload = () => {
		//Toggle Preloader
		document.querySelector("#preloader").classList.toggle("is-active");
	};

	const loginTrigger = e => {
		//Trigger Login
		e.preventDefault();

		preload(); //Trigger Preloader
		const user = document.querySelector("#email").value;
		const password = document.querySelector("#password").value;
		console.log(user, password);

		/**
 * Here we Await for the Api to validate
*/
		setTimeout(
			() => {
				goto("/lobby"); //Redirect
				preload(); //Trigger Preloader
			},
			1000
		);
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Routes", $$slots, []);
	$$self.$capture_state = () => ({ goto, preload, loginTrigger });
	return [loginTrigger];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZjAzYjJiNzIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuXHQjbG9naW4ge1xuXHRcdC5pcy1vdmVybGF5IHtcblx0XHRcdGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbSAhaW1wb3J0YW50O1xuXHRcdFx0ZmlsdGVyOiBibHVyKDhweCk7XG5cdFx0XHQtd2Via2l0LWZpbHRlcjogYmx1cig4cHgpO1xuXHRcdH1cblx0fVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cblx0aW1wb3J0IHsgZ290byB9IGZyb20gJ0BzYXBwZXIvYXBwJyAvL1JlZGlyZWN0ZXJcblxuXHRjb25zdCBwcmVsb2FkID0gKCkgPT4geyAvL1RvZ2dsZSBQcmVsb2FkZXJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJlbG9hZGVyJykuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJykgXG5cdH1cdFxuXG5cdGNvbnN0IGxvZ2luVHJpZ2dlciA9IChlKSA9PiB7IC8vVHJpZ2dlciBMb2dpblxuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdHByZWxvYWQoKSAvL1RyaWdnZXIgUHJlbG9hZGVyXG5cdFx0Y29uc3QgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpLnZhbHVlXG5cdFx0Y29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc3dvcmQnKS52YWx1ZVxuXHRcdGNvbnNvbGUubG9nKHVzZXIscGFzc3dvcmQpXG5cdFx0LyoqXG5cdFx0ICogSGVyZSB3ZSBBd2FpdCBmb3IgdGhlIEFwaSB0byB2YWxpZGF0ZVxuXHRcdCovXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRnb3RvKCcvbG9iYnknKSAvL1JlZGlyZWN0XG5cdFx0XHRwcmVsb2FkKCkgLy9UcmlnZ2VyIFByZWxvYWRlclxuXHRcdH0sIDEwMDApO1xuXHR9XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+RklNUFUgMjAyMDwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48ZGl2IGlkPVwibG9naW5cIiBjbGFzcz1cImhlcm8gaXMtZnVsbGhlaWdodCBpcy1yZWxhdGl2ZSBpcy1jbGlwcGVkXCI+XG5cdDxkaXYgY2xhc3M9XCJpcy1vdmVybGF5XCI+XG5cdFx0PGRpdiBjbGFzcz1cImhlcm8gaXMtZnVsbGhlaWdodFwiIHN0eWxlPVwiYmFja2dyb3VuZDogdXJsKCdsb2JieS5qcGcnKTtcIj48L2Rpdj5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJoZXJvLWJvZHlcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29sdW1uc1wiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sdW1uIGlzLTVcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZCBib3hcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnQgaGFzLXRleHQtY2VudGVyZWRcIj5cblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9XCJsb2dvLWhlYWRlci5zdmdcIiBjbGFzcz1cImhhcy1tYXJnaW4tYm90dG9tLTIwXCIgYWx0PVwiTG9nbyBGSU1QVVwiPlxuXHRcdFx0XHRcdFx0XHQ8Zm9ybSBvbjpzdWJtaXQ9e2xvZ2luVHJpZ2dlcn0gYWN0aW9uPVwiXCIgY2xhc3M9XCJmb3JtXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZpZWxkXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJlbWFpbFwiIHJlcXVpcmVkIHR5cGU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiU3UgY29ycmVvIGVsZWN0csOzbmljb1wiIGNsYXNzPVwiaW5wdXQgaXMtcm91bmRlZFwiPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwicGFzc3dvcmRcIiByZXF1aXJlZCB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlN1IGNsYXZlIGRlIGFjY2Vzb1wiIGNsYXNzPVwiaW5wdXQgaXMtcm91bmRlZFwiPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmaWVsZFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHJlcXVpcmVkIHR5cGU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRBY2VwdG8gbG9zIDxhIGhyZWY9XCIvdGVybXNcIiBjbGFzcz1cImxpbmtcIj5Uw6lybWlub3MgeSBDb25kaWNpb25lczwvYT5cblx0XHRcdFx0XHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZpZWxkXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ1dHRvbiBpcy1wcmltYXJ5IGlzLXJvdW5kZWQgaXMtb3V0bGluZWRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+PGkgZGF0YS1mZWF0aGVyPVwidXNlclwiPjwvaT48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPkVudHJhciBBaG9yYTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidXR0b24gaXMtcHJpbWFyeSBpcy1yb3VuZGVkIGlzLW91dGxpbmVkXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPjxpIGRhdGEtZmVhdGhlcj1cInVzZXJcIj48L2k+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5SZWfDrXN0cmF0ZTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Zvcm0+XG5cdFx0XHRcdFx0XHRcdDxpbWcgc3JjPVwibWVtYnJldGUuc3ZnXCIgY2xhc3M9XCJoYXMtbWFyZ2luLXRvcC0yMFwiIGFsdD1cIlwiPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuPC9kaXY+Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MERBNEN3QixHQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FuQzdCLE9BQU87O0VBQ1osUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXOzs7T0FHNUQsWUFBWSxHQUFJLENBQUM7O0VBQ3RCLENBQUMsQ0FBQyxjQUFjOztFQUNoQixPQUFPO1FBQ0QsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUs7UUFDN0MsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLEtBQUs7RUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsUUFBUTs7Ozs7RUFJekIsVUFBVTs7SUFDVCxJQUFJLENBQUMsUUFBUTtJQUNiLE9BQU87O0dBQ0wsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
