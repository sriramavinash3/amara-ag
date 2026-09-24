import React from 'react';

const insurerLogos = [
  { name: 'Blue Cross Blue Shield NC', src: '/images/insurers/BCBS NC.png' },
  { name: 'BCBS Blue Advantage', src: '/images/insurers/BCBS Blue Advantage.png' },
  { name: 'BCBS Blue Options', src: '/images/insurers/BCBS Blue Options.png' },
  { name: 'BCBS NC State Health Plan Network', src: '/images/insurers/BCBS NC State Health Plan Network.png' },
  { name: 'BCBS Healthy Blue', src: '/images/insurers/BCBSNC_Abbrev-HealthyBlue-HBCareTogether_RGB-SkyDkSea.svg' },
  { name: 'Healthy Blue', src: '/images/insurers/HealthyBlue-HB.png' },
  { name: 'Aetna Commercial', src: '/images/insurers/Aetna Commercial.png' },
  { name: 'Aetna Medicare', src: '/images/insurers/Aetna Medicare.png' },
  { name: 'Cigna', src: '/images/insurers/Cigna-Logo.png' },
  { name: 'UnitedHealthcare Commercial', src: '/images/insurers/United Healthcare Commercial.png' },
  { name: 'Humana', src: '/images/insurers/Humana logo png.png' },
  { name: 'NC Medicaid Direct', src: '/images/insurers/Medicaid NC Drect logo.png' },
  { name: 'Wellcare', src: '/images/insurers/Wellcare logo png.png' },
  { name: 'AmeriHealth Caritas', src: '/images/insurers/amerihealth-consd-logo.jpg' },
  { name: 'Carolina Complete Health', src: '/images/insurers/carolina-complete-health-logo.jpg' },
];

export default function InsuranceMarquee() {
  return (
    <section className="relative border-b bg-[#323030] py-8 border-[#585454]" id="insurer-logos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="mb-6 text-center font-heading text-[13px] md:text-[15px] uppercase tracking-[0.2em] text-[#FFFFFF] font-bold">
          In-Network Insurance Partners
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 items-center justify-items-center">
          {insurerLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2.5 bg-[#454242] rounded-xl border border-[#585454] hover:border-emerald-500/50 shadow-sm transition-all duration-300 w-full h-20 sm:h-24"
            >
              <div className="w-full h-full bg-white/95 rounded-lg p-2 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-11 sm:max-h-12 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
