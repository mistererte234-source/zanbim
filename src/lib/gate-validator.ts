import { ItemPayload, ValidationResult } from "./types";
import { VALID_SKILL_CODES } from "./taxonomy";

export function validateItemGate(item: any): ValidationResult {
  const errors: string[] = [];

  if (!item || typeof item !== "object") {
    return { valid: false, errors: ["Payload item tidak valid / bukan object."] };
  }

  // 1. Wajib ada ID, version, track, subtest, skill, difficulty
  if (!item.id || typeof item.id !== "string") errors.push("Field 'id' wajib diisi.");
  if (!item.version || typeof item.version !== "number") errors.push("Field 'version' wajib bernilai angka.");
  if (!item.track || !["UTBK", "CPNS"].includes(item.track)) errors.push("Field 'track' harus 'UTBK' atau 'CPNS'.");
  if (!item.subtest || typeof item.subtest !== "string") errors.push("Field 'subtest' wajib diisi.");
  
  // 2. Skill taxonomy check
  if (!item.skill || !VALID_SKILL_CODES.has(item.skill)) {
    errors.push(`Skill '${item.skill}' tidak terdaftar dalam Taxonomy v1.`);
  }

  // 3. Stem check
  if (!item.stem || typeof item.stem !== "string" || item.stem.trim().length === 0) {
    errors.push("Field 'stem' (soal) tidak boleh kosong.");
  }

  // 4. Options check (A-E)
  if (!item.options || typeof item.options !== "object") {
    errors.push("Field 'options' wajib berupa object A-E.");
  } else {
    const keys = ["A", "B", "C", "D", "E"];
    for (const key of keys) {
      if (!item.options[key] || typeof item.options[key] !== "string" || item.options[key].trim().length === 0) {
        errors.push(`Opsi '${key}' tidak boleh kosong.`);
      }
    }
  }

  // 5. Item Type specific checks
  if (item.item_type === "mcq") {
    if (!["A", "B", "C", "D", "E"].includes(item.answer)) {
      errors.push("Opsi kunci 'answer' untuk MCQ harus A, B, C, D, atau E.");
    }
  } else if (item.item_type === "tkp_likert") {
    if (!item.tkp_key || typeof item.tkp_key !== "object") {
      errors.push("Field 'tkp_key' wajib berupa object skor opsi (A-E: 1..5).");
    } else {
      const keys = ["A", "B", "C", "D", "E"];
      const scores = keys.map((k) => item.tkp_key[k]);
      
      let countFives = 0;
      for (const k of keys) {
        const val = item.tkp_key[k];
        if (typeof val !== "number" || val < 1 || val > 5) {
          errors.push(`Skor TKP untuk opsi '${k}' harus angka 1 - 5.`);
        }
        if (val === 5) countFives++;
      }

      if (countFives !== 1) {
        errors.push(`Soal TKP wajib memiliki TEPAT SATU opsi dengan skor 5 (ditemukan: ${countFives}).`);
      }
    }
  } else {
    errors.push("Field 'item_type' harus 'mcq' atau 'tkp_likert'.");
  }

  // 6. Solution validation
  if (!item.solution || typeof item.solution !== "object") {
    errors.push("Field 'solution' wajib berupa object {concept, steps, traps}.");
  } else {
    if (!item.solution.concept || typeof item.solution.concept !== "string") {
      errors.push("Solution 'concept' wajib diisi.");
    }
    if (!Array.isArray(item.solution.steps) || item.solution.steps.length < 2) {
      errors.push("Solution 'steps' wajib memiliki minimal 2 langkah penjelasan (steps.length >= 2).");
    }
    if (!item.solution.traps || typeof item.solution.traps !== "object") {
      errors.push("Solution 'traps' wajib berupa object.");
    } else {
      // Validate traps for MCQ non-answers or TKP low scores (<= 2)
      if (item.item_type === "mcq" && item.answer) {
        const keys = ["A", "B", "C", "D", "E"].filter((k) => k !== item.answer);
        for (const k of keys) {
          if (!item.solution.traps[k]) {
            errors.push(`Jebakan ('traps') untuk opsi salah '${k}' belum diisi.`);
          }
        }
      } else if (item.item_type === "tkp_likert" && item.tkp_key) {
        const keys = ["A", "B", "C", "D", "E"].filter((k) => item.tkp_key[k] <= 2);
        for (const k of keys) {
          if (!item.solution.traps[k]) {
            errors.push(`Jebakan ('traps') untuk opsi skor rendah '${k}' (skor <= 2) belum diisi.`);
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
