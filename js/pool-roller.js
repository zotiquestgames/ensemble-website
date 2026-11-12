(function () {
  var OUTCOMES = {
    6: 'Yes, and…', 5: 'Yes…', 4: 'Yes, but…',
    3: 'No, but…', 2: 'No…', 1: 'No, and…'
  };

  function d6() { return 1 + Math.floor(Math.random() * 6); }

  function clamp(v) {
    var n = parseInt(v, 10);
    if (isNaN(n) || n < 0) return 0;
    return n > 6 ? 6 : n;
  }

  function die(value, kind, dim) {
    var span = document.createElement('span');
    span.className = 'dice-glyph dice-glyph--lg dice-glyph--' + kind + (dim ? ' dice-glyph--dim' : '');
    span.textContent = String(value);
    span.setAttribute('aria-label', kind + ' die showing ' + value);
    return span;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('poolRollButton');
    var chanceInput = document.getElementById('poolChance');
    var riskInput = document.getElementById('poolRisk');
    var diceOut = document.getElementById('poolDice');
    var resultLabel = document.getElementById('poolResult');
    var twistChip = document.getElementById('poolTwist');
    if (!button) return;

    button.addEventListener('click', function () {
      var chance = clamp(chanceInput.value);
      var risk = clamp(riskInput.value);
      var net = chance - risk;
      var kind = net > 0 ? 'chance' : 'risk';
      var extra = Math.abs(net);

      var action = d6();
      var rolls = [];
      for (var i = 0; i < extra; i++) rolls.push(d6());
      var all = [action].concat(rolls);
      var kept = net > 0 ? Math.max.apply(null, all) : net < 0 ? Math.min.apply(null, all) : action;

      diceOut.innerHTML = '';
      var keptShown = false;
      all.forEach(function (v, idx) {
        var isKept = !keptShown && v === kept;
        if (isKept) keptShown = true;
        diceOut.appendChild(die(v, idx === 0 ? 'action' : kind, !isKept));
      });

      resultLabel.textContent = OUTCOMES[kept];
      resultLabel.classList.toggle('oracle-badge__result--no', kept <= 3);
      twistChip.style.display = kept === 4 ? 'inline-block' : 'none';
    });
  });
})();
