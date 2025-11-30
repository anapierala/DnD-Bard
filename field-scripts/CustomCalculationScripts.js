// Auto-exported from Custom calculation scripts-Bard-COLLEGE OF LORE.docx
// FIELD / RADIO headers preserved as comments for reference only

// FIELD: CLASS LEVEL2
var f1 = this.getField("CLASS LEVEL");
if (f1) f1.value = event.value;

// FIELD: Weight Carried
(function () {
  function getWeight(str) {
    if (!str) return 0;
    str = String(str).replace(/[^\d.\-\.]/g, "");
    var n = parseFloat(str);
    return isNaN(n) ? 0 : n;
  }

  var total = 0;
  for (var i = 1; i <= 25; i++) {
    var f = this.getField("Eq Weight" + i);
    if (f) total += getWeight(f.valueAsString);
  }

  event.value = total > 0 ? util.printf("%.1f lb", total) : "";
})();

// FIELD: Encumbered
(function () {
  // helper (inline)
  function num(v){ v=String(v==null?"":v); var m=v.match(/[+\-]?\d+(\.\d+)?/); return m?Number(m[0]):0; }

  var strScore = num((this.getField("STR")||{}).valueAsString);
  var carried  = num((this.getField("Weight Carried")||{}).valueAsString);

  // Halfling (Small): capacity halved (PHB 2014 p.176)
  var sizeMult   = 0.5;
  var encThresh  = 5  * strScore * sizeMult;   // Encumbered (variant)
  var heavyThresh= 10 * strScore * sizeMult;   // Heavily Encumbered (variant)

  var status = "No";
  var chip = ["RGB", 0.5, 1.0, 0.0]; // vibrant green by default

  if (carried > heavyThresh) {
    status = "Heavily Encumbered";
    chip   = ["RGB", 0.85, 0.10, 0.10];        // red
  } else if (carried > encThresh) {
    status = "Encumbered";
    chip   = ["RGB", 1.00, 0.65, 0.00];        // amber
  }
  
  if (status === "Heavily Encumbered") {
      if (f) f.textColor = color.white;
    } else {
      if (f) f.textColor = color.black;
    }
  // set the text value
  event.value = status;

  // paint the chip button
  var b = this.getField("EncLight");
  if (b) {
    b.fillColor   = chip;
    b.strokeColor = color.black;

    // force redraw so it updates immediately even when not focused
    var d = b.display; b.display = display.hidden; b.display = d;
  }

  // also tint the Encumbered text field itself (optional)
  var f = this.getField("Encumbered");
  if (f) {
    f.fillColor = chip; f.textColor = color.black; f.strokeColor = color.black;
  }
})();

// FIELD: STRmod
var stat = this.getField("STR").value;
if (!isNaN(stat)) {
    var mod = Math.floor((stat - 10) / 2);
    if (mod > 0) {
        event.value = "+" + mod;
    } else {
        event.value = mod; // negative or zero
    }
} else {
    event.value = "";
}

// FIELD: DEXmod
var stat = this.getField("DEX").value;
if (!isNaN(stat)) {
    var mod = Math.floor((stat - 10) / 2);
    if (mod > 0) {
        event.value = "+" + mod;
    } else {
        event.value = mod; // negative or zero
    }
} else {
    event.value = "";
}

// FIELD: CONmod
var stat = this.getField("CON").value;
if (!isNaN(stat)) {
    var mod = Math.floor((stat - 10) / 2);
    if (mod > 0) {
        event.value = "+" + mod;
    } else {
        event.value = mod; // negative or zero
    }
} else {
    event.value = "";
}
// FIELD: INTmod
var stat = this.getField("INT").value;
if (!isNaN(stat)) {
    var mod = Math.floor((stat - 10) / 2);
    if (mod > 0) {
        event.value = "+" + mod;
    } else {
        event.value = mod; // negative or zero
    }
} else {
    event.value = "";
}

// FIELD: WISmod
var stat = this.getField("WIS").value;
if (!isNaN(stat)) {
    var mod = Math.floor((stat - 10) / 2);
    if (mod > 0) {
        event.value = "+" + mod;
    } else {
        event.value = mod; // negative or zero
    }
} else {
    event.value = "";
}

// FIELD: CHamod
var stat = this.getField("CHA").value;
if (!isNaN(stat)) {
    var mod = Math.floor((stat - 10) / 2);
    if (mod > 0) {
        event.value = "+" + mod;
    } else {
        event.value = mod; // negative or zero
    }
} else {
    event.value = "";
}

