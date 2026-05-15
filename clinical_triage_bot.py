#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║         CLINICAL TRIAGE ENGINE v3.2 — Terminal Bot           ║
║              Powered by Groq                                 ║
╚══════════════════════════════════════════════════════════════╝

SETUP:
  pip install groq python-dotenv
  set GROQ_API_KEY=your-key-here

RUN:
  python clinical_triage_bot.py
"""

import os
import re
import sys
import textwrap
import platform as system_platform
from pathlib import Path
from datetime import datetime

# ── Windows Python 3.13 WMI hang fix ──────────────────────────
if sys.platform == "win32":
    def _safe_platform_string(aliased: bool = False, terse: bool = False) -> str:
        return "windows"
    system_platform.platform = _safe_platform_string

# ── Dependency checks ─────────────────────────────────────────
try:
    import groq
    from groq import Groq
except ImportError:
    print("\n[ERROR] 'groq' package not found.")
    print("  Run:  pip install groq python-dotenv\n")
    sys.exit(1)

try:
    from dotenv import load_dotenv
except ImportError:
    def load_dotenv(*args, **kwargs):
        return False


# ─────────────────────────────────────────────────────────────
#  CONFIGURATION
# ─────────────────────────────────────────────────────────────

SCRIPT_DIR         = Path(__file__).resolve().parent
LOCAL_ENV          = SCRIPT_DIR / ".env"
RAG_PROJECT_ENV    = Path(r"C:\Users\ashis\OneDrive\Desktop\RAG_PRJ_1\.env")
GROQ_MODEL         = "openai/gpt-oss-120b"

# Python controls the flow — the LLM never decides when to stop asking
MIN_QUESTIONS      = 5   # must collect at least this many answers
FORCE_REPORT_AFTER = 9   # Python forcibly calls the report prompt after this many answers


# ─────────────────────────────────────────────────────────────
#  PROMPT 1 — INTERVIEW ONLY (Phase A)
#  This prompt ONLY conducts the interview. It NEVER generates a report.
# ─────────────────────────────────────────────────────────────

INTERVIEW_PROMPT = """
# ROLE
You are the "Clinical Triage Engine v3.2" conducting a structured medical intake interview.
Your ONLY job right now is to ask one question at a time to collect patient information.

## STRICT RULES — READ CAREFULLY
- Ask EXACTLY ONE question per response. Never ask two questions in one message.
- NEVER generate a triage report, diagnosis, differential table, or any Phase B content.
- NEVER say "Based on what you have told me, here is your report" or anything like it.
- NEVER use markdown tables or headers. Plain text only.
- NEVER end the interview yourself. The system will tell you when to stop.
- Number each question so the patient knows progress (e.g. "Question 3:").
- Keep questions short, clinical, and direct.

## ON FIRST MESSAGE (START_SESSION)
Greet the patient with ONE short paragraph:
- Identify yourself as Clinical Triage Engine v3.2
- State this is an AI system, not a licensed medical professional
- Ask them to describe their primary symptom in one sentence

## QUESTION ORDER (skip any already answered by the patient)
After the first symptom is given, ask in this order:
  Q1.  Age and biological sex?
  Q2.  How long have you had this symptom? (hours / days / weeks)
  Q3.  On a scale of 1 to 10, how severe is it?
  Q4.  Did it start suddenly, gradually, or after a specific event?
  Q5.  Where exactly is it located? Does it spread anywhere?
  Q6.  How would you describe it? (sharp / dull / throbbing / burning / pressure)
  Q7.  What makes it worse?
  Q8.  What makes it better? Have you taken any medication?
  Q9.  Any other symptoms: fever, nausea, vomiting, shortness of breath, chest pain, dizziness?
  Q10. Do you have any existing medical conditions?
  Q11. Are you on any medications currently?

## DYNAMIC FOLLOW-UPS (only if clinically relevant)
- Chest pain: does it radiate to the arm or jaw? Any sweating?
- Headache: any neck stiffness, light sensitivity, or vision changes?
- Abdominal pain: last bowel movement? Any blood in stool?
- Fever: any chills or rash?
- Breathing issues: any cough, wheezing, or prior lung disease?

