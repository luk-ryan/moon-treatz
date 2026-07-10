/**
 * EmailJS Configuration
 * =====================
 * Fill these in from your EmailJS dashboard (https://dashboard.emailjs.com):
 *
 * 1. SERVICE_ID  — from Email Services tab
 * 2. TEMPLATE_ID — from Email Templates tab
 * 3. PUBLIC_KEY  — from Account > API Keys
 *
 * Template variables used (add these in your EmailJS template):
 *   {{customer_name}}     — customer's name
 *   {{customer_email}}    — customer's email
 *   {{customer_phone}}    — phone (optional)
 *   {{customer_instagram}}— instagram (optional)
 *   {{order_summary}}     — full cart (items + quantities + subtotal)
 *   {{schedule}}          — pickup/delivery date & time
 *   {{pickup_delivery}}   — Pickup or Delivery + address
 *   {{payment_method}}    — e-transfer / cash
 *   {{etransfer_email}}   — e-transfer email (if applicable)
 *   {{notes}}             — customer notes (optional)
 */

export const EMAILJS_SERVICE_ID = "service_1orwmeb";
export const EMAILJS_TEMPLATE_ID = "template_j990dk1";   // admin notification
export const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_is8hbu7"; // customer receipt — update after creating in EmailJS dashboard
export const EMAILJS_PUBLIC_KEY = "y0VKT80sTZCA9P094";