// Auto-exported from 02_SyncAllSlots-Bard-COLLEGE OF LORE.docx

function SyncSlotsAcrossPages() {
  try {
    console.println("[SyncSlotsAcrossPages] Starting sync...");

    // Loop through spell levels 1–9 (Slots0_1 → Slots0_9)
    for (var spellLevel = 1; spellLevel <= 9; spellLevel++) {
      var masterField = this.getField("Slots0_" + spellLevel);
      if (!masterField) continue;
      var masterValue = masterField.value;

      // Copy this spell level’s value to all pages’ same slot index
      for (var pageIndex = 1; pageIndex <= 9; pageIndex++) {
        var targetName = "Slots" + pageIndex + "_" + spellLevel;
        var targetField = this.getField(targetName);
        if (targetField) targetField.value = masterValue;
      }
    }

    console.println("[SyncSlotsAcrossPages] Completed successfully.");
  } catch (e) {
    console.println("[SyncSlotsAcrossPages Error] " + e);
  }
}
