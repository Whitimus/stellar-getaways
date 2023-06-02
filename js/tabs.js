const tabLists = document.querySelector('[role="tablist"]');
const tabs = tabLists.querySelectorAll('[role="tab"]');

tabs.forEach((tab) => {
	tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

tabLists.addEventListener('keydown', changeTabFocus);

function changeTabFocus(evt) {
	const keydownLeft = 37;
	const keydownRight = 39;

	if (evt.keyCode === keydownLeft || evt.keyCode === keydownRight) {
		tabs[tabFocus].setAttribute('tabindex', -1);

		if (evt.keyCode === keydownRight) {
			tabFocus++;
			if (tabFocus >= tabs.length) {
				tabFocus = 0;
			}
		} else if (evt.keyCode === keydownLeft) {
			tabFocus--;
			if (tabFocus < 0) {
				tabFocus = tabs.length - 1;
			}
		}

		tabs[tabFocus].setAttribute('tabindex', 0);
		tabs[tabFocus].focus();
	}
}

function changeTabPanel(evt) {
	const targetTab = evt.target;
	const targetPanel = targetTab.getAttribute('aria-controls');
	const targetImage = targetTab.getAttribute('data-image');
	const tabContainer = targetTab.parentNode;
	const mainContainer = tabContainer.parentNode;

	tabContainer
		.querySelector('[aria-selected="true')
		.setAttribute('aria-selected', false);

	targetTab.setAttribute('aria-selected', true);

	hideContent(mainContainer, '[role="tabpanel"]');

	showContent(mainContainer, [`#${targetPanel}`]);

	hideContent(mainContainer, 'img');

	showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
	parent
		.querySelectorAll(content)
		.forEach((item) => item.setAttribute('hidden', true));
}
function showContent(parent, content) {
	parent.querySelector(content).removeAttribute('hidden');
}
