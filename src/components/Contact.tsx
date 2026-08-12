import React, { useState } from "react";
import { SchoolConfig } from "../types";
import { submitInquiry } from "../lib/supabase";
import LucideIcon from "./LucideIcon";

interface ContactProps {
  config: SchoolConfig;
}

export default function Contact({ config }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    academicStream: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<any>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      academicStream: formData.academicStream,
      message: formData.message,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setSubmitError(result.error || "Unable to submit inquiry at this time.");
      return;
    }

    setSubmittedSnapshot({ ...formData });
    setSubmitSuccess(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      academicStream: "",
      message: ""
    });
  };

  const getMailtoUrl = () => {
    if (!submittedSnapshot) return "#";
    const subject = encodeURIComponent(`New Enrollment Application: ${submittedSnapshot.name} (${submittedSnapshot.academicStream})`);
    const body = encodeURIComponent(`Dear Admissions Registrar,

I would like to officially enroll at ${config.name}. Please find my enrollment application package details below:

[APPLICANT DETAILS]
- Candidate Full Name: ${submittedSnapshot.name}
- Academic Stream/Combination: ${submittedSnapshot.academicStream} Combination
- Contact Email Address: ${submittedSnapshot.email}
- Contact Phone Number: ${submittedSnapshot.phone}

[MESSAGE / PRIOR GRADES HISTORY]
${submittedSnapshot.message}

Please confirm receipt of my application and advise me on the dates for the entrance examinations and registration fees.

Best regards,
${submittedSnapshot.name}`);

    return `mailto:${config.contact.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDetails = () => {
    if (!submittedSnapshot) return;
    const plainText = `Dear Admissions Registrar at ${config.name},

I would like to officially enroll. Please find my enrollment application details below:

- Candidate Full Name: ${submittedSnapshot.name}
- Academic Stream/Combination: ${submittedSnapshot.academicStream}
- Contact Email Address: ${submittedSnapshot.email}
- Contact Phone Number: ${submittedSnapshot.phone}

[PRIOR GRADES & MESSAGE]
${submittedSnapshot.message}

Sent via Online Admissions Portal.`;

    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white" h-id="contact-section">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span 
            className="text-xs font-extrabold tracking-widest uppercase inline-block"
            style={{ color: config.secondaryColor }}
          >
            ADMISSIONS & CAMPUS ENROLLMENT
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Online Enrollment & Inquiries
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto rounded-full" />
          <p className="text-gray-500 text-sm sm:text-base">
            Enroll today for the academic year. Complete the official form below to send your application package directly to our admissions registrar email.
          </p>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Side (Left on desktop) */}
          <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm">
            
            {submitSuccess && submittedSnapshot ? (
              <div className="space-y-6 animate-fade-in">
                {/* Header state */}
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-start space-x-3.5">
                  <div className="p-2 rounded-full bg-emerald-500 text-white shrink-0 mt-0.5">
                    <LucideIcon name="Check" size={18} className="stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-sm sm:text-base text-emerald-900">Inquiry Submitted Successfully!</h4>
                    <p className="text-xs text-emerald-800/80 leading-relaxed font-light mt-1">
                      Your submission has been saved to the school inquiry database. A registrar will follow up with you using <strong>{submittedSnapshot.email}</strong> or <strong>{submittedSnapshot.phone}</strong>.
                    </p>
                  </div>
                </div>

                {/* Structured Snapshot summary */}
                <div className="bg-white border border-gray-200/60 rounded-2xl p-5 space-y-4 shadow-inner text-xs">
                  <h5 className="font-extrabold text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2 flex items-center space-x-1.5">
                    <LucideIcon name="User" size={11} />
                    <span>Application Snapshot Summary</span>
                  </h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div>
                      <div className="text-gray-400 font-bold text-[10px] uppercase">Candidate Name</div>
                      <div className="text-gray-850 font-bold text-xs mt-0.5">{submittedSnapshot.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 font-bold text-[10px] uppercase">Selected Curriculum Stream</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5" style={{ color: config.primaryColor }}>
                        {submittedSnapshot.academicStream} Combo
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 font-bold text-[10px] uppercase">Contact Telephone</div>
                      <div className="text-gray-700 font-semibold mt-0.5">{submittedSnapshot.phone}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 font-bold text-[10px] uppercase">Candidate Email</div>
                      <div className="text-gray-700 font-semibold mt-0.5">{submittedSnapshot.email}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="text-gray-400 font-bold text-[10px] uppercase">Academic History / Message</div>
                    <div className="text-gray-600 mt-1 leading-relaxed bg-gray-50/50 p-2.5 rounded-lg border border-gray-100/40 text-[11px] font-light max-h-24 overflow-y-auto">
                      {submittedSnapshot.message}
                    </div>
                  </div>
                </div>

                {/* Submitting CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={getMailtoUrl()}
                    className="flex-1 py-3.5 px-4 rounded-xl text-xs font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <LucideIcon name="Send" size={13} />
                    <span>Send via Mail Client</span>
                  </a>

                  <button
                    onClick={handleCopyDetails}
                    type="button"
                    className="flex-1 py-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <LucideIcon name={copied ? "Check" : "Copy"} size={13} className={copied ? "text-emerald-500" : ""} />
                    <span>{copied ? "Copied Details!" : "Copy to Clipboard"}</span>
                  </button>
                </div>

                {/* Back to form link */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSubmittedSnapshot(null);
                    }}
                    className="text-xs font-bold underline cursor-pointer"
                    style={{ color: config.primaryColor }}
                  >
                    Submit Another Application Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {submitError && (
                  <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
                    {submitError}
                  </div>
                )}
                <div className="border-b border-gray-200/50 pb-4 mb-2">
                  <h3 className="font-extrabold text-gray-950 text-base sm:text-lg tracking-tight">
                    Submit Online Enrollment Form
                  </h3>
                  <p className="text-gray-400 text-[11px] font-light mt-1">
                    Fill in your details below to submit your inquiry and enroll through the school's official admissions workflow.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Candidate Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean Damascene"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:border-transparent transition-all"
                      style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="damascene@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:border-transparent transition-all"
                      style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+250 788..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:border-transparent transition-all"
                      style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Curriculum Stream / Combo</label>
                    <select
                      required
                      value={formData.academicStream}
                      onChange={(e) => setFormData({ ...formData, academicStream: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:border-transparent transition-all text-gray-600 cursor-pointer"
                      style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                    >
                      <option value="">-- Choose Program --</option>
                      {config.academicPrograms.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.code} ({p.title})
                        </option>
                      ))}
                      <option value="Civic-Leadership">Civic Leadership & Mentorship Program</option>
                      <option value="General">Other / General Admissions</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Inquiry Message / Grades & Background</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter details about previous school grades, academic history, or physical talent projects..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:border-transparent transition-all resize-none"
                    style={{ ["--tw-ring-color" as any]: config.primaryColor }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-center py-3.5 rounded-xl text-xs font-bold text-white shadow-sm hover:shadow-md transition-all active:scale-[0.99] disabled:opacity-75 flex items-center justify-center space-x-2 cursor-pointer"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Preparing application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application Form</span>
                      <LucideIcon name="ArrowRight" size={13} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map & Detail Cards (Right on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Official Fees Structure & Billing Information Guidance Card */}
            <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-white/10 space-y-3.5">
              <div className="flex items-center space-x-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                <LucideIcon name="CreditCard" size={16} />
                <span>Official Fees Structure & Billing Notice</span>
              </div>
              <h4 className="font-bold text-sm sm:text-base text-white tracking-tight">
                G.S Gacuba II A Fees & Admission Guidance
              </h4>
              <p className="text-blue-100 text-xs leading-relaxed font-light">
                For up-to-date fees, boarding details, and admission requirements at G.S Gacuba II A, please contact school administration directly. Our team can provide the latest term rates, application steps, and guidance for day scholars and boarding candidates under Rwanda Education Board (REB) policy.
              </p>
              <div className="pt-2 flex items-center space-x-2 text-[11px] text-emerald-300 font-semibold border-t border-white/10">
                <LucideIcon name="ShieldCheck" size={14} />
                <span>REQUIRED: REB-approved fees and school admission policies</span>
              </div>
            </div>

            {/* Quick Contact Block */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 space-y-5">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wider">Registrar Channels</h4>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-white text-gray-700 border border-gray-100 shadow-sm shrink-0">
                    <LucideIcon name="MapPin" size={16} style={{ color: config.primaryColor }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Campus Address</div>
                    <div className="text-gray-700 text-xs font-medium mt-0.5">{config.contact.address}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border-t border-gray-100 pt-4">
                  <div className="p-2.5 rounded-xl bg-white text-gray-700 border border-gray-100 shadow-sm shrink-0">
                    <LucideIcon name="Phone" size={16} style={{ color: config.primaryColor }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Direct Telephone</div>
                    <div className="text-gray-700 text-xs font-medium mt-0.5">{config.contact.phone}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border-t border-gray-100 pt-4">
                  <div className="p-2.5 rounded-xl bg-white text-gray-700 border border-gray-100 shadow-sm shrink-0">
                    <LucideIcon name="Mail" size={16} style={{ color: config.primaryColor }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Direct Registrar Email</div>
                    <div className="text-gray-700 text-xs font-medium mt-0.5">{config.contact.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Google Maps Location Embed */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="p-1.5 rounded-lg text-white"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <LucideIcon name="MapPin" size={14} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                    G.S Gacuba II A Campus Location
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-full border border-gray-100">
                  Rubavu District
                </span>
              </div>

              <div className="mapouter relative w-full h-[340px] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                <div className="gmap_canvas w-full h-full overflow-hidden bg-none">
                  <iframe 
                    title="G.S Gacuba II A Google Map"
                    className="gmap_iframe w-full h-[340px] border-0" 
                    width="100%" 
                    height="340" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=gacuba+ii+a+school+rubavu&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-light pt-1">
                <span className="flex items-center space-x-1">
                  <LucideIcon name="Navigation" size={12} className="text-gray-400" />
                  <span>Gisenyi Sector, near TTC Gacuba II</span>
                </span>
                <a 
                  href="https://maps.google.com/?q=gacuba+ii+a+school+rubavu" 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-bold hover:underline flex items-center space-x-1"
                  style={{ color: config.primaryColor }}
                >
                  <span>Open in Google Maps</span>
                  <LucideIcon name="ExternalLink" size={11} />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
