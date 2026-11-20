# CBR Daniel

Persian-language PWA to prepare for the Dutch CBR car theory exam (rijbewijs B), in the new exam format
(since 7 April 2025: 50 counted questions + 2 test questions + 2 warm-up questions, 30 minutes, pass mark 44/50).

- 8 chapters following the official CBR exam topics, lessons with picture theory cards (Persian narration) and practice questions
  in every CBR format (ja/nee, meerkeuze, getal invullen, aanklikken, volgorde, meerdere antwoorden, animation questions).
- Full mock exam like the CBR, mini exams per lesson, mistakes review with spaced repetition, sign dictionary (RVV Bijlage 1), NL/EN glossary.
- Every answer has a Persian explanation with Dutch/English exam terms and the law article.

All questions and explanations are written from scratch, based on the law text (RVV 1990, BWBR0004825, version 2026-07-01)
and official CBR information. Not affiliated with the CBR. The CBR website and the law always prevail: https://www.cbr.nl

Tools: `node tools/validate.js` (checks all content and renders every scene), `tools/gallery.html?l=<lesson>` (scene preview),
`python3 tools/audio_worker.py` (narration; needs `GEMINI_API_KEY` in the environment, never stored).

ساخته شده توسط Daniel Mozafari
