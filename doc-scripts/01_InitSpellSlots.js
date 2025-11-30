// Auto-exported from 01_InitSpellSlots-Bard-COLLEGE OF LORE.docx

// --- Wizard spell slot defaults (PHB 2014, p.113) ---
var WIZARD_SLOTS = {
  1:[2],
  2:[3],
  3:[4,2],
  4:[4,3],
  5:[4,3,2],
  6:[4,3,3],
  7:[4,3,3,1],
  8:[4,3,3,2],
  9:[4,3,3,3,1],
  10:[4,3,3,3,2],
  11:[4,3,3,3,2,1],
  12:[4,3,3,3,2,1],
  13:[4,3,3,3,2,1,1],
  14:[4,3,3,3,2,1,1],
  15:[4,3,3,3,2,1,1,1],
  16:[4,3,3,3,2,1,1,1],
  17:[4,3,3,3,2,1,1,1,1],
  18:[4,3,3,3,3,1,1,1,1],
  19:[4,3,3,3,3,2,1,1,1],
  20:[4,3,3,3,3,2,2,1,1]
};

function getWizardLevel() {
  // Check both CLASS LEVEL fields
  var f1 = this.getField("CLASS LEVEL");
  var f2 = this.getField("CLASS LEVEL2");
  var txt = "";
  if (f1 && f1.valueAsString) txt = f1.valueAsString;
  else if (f2 && f2.valueAsString) txt = f2.valueAsString;
  var m = txt.match(/\d+/);
  return m ? Number(m[0]) : 0;
}

function InitializeSlotRow() {
  try {
    var lvl = getWizardLevel();
    var defaults = WIZARD_SLOTS[lvl] || [];
    console.println("[InitializeSlotRow] Wizard Level " + lvl + " → Defaults " + defaults);

    // Fill Slots0_1 … Slots0_9
    for (var i = 1; i <= 9; i++) {
      var f = this.getField("Slots0_" + i);
      var val = (i <= defaults.length) ? defaults[i - 1] : 0;
      if (f) f.value = val;
    }

    console.println("[InitializeSlotRow] Completed successfully.");
  } catch (e) {
    console.println("[InitializeSlotRow Error] " + e);
  }
}


