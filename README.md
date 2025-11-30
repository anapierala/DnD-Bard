DnD-Bard (Adobe Acrobat JavaScript Scripts)

This repository contains the source JavaScript used to power an Adobe Acrobat interactive character sheet for the 2014 Bard – College of Lore (Dungeons & Dragons 5e).

All code in this repo is designed to be copied directly into Acrobat’s Document JavaScripts or Field / Button scripts.
This repo also serves as the single source of truth for maintaining and updating the sheet’s logic.

📁 Repository Structure
DnD-Bard/
  doc-scripts/                # Acrobat "Document JavaScripts"
    00_helpers.js
    01_InitSpellSlots.js
    02_SyncAllSlots.js
    copyNotesToDescription.js
    ForceACUpdate.js

  field-scripts/              # Field-level and button/radio scripts
    CustomCalculationScripts.js

  docs/                       # Reference materials
    Field names-Bard-COLLEGE OF LORE.pdf

Document Scripts (doc-scripts/)

These files map 1:1 to Acrobat’s Document JavaScripts (Tools → JavaScript → Document JavaScripts).
Each file contains a standalone block of code that Acrobat stores under its script name (the filename before .js).

Field Scripts (field-scripts/)

CustomCalculationScripts.js contains all custom calculations, button handlers, radio choices, and utility code for individual fields.
Each block is preceded by a comment like:

// FIELD: Animal
// RADIO OPTION: HPAdjust  CHOICE: UpHP


Use these markers to locate the matching field inside Acrobat.

🔄 Workflow (Browser-Only)

You do not need Git installed or a local development environment.
The intended workflow uses only:

GitHub website

Adobe Acrobat

ChatGPT (Codex)

1. Updating Code in the Repo

Open any .js file in GitHub.

Click the pencil icon (“Edit this file”).

Copy the code block you want to modify into ChatGPT.

Receive the improved/fixed version.

Paste the updated code back into GitHub.

Commit the change.

2. Applying Changes to the PDF

In GitHub, open the updated .js file.

Click Raw and copy the plain text.

In Adobe Acrobat:

For document scripts → Tools → JavaScript → Document JavaScripts

For field scripts → field → Properties → Calculate / Validate / Format / Mouse Up

Paste the updated code.

Save the PDF.

🎯 Purpose of the Repo

Store all Acrobat JavaScript in source-controlled, human-readable form.

Allow ChatGPT to analyze/update the code directly from GitHub.

Make it easy to maintain advanced character sheet logic without searching through a PDF.

🧩 Future Expansion

This structure supports additional classes and rule sets.
When other sheets are added, follow this pattern:

acrobat/
  2014-bard-college-of-lore/
  2014-wizard-school-of-x/
  2024-bard/
  etc.
