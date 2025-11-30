// Auto-exported from 00_helpers-Bard-COLLEGE OF LORE.docx

function num(v){
  v = String(v==null?"":v);
  var m = v.match(/[+\-]?\d+(\.\d+)?/);
  return m ? Number(m[0]) : 0;
}

// =============================================================
// Handles clicking a Prep0_display_# checkbox
//  - Radio-style behavior (only one active)
//  - Loads Notes into spellDescription
//  - Updates TargetDCAbility (STR/DEX/etc or ATK)
//  - Clears both fields when unchecked
// =============================================================
function onPrepDisplayClick(fieldName) {
  try {
    var m = fieldName.match(/Prep0_display_(\d+)/);
    if (!m) return;
    var row = parseInt(m[1], 10);

    // --- Radio behavior ---
    for (var i = 0; i < 50; i++) {
      if (i === row) continue;
      var f = this.getField("Prep0_display_" + i);
      if (f && f.isBoxChecked(0)) f.checkThisBox(0, false);
    }

    var self = this.getField(fieldName);
    if (!self || !self.isBoxChecked(0)) {
      var clearFields = ["spellDescription", "TargetDCAbility"];
      for (var j = 0; j < clearFields.length; j++) {
        var fld = this.getField(clearFields[j]);
        if (fld) fld.value = "";
      }
      return;
    }

    // --- Identify spell level and name ---
    var lvlFld = this.getField("SpellLevel0_display_" + row);
    var nameFld = this.getField("SpellName0_display_" + row);
    var lvl = lvlFld ? String(lvlFld.value).trim() : "";
    var name = nameFld ? String(nameFld.value).trim() : "";
    if (!lvl || !name) return;

    // --- Find matching spell ---
    var notes = "", saveVal = "";
    for (var k = 0; k < 50; k++) {
      var nField = this.getField("SpellName" + lvl + "_" + k);
      if (nField && nField.value && String(nField.value).trim() === name) {
        var notesField = this.getField("Notes" + lvl + "_" + k);
        var saveField = this.getField("SaveHit" + lvl + "_" + k);
        if (notesField) notes = notesField.value || "";
        if (saveField) saveVal = saveField.value || "";
        break;
      }
    }

    // --- Populate spell description ---
    var desc = this.getField("spellDescription");
    if (desc) desc.value = notes || "(No spell description found.)";

    // --- Update TargetDCAbility ---
    var dcField = this.getField("TargetDCAbility");
    if (!dcField) return;

    function normalizeAbility(s) {
      if (!s) return "";
      s = String(s).toUpperCase();
      if (/ATTACK|TO\s*HIT/.test(s)) return "ATK";
      if (/STR(ENGTH)?/.test(s)) return "STR";
      if (/DEX(TERITY)?/.test(s)) return "DEX";
      if (/CON(STITUTION)?/.test(s)) return "CON";
      if (/INT(ELLIGENCE)?/.test(s)) return "INT";
      if (/WIS(DOM)?/.test(s)) return "WIS";
      if (/CHA(RISMA)?/.test(s)) return "CHA";
      return "";
    }

    var dcVal = normalizeAbility(saveVal);
    if (!dcVal) {
      var prepSave = this.getField("SaveHit0_display_" + row);
      if (prepSave) dcVal = normalizeAbility(prepSave.value);
    }
    if (!dcVal && notes) {
      var m2 = notes.match(/\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\b/i);
      if (m2) dcVal = normalizeAbility(m2[1]);
      else if (/attack/i.test(notes)) dcVal = "ATK";
    }

    dcField.value = dcVal || "";
  } 
  catch (e) {
    app.alert("Spell load error: " + e);
  }
}