// FIELD: Acrobatics
var modRaw = this.getField("DEXmod").valueAsString || "";
var profLevel = this.getField("AcrobaticsProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;                // Proficient
} else if (profLevel === "E") {
    totalProf = profBonus * 2;            // Expertise
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2); // Half proficiency (Jack of All Trades, etc.)
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Animal
var modRaw = this.getField("WISmod").valueAsString || "";
var profLevel = this.getField("AnimalHandlingProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Arcana
var modRaw = this.getField("INTmod").valueAsString || "";
var profLevel = this.getField("ArcanaProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Athletics
var modRaw = this.getField("STRmod").valueAsString || "";
var profLevel = this.getField("AthleticsProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Deception
var modRaw = this.getField("CHamod").valueAsString || "";
var profLevel = this.getField("DeceptionProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: History
var modRaw = this.getField("INTmod").valueAsString || "";
var profLevel = this.getField("HistoryProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Insight
var modRaw = this.getField("WISmod").valueAsString || "";
var profLevel = this.getField("InsightProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Intimidation
var modRaw = this.getField("CHamod").valueAsString || "";
var profLevel = this.getField("IntimidationProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Investigation
var modRaw = this.getField("INTmod").valueAsString || "";
var profLevel = this.getField("InvestigationProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Medicine
var modRaw = this.getField("WISmod").valueAsString || "";
var profLevel = this.getField("MedicineProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Nature
var modRaw = this.getField("INTmod").valueAsString || "";
var profLevel = this.getField("NatureProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Perception
var modRaw = this.getField("WISmod").valueAsString || "";
var profLevel = this.getField("PerceptionProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Performance
var modRaw = this.getField("CHamod").valueAsString || "";
var profLevel = this.getField("PerformanceProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Persuasion
var modRaw = this.getField("CHamod").valueAsString || "";
var profLevel = this.getField("PersuasionProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Religion
var modRaw = this.getField("INTmod").valueAsString || "";
var profLevel = this.getField("ReligionProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: SleightofHand
var modRaw = this.getField("DEXmod").valueAsString || "";
var profLevel = this.getField("SleightOfHandProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Stealth
var modRaw = this.getField("DEXmod").valueAsString || "";
var profLevel = this.getField("StealthProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Survival
var modRaw = this.getField("WISmod").valueAsString || "";
var profLevel = this.getField("SurvivalProf").valueAsString || "";
var profRaw = this.getField("ProfBonus").valueAsString || "";

var abilityMod = parseInt(modRaw);
var profBonus = parseInt(profRaw);
if (isNaN(abilityMod)) abilityMod = 0;
if (isNaN(profBonus)) profBonus = 2;

var totalProf = 0;
if (profLevel === "P") {
    totalProf = profBonus;
} else if (profLevel === "E") {
    totalProf = profBonus * 2;
} else if (profLevel === "H") {
    totalProf = Math.floor(profBonus / 2);
}

var total = abilityMod + totalProf;
event.value = (total >= 0 ? "+" : "") + total;

// FIELD: Init
var dexRaw = this.getField("DEXmod").valueAsString || "";
var dexMod = parseInt(dexRaw);
if (isNaN(dexMod)) dexMod = 0;

var profBonus = Number(this.getField("ProfBonus").value);
if (isNaN(profBonus)) profBonus = 0;

var jackBonus = Math.floor(profBonus / 2);

var init = dexMod + jackBonus;

// Format with "+" for positive values
event.value = (init > 0 ? "+" : "") + init;

// FIELD: AC
var baseAC = 10;
var armorText = this.getField("Defenses").valueAsString;
var dexModRaw = this.getField("DEXmod").valueAsString;

var dexMod = parseInt(dexModRaw);
if (isNaN(dexMod)) dexMod = 0;

if (armorText) {
    var match = armorText.match(/AC\s*(\d+)/i);
    if (match && !isNaN(match[1])) {
        baseAC = parseInt(match[1]);
    }
}

event.value = baseAC + dexMod;

// FIELD: ProfBonus
var levelText = this.getField("CLASS LEVEL").valueAsString || "";
var levelMatch = levelText.match(/\d+/);
var level = levelMatch ? parseInt(levelMatch[0]) : 1;

// Determine Proficiency Bonus by level
var profBonus = 2;
if (level >= 17) profBonus = 6;
else if (level >= 13) profBonus = 5;
else if (level >= 9)  profBonus = 4;
else if (level >= 5)  profBonus = 3;

// Output with + sign
event.value = "+" + profBonus;

// FIELD: SpellsPerDay
// Determine Bard level from CLASS LEVEL or CLASS LEVEL2
var f1 = this.getField("CLASS LEVEL");
var f2 = this.getField("CLASS LEVEL2");

var txt = "";
if (f1 && f1.valueAsString) txt = f1.valueAsString;
else if (f2 && f2.valueAsString) txt = f2.valueAsString;

var m = txt.match(/\d+/);
var lvl = m ? Number(m[0]) : 0;

// Bard spells-known table (2014 PHB)
var bardSpellsKnown = {
    1: 4,
    2: 5,
    3: 6,
    4: 7,
    5: 8,
    6: 9,
    7: 10,
    8: 11,
    9: 12,
    10: 14,
    11: 15,
    12: 15,
    13: 16,
    14: 18,
    15: 19,
    16: 19,
    17: 20,
    18: 22,
    19: 22,
    20: 22
};

// Use the correct number or blank
event.value = bardSpellsKnown[lvl] || "";

// FIELD: Passive1
var wisMod = Number(this.getField("WISmod").value);
var prof = this.getField("PerceptionProf").value;
var profBonus = Number(this.getField("ProfBonus").value);

var passive = 10 + wisMod;

if (prof === "P") {
    passive += profBonus;
} else if (prof === "E") {
    passive += profBonus * 2;
} else if (prof === "H") {
    passive += Math.floor(profBonus / 2);
}

event.value = passive;

// FIELD: Passive2
var wisMod = Number(this.getField("WISmod").value);
var prof = this.getField("InsightProf").value;
var profBonus = Number(this.getField("ProfBonus").value);

var passive = 10 + wisMod;

if (prof === "P") {
    passive += profBonus;
} else if (prof === "E") {
    passive += profBonus * 2;
} else if (prof === "H") {
    passive += Math.floor(profBonus / 2);
}

event.value = passive;

// FIELD: Passive3
var intMod = Number(this.getField("INTmod").value);
var prof = this.getField("InvestigationProf").value;
var profBonus = Number(this.getField("ProfBonus").value);

var passive = 10 + intMod;

if (prof === "P") {
    passive += profBonus;
} else if (prof === "E") {
    passive += profBonus * 2;
} else if (prof === "H") {
    passive += Math.floor(profBonus / 2);
}

event.value = passive;

// RADIO OPTION: HPAdjust CHOICE: UpHP
// Get current and max HP values
var current = parseInt(this.getField("CurrentHP").value, 10);
var max = parseInt(this.getField("MaxHP").value, 10);

// Prevent going above Max HP
if (!isNaN(current) && !isNaN(max) && current < max) {
    current += 1;
    this.getField("CurrentHP").value = current;
}

// Visual feedback - turn button green temporarily
var btn = this.getField("UpHP");
btn.fillColor = color.green;
btn.textColor = color.white;

// Reset colors after 200ms
app.setTimeOut(function() {
    btn.fillColor = color.transparent;
    btn.textColor = color.black;
}, 200);

// RADIO OPTION: HPAdjust CHOICE: DownHP
// Get current HP
var current = parseInt(this.getField("CurrentHP").value, 10);

// Allow negative HP
if (!isNaN(current)) {
    current -= 1;
    this.getField("CurrentHP").value = current;
}

// Visual feedback - turn button red temporarily
var btn = this.getField("DownHP");
btn.fillColor = color.red;
btn.textColor = color.white;

// Reset colors after 200ms
app.setTimeOut(function() {
    btn.fillColor = color.transparent;
    btn.textColor = color.black;
}, 200);



// FIELD: SHORT
(function ShortRest() {
  try {
    // === HIT DICE PROMPT =======================================================
    var hdField = this.getField("HD");        // numeric remaining Hit Dice
    var totalField = this.getField("Total");  // e.g. "3d8" (used only for display)
    var totalDice = 0;

    if (totalField) {
      var match = String(totalField.value).match(/^(\d+)d/i);
      if (match) totalDice = parseInt(match[1], 10);
    }

    var currentHD = hdField ? parseInt(hdField.value, 10) : 0;
    if (isNaN(currentHD)) currentHD = 0;

    var diceSpent = 0; // track how many dice are spent this rest

    var input = app.response({
      cQuestion:
        "You have " + currentHD + " Hit Dice remaining.\n" +
        "How many would you like to spend? (Enter 0 to spend none)",
      cTitle: "Short Rest - Spend Hit Dice",
      cDefault: "0"
    });

    if (input !== null) {
      var diceToSpend = parseInt(input, 10);
      if (isNaN(diceToSpend) || diceToSpend < 0 || diceToSpend > currentHD) {
        app.alert("Please enter a number between 0 and " + currentHD + ".");
      } else if (diceToSpend > 0) {
        var newRemainingHD = currentHD - diceToSpend;
        if (hdField) hdField.value = newRemainingHD;
        diceSpent = diceToSpend;
        app.alert(
          "Marked " + diceToSpend + " Hit Dice as spent.\n" +
          "You now have " + newRemainingHD + " remaining."
        );
      } else {
        app.alert("You chose not to spend any Hit Dice this rest.");
      }
    }

    // === HELPER: GET BARD LEVEL ================================================
    function getBardLevel() {
      // Assumes CLASS LEVEL or CLASS LEVEL2 contains something like "Bard 3"
      var f1 = this.getField("CLASS LEVEL");
      var f2 = this.getField("CLASS LEVEL2");
      var txt = "";
      if (f1 && f1.valueAsString) txt = f1.valueAsString;
      else if (f2 && f2.valueAsString) txt = f2.valueAsString;
      var m = txt.match(/\d+/);
      return m ? Number(m[0]) : 0;
    }

    var bardLevel = getBardLevel.call(this);

    // Determine Song of Rest die size by Bard level
    var songDie = "d6"; // default (2nd–8th)
    if (bardLevel >= 17) {
      songDie = "d12";
    } else if (bardLevel >= 13) {
      songDie = "d10";
    } else if (bardLevel >= 9) {
      songDie = "d8";
    }

    // === SONG OF REST SECTION (BARD) ==========================================
    // Behavior:
    // - You MAY pre-check SongOfRest manually.
    // - Short Rest ALWAYS prompts whether to use it.
    // - If result is "use it", checkbox ends checked + read-only.
    // - If result is "do not use", checkbox ends unchecked + editable.
    var songField = this.getField("SongOfRest");
    var songUsed = false;

    if (songField && bardLevel >= 2) {

      var alreadyChecked = songField.isBoxChecked(0);

      var promptText =
        "Song of Rest (Bard Feature)\n\n" +
        "Bard Level: " + bardLevel + "\n" +
        "Current Song of Rest die: 1" + songDie + "\n\n" +
        "If you or any friendly creatures who can hear your performance " +
        "regain hit points at the end of this short rest by spending Hit Dice,\n" +
        "each of those creatures regains an extra 1" + songDie + " hit points.\n\n" +
        (alreadyChecked
          ? "Song of Rest is currently CHECKED.\nDo you want to treat it as used for this short rest?"
          : "Do you want to use Song of Rest for this short rest?");

      var useSong = app.alert({
        cMsg: promptText,
        nIcon: 2, // Question
        nType: 2, // Yes/No
        cTitle: "Song of Rest"
      });

      // 4 = Yes, 3 = No
      if (useSong === 4) {
        // Use Song of Rest: ensure checked and lock it
        songField.checkThisBox(0, true);
        songField.readonly = true;
        songUsed = true;
      } else {
        // Do NOT use Song of Rest: ensure unchecked and keep editable
        songField.checkThisBox(0, false);
        songField.readonly = false;
        songUsed = false;
      }
    }

    // === FINAL SUMMARY ========================================================
    var songUsedText = "";
    if (songField && bardLevel >= 2) {
      if (songUsed) {
        songUsedText =
          "• Song of Rest used: Yes (each eligible creature gains +1" +
          songDie + " HP).\n";
      } else {
        songUsedText = "• Song of Rest used: No.\n";
      }
    }

    app.alert({
      cMsg:
        "Short Rest complete!\n" +
        "• Hit Dice spent this rest: " + diceSpent + ".\n" +
        songUsedText,
      nIcon: 3,
      cTitle: "Short Rest Complete"
    });

  } catch (e) {
    app.alert("Short Rest Error: " + e);
    console.println("[ShortRest ERROR] " + e);
  }
})();

SyncSlotsAcrossPages();

// FIELD: LONG
(function() {
  try {
    // === Clear Death Saves ===
    ["S1", "S2", "S3", "F1", "F2", "F3"].forEach(function(name) {
      var f = this.getField(name);
      if (f) f.checkThisBox(0, false);
    }, this);

    // === Parse Total Hit Dice from "3d8" ===
    var totalField = this.getField("Total");
    var totalDice = 0;
    if (totalField) {
      var match = String(totalField.value).match(/^(\d+)d/i);
      if (match) totalDice = parseInt(match[1], 10);
    }

    // === Recover Half (Rounded Down) ===
    var recoveredDice = Math.floor(totalDice / 2);

    // === Get Current Remaining Dice from HD field ===
    var hdField = this.getField("HD");
    var currentRemaining = parseInt(hdField ? hdField.value : 0, 10);
    if (isNaN(currentRemaining)) currentRemaining = 0;
    var newRemaining = currentRemaining + recoveredDice;
    if (newRemaining > totalDice) newRemaining = totalDice;
    if (hdField) hdField.value = newRemaining;

    // === Reset Temporary HP ===
    var tempField = this.getField("TempHP");
    if (tempField) tempField.value = 0;

    // === Fully Restore HP ===
    var maxField = this.getField("MaxHP");
    var curField = this.getField("CurrentHP");
    if (maxField && curField) curField.value = maxField.value;

    // === Reset Song of Rest checkbox (Bard feature) ============================
    var songField = this.getField("SongOfRest");
    if (songField) {
      songField.checkThisBox(0, false);  // clear the check
      songField.readonly = false;        // make it editable again
    }

    // === Reset Bardic Inspiration (Current = Max) =============================
    var biMax = this.getField("BardicInspirationMax");
    var biCur = this.getField("BardicInspirationCurrent");

    if (biMax && biCur) {
      var maxUses = parseInt(biMax.value, 10);
      if (!isNaN(maxUses)) {
        biCur.value = maxUses;
      } else {
        biCur.value = "";
      }
    }

    // === Reinitialize Spell Slots (reset all to maximum) ======================
    // Bard is a full caster, so uses the same progression as a wizard.
    var FULL_CASTER_SLOTS = {
      1:[2], 2:[3], 3:[4,2], 4:[4,3], 5:[4,3,2], 6:[4,3,3],
      7:[4,3,3,1], 8:[4,3,3,2], 9:[4,3,3,3,1], 10:[4,3,3,3,2],
      11:[4,3,3,3,2,1], 12:[4,3,3,3,2,1], 13:[4,3,3,3,2,1,1],
      14:[4,3,3,3,2,1,1], 15:[4,3,3,3,2,1,1,1], 16:[4,3,3,3,2,1,1,1],
      17:[4,3,3,3,2,1,1,1,1], 18:[4,3,3,3,3,1,1,1,1],
      19:[4,3,3,3,3,2,1,1,1], 20:[4,3,3,3,3,2,2,1,1]
    };

    function getCasterLevel() {
      var f1 = this.getField("CLASS LEVEL");
      var f2 = this.getField("CLASS LEVEL2");
      var txt = "";
      if (f1 && f1.valueAsString) txt = f1.valueAsString;
      else if (f2 && f2.valueAsString) txt = f2.valueAsString;
      var m = txt.match(/\d+/);
      return m ? Number(m[0]) : 0;
    }

    var lvl = getCasterLevel.call(this);
    var defaults = FULL_CASTER_SLOTS[lvl] || [];
    var totalSlots = 0;

    for (var i = 1; i <= defaults.length; i++) {
      var f = this.getField("Slots0_" + i);
      var maxSlots = defaults[i - 1] || 0;
      if (f) {
        f.value = maxSlots;
        totalSlots += maxSlots;
      }
    }

    // === Update SpellsRemaining ===
    var fSR = this.getField("SpellsRemaining");
    if (fSR) fSR.value = totalSlots;

    // === Done ===
    app.alert(
      "Long Rest complete!\n" +
      "• HP fully restored.\n" +
      "• Hit Dice recovered: " + recoveredDice + " (now " + newRemaining + " / " + totalDice + ").\n" +
      "• Temp HP cleared.\n" +
      "• Death saves cleared.\n" +
      "• Spell slots reset to maximum (" + totalSlots + " total).\n" +
      "• Song of Rest reset."
    );

    console.println("[LongRest] Complete");

  } catch (e) {
    app.alert("Long Rest Error: " + e);
    console.println("[LongRest ERROR] " + e);
  }
})();

SyncSlotsAcrossPages();

// FIELD: UseBardicInspiration
(function () {
  var curField = this.getField("BardicInspirationCurrent");
  var maxField = this.getField("BardicInspirationMax");

  if (!curField || !maxField) return;

  var current = parseInt(curField.value, 10);
  var max = parseInt(maxField.value, 10);

  // If current is blank, initialize it to max
  if (isNaN(current)) current = max;

  if (current <= 0) {
    app.alert("No Bardic Inspiration uses remaining.");
    return;
  }

  current -= 1;
  curField.value = current;
})();

// FIELD: InspirationDie
// Determine Bard level from CLASS LEVEL or CLASS LEVEL2
var f1 = this.getField("CLASS LEVEL");
var f2 = this.getField("CLASS LEVEL2");

var txt = "";
if (f1 && f1.valueAsString) txt = f1.valueAsString;
else if (f2 && f2.valueAsString) txt = f2.valueAsString;

// Extract the number portion (e.g. "Bard 3")
var m = txt.match(/\d+/);
var bardLevel = m ? Number(m[0]) : 0;

// Default die at low levels
var die = "d6";

// Apply proper tiering
if (bardLevel >= 15) {
    die = "d12";
} else if (bardLevel >= 10) {
    die = "d10";
} else if (bardLevel >= 5) {
    die = "d8";
}

// Output final result
event.value = die;

// FIELD: BardicInspirationMax
// Get Bard level from CLASS LEVEL / CLASS LEVEL2
var f1 = this.getField("CLASS LEVEL");
var f2 = this.getField("CLASS LEVEL2");
var txt = "";

if (f1 && f1.valueAsString) {
  txt = f1.valueAsString;
} else if (f2 && f2.valueAsString) {
  txt = f2.valueAsString;
}

var m = txt.match(/\d+/);
var bardLevel = m ? Number(m[0]) : 0;

// If not at least level 1 Bard, show nothing / 0
if (!bardLevel || bardLevel < 1) {
  event.value = "";
} else {
  // Bardic Inspiration uses = CHA mod (minimum 1)
  var chaField = this.getField("CHamod");
  var chaMod = chaField ? Number(chaField.value) : 0;
  if (isNaN(chaMod)) chaMod = 0;

  var uses = chaMod;
  if (uses < 1) uses = 1;

  event.value = uses;
}

// FIELD: Button3
SyncSlotsAcrossPages();

// FIELD: spellSaveDC
// Get proficiency bonus and spellcasting ability modifier
var prof = this.getField("Proficiency").value;
var abilityMod = this.getField("CHamod").value; // Bards use CHA

// Make sure values are numbers
prof = Number(prof);
abilityMod = Number(abilityMod);

// Only calculate if both are valid numbers
if (!isNaN(prof) && !isNaN(abilityMod)) {
    event.value = 8 + prof + abilityMod;
} else {
    event.value = "";
}

// FIELD: spellAtkBonus
var prof = this.getField("Proficiency").value;
var chaMod = this.getField("CHamod").value;

if (!isNaN(prof) && !isNaN(chaMod)) {
    var bonus = Number(prof) + Number(chaMod);
    event.value = (bonus > 0 ? "+" : "") + bonus;
} else {
    event.value = "";
}

// FIELD: AddSpell
/************* AddSpell Button Script — Fixed Page Number Bug *************/

function getNum(fName) {
  var f = this.getField(fName);
  if (!f) return 0;
  var n = parseInt(f.value, 10);
  return isNaN(n) ? 0 : n;
}

try {
  var lvlField = this.getField("CLASS LEVEL");
  if (!lvlField) {
    app.alert("Missing CLASS LEVEL field.");
  } else {
    var lvlMatch = String(lvlField.value).match(/\d+/);
    if (!lvlMatch) {
      app.alert("Could not determine Bard level.");
    } else {
      var wizLevel = parseInt(lvlMatch[0], 10);

      var spellLvl = app.response({
        cQuestion: "Enter the spell level to add (0 for cantrips):",
        cTitle: "Add Spell",
        cDefault: "0"
      });

      if (spellLvl !== null) {
        spellLvl = parseInt(spellLvl, 10);
        if (isNaN(spellLvl) || spellLvl < 0 || spellLvl > 9) {
          app.alert("Please enter a spell level between 0 and 9.");
        } else {
          var maxRows = 50;
          var targetPrefix = "SpellName" + spellLvl + "_";
          var foundRow = -1;

          for (var i = 0; i < maxRows; i++) {
            var f = this.getField(targetPrefix + i);
            if (f && (!f.value || String(f.value).trim() === "")) {
              foundRow = i;
              break;
            }
          }

          if (foundRow === -1) {
            app.alert("No available rows left for spell level " + spellLvl + ".");
          } else {
            var spellName = app.response("Enter Spell Name:");
            if (spellName) {

              // Simulated Dropdown for Spell Source
              var srcPrompt =
                "Select the spell’s source by typing one of the following:\n\n" +
                "Wizard, Sorcerer, Cleric, Druid, Warlock, Bard, Paladin, Ranger, Artificer";
              var spellSource = app.response({
                cQuestion: srcPrompt,
                cTitle: "Spell Source",
                cDefault: "Bard"
              }) || "Bard";

              // Normalize capitalization
              spellSource = spellSource.charAt(0).toUpperCase() + spellSource.slice(1).toLowerCase();

              var castingTime = app.response("Enter Casting Time (e.g., 1 action, 1 bonus action):") || "";
              var spellRange  = app.response("Enter Range (e.g., 30 ft, Touch, Self):") || "";
              var duration    = app.response("Enter Duration (e.g., Concentration, 1 minute):") || "";

              // ✅ Force clean string for page number
              var pageStr = app.response("Enter Page Number (PHB or Sourcebook):") || "";
              pageStr = String(pageStr).trim();

              // Simulated Dropdown for SaveHit
              var savePrompt =
                "Select saving throw or attack type (enter one):\n\n" +
                "STR, DEX, CON, INT, WIS, CHA, or Attack";
              var saveHit = app.response({
                cQuestion: savePrompt,
                cTitle: "Save / Attack Type",
                cDefault: ""
              }) || "";

              saveHit = saveHit.toUpperCase();

              var notesPrompt = "Enter Notes / Description:\n\nUse \\n for new lines between sections.";
              var sNotes = app.response(notesPrompt) || "";

              function fillField(name, val) {
                var f = this.getField(name);
                if (f) {
                  f.value = String(val); // Ensure plain text assignment
                }
              }

              fillField.call(this, "SpellName"   + spellLvl + "_" + foundRow, spellName);
              fillField.call(this, "SpellSource" + spellLvl + "_" + foundRow, spellSource);
              fillField.call(this, "CastingTime" + spellLvl + "_" + foundRow, castingTime);
              fillField.call(this, "Range"       + spellLvl + "_" + foundRow, spellRange);
              fillField.call(this, "Duration"    + spellLvl + "_" + foundRow, duration);
              fillField.call(this, "Source"      + spellLvl + "_" + foundRow, pageStr); // ✅ fixed
              fillField.call(this, "SaveHit"     + spellLvl + "_" + foundRow, saveHit);

              var nField = this.getField("Notes" + spellLvl + "_" + foundRow);
              if (nField) {
                var plain = sNotes.replace(/\\n/g, "\r").replace(/\n/g, "\r");
                nField.value = plain;
              }

              app.alert("✅ Added " + spellName + " to Spell Level " + spellLvl +
                        " (row " + foundRow + ")");
            }
          }
        }
      }
    }
  }
} catch(e) {
  app.alert("Error: " + e);
}

/************* end *************/


// FIELD: PrepSpell
(function PrepSpell() {
  try {
    console.println("[PrepSpell] Start");

    // === SETTINGS ============================================================
    var MAX_ROWS       = 28;   // Number of rows in your display table
    var START_PAGE_LVL = 0;    // Cantrips start at 0
    var END_PAGE_LVL   = 9;    // Up to level 9
    var ROWS_PER_PAGE  = 50;   // 0–49 per page
    var PREP_LIMIT_USE = true; // Use Bard spells-known limit

    // === HELPER FUNCTIONS ====================================================
    function getIntField(name) {
      var f = this.getField(name);
      if (!f) return 0;
      var m = String(f.value).match(/-?\d+/);
      return m ? parseInt(m[0], 10) : 0;
    }

    // For Bards: limit by "SpellsKnown" instead of INT+level
    // If your field is named differently, change "SpellsKnown" below.
    function getBardSpellLimit() {
      var known = getIntField.call(this, "SpellsKnown");
      if (known <= 0) {
        // Fallback: no meaningful limit if field is empty
        return MAX_ROWS;
      }
      return known;
    }

    function clearPreparedTable(maxRows) {
      var cols = [
        "SpellName0_display_","SpellSource0_display_","SaveHit0_display_",
        "CastingTime0_display_","Range0_display_","Duration0_display_",
        "SpellLevel0_display_","Notes0_display_"
      ];
      for (var i = 1; i <= maxRows; i++) {
        for (var c = 0; c < cols.length; c++) {
          var f = this.getField(cols[c] + i);
          if (f) f.value = "";
        }
        var p = this.getField("Prep0_display_" + i);
        if (p) p.checkThisBox(0, false);
      }
    }

    // === START ===============================================================
    clearPreparedTable.call(this, MAX_ROWS);

    var prepLimit = PREP_LIMIT_USE ? getBardSpellLimit.call(this) : MAX_ROWS;
    var nextRow   = 1;
    var filled    = 0;  // leveled spells copied
    var cantrips  = 0;  // cantrips copied

    // Loop through spell levels 0–9
    for (var L = START_PAGE_LVL; L <= END_PAGE_LVL; L++) {
      var pageLevelField = this.getField("spellCastingLevel" + L);
      var pageLevelValue = pageLevelField ? String(pageLevelField.value).trim() : String(L);

      // Loop through rows on each source page
      for (var r = 0; r < ROWS_PER_PAGE; r++) {
        if (nextRow > MAX_ROWS) break;
        if (PREP_LIMIT_USE && filled >= prepLimit) break;

        var prep = this.getField("Prep" + L + "_" + r);
        if (!prep || !prep.isBoxChecked(0)) continue;

        var nameF = this.getField("SpellName" + L + "_" + r);
        if (!nameF || String(nameF.value).trim() === "") continue;

        var srcF   = this.getField("SpellSource" + L + "_" + r);
        var saveF  = this.getField("SaveHit" + L + "_" + r);
        var timeF  = this.getField("CastingTime" + L + "_" + r);
        var rangeF = this.getField("Range" + L + "_" + r);
        var durF   = this.getField("Duration" + L + "_" + r);

        // === POPULATE DISPLAY TABLE ==========================================
        this.getField("SpellName0_display_"   + nextRow).value = nameF.valueAsString || "";
        this.getField("SpellSource0_display_" + nextRow).value = srcF   ? srcF.valueAsString   : "";
        this.getField("SaveHit0_display_"     + nextRow).value = saveF  ? saveF.valueAsString  : "";
        this.getField("CastingTime0_display_" + nextRow).value = timeF  ? timeF.valueAsString  : "";
        this.getField("Range0_display_"       + nextRow).value = rangeF ? rangeF.valueAsString : "";
        this.getField("Duration0_display_"    + nextRow).value = durF   ? durF.valueAsString   : "";
        this.getField("SpellLevel0_display_"  + nextRow).value = pageLevelValue;

        // Store reference to source Notes field (no Notes text copied)
        var refTag = "Page:" + L + "_Row:" + r;
        var notesF = this.getField("Notes0_display_" + nextRow);
        if (notesF) notesF.value = refTag;

        // === COUNT LEVELED SPELLS vs CANTRIPS =================================
        var spellLvl = parseInt(pageLevelValue, 10);
        if (spellLvl > 0) {
          filled++;
        } else {
          cantrips++;
        }

        nextRow++;
      }
    }

    // === SUMMARY =============================================================
    var msg = "Prepared " + filled + " leveled spells";
    if (cantrips > 0) msg += " and " + cantrips + " cantrips";
    msg += " for today.";

    app.alert(msg, 3);
    console.println("[PrepSpell] Done — " + msg);

  } catch (e) {
    console.println("[PrepSpell ERROR] " + e);
    app.alert("PrepSpell error: " + e);
  }
})();

// FIELD: CastSpell
(function CastSpell(){
  try {
    console.println("[CastSpell] Start");
    var MAX_ROWS = 28;

    // --- helpers ---
    function getInt(name){
      var f=this.getField(name); if(!f)return 0;
      var m=String(f.value).match(/-?\d+/); return m?parseInt(m[0],10):0;
    }

    // find selected prepared row
    var row=0;
    for(var i=1;i<=MAX_ROWS;i++){
      var p=this.getField("Prep0_display_"+i);
      if(p && p.isBoxChecked(0)){ row=i; break; }
    }
    if(!row){ app.alert("Select a prepared spell first.",3); return; }

    // read spell data
    var nameF=this.getField("SpellName0_display_"+row);
    var lvlF=this.getField("SpellLevel0_display_"+row);
    var refF=this.getField("Notes0_display_"+row);
    var spellName=nameF?nameF.valueAsString:"Unknown Spell";
    var level=lvlF?parseInt(String(lvlF.value).match(/\d+/)):0;
    if(isNaN(level)) level=0;

    // spend slot (skip cantrips)
    if(level>=1 && level<=9){
      var slotName="Slots0_"+level;
      var slotVal=getInt.call(this,slotName);
      if(slotVal<=0){ app.alert("No level "+level+" spell slots remain.",3); return; }
      this.getField(slotName).value=slotVal-1;

      // decrement SpellsRemaining
      var fSR=this.getField("SpellsRemaining");
      if(fSR) fSR.value=Math.max(0,getInt.call(this,"SpellsRemaining")-1);
    }

    // show description from original Notes field
    var desc=this.getField("spellDescription");
    if(desc && refF){
      var ref=String(refF.value);
      var m=ref.match(/Page:(\d+)_Row:(\d+)/);
      if(m){
        var src=this.getField("Notes"+m[1]+"_"+m[2]);
        desc.value=src?src.valueAsString:"";
      } else desc.value=refF.valueAsString||"";
    }

    // gray row lightly (optional visual cue)
    var cols=["SpellName0_display_","SpellSource0_display_","SaveHit0_display_",
              "CastingTime0_display_","Range0_display_","Duration0_display_",
              "SpellLevel0_display_"];
    for(var c=0;c<cols.length;c++){
      var f=this.getField(cols[c]+row);
      if(f) f.fillColor=color.ltGray;
    }

    app.alert("Cast "+spellName+" (Level "+level+")",3);
    console.println("[CastSpell] Done – "+spellName);
  }catch(e){ console.println("[CastSpell ERROR] "+e); app.alert("CastSpell error: "+e); }
})();

// FIELD: ViewSpellDescription
// === View Full Spell Description ===
(function ViewFullSpellDescription() {
  try {
    var descField = this.getField("spellDescription");
    if (!descField) {
      app.alert("Description field not found.", 3);
      return;
    }

    var text = descField.valueAsString.trim();
    if (!text) {
      app.alert("No spell description available.", 3);
      return;
    }

    // Create a nice scrollable-style dialog
    var lines = text.split(/\r?\n/);
    var preview = lines.slice(0, 10).join("\n"); // show first 10 lines
    var showFull = lines.length > 10;

    // Optionally show a preview before expanding
    if (showFull) {
      var choice = app.alert({
        cTitle: "Spell Description Preview",
        cMsg: preview + "\n\n(Press OK to view the full description.)",
        nIcon: 3,
        nType: 1
      });
      if (choice !== 1) return; // Cancel pressed
    }

    // Display full description in scrollable modal
    app.alert({
      cTitle: "Full Spell Description",
      cMsg: text,
      nIcon: 3
    });

  } catch (err) {
    app.alert("Error displaying spell description: " + err);
    console.println("[ViewFullSpellDescription ERROR] " + err);
  }
})();

// FIELD: Animal
