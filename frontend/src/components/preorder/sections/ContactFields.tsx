/**
 * ContactFields Component
 * =======================
 * Renders four contact-info.
 */

import FormField from "../primitives/FormField";
import Input from "../primitives/Input";

// The four values this component reads from the parent's form state.
type ContactValues = {
  name: string;
  email: string;
  phone: string;      // optional -- not validated, stored exactly as typed
  instagram: string;  // optional -- accepted with or without a leading @
};

type ContactFieldsProps = {
  idPrefix?: string;
  values: ContactValues;
  // Only name and email have validation -- phone/instagram errors never exist
  errors?: { name?: string; email?: string };
  // One handler for all four inputs. The parent reads e.target.name to know
  // which field changed ("name" | "email" | "phone" | "instagram").
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ContactFields = ({ idPrefix = "", values, errors = {}, onChange }: ContactFieldsProps) => (
  <>
    {/* Full Name
        Required. autoComplete="name" lets browsers offer saved-name autofill.
        name="name" is the key the parent handler uses to update form.name.
        error={!!errors.name} converts the error string to boolean for Input's red-border pro */}
    <FormField label="Full Name" htmlFor={`${idPrefix}name`} required error={errors.name}>
      <Input
        id={`${idPrefix}name`} name="name" type="text"
        value={values.name} onChange={onChange}
        placeholder="Rachel Smith" autoComplete="name"
        error={!!errors.name}
      />
    </FormField>

    {/* Email
        Required. Validated in PreOrder.tsx against /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        (basic format check -- not exhaustive but catches typos). */}
    <FormField label="Email" htmlFor={`${idPrefix}email`} required error={errors.email}>
      <Input
        id={`${idPrefix}email`} name="email" type="email"
        value={values.email} onChange={onChange}
        placeholder="you@example.com" autoComplete="email"
        error={!!errors.email}
      />
    </FormField>

    {/* Phone
        Optional -- no validation at all. */}
    <FormField label="Phone" htmlFor={`${idPrefix}phone`} optional>
      <Input
        id={`${idPrefix}phone`} name="phone" type="tel"
        value={values.phone} onChange={onChange}
        placeholder="(647) 000-0000" autoComplete="tel"
      />
    </FormField>

    {/* Instagram
        Optional -- */}
    <FormField label="Instagram" htmlFor={`${idPrefix}instagram`} optional>
      <Input
        id={`${idPrefix}instagram`} name="instagram" type="text"
        value={values.instagram} onChange={onChange}
        placeholder="@yourusername"
      />
    </FormField>
  </>
);

export default ContactFields;
