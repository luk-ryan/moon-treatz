/**
 * CateringCalendar Component
 * ==========================
 * Navigable month-view calendar used for catering event scheduling.
 *
 * Two-step selection:
 *   1. Pick a date  → `dateValue` ("YYYY-MM-DD"), stored in form.eventDate
 *   2. Pick a slot  → `timeValue` (e.g. "morning" or "nks-thursday-430-500pm")
 *
 * Date availability rules:
 *   - Must be at least next Wednesday from today (never same-week)
 *   - `cateringBlockedDates` from config are always greyed out
 *   - When `nksOnly` is true, only Thu + Fri are selectable
 *
 * Slot modes:
 *   - Standard  → Morning / Afternoon / Evening radio cards
 *   - NKS only  → Full karate class timetable (Thu/Fri)
 */

import { useState } from "react";
import { cateringBlockedDates } from "../../../../config/preOrderForm";

// NKS karate class timetable — Thu + Fri only.
const NKS_SCHEDULE: Record<"thursday" | "friday", { value: string; time: string; label: string; sublabel: string }[]> = {
  thursday: [
    { value: "430-500pm",   time: "4:30–5:00pm",   label: "White & White Adv Belt",   sublabel: "7 and under" },
    { value: "500-530pm",   time: "5:00–5:30pm",   label: "Yellow & Yellow Adv Belt", sublabel: "7 and under" },
    { value: "530-610pm",   time: "5:30–6:10pm",   label: "Purple to Brown Belt",     sublabel: "9–12 yrs" },
    { value: "610-700pm",   time: "6:10–7:00pm",   label: "Brown Adv & Black Belt+",  sublabel: "12 and under" },
    { value: "700-745pm",   time: "7:00–7:45pm",   label: "White & Yellow Belt",      sublabel: "Teen & Adult" },
    { value: "745-830pm",   time: "7:45–8:30pm",   label: "Purple to Brown Belt",     sublabel: "Teen & Adult" },
    { value: "830-915pm",   time: "8:30–9:15pm",   label: "Black Belt+",              sublabel: "Teen & Adult" },
    { value: "915-930pm",   time: "9:15–9:30pm",   label: "Black Belt+ Extension",    sublabel: "Teen & Adult" },
  ],
  friday: [
    { value: "430-500pm",   time: "4:30–5:00pm",   label: "Yellow & Yellow Adv Belt",         sublabel: "7 and under" },
    { value: "500-530pm",   time: "5:00–5:30pm",   label: "Orange & Orange Adv Belt",         sublabel: "7 and under" },
    { value: "530-610pm",   time: "5:30–6:10pm",   label: "Green to Brown Adv Belt Fusion",   sublabel: "8 and under" },
    { value: "610-650pm",   time: "6:10–6:50pm",   label: "Orange to Brown Adv Belt Fusion",  sublabel: "9–12 yrs" },
    { value: "650-740pm",   time: "6:50–7:40pm",   label: "Brown Adv Belt",                   sublabel: "All Ages" },
    { value: "740-810pm",   time: "7:40–8:10pm",   label: "Black Belt Prep Class",            sublabel: "All Ages" },
    { value: "810-910pm",   time: "8:10–9:10pm",   label: "Black Belt+",                      sublabel: "All Ages" },
  ],
};

