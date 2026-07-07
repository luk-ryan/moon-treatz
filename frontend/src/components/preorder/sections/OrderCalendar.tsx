/**
 * OrderCalendar Component
 * =======================
 * A single calendar component that covers both (WeeklyCalendar + CateringCalendar).
 * Controlled by a `mode` prop:
 *
 *   mode="weekly"
 *   ─────────────
 *   Locked to the upcoming Thu/Fri/Sat pickup week. No month navigation.
 *   A single `value` string stores both the day and slot
 *   (e.g. "thursday-morning" or "nks-thursday-430-500pm").
 *
 *   mode="catering"
 *   ────────────────
 *   Navigable month calendar. Dates before next Wednesday are blocked.
 *   All manually blocked dates from config are also disabled.
 *
 * Both modes support `nksOnly`:
 *   false → Morning / Afternoon / Evening slot cards
 *   true  → Full NKS karate class timetable (Thu + Fri only)
 */

import { useState } from "react";
import { cateringBlockedDates } from "../../../config/preOrderForm";

// ─── NKS class timetable ──────────────────────────────────────────────────────
const NKS_SCHEDULE: Record<"thursday" | "friday", { value: string; time: string; label: string; sublabel: string }[]> = {
  thursday: [
    { value: "nks-thursday-430-500pm",   time: "4:30–5:00pm",   label: "White & White Adv Belt",   sublabel: "7 and under" },
    { value: "nks-thursday-500-530pm",   time: "5:00–5:30pm",   label: "Yellow & Yellow Adv Belt", sublabel: "7 and under" },
    { value: "nks-thursday-530-610pm",   time: "5:30–6:10pm",   label: "Purple to Brown Belt",     sublabel: "9–12 yrs" },
    { value: "nks-thursday-610-700pm",   time: "6:10–7:00pm",   label: "Brown Adv & Black Belt+",  sublabel: "12 and under" },
    { value: "nks-thursday-700-745pm",   time: "7:00–7:45pm",   label: "White & Yellow Belt",      sublabel: "Teen & Adult" },
    { value: "nks-thursday-745-830pm",   time: "7:45–8:30pm",   label: "Purple to Brown Belt",     sublabel: "Teen & Adult" },
    { value: "nks-thursday-830-915pm",   time: "8:30–9:15pm",   label: "Black Belt+",              sublabel: "Teen & Adult" },
    { value: "nks-thursday-915-930pm",   time: "9:15–9:30pm",   label: "Black Belt+ Extension",    sublabel: "Teen & Adult" },
  ],
  friday: [
    { value: "nks-friday-430-500pm",   time: "4:30–5:00pm",   label: "Yellow & Yellow Adv Belt",         sublabel: "7 and under" },
    { value: "nks-friday-500-530pm",   time: "5:00–5:30pm",   label: "Orange & Orange Adv Belt",         sublabel: "7 and under" },
    { value: "nks-friday-530-610pm",   time: "5:30–6:10pm",   label: "Green to Brown Adv Belt Fusion",   sublabel: "8 and under" },
    { value: "nks-friday-610-650pm",   time: "6:10–6:50pm",   label: "Orange to Brown Adv Belt Fusion",  sublabel: "9–12 yrs" },
    { value: "nks-friday-650-740pm",   time: "6:50–7:40pm",   label: "Brown Adv Belt",                   sublabel: "All Ages" },
    { value: "nks-friday-740-810pm",   time: "7:40–8:10pm",   label: "Black Belt Prep Class",            sublabel: "All Ages" },
    { value: "nks-friday-810-910pm",   time: "8:10–9:10pm",   label: "Black Belt+",                      sublabel: "All Ages" },
  ],
};

// ─── Standard time-of-day slots ───────────────────────────────────────────────
type DayKey = "thursday" | "friday" | "saturday";

