import { Mail, Github, Linkedin, Phone, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import SpringHeading from './SpringHeading';
import WhatsApp from './icons/WhatsApp';

export default function Contact() {
  const { contact } = profile;
  const hasEmail = !!contact.email;
  const hasGithub = !!contact.github;
  const hasLinkedin = !!contact.linkedin;
  const hasPhone = !!contact.phone;
  const hasWhatsapp = !!contact.whatsapp;

  const whatsappHref = hasWhatsapp
    ? `${contact.whatsapp}?text=${encodeURIComponent(
        contact.whatsappMessage || '',
      )}`
    : '';

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-ink-surface scroll-mt-20"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <p className="reveal text-xs tracking-[0.3em] text-ember uppercase mb-6">
          {contact.label}
        </p>
        <div className="reveal">
          <SpringHeading
            as="h2"
            className="font-display text-bone text-[clamp(2rem,7vw,5.5rem)] tracking-tightest"
          >
            {contact.heading}
          </SpringHeading>
        </div>
        <p className="reveal mt-6 max-w-2xl text-bone-muted text-lg">
          {contact.body}
        </p>

        {/* Direct contact details */}
        <div className="reveal mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          {hasEmail ? (
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-ember text-ink-base font-medium text-sm rounded-full hover:bg-ember-soft transition-colors"
            >
              <Mail size={16} />
              {contact.email}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          ) : null}

          {hasPhone ? (
            <a
              href={`tel:${contact.phoneTel}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-hair text-bone text-sm rounded-full hover:border-ember hover:text-ember transition-colors"
            >
              <Phone size={16} />
              {contact.phone}
            </a>
          ) : null}
        </div>

        {/* Social + WhatsApp row */}
        <div className="reveal mt-4 flex flex-wrap gap-4">
          {hasWhatsapp ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Nagaraj on WhatsApp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-[#075E54] font-semibold text-sm rounded-full hover:bg-[#1ebe57] transition-colors"
            >
              <WhatsApp size={16} />
              Chat on WhatsApp
            </a>
          ) : null}

          {hasGithub ? (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-hair text-bone text-sm rounded-full hover:border-ember hover:text-ember transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          ) : null}

          {hasLinkedin ? (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-hair text-bone text-sm rounded-full hover:border-ember hover:text-ember transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