// Standard time-of-day options shown for non-NKS catering orders.
const TIME_SLOTS = [
  { value: "morning",   label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening",   label: "Evening" },
];

// Calendar header labels
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const pad = (n: number) => String(n).padStart(2, "0");
// toKey: produces "YYYY-MM-DD" from separate year/month(0-based)/day parts
const toKey = (y: number, m: number, d: number) =>
  `${y}-${pad(m + 1)}-${pad(d)}`;

type CateringCalendarProps = {
  dateValue: string;               // "YYYY-MM-DD" or "" when nothing selected
  timeValue: string;               // slot string or "" when nothing selected
  onDateChange: (date: string) => void; // clears timeValue in the parent too
  onTimeChange: (time: string) => void;
  nksOnly?: boolean;               // true → Thu/Fri only + NKS timetable
};

const CateringCalendar = ({ dateValue, timeValue, onDateChange, onTimeChange, nksOnly = false }: CateringCalendarProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Minimum selectable date: the next Wednesday (never today even if today is Wednesday)
  const minDate = new Date(today);
  const daysUntilWed = (3 - today.getDay() + 7) % 7 || 7; // 3 = Wednesday; always at least 1 day away
  minDate.setDate(today.getDate() + daysUntilWed);

  // View state — which month/year is currently shown in the calendar grid.
  // Starts at minDate's month so the user's first visible month has selectable dates.
  const [viewYear,  setViewYear]  = useState(minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(minDate.getMonth());

  // `firstDay` = day-of-week offset for the 1st cell so Monday doesn't land in the Sunday column.
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  // Day 0 of next month = last day of current month.
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const blockedSet  = new Set(cateringBlockedDates); // O(1) lookups per cell

  // Prevent navigating back past the month that contains minDate.
  const canGoPrev = viewYear > minDate.getFullYear() ||
    (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  // `cells`: leading nulls fill the empty cells before the 1st of the month;
  // followed by day numbers 1..daysInMonth.
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="preorder-cal">

      {/* ── Month nav ── */}
      <div className="preorder-cal-header">
        <button type="button" className="preorder-cal-nav" onClick={prevMonth} disabled={!canGoPrev} aria-label="Previous month">‹</button>
        <span className="preorder-cal-month-label">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button type="button" className="preorder-cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
      </div>

      {/* ── Calendar grid ── */}
      <div className="preorder-cal-grid">
        {DAYS_OF_WEEK.map(d => (
          <div key={d} className="preorder-cal-dow">{d}</div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="preorder-cal-cell preorder-cal-empty" />;

          const key      = toKey(viewYear, viewMonth, day);
          const cellDate = new Date(viewYear, viewMonth, day);
          const isTooSoon  = cellDate < minDate;               // before the minimum allowed date
          const isBlocked  = blockedSet.has(key);              // manually blocked in config
          const isNksDay   = nksOnly && cellDate.getDay() !== 4 && cellDate.getDay() !== 5; // NKS: Thu & Fri only (4, 5)
          const isDisabled = isTooSoon || isBlocked || isNksDay;
          const isSelected = dateValue === key;

          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => { onDateChange(key); onTimeChange(""); }}
              className={[
                "preorder-cal-cell",
                isDisabled  ? "preorder-cal-disabled"  : "preorder-cal-available",
                isSelected  ? "preorder-cal-day-active" : "",
              ].filter(Boolean).join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* ── Slots revealed after a date is picked ───────────────────────────────
          NKS mode renders the full class timetable; standard shows Morning/Afternoon/Evening. */}
      {dateValue && (() => {
        const selectedDate = new Date(dateValue + "T00:00:00");
        const dayOfWeek = selectedDate.getDay(); // 4=Thu, 5=Fri
        const dayKey = dayOfWeek === 4 ? "thursday" : dayOfWeek === 5 ? "friday" : null;
        const heading = selectedDate.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });

        if (nksOnly && dayKey) {
          // NKS mode: show full karate class timetable for the selected day
          return (
            <div className="preorder-cal-slots" style={{ gridTemplateColumns: "1fr" }}>
              <div className="preorder-cal-slots-heading">{heading}</div>
              {NKS_SCHEDULE[dayKey].map((cls) => {
                const val = `nks-${dayKey}-${cls.value}`;
                return (
                  <label
                    key={val}
                    className={`preorder-nks-card preorder-cal-slot-card${timeValue === val ? " preorder-nks-card-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="orderTime"
                      value={val}
                      checked={timeValue === val}
                      onChange={() => onTimeChange(val)}
                      className="preorder-nks-card-input"
                    />
                    <span className="preorder-nks-card-time">{cls.time}</span>
                    <span className="preorder-nks-card-label">{cls.label}</span>
                    <span className="preorder-nks-card-sub">{cls.sublabel}</span>
                  </label>
                );
              })}
            </div>
          );
        }

        // Standard catering: show Morning / Afternoon / Evening cards
        return (
          <div className="preorder-cal-slots">
            <div className="preorder-cal-slots-heading">{heading}</div>
            {TIME_SLOTS.map(({ value, label }) => (
              <label
                key={value}
                className={`preorder-nks-card preorder-cal-slot-card${timeValue === value ? " preorder-nks-card-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="orderTime"
                  value={value}
                  checked={timeValue === value}
                  onChange={() => onTimeChange(value)}
                  className="preorder-nks-card-input"
                />
                <span className="preorder-cal-slot-time">{label}</span>
              </label>
            ))}
          </div>
        );
      })()}

    </div>
  );
};

export default CateringCalendar;
