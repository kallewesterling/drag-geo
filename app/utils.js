"use strict";

/**
 * setTheme takes X argument/s... TODO: Needs docstring
 * The return value is ...
 */
// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-light");
    } else {
        setTheme("theme-dark");
    }
}

(function () {
    // Immediately invoked function to set the theme on initial load
    // first check for preference - if dark mode is on, stick to it!
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches == true
    ) {
        // console.log("user has dark mode on - following suit...");
        setTheme("theme-dark");
        return true;
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches == true
    ) {
        // console.log("user has light mode on - following suit...");
        setTheme("theme-light");
        return true;
    }

    // else, check localStorage...
    if (localStorage.getItem("theme") === "theme-dark") {
        // console.log("user has set dark mode on manually...");
        setTheme("theme-dark");
        return true;
    } else {
        // console.log("user has set light mode on manually...");
        setTheme("theme-light");
        return true;
    }
})();

const hideSelector = (selector, delay = 1000, duration = 1000) => {
    selector.transition().delay(delay).duration(duration).style("opacity", 0);
};

const showSelectorLocation = (selector, x, y) => {
    selector.style("left", `${x}px`).style("top", `${y}px`);
};
const showSelectorAt = (selector, x, y) => {
    selector.transition().duration(200).style("opacity", 0.9);
    if (x !== undefined && y !== undefined) {
        showSelectorLocation(selector, x, y);
    }
};

const showCitytip = (x, y) => {
    showSelectorAt(store.citytip, x, y);
};

const hideCitytip = () => {
    hideSelector(store.citytip, 1000, 1000);
};

const showTooltip = (x, y) => {
    showSelectorAt(store.tooltip, x, y);
};

const hideTooltip = () => {
    hideSelector(store.tooltip, 1000, 1000);
};

const showHelptip = (x, y) => {
    showSelectorAt(store.helptip, x, y);
};

const hideHelptip = () => {
    hideSelector(store.helptip, 0, 200);
};

const createPopBackSettings = () => {
    if (document.querySelector("#popBackSettings")) return true;

    let popBack = d3
        .select("body")
        .append("div")
        .attr("id", "popBackSettings")
        .classed("shadow-lg", true)
        .classed("rounded", true)
        .classed("overflow-hidden", true);

    let localSVG = popBack
        .append("svg")
        .attr("fill", "black")
        .classed("bi", true)
        .classed("bi-arrow-up-left-square-fill", true)
        .attr("viewBox", "0 0 16 16")
        .attr("xmlns", "http://www.w3.org/2000/svg");

    let path = localSVG
        .append("path")
        .attr(
            "d",
            "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm8.096 10.803L6 6.707v2.768a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5h3.975a.5.5 0 1 1 0 1H6.707l4.096 4.096a.5.5 0 1 1-.707.707z"
        );

    path.on("click", () => {
        d3.select("#settings").style("top", "4.5em").style("left", "1em");
        document.querySelector("#popBackSettings").remove();
    });
};

const isVisible = (selector) => {
    try {
        return d3.select(selector).classed("d-none") === false;
    } catch {
        console.error("Selector cannot be found");
        console.error(selector);
        return false;
    }
};

const toggle = (selector) => {
    if (typeof selector === "object") {
        selector.classed("d-none", isVisible(selector));
    } else {
        d3.select(selector).classed("d-none", isVisible(selector));
    }
    return true;
};

const hasKey = (key, object) => {
    return Object.keys(object).includes(key);
};

const getCircleLocation = (circle) => {
    let projected = store.projection([circle.lon, circle.lat]);
    if (projected) return projected;
    return -1000;
}