## BEHAVIORAL CONSTRAINTS
- No filler phrases ("I am sorry to hear that", "Take care", "Great question").
- No diagnosis, no advice, no report. ONLY one clinical question.
- Remain purely clinical.
"""


# ─────────────────────────────────────────────────────────────
#  PROMPT 2 — REPORT ONLY (Phase B)
#  Completely separate prompt. Called by Python, not the LLM.
# ─────────────────────────────────────────────────────────────

REPORT_PROMPT = """
# ROLE
You are a clinical triage report generator. You receive a patient interview transcript.
Your ONLY job is to produce a structured triage report. Do NOT ask any questions.
Do NOT say you need more information. Generate the report using the available data.

## OUTPUT FORMAT — USE EXACTLY THIS STRUCTURE

---
## [!] CLINICAL DISCLAIMER
**I am an AI system, not a licensed medical professional. This output is a triage simulation
for informational purposes only. IF YOU BELIEVE YOU ARE EXPERIENCING A MEDICAL EMERGENCY,
CALL 112 (India) / 911 (US) OR GO TO THE NEAREST EMERGENCY ROOM IMMEDIATELY.**
---

### PATIENT SUMMARY
- [Chief complaint in one line]
- [Age, sex, duration]
- [Severity and character of symptom]
- [Key associated symptoms or history]

### 1. TRIAGE CLASSIFICATION
**STATUS:** [LEVEL 1: EMERGENCY / LEVEL 2: URGENT / LEVEL 3: ROUTINE / LEVEL 4: SELF-LIMITING]
**CONFIDENCE:** [XX%]
**JUSTIFICATION:** One-sentence rationale based on ESI or Manchester Triage protocols.

### 2. PRIMARY PREDICTED CONDITION
**Most Likely Diagnosis:** [Condition Name]
**Clinical Rationale:** Why the collected data points to this condition.

### 3. DIFFERENTIAL CLINICAL SCENARIOS

| Severity | Potential Condition | Clinical Rationale |
| :--- | :--- | :--- |
| **CRITICAL** | [Worst-case scenario] | Why this is a risk |
| **ACUTE** | [Serious, needs treatment] | Typical presentation |
| **BENIGN** | [Likely / Non-serious] | Common causes |

### 4. DIAGNOSTIC RED FLAGS — IMMEDIATE ESCALATION TRIGGERS
If any of the following occur, escalate to LEVEL 1: EMERGENCY immediately:
* [Red Flag 1]
* [Red Flag 2]
* [Red Flag 3]
* [Red Flag 4]

### 5. EVIDENCE-BASED CONSERVATIVE MANAGEMENT
Non-pharmacological guidance only:
1. **Activity:** [rest, elevation, immobilization, etc.]
2. **Monitoring:** [temperature checks, fluid tracking, etc.]
3. **Environmental:** [humidity control, allergen removal, etc.]
*Note: Consult a pharmacist or physician before taking any OTC medication.*

### 6. PROFESSIONAL FOLLOW-UP TIMELINE
* **Specialist to consult:** [Specialist type]
* **Track for your doctor:**
  1. [Item 1]
  2. [Item 2]
  3. [Item 3]

