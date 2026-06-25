/**
 * WeeklyCalendar Component
 * ========================
 * Calendar for weekly box pickup selection.
 * Only the upcoming Thursday, Friday, and Saturday are selectable.
 * Clicking a day reveals its time slot cards below.
 */

import { useState } from "react";

type DayKey = "thursday" | "friday" | "saturday";

const SLOTS: Record<DayKey, { value: string; label: string }[]> = {
  thursday: [
    { value: "thursday-morning",   label: "Morning" },
    { value: "thursday-afternoon", label: "Afternoon" },
    { value: "thursday-evening",   label: "Evening" },
  ],
  friday: [
    { value: "friday-morning",   label: "Morning" },
    { value: "friday-afternoon", label: "Afternoon" },
    { value: "friday-evening",   label: "Evening" },
  ],
  saturday: [
    { value: "saturday-morning",   label: "Morning" },
    { value: "saturday-afternoon", label: "Afternoon" },
    { value: "saturday-evening",   label: "Evening" },
  ],
};

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

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const pad = (n: number) => String(n).padStart(2, "0");
const toKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Returns the upcoming pickup Thu/Fri/Sat (strictly after today, never today itself). */
const getPickupWeek = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntilThu = (4 - today.getDay() + 7) % 7 || 7;
  const thu = new Date(today);
  thu.setDate(today.getDate() + daysUntilThu);
  const fri = new Date(thu); fri.setDate(thu.getDate() + 1);
  const sat = new Date(thu); sat.setDate(thu.getDate() + 2);
  return { thursday: thu, friday: fri, saturday: sat };
};

type WeeklyCalendarProps = {
  value: string;
  onChange: (val: string) => void;
  nksOnly?: boolean;
};

const WeeklyCalendar = ({ value, onChange, nksOnly = false }: WeeklyCalendarProps) => {
  const { thursday, friday, saturday } = getPickupWeek();

  const availableKeyMap: Record<string, DayKey> = {
    [toKey(thursday)]: "thursday",
    [toKey(friday)]:   "friday",
    ...(nksOnly ? {} : { [toKey(saturday)]: "saturday" }), // Saturday excluded for NKS-only orders
  };
  const availableKeys = new Set(Object.keys(availableKeyMap));

  // Derive active day from current value so the highlighted day persists across re-renders
  const dayFromValue = (v: string): DayKey | null =>
    v.startsWith("thursday") ? "thursday"
    : v.startsWith("friday")   ? "friday"
    : v.startsWith("saturday") ? "saturday"
    : null;

  const [activeDay, setActiveDay] = useState<DayKey | null>(dayFromValue(value));

  const viewYear  = thursday.getFullYear();
  const viewMonth = thursday.getMonth();
  const firstDay   = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleDayClick = (dayKey: DayKey) => {
    setActiveDay(dayKey);
    // Clear any previously selected slot when switching to a different day
    if (dayFromValue(value) !== dayKey) onChange("");
  };

  return (
    <div className="preorder-cal">

      {/* ── Month label (locked to pickup week — nav buttons present but disabled) ── */}
      <div className="preorder-cal-header">
        <button type="button" className="preorder-cal-nav" disabled aria-label="Previous month">‹</button>
        <span className="preorder-cal-month-label">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button type="button" className="preorder-cal-nav" disabled aria-label="Next month">›</button>
      </div>

      {/* ── Calendar grid ── */}
      <div className="preorder-cal-grid">
        {DAYS_OF_WEEK.map(d => (
          <div key={d} className="preorder-cal-dow">{d}</div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="preorder-cal-cell preorder-cal-empty" />;

          const key = `${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`;
          const isAvail = availableKeys.has(key);
          const dayKey  = availableKeyMap[key];
          const isActive = activeDay === dayKey;

          return (
            <button
              key={key}
              type="button"
              disabled={!isAvail}
              onClick={() => handleDayClick(dayKey)}
              className={[
                "preorder-cal-cell",
                isAvail ? "preorder-cal-available" : "preorder-cal-disabled",
                isActive ? "preorder-cal-day-active" : "",
              ].filter(Boolean).join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* ── Time slot / timetable cards (shown after a day is clicked) ────────────────
          NKS mode renders the full karate class timetable for the selected day.
          Standard mode renders Morning / Afternoon / Evening slot cards. */}
      {activeDay && (() => {
        const date = activeDay === "thursday" ? thursday : activeDay === "friday" ? friday : saturday;
        const heading = date.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" });

        if (nksOnly && (activeDay === "thursday" || activeDay === "friday")) {
          // NKS mode: show class timetable with time, belt level, and age group
          return (
            <div className="preorder-cal-slots" style={{ gridTemplateColumns: "1fr" }}>
              <div className="preorder-cal-slots-heading">{heading}</div>
              {NKS_SCHEDULE[activeDay].map((cls) => (
                <label
                  key={cls.value}
                  className={`preorder-nks-card preorder-cal-slot-card${value === cls.value ? " preorder-nks-card-selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="pickupDate"
                    value={cls.value}
                    checked={value === cls.value}
                    onChange={() => onChange(cls.value)}
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

        // Standard weekly: show Morning / Afternoon / Evening slot cards
        return (
          <div className="preorder-cal-slots">
            <div className="preorder-cal-slots-heading">{heading}</div>
            {SLOTS[activeDay].map(({ value: v, label }) => (
              <label
                key={v}
                className={`preorder-nks-card preorder-cal-slot-card${value === v ? " preorder-nks-card-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="pickupDate"
                  value={v}
                  checked={value === v}
                  onChange={() => onChange(v)}
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

export default WeeklyCalendar;
