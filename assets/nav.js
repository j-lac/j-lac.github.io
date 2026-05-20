// ドロップダウンナビ（スマホ用タップ展開・PC は CSS ホバー）
(function () {
  var items = document.querySelectorAll(".has-dropdown");

  function closeAll(except) {
    items.forEach(function (li) {
      if (li === except) return;
      var btn = li.querySelector(".dropdown-toggle");
      var menu = li.querySelector(".dropdown");
      if (btn) btn.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  items.forEach(function (li) {
    var btn = li.querySelector(".dropdown-toggle");
    var menu = li.querySelector(".dropdown");
    if (!btn || !menu) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = btn.getAttribute("aria-expanded") === "true";
      closeAll(li);
      btn.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
  });

  document.addEventListener("click", function (e) {
    items.forEach(function (li) {
      if (!li.contains(e.target)) {
        var btn = li.querySelector(".dropdown-toggle");
        var menu = li.querySelector(".dropdown");
        if (btn) btn.setAttribute("aria-expanded", "false");
        if (menu) menu.hidden = true;
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll(null);
  });
})();