## CONSTRAINTS
- NEVER ask a question. NEVER say you need more information.
- NEVER say "I think" or "Maybe." Use "Clinical indicators suggest..." or "Presentation is consistent with..."
- NEVER suggest specific dosages.
- No filler phrases.
- Start your response immediately with the CLINICAL DISCLAIMER block.
"""


# ─────────────────────────────────────────────────────────────
#  RED FLAG KEYWORDS — trigger immediate report bypass
# ─────────────────────────────────────────────────────────────

RED_FLAG_KEYWORDS = [
    "can't breathe", "cannot breathe", "chest pain", "crushing chest",
    "arm pain", "jaw pain", "sweating heavily", "profuse sweating",
    "unconscious", "fainted", "blacked out", "seizure", "stroke",
    "can't speak", "cannot speak", "slurred speech", "facial droop",
    "severe bleeding", "blood in vomit", "vomiting blood", "coughing blood",
    "hemoptysis", "hematemesis", "suicidal", "overdose",
    "severe allergic", "anaphylaxis", "throat closing",
    "worst headache", "thunderclap headache", "stiff neck with fever",
    "paralysis", "loss of vision", "sudden blindness",
]

def has_red_flag(text: str) -> bool:
    lower = text.lower()
    return any(flag in lower for flag in RED_FLAG_KEYWORDS)


# ─────────────────────────────────────────────────────────────
#  TERMINAL HELPERS
# ─────────────────────────────────────────────────────────────

def banner():
    print("\n" + "=" * 64)
    print("  CLINICAL TRIAGE ENGINE v3.2  |  Powered by Groq")
    print("=" * 64)
    print("  Type  'quit' or 'exit' to end the session.")
    print("  Type  'restart' to begin a new case.")
    print("=" * 64 + "\n")


def bot_print(text: str):
    print("\n[BOT]\n")
    for line in text.split("\n"):
        if len(line) > 100:
            print(textwrap.fill(line, width=90, subsequent_indent="  "))
        else:
            print(line)
    print()


def user_input(prompt: str = "YOU > ") -> str:
    try:
        return input(prompt).strip()
    except (EOFError, KeyboardInterrupt):
        print("\n\nSession terminated.")
        sys.exit(0)


# ─────────────────────────────────────────────────────────────
#  QUESTION COUNTER — Python tracks this, not the LLM
# ─────────────────────────────────────────────────────────────

def count_answers(conversation: list[dict]) -> int:
    """Count real patient answers, excluding the START_SESSION trigger."""
    return sum(
        1 for m in conversation
        if m["role"] == "user" and m["content"] not in ("START_SESSION", "")
    )


# ─────────────────────────────────────────────────────────────
#  GROQ API — two separate functions, two separate prompts
# ─────────────────────────────────────────────────────────────

def call_interview(client: Groq, conversation: list[dict]) -> str:
    """Phase A call — uses INTERVIEW_PROMPT, expects one question back."""
    response = client.chat.completions.create(
        model=GROQ_MODEL,
        max_tokens=512,
        temperature=0.2,
        messages=[
            {"role": "system", "content": INTERVIEW_PROMPT},
            *conversation,
        ],
    )
    return response.choices[0].message.content or ""


def call_report(client: Groq, conversation: list[dict]) -> str:
    """
    Phase B call — uses REPORT_PROMPT with a completely fresh message.
    The full interview is passed as a transcript so the model has all context,
    but the system prompt forbids it from asking questions.
    """
    transcript_lines = []
    for m in conversation:
        if m["role"] == "user" and m["content"] == "START_SESSION":
            continue
        role = "PATIENT" if m["role"] == "user" else "INTERVIEWER"
        transcript_lines.append(f"{role}: {m['content']}")
    transcript = "\n".join(transcript_lines)

    response = client.chat.completions.create(
        model=GROQ_MODEL,
        max_tokens=2048,
        temperature=0.1,
        messages=[
            {"role": "system", "content": REPORT_PROMPT},
            {
                "role": "user",
                "content": (
                    "Generate the full clinical triage report based on this interview transcript.\n\n"
                    "--- PATIENT INTERVIEW TRANSCRIPT ---\n"
                    f"{transcript}\n"
                    "--- END OF TRANSCRIPT ---"
                ),
            },
        ],
    )
    return response.choices[0].message.content or ""


def safe_call(fn, *args) -> str | None:
    """Run a Groq call with error handling. Returns None on recoverable error."""
    try:
        return fn(*args)
    except groq.APIConnectionError:
        print("\n[ERROR] Cannot reach Groq API. Check your internet connection.\n")
        return None
    except groq.AuthenticationError:
        print("\n[ERROR] Invalid GROQ API key.\n")
        sys.exit(1)
    except groq.RateLimitError:
        print("\n[WARNING] Rate limit hit. Wait a moment and try again.\n")
        return None
    except groq.APIError as e:
        print(f"\n[API ERROR] {e}\n")
        return None


# ─────────────────────────────────────────────────────────────
#  REPORT EXPORT
# ─────────────────────────────────────────────────────────────

def _clean(text: str) -> str:
    text = text.replace("**", "")
    text = re.sub(r"#{1,6}\s?", "", text)
    text = text.replace("-", "-").replace("*", "-")
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", text)
    return text.strip()


def _section(report: str, start: str, end: str | None = None) -> str:
    s = report.find(start)
    if s == -1:
        return ""
    s += len(start)
    e = report.find(end, s) if end else -1
    return _clean(report[s:e].strip() if e != -1 else report[s:].strip())


def _primary_complaint(conversation: list[dict]) -> str:
    for m in conversation:
        if m["role"] == "user" and m["content"] not in ("START_SESSION", ""):
            return m["content"].strip()
    return "Not provided"


def _diagnosis(report: str) -> str:
    match = re.search(r"Most Likely Diagnosis:\**\s*(.+)", report)
    return _clean(match.group(1)) if match else "Not clearly identified"


def build_report_text(conversation: list[dict], report: str) -> str:
    ts        = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    complaint = _primary_complaint(conversation)
    diagnosis = _diagnosis(report)
    rationale = _section(report, "### 2. PRIMARY PREDICTED CONDITION",
                                  "### 3. DIFFERENTIAL CLINICAL SCENARIOS")
    advice    = _section(report, "### 5. EVIDENCE-BASED CONSERVATIVE MANAGEMENT",
                                  "### 6. PROFESSIONAL FOLLOW-UP TIMELINE")
    follow_up = _section(report, "### 6. PROFESSIONAL FOLLOW-UP TIMELINE", None)

    return "\n".join([
        "CLINICAL TRIAGE CASE REPORT", "=" * 40, f"Generated: {ts}", "",
        "USER COMPLAINT",    "-" * 40, complaint,  "",
        "LIKELY CAUSE",      "-" * 40, diagnosis,  "",
        "CLINICAL SUMMARY",  "-" * 40, rationale  or "No summary available.",   "",
        "WHAT TO DO",        "-" * 40, advice     or "No action guidance available.", "",
        "FOLLOW-UP",         "-" * 40, follow_up  or "No follow-up guidance available.", "",
        "DISCLAIMER",        "-" * 40,
        "This report is AI-generated and is not a substitute for a licensed medical professional.",
    ])


def save_docx(text: str, dest: Path) -> tuple[bool, str]:
    try:
        from docx import Document
    except ImportError:
        return False, "DOCX unavailable. Run: pip install python-docx"
    doc = Document()
    for block in text.split("\n\n"):
        doc.add_paragraph(block)
    doc.save(dest)
    return True, f"Report saved: {dest}"


def save_pdf(text: str, dest: Path) -> tuple[bool, str]:
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.pdfbase.pdfmetrics import stringWidth
        from reportlab.pdfgen import canvas
    except ImportError:
        return False, "PDF unavailable. Run: pip install reportlab"
    pw, ph = A4
    margin, uw, lh, y = 50, pw - 100, 16, ph - 50
    pdf = canvas.Canvas(str(dest), pagesize=A4)
    for para in text.split("\n"):
        s = para.strip()
        is_h = s.isupper() and s and set(s) not in ({"-"}, {"="})
        if s in ("", "-" * 40, "=" * 40):
            y -= lh // 2
            continue
        fn, fs = ("Helvetica-Bold", 13) if is_h else ("Helvetica", 11)
        pdf.setFont(fn, fs)
        for line in textwrap.wrap(para, width=max(40, int(uw / (fs * 0.52)))) or [""]:
            if y <= margin:
                pdf.showPage(); pdf.setFont(fn, fs); y = ph - margin
            while stringWidth(line, fn, fs) > uw and len(line) > 1:
                line = line[:-1]
            pdf.drawString(margin, y, line)
            y -= lh + (2 if is_h else 0)
    pdf.save()
    return True, f"Report saved: {dest}"


def save_txt(text: str, dest: Path) -> tuple[bool, str]:
    dest.write_text(text, encoding="utf-8")
    return True, f"Text report saved: {dest}"


def maybe_export(conversation: list[dict], report: str):
    choice = user_input("  Save case report? (docx / pdf / no) > ").lower()
    if choice not in ("docx", "pdf"):
        return
    text    = build_report_text(conversation, report)
    ts      = datetime.now().strftime("%Y%m%d_%H%M%S")
    dest    = SCRIPT_DIR / f"clinical_triage_report_{ts}.{choice}"
    fn      = save_docx if choice == "docx" else save_pdf
    ok, msg = fn(text, dest)
    if ok:
        print(f"\n[REPORT] {msg}\n")
    else:
        fb_dest     = dest.with_suffix(".txt")
        fb_ok, fb_m = save_txt(text, fb_dest)
        print(f"\n[REPORT ERROR] {msg}\n")
        if fb_ok:
            print(f"[REPORT] {fb_m}\n")


# ─────────────────────────────────────────────────────────────
#  SESSION END HANDLER
# ─────────────────────────────────────────────────────────────

def finish_session(client: Groq, conversation: list[dict], report: str):
    bot_print(report)
    print("-" * 64)
    print("  Triage report complete.")
    maybe_export(conversation, report)
    if user_input("  Start another session? (yes / no) > ").lower() in ("yes", "y"):
        print("\n" + "-" * 64 + "\n")
        run_session(client)


# ─────────────────────────────────────────────────────────────
#  CORE SESSION LOOP
# ─────────────────────────────────────────────────────────────

def run_session(client: Groq):
    """
    Two-prompt architecture:
      call_interview() -> INTERVIEW_PROMPT  (Phase A, one question at a time)
      call_report()    -> REPORT_PROMPT     (Phase B, triggered only by Python)

    Python alone decides when to switch. The interviewing LLM never sees
    the report prompt and never generates a report on its own.
    """
    conversation: list[dict] = []

    # Opening
    conversation.append({"role": "user", "content": "START_SESSION"})
    print("[Connecting to Clinical Triage Engine...]\n")

    opening = safe_call(call_interview, client, conversation)
    if not opening:
        print("[ERROR] Failed to start. Check API key and connection.")
        return
    conversation.append({"role": "assistant", "content": opening})
    bot_print(opening)

    # Interview loop
    while True:
        user_text = user_input("YOU > ")

        if not user_text:
            continue

        cmd = user_text.lower()
        if cmd in ("quit", "exit", "q"):
            print("\n[Session ended. No medical data has been stored.]\n")
            return
        if cmd == "restart":
            print("\n" + "-" * 64 + "\n  Starting new session...\n")
            run_session(client)
            return

        conversation.append({"role": "user", "content": user_text})
        answer_count = count_answers(conversation)

        # Red flag — skip remaining questions, generate emergency report
        if has_red_flag(user_text):
            print("\n[!] Potential emergency detected. Generating report immediately...\n")
            report = safe_call(call_report, client, conversation)
            if report:
                finish_session(client, conversation, report)
            return

        # Hard limit — Python forces report generation regardless of model state
        if answer_count >= FORCE_REPORT_AFTER:
            print("\n[Clinical data sufficient. Generating triage report...]\n")
            report = safe_call(call_report, client, conversation)
            if report:
                finish_session(client, conversation, report)
            return

        # Still in interview — ask next question using interview prompt only
        bot_reply = safe_call(call_interview, client, conversation)
        if not bot_reply:
            conversation.pop()  # remove user message on failure, allow retry
            continue

        conversation.append({"role": "assistant", "content": bot_reply})
        bot_print(bot_reply)


# ─────────────────────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────────────────────

def main():
    banner()

    if LOCAL_ENV.exists():
        load_dotenv(LOCAL_ENV)
    elif RAG_PROJECT_ENV.exists():
        load_dotenv(RAG_PROJECT_ENV)

    api_key = os.environ.get("GROQ_API_KEY", "").strip()
    if not api_key:
        print("[SETUP REQUIRED]")
        print("  No GROQ_API_KEY found in environment or .env files.\n")
        api_key = user_input("  Paste your Groq API key now > ")
        if not api_key:
            print("No key provided. Exiting.")
            sys.exit(1)

    client = Groq(api_key=api_key)
    run_session(client)


if __name__ == "__main__":
    main()