// Base labels shared by both modes.
// Catering uses these values directly; weekly prefixes them with the day name.
const BASE_SLOTS = [
  { value: "morning",   label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening",   label: "Evening" },
];

const CATERING_SLOTS = BASE_SLOTS;

const WEEKLY_SLOTS: Record<DayKey, { value: string; label: string }[]> = {
  thursday: BASE_SLOTS.map(s => ({ ...s, value: `thursday-${s.value}` })),
  friday:   BASE_SLOTS.map(s => ({ ...s, value: `friday-${s.value}` })),
  saturday: BASE_SLOTS.map(s => ({ ...s, value: `saturday-${s.value}` })),
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES  = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ─── Utilities ────────────────────────────────────────────────────────────────
const pad   = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date)   => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Returns the upcoming Thu/Fri/Sat (strictly in the future, never today).
const getPickupWeek = () => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const daysUntilThu = (4 - today.getDay() + 7) % 7 || 7;
  const thu = new Date(today); thu.setDate(today.getDate() + daysUntilThu);
  const fri = new Date(thu);   fri.setDate(thu.getDate() + 1);
  const sat = new Date(thu);   sat.setDate(thu.getDate() + 2);
  return { thursday: thu, friday: fri, saturday: sat };
};

// ─── Props  ────────────────────────────────────────────────────────────────────
type WeeklyProps = {
  mode: "weekly";
  value: string;
  onChange: (val: string) => void;
  nksOnly?: boolean;
};

type CateringProps = {
  mode: "catering";
  dateValue: string;               // "YYYY-MM-DD" or ""
  timeValue: string;               // slot string or ""
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  nksOnly?: boolean;
};

type OrderCalendarProps = WeeklyProps | CateringProps;

