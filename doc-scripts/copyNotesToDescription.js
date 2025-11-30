// Auto-exported from copyNotesToDescription-Bard-COLLEGE OF LORE.docx

function copyNotesToDescription(prepFieldName) {
  try {
    var parts = prepFieldName.match(/Prep(\d+)_(\d+)/);
    if (!parts) return;
    var lvl = parts[1];
    var row = parts[2];

    var notesField = this.getField("Notes" + lvl + "_" + row);
    var descField  = this.getField("spellDescription" + lvl);

    if (!notesField || !descField) return;

    var prepField = this.getField(prepFieldName);
    var isChecked = prepField.value === "Yes" || prepField.isBoxChecked(0);

    if (isChecked) {
      descField.value = String(notesField.value || "").replace(/\\n/g, "\r");
    } else {
      descField.value = "";
    }
  } catch(e) {
    app.alert("Error copying notes: " + e);
  }
}