// ─── Component ────────────────────────────────────────────────────────────────
const OrderCalendar = (props: OrderCalendarProps) => {
  const { nksOnly = false } = props;
  const isWeekly = props.mode === "weekly";

  // ── Weekly-mode: compute the three pickup dates ──────────────────────────────
  // getPickupWeek() always returns the *next* Thu/Fri/Sat, never the current day.
  const pickupWeek = getPickupWeek();
  const { thursday, friday, saturday } = pickupWeek;

  // availableKeyMap looks up a calendar cell's "YYYY-MM-DD" key and instantly know which DayKey it maps to.
  // Used to decide if a cell is clickable and which slot list to show.
  // In NKS mode, Saturday is omitted (no Saturday classes).
  const availableKeyMap: Record<string, DayKey> = isWeekly ? {
    [toKey(thursday)]: "thursday",
    [toKey(friday)]:   "friday",
    ...(nksOnly ? {} : { [toKey(saturday)]: "saturday" }),
  } : {};
  const availableKeys = new Set(Object.keys(availableKeyMap)); // O(1) per-cell lookup

  // Recovers the active DayKey from a stored slot string like "thursday-morning".
  // Returns null for empty / unrecognised strings.
  const dayFromValue = (v: string): DayKey | null =>
    v.startsWith("thursday") ? "thursday"
    : v.startsWith("friday")   ? "friday"
    : v.startsWith("saturday") ? "saturday"
    : null;

  // activeDay tracks which column of slot cards is currently open.
  // Set to the incoming value from the first render so a pre-filled form stays the same.
  // Null means no day has been selected yet.
  // Unused in catering mode.
  const [activeDay, setActiveDay] = useState<DayKey | null>(
    isWeekly ? dayFromValue((props as WeeklyProps).value) : null
  );

  // ── Catering-mode: earliest bookable date + blocked set ───────────────────────
  const today = new Date(); today.setHours(0, 0, 0, 0);
  // minDate = the next Wednesday from today (never same-day).
  // The `|| 7` to skip forward a full week when today IS Wednesday.
  const daysUntilWed = (3 - today.getDay() + 7) % 7 || 7;
  const minDate = new Date(today); minDate.setDate(today.getDate() + daysUntilWed);
  // Build a Set for O(1) manually blocked-date checks inside the cell loop below.
  const blockedSet = new Set(cateringBlockedDates);

  // ── View state: which month/year is shown in the grid ─────────────────────────
  // Weekly mode: fixed to the pickup week's month — the nav buttons are disabled.
  // Catering mode: starts at minDate's month (first month with selectable dates)
  //                and advances forward as the user navigates.
  const [viewYear,  setViewYear]  = useState(isWeekly ? thursday.getFullYear() : minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(isWeekly ? thursday.getMonth()    : minDate.getMonth());

  // Prevent navigating back past the month that contains minDate.
  // Always false in weekly mode (nav arrows are disabled in the JSX too).
  const canGoPrev = !isWeekly && (
    viewYear > minDate.getFullYear() ||
    (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth())
  );

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  // ── Calendar grid cells ───────────────────────────────────────────────────────
  // Leading nulls to shift day-1 into the correct weekday column.
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  // Day 0 of the *next* month == last day of the current month.
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),          // empty leading cells
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1), // day numbers 1..N
  ];

  // ── Slot value + change handler ───────────────────────────────────────────────
  const currentSlotValue = isWeekly
    ? (props as WeeklyProps).value
    : (props as CateringProps).timeValue;

  // Unified handler for change between both modes.
  const handleSlotChange = (v: string) => {
    if (isWeekly) (props as WeeklyProps).onChange(v);
    else          (props as CateringProps).onTimeChange(v);
  };

  // ── Day-cell click handler ────────────────────────────────────────────────────
  const handleDayClick = (key: string, dayKey?: DayKey) => {
    if (isWeekly && dayKey) {
      setActiveDay(dayKey);
      // If the user switches to a different day, clear the previously chosen slot.
      if (dayFromValue((props as WeeklyProps).value) !== dayKey)
        (props as WeeklyProps).onChange("");
    } else {
      // Catering: propagate the date and wipe any stale time selection.
      (props as CateringProps).onDateChange(key);
      (props as CateringProps).onTimeChange("");
    }
  };

  // ── Slot panel visibility + content ──────────────────────────────────────────
  // slotDay: which day's slot list to render.
  //   Weekly  → comes from `activeDay` state (set on cell click).
  //   Catering → derived from the date string; only Thu/Fri get NKS slots,
  //              all other days just show Morning/Afternoon/Evening.
  const slotDay: DayKey | null = isWeekly
    ? activeDay
    : (() => {
        const p = props as CateringProps;
        if (!p.dateValue) return null;
        const dow = new Date(p.dateValue + "T00:00:00").getDay(); // "T00:00:00" avoids timezone shifts
        return dow === 4 ? "thursday" : dow === 5 ? "friday" : null;
      })();

  // showSlots — nothing renders until a day is picked.
  const showSlots = isWeekly ? !!activeDay : !!(props as CateringProps).dateValue;

  // Human-readable heading shown above the slot cards, e.g. "Thursday, July 10".
  const getSlotHeading = (): string => {
    if (!showSlots) return "";
    if (isWeekly && activeDay) {
      const d = activeDay === "thursday" ? thursday : activeDay === "friday" ? friday : saturday;
      return d.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });
    }
    const dv = (props as CateringProps).dateValue;
    return dv
      ? new Date(dv + "T00:00:00").toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" })
      : "";
  };
  const slotHeading = getSlotHeading();

  // renderSlots: builds the slot card panel shown below the calendar grid.
  // Two layouts depending on mode:
  //   NKS mode (nksOnly=true + Thu/Fri selected) → full class timetable, single column
  //   Standard mode                              → Morning / Afternoon / Evening cards
  const renderSlots = () => {
    if (nksOnly && slotDay && (slotDay === "thursday" || slotDay === "friday")) {
      // NKS timetable: full class schedule in a single-column grid
      return (
        <div className="preorder-cal-slots" style={{ gridTemplateColumns: "1fr" }}>
          <div className="preorder-cal-slots-heading">{slotHeading}</div>
          {NKS_SCHEDULE[slotDay].map((cls) => (
            <label
              key={cls.value}
              className={`preorder-nks-card preorder-cal-slot-card${currentSlotValue === cls.value ? " preorder-nks-card-selected" : ""}`}
            >
              <input
                type="radio"
                name={isWeekly ? "pickupDate" : "orderTime"}
                value={cls.value}
                checked={currentSlotValue === cls.value}
                onChange={() => handleSlotChange(cls.value)}
                className="preorder-nks-card-input"
              />
              <span className="preorder-nks-card-time">{cls.time}</span>
              <span className="preorder-nks-card-label">{cls.label}</span>
              <span className="preorder-nks-card-sub">{cls.sublabel}</span>
            </label>
          ))}
        </div>
      );
    }

    // Standard slots: Morning / Afternoon / Evening.
    // Weekly uses WEEKLY_SLOTS (value includes day prefix, e.g. "thursday-morning").
    // Catering uses CATERING_SLOTS (plain strings, e.g. "morning").
    const slots = isWeekly && activeDay ? WEEKLY_SLOTS[activeDay] : CATERING_SLOTS;

    return (
      <div className="preorder-cal-slots">
        <div className="preorder-cal-slots-heading">{slotHeading}</div>
        {slots.map(({ value, label }) => (
          <label
            key={value}
            className={`preorder-nks-card preorder-cal-slot-card${currentSlotValue === value ? " preorder-nks-card-selected" : ""}`}
          >
            <input
              type="radio"
              name={isWeekly ? "pickupDate" : "orderTime"}
              value={value}
              checked={currentSlotValue === value}
              onChange={() => handleSlotChange(value)}
              className="preorder-nks-card-input"
            />
            <span className="preorder-cal-slot-time">{label}</span>
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="preorder-cal">

      {/* Month header — nav arrows are disabled in weekly mode */}
      <div className="preorder-cal-header">
        <button
          type="button" className="preorder-cal-nav"
          onClick={prevMonth} disabled={!canGoPrev}
          aria-label="Previous month"
        >‹</button>
        <span className="preorder-cal-month-label">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button
          type="button" className="preorder-cal-nav"
          onClick={nextMonth} disabled={isWeekly}
          aria-label="Next month"
        >›</button>
      </div>

      {/* Calendar grid */}
      <div className="preorder-cal-grid">
        {DAYS_OF_WEEK.map(d => (
          <div key={d} className="preorder-cal-dow">{d}</div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="preorder-cal-cell preorder-cal-empty" />;

          const key      = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`; // "YYYY-MM-DD"
          const cellDate = new Date(viewYear, viewMonth, day);

          // getCellState: returns the three flags needed to render this cell correctly.
          const getCellState = (): { isDisabled: boolean; isSelected: boolean; dayKey: DayKey | undefined } => {
            if (isWeekly) {
              // Weekly: only the three pickup days are enabled; everything else is greyed out.
              const dk = availableKeyMap[key];
              return {
                isDisabled: !availableKeys.has(key),
                isSelected: activeDay === dk && !!dk,
                dayKey:     dk,
              };
            }
            // Catering: three independent disable reasons checked separately.
            const isTooSoon = cellDate < minDate;  // before the minimum booking window
            const isBlocked = blockedSet.has(key); // manually blocked in config
            const isNksDay  = nksOnly && cellDate.getDay() !== 4 && cellDate.getDay() !== 5; // NKS → Thu/Fri only
            return {
              isDisabled: isTooSoon || isBlocked || isNksDay,
              isSelected: (props as CateringProps).dateValue === key,
              dayKey:     undefined,
            };
          };
          const { isDisabled, isSelected, dayKey } = getCellState();

          return (
            <button
              key={key}
              type="button"
              disabled={isDisabled}
              onClick={() => handleDayClick(key, dayKey)}
              className={[
                "preorder-cal-cell",
                isDisabled ? "preorder-cal-disabled" : "preorder-cal-available",
                isSelected ? "preorder-cal-day-active" : "",
              ].filter(Boolean).join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Slot panel — revealed once a day cell is clicked.
          renderSlots() picks between the NKS timetable layout and the standard
          Morning/Afternoon/Evening grid based on nksOnly + which day is active. */}
      {showSlots && renderSlots()}

    </div>
  );
};

export default OrderCalendar